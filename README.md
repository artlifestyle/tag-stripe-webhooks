# TAG Arts Guild – Stripe Webhook Automation

This repository contains the webhook service that automatically cancels weekly Stripe subscriptions after the correct number of successful payments. It is designed for TAG Arts Guild’s course payment system, where students may pay weekly for a fixed number of weeks.

## What this service does

- Listens for `invoice.payment_succeeded` events from Stripe.
- Reads `course_length_weeks` from the subscription metadata.
- Counts how many successful payments have been made.
- Automatically schedules the subscription to cancel when the number of successful payments matches the course length.

This allows TAG Arts Guild to offer weekly payment plans without manually canceling subscriptions or requiring custom checkout flows.

## Files in this repository

- `server.js` — Main webhook handler logic.
- `package.json` — Node.js project configuration and dependencies.
- `.gitignore` — Prevents committing unnecessary files.
- `README.md` — Documentation for setup and deployment.

## Environment Variables (required)

Set these in Render:

- `STRIPE_SECRET_KEY` — Your Stripe API secret key.
- `STRIPE_WEBHOOK_SECRET` — The webhook signing secret from Stripe.

## Deployment Instructions (Render)

1. Push this repository to GitHub.
2. In Render, create a new **Web Service**.
3. Connect this repository.
4. Set environment variables:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
5. Deploy the service.
6. Render will provide a public URL (e.g., `https://tag-webhooks.onrender.com/stripe`).
7. Add this URL as a webhook endpoint in Stripe:
   - Stripe Dashboard → Developers → Webhooks → Add endpoint
   - Event: `invoice.payment_succeeded`

## Metadata Requirements

Each Stripe subscription created via a payment link must include:

- `course_length_weeks` — The number of weekly payments required.

Example:

