
import express from 'express';
import dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';

dotenv.config();

const app = express();
const PORT = 3001;

app.use(express.json({ limit: '20kb' }));

// SiteSidekick API spending safeguards
const AI_ENABLED = process.env.AI_ENABLED === 'true';
const MAX_SESSION_REQUESTS = 5;
const MAX_DAILY_REQUESTS = 10;
const MAX_OUTPUT_TOKENS = 300;

const USAGE_FILE = path.join(process.cwd(), '.sitesidekick-usage.json');

let sessionRequests = 0;
let requestInProgress = false;

function todayUTC() {
  return new Date().toISOString().slice(0, 10);
}

function readUsage() {
  try {
    const saved = JSON.parse(fs.readFileSync(USAGE_FILE, 'utf8'));

    if (
      saved.date === todayUTC() &&
      Number.isInteger(saved.requests) &&
      saved.requests >= 0
    ) {
      return saved;
    }
  } catch {
    // No saved usage yet.
  }

  return { date: todayUTC(), requests: 0 };
}

function saveUsage(usage) {
  fs.writeFileSync(USAGE_FILE, JSON.stringify(usage, null, 2));
}

const SYSTEM_PROMPT = `
You are SiteSidekick, a friendly website troubleshooting
assistant for small-business owners.

Your responsibilities:
- Explain website problems in plain English.
- Ask only one troubleshooting question at a time.
- Remember information already provided in the conversation.
- Never overwhelm customers with technical instructions.
- Never claim to have inspected a website unless a tool
  has actually inspected it.
- Never promise a specific repair time or cost.
- Do not request passwords, API keys, or payment information.
- Never recommend disabling security protections.
- Do not suggest risky changes to live websites.

If the customer asks for professional assistance:
- Stop troubleshooting immediately.
- Respect their preference.
- Tell them SiteSidekick can prepare a support request.
- Do not recommend competing providers or invent pricing.

For checkout, payment, security, or critical server issues:
- Recommend professional assistance rather than DIY fixes.

Keep responses concise, warm, and professional.
`;

app.get('/api/health', (req, res) => {
  const usage = readUsage();

  res.json({
    status: 'ok',
    service: 'SiteSidekick AI Backend',
    configured: Boolean(process.env.META_API_KEY),
    aiEnabled: AI_ENABLED,
    sessionRequests,
    sessionLimit: MAX_SESSION_REQUESTS,
    dailyRequests: usage.requests,
    dailyLimit: MAX_DAILY_REQUESTS
  });
});

app.post('/api/chat', async (req, res) => {
  // AI is disabled unless explicitly enabled in .env.
  if (!AI_ENABLED) {
    return res.status(503).json({
      error: 'Live AI is disabled to protect your API credits.'
    });
  }

  if (!process.env.META_API_KEY) {
    return res.status(503).json({
      error: 'Meta API key is not configured.'
    });
  }

  if (requestInProgress) {
    return res.status(429).json({
      error: 'An AI request is already in progress.'
    });
  }

  if (sessionRequests >= MAX_SESSION_REQUESTS) {
    return res.status(429).json({
      error: 'Session AI request limit reached.'
    });
  }

  const { messages } = req.body ?? {};

  if (
    !Array.isArray(messages) ||
    messages.length === 0 ||
    messages.length > 30 ||
    !messages.every(
      message =>
        message &&
        ['user', 'assistant'].includes(message.role) &&
        typeof message.content === 'string' &&
        message.content.length <= 4000
    )
  ) {
    return res.status(400).json({
      error: 'Invalid conversation messages.'
    });
  }

  // Check daily usage before making any Meta API request.
  const usage = readUsage();

  if (usage.requests >= MAX_DAILY_REQUESTS) {
    return res.status(429).json({
      error: 'Daily AI request limit reached.'
    });
  }

  // Reserve a request before contacting Meta.
  // A failed request may still incur API usage.
  requestInProgress = true;

  try {
    saveUsage({
      date: todayUTC(),
      requests: usage.requests + 1
    });

    sessionRequests += 1;
  } catch (error) {
    requestInProgress = false;
    console.error('Unable to save API usage:', error.message);

    return res.status(503).json({
      error: 'Usage tracking unavailable. AI request blocked for safety.'
    });
  }

  try {
    const response = await fetch(
      'https://api.meta.ai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.META_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: process.env.META_MODEL,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages
          ],
          temperature: 0.3,
          max_tokens: MAX_OUTPUT_TOKENS
        }),
        signal: AbortSignal.timeout(30000)
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Meta API request failed:', response.status);

      return res.status(502).json({
        error: 'Meta AI could not complete the request.'
      });
    }

    const reply = data.choices?.[0]?.message?.content;

    if (typeof reply !== 'string' || !reply.trim()) {
      return res.status(502).json({
        error: 'Meta AI returned an unexpected response.'
      });
    }

    res.json({ reply });
  } catch (error) {
    console.error('Meta connection error:', error.message);

    res.status(502).json({
      error: 'Unable to connect to Meta AI right now.'
    });
  } finally {
    requestInProgress = false;
  }
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`SiteSidekick backend running at http://localhost:${PORT}`);
  console.log(
    `Live Meta AI: ${AI_ENABLED ? 'ENABLED' : 'DISABLED'}`
  );
});
