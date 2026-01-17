# dream-membership-basic

Membership/paywall template powered by Dream API. Auth, billing, and content gating included.

## Quick Start

```bash
npm install
cp .env.example .env.local
# Add your publishable key to .env.local
npm run dev
```

Your membership site now has:
- User authentication (sign up, sign in, sign out)
- Stripe billing (subscriptions, payment portal)
- Content gating (free vs paid access)
- Auto-checkout (new signups go straight to Stripe)

## How It Works

1. User clicks "Start Free Trial" → signs up → automatically goes to Stripe checkout
2. After payment → lands on Dashboard with full access
3. Content is gated by plan - paid users see content, free users see upgrade prompt

**That's it.** The checkout flow is handled for you.

## Testing with Clerk Test Mode

Skip email verification during development:

| Type | Value |
|------|-------|
| Test Email | Any email with `+clerk_test` (e.g., `you+clerk_test@gmail.com`) |
| Verification Code | `424242` |
| Test Phone | `+15555550100` to `+15555550199` |

**Example:** Sign up with `dev+clerk_test@example.com`, enter any password, use code `424242`. No real email sent.

## Customization

Run `/setup` for a guided walkthrough, or edit `src/config.ts` directly:

- `appName` - Your membership site name
- `theme` - 'light' or 'dark'
- `accentColor` - emerald, sky, violet, rose, amber, zinc
- `logo` - Path to logo in public/ folder
- `hero` - Landing page headline
- `memberContent` - Content cards for paid members
- `testimonials` - Social proof
- `faq` - FAQ items

## Content Gating

In Dashboard.tsx, content is gated like this:

```tsx
const plan = user?.plan || 'free';
const hasPaidAccess = plan !== 'free';

{hasPaidAccess ? <YourContent /> : <UpgradePrompt />}
```

Replace the demo content cards with your actual content - videos, downloads, courses, etc.

## Commands

- `/setup` - AI-guided branding wizard
- `/pwa` - Add installable app support

## SDK Reference

```typescript
const { api, isReady, isSignedIn, user, signOut } = useDreamAPI();

// User info
user?.email
user?.plan  // 'free', 'pro', etc.

// Auth URLs
dreamAPI.auth.getSignUpUrl({ redirect: '/choose-plan' })
dreamAPI.auth.getSignInUrl({ redirect: '/dashboard' })
dreamAPI.auth.getCustomerPortalUrl()  // Account settings

// Billing
api.billing.createCheckout({ tier, priceId, successUrl, cancelUrl })
api.billing.openPortal({ returnUrl })  // Stripe billing portal
```

## File Structure

```
src/
├── config.ts              # EDIT THIS - all branding + content
├── pages/
│   ├── Landing.tsx        # Public homepage
│   ├── ChoosePlanPage.tsx # Handles checkout (don't modify)
│   └── Dashboard.tsx      # Member area - add your content here
├── components/
│   ├── Nav.tsx            # Shared nav
│   └── Icons.tsx          # Feature icons
└── hooks/
    └── useDreamAPI.tsx    # SDK integration (don't modify)
```

## Don't Modify

- `src/hooks/useDreamAPI.tsx` - SDK is wired up
- `src/pages/ChoosePlanPage.tsx` - Checkout flow is handled
- Auth flow - Don't build custom sign-up forms

## Deployment

```bash
npm run build
```

Deploy `dist/` to Cloudflare Pages, Vercel, or Netlify.

Set `VITE_DREAM_PUBLISHABLE_KEY` as environment variable.
