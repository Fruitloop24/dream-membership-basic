# Dream SaaS Template

Auth, billing, and usage tracking. One key setup.

## Quick Start

```bash
npm install
```

Create `.env.local`:
```
VITE_DREAM_PUBLISHABLE_KEY=pk_test_xxx
```

```bash
npm run dev
```

Open http://localhost:5173

## AI Setup

Using Claude Code, Cursor, or Windsurf? Run:

```
/setup
```

The AI will walk you through configuration.

## What's Included

- Sign up / Sign in / Sign out
- User profile & account settings
- Subscription billing (Stripe)
- Usage tracking with plan limits
- Pricing page (pulls from dashboard)
- Landing page with config-based branding
- Light/dark theme toggle

## What You Need

1. Dream API account
2. Project created in dashboard
3. Tiers configured (prices, limits)
4. Publishable key

That's it. No Clerk account. No Stripe setup. Just your key.

## Customize

Edit `src/config.ts` for all branding:
- App name, tagline
- Theme (light/dark)
- Accent color
- Hero content
- Features
- FAQ

## Docs

See [CLAUDE.md](./CLAUDE.md) for full documentation.

## Deploy

```bash
npm run build
```

Deploy `dist/` to Cloudflare Pages, Vercel, or Netlify.

Set `VITE_DREAM_PUBLISHABLE_KEY` as environment variable.
