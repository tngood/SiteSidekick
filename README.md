
# SiteSidekick

**Website troubleshooting without the guesswork.**

Developed by TB Designs | AI assistance powered by Meta Muse Wonder

## Overview

SiteSidekick is an AI-assisted website troubleshooting companion designed for small business owners.

It helps users understand website problems, explore possible causes, and determine practical next steps without requiring coding experience.

Built for the Meta Global AI Developer Hackathon 2026.

## The Problem

Small business owners often encounter website problems without knowing where to begin.

A broken mobile layout, slow-loading page, or unexpected error can interrupt business operations and create unnecessary frustration.

Hiring a developer for every minor issue may not be practical.

## The Solution

SiteSidekick guides users through a structured troubleshooting process.

Users can investigate issues independently, receive optional AI assistance, review previous sessions, and prepare organized information for a developer or hosting provider.

SiteSidekick does not automatically modify website code or claim to provide confirmed technical diagnoses.

## Features

### Guided Troubleshooting

- Describe website problems in everyday language.
- Explore possible causes.
- Receive practical next steps.
- Follow a noncoding troubleshooting workflow.

### Meta Muse Wonder AI

- Optional contextual AI assistance.
- Uses the Meta Model API.
- Requires user consent before requesting assistance.
- Provides explanations and possible next steps.
- Distinguishes suggestions from confirmed diagnoses.

### Issue History

- Save and review troubleshooting sessions.
- Return to previous issues.

### Developer Handoff

- Generate structured troubleshooting information.
- Prepare reports for developers or hosting providers.

### Business Starting Guide

- Explore whether a business needs a website.
- Consider social media and customer communication.
- Understand when online booking or ecommerce may help.
- Identify practical digital priorities.

### Additional Features

- Responsive interface.
- Accessibility-conscious design.
- Privacy and AI disclosures.
- Subscription concept preview.

## Meta AI Integration

SiteSidekick uses Meta Muse Wonder through the Meta Model API.

The application collects troubleshooting context through its guided workflow. When the user explicitly requests AI assistance, relevant context is sent through the Node.js backend.

The backend includes safeguards to help control API usage.

Configured limits:

- 5 AI requests per server session.
- 10 AI requests per UTC day.
- 2,000 maximum output tokens per response.
- AI requests disabled unless explicitly enabled through configuration.

These are application-level safeguards, not guaranteed billing limits.

## Technology Stack

- HTML5
- CSS3
- JavaScript
- Vite
- Node.js
- Express
- Meta Model API
- Meta Muse Wonder

## Local Installation

### Requirements

- Node.js and npm
- Meta Model API credentials for optional AI functionality

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```dotenv
META_API_KEY=your_meta_api_key_here
AI_ENABLED=false
```

Keep `AI_ENABLED=false` if you want to run the application without live AI requests.

To enable AI assistance, set `AI_ENABLED=true` and restart the backend.

**Warning:** Enabling AI can result in API usage and potential charges. Review your Meta billing settings and available credits before enabling it.

Never commit your `.env` file or actual API credentials.

### 3. Start the backend

In one terminal:

```bash
node server.js
```

The backend runs at:

http://localhost:3001

### 4. Start the frontend

In a separate terminal:

```bash
npm run dev
```

Open the local URL displayed by Vite, typically:

http://localhost:5173

### 5. Build for production

```bash
npm run build
```

To preview the production frontend locally:

```bash
npm run preview
```

The production preview does not automatically deploy the backend.

## Hackathon Development

SiteSidekick was developed for the Meta Global AI Developer Hackathon 2026.

The hackathon implementation includes:

- Website troubleshooting interface and guided workflow.
- Meta Muse Wonder integration.
- Optional AI consent and assistance interface.
- Issue history.
- Developer handoff functionality.
- Business Starting Guide.
- Legal and privacy information.
- Subscription concept preview.

The application is a working prototype. Commercial subscription processing and expanded digital marketing services are future development goals.

## Future Roadmap

- Expanded digital presence guidance.
- SEO and digital marketing assistance.
- Social media and online business support.
- Small-agency workflows.
- Account and subscription management.
- Additional business troubleshooting capabilities.

## Security and Limitations

SiteSidekick provides general informational guidance.

AI-generated content may be inaccurate and should not be treated as a verified technical diagnosis.

Do not submit passwords, API keys, payment information, or other sensitive data.

The backend currently binds to localhost and requires additional deployment configuration before public hosting.

## Developer

TB Designs

Portfolio: https://tabathabierie.com

Developed independently for the Meta Global AI Developer Hackathon 2026.

SiteSidekick is not affiliated with or endorsed by Meta.
