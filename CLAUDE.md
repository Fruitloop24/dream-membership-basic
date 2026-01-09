# dream-membership-basic

Membership/paywall template powered by Dream API. Auth, billing, and content gating included.

## IMPORTANT - How This Works

**Dashboard First:** Before using this template, set up your project in the Dream API dashboard:
1. Create a project (SaaS type)
2. Configure your tiers (free, paid membership)
3. Get your publishable key

**The template pulls tiers from your dashboard.** Change prices anytime - app updates automatically.

**Simpler than SaaS:** No usage tracking needed. Just check if user has a paid plan and show/hide content.

## Quick Start

```bash
npm install
cp .env.example .env.local
# Add your publishable key to .env.local
npm run dev
```

**That's it.** Your membership site now has:
- User authentication (sign up, sign in, sign out)
- Stripe billing (subscriptions, payment portal)
- Content gating (free vs paid access)
- Pricing page (pulls from your dashboard)

Go check it out at **http://localhost:5173** - click around, try signing up. It all works. **Then come back here** - that was just the foundation.

## Let's Customize This Thing

**Now I can customize almost anything for you:**
- Brand name, colors, theme (dark/light)
- Headlines, copy, and messaging for YOUR niche
- Testimonials with your real member quotes
- Feature lists and pricing descriptions
- Hero images, logos, custom sections
- Layouts, spacing, styling tweaks
- Videos, embeds, custom components

**Just tell me what you're building.** "I run a fitness membership" or "Make it feel more premium" - I'll rewrite the copy, pick the right icons, adjust the styling.

Run `/setup` for a guided walkthrough, or just start asking me to change things. This is where it gets fun.

## File Structure

```
src/
├── config.ts              # EDIT THIS - branding + member content
├── App.tsx                # Router
├── components/
│   ├── Nav.tsx            # Shared nav with profile dropdown
│   └── Icons.tsx          # Feature icons
├── hooks/
│   └── useDreamAPI.tsx    # SDK integration (DON'T MODIFY)
└── pages/
    ├── Landing.tsx        # Homepage (uses config.ts)
    ├── Dashboard.tsx      # Member area with content gating
    └── ChoosePlanPage.tsx # Plan selection
```

## What To Customize

### src/config.ts (MAIN FILE)

All branding and content is here:
- `appName` - Your membership site name
- `theme` - 'light' or 'dark'
- `accentColor` - emerald, sky, violet, rose, amber, zinc
- `logo` - Path to logo in public/ folder
- `hero` - Headline, subheadline for landing page
- `memberContent` - Content cards shown to members
- `upgrade` - Upgrade prompt for free users

### Dashboard.tsx - YOUR CONTENT GOES HERE

The dashboard has content gating built in:

```tsx
const hasPaidAccess = plan !== 'free';

{hasPaidAccess ? (
  // PAID: Show your actual content
  <VideoPlayer />
  <DownloadButton />
  <CommunityLink />
) : (
  // FREE: Show locked preview + upgrade CTA
  <LockedContentPreview />
  <UpgradeCTA />
)}
```

**To add your content:**

1. Open `src/config.ts`
2. Edit `memberContent` array with your content items:
```typescript
memberContent: [
  {
    title: 'Video Course',
    description: 'Full access to all lessons',
    icon: 'play',
    cta: 'Watch Now',
  },
  // Add more items...
],
```

3. Edit `upgrade` section for your free-user messaging:
```typescript
upgrade: {
  headline: 'Unlock Full Access',
  description: 'Get instant access to everything',
  benefits: ['Benefit 1', 'Benefit 2', 'Benefit 3'],
  cta: 'Become a Member',
  subtext: 'Cancel anytime',
},
```

4. In Dashboard.tsx, replace the demo content cards with your actual content (videos, downloads, links, etc.)

## Content Gating Pattern

The key pattern is simple:

```tsx
const { user } = useDreamAPI();
const plan = user?.plan || 'free';
const hasPaidAccess = plan !== 'free';

// Gate content
{hasPaidAccess ? <FullContent /> : <LockedPreview />}
```

**NO usage tracking needed.** Unlike SaaS templates, you don't call `api.usage.track()`.
Just check the plan and show/hide content.

## Use Cases

- Online courses
- Exclusive articles/newsletters
- Downloadable resources
- Private communities
- Premium tools
- Coaching content
- Video libraries

## What NOT To Modify

1. **`src/hooks/useDreamAPI.tsx`** - Auth is handled, don't touch
2. **Auth flow** - Don't build custom sign-up/sign-in forms
3. **Pricing display** - Comes from API, don't hardcode

## SDK Reference

```typescript
const { api, isReady, isSignedIn, user, signOut } = useDreamAPI();

// User info
user?.email
user?.plan  // 'free', 'pro', etc.

// Billing
await api.billing.createCheckout({ tier: 'pro' })
await api.billing.openPortal({ returnUrl: '/dashboard' })

// Auth URLs
dreamAPI.auth.getSignUpUrl({ redirect: '/dashboard' })
dreamAPI.auth.getSignInUrl({ redirect: '/dashboard' })
dreamAPI.auth.getCustomerPortalUrl()  // Account settings
```

## Deployment

```bash
npm run build
```

Deploy `dist/` anywhere:
- **Cloudflare Pages**: `npx wrangler pages deploy dist`
- **Vercel/Netlify**: Connect repo, set VITE_DREAM_PUBLISHABLE_KEY env var

## What You Control in Dashboard vs Template

| In Dashboard | In Template |
|--------------|-------------|
| Tier names, prices | Branding, colors |
| Features per tier | Member content |
| Customer list | Upgrade messaging |
| Revenue metrics | Landing page |

**Change prices in dashboard -> App updates automatically.**

## Don't Do These Things

- Don't hardcode prices (they come from API)
- Don't put secret key in frontend (only PK)
- Don't modify useDreamAPI.tsx
- Don't build custom auth UI
- Don't track usage (not needed for memberships)
