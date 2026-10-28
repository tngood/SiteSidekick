
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3001;

app.use(express.json({ limit: '20kb' }));

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
  res.json({
    status: 'ok',
    service: 'SiteSidekick AI Backend',
    configured: Boolean(process.env.META_API_KEY)
  });
});

app.post('/api/chat', async (req, res) => {
  if (!process.env.META_API_KEY) {
    return res.status(503).json({
      error: 'Meta API key is not configured.'
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
          max_tokens: 500
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
  }
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`SiteSidekick backend running at http://localhost:${PORT}`);
});
