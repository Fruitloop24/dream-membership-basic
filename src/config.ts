/**
 * ============================================================================
 * MEMBERSHIP SITE CONFIGURATION - Edit this file to customize your site
 * ============================================================================
 *
 * This is the ONLY file you need to edit for branding.
 * All pages import from here. Run /setup to customize with AI assistance.
 */

export const CONFIG = {
  // -------------------------------------------------------------------------
  // BRAND
  // -------------------------------------------------------------------------
  appName: 'My Membership',
  tagline: 'Exclusive content for members',

  // Logo: place file in public/ folder, or set to null for text-only
  logo: null as string | null, // e.g., '/logo.png'

  // Theme: 'light' (professional, clean) or 'dark' (modern, bold)
  theme: 'light' as 'light' | 'dark',

  // Primary accent color
  // Options: 'emerald', 'sky', 'violet', 'rose', 'amber', 'zinc'
  accentColor: 'violet',

  // -------------------------------------------------------------------------
  // HERO SECTION
  // -------------------------------------------------------------------------
  hero: {
    headline: 'Unlock Your Full Potential',
    subheadline: 'Join thousands of members getting exclusive access to premium content, expert guidance, and a supportive community.',
    cta: 'Join Now',
    ctaSubtext: 'Start free, upgrade anytime',
    // Hero image: place in public/, or null for no image
    image: null as string | null, // e.g., '/hero-mockup.png'
  },

  // -------------------------------------------------------------------------
  // SOCIAL PROOF (logo bar)
  // -------------------------------------------------------------------------
  socialProof: {
    enabled: false,
    headline: 'Featured in',
    logos: [] as Array<{ name: string; src: string }>,
  },

  // -------------------------------------------------------------------------
  // TESTIMONIALS - Member success stories
  // -------------------------------------------------------------------------
  testimonials: {
    enabled: true,
    headline: 'What Members Are Saying',
    subheadline: 'Join a community of people transforming their lives',
    items: [
      {
        quote: 'This membership has completely changed how I approach my work. The resources are incredible.',
        name: 'Sarah M.',
        role: 'Designer',
      },
      {
        quote: 'Worth every penny. The community alone is invaluable, and the content keeps getting better.',
        name: 'James K.',
        role: 'Entrepreneur',
      },
      {
        quote: 'I was skeptical at first, but within a week I knew this was exactly what I needed.',
        name: 'Maria L.',
        role: 'Freelancer',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // HOW IT WORKS (3 steps)
  // -------------------------------------------------------------------------
  howItWorks: {
    headline: 'Get Started in Minutes',
    subheadline: 'Three simple steps to full access',
    steps: [
      {
        number: '1',
        title: 'Create Account',
        description: 'Sign up free and explore what\'s available.',
        icon: 'user',
      },
      {
        number: '2',
        title: 'Choose Your Plan',
        description: 'Pick the membership level that fits your goals.',
        icon: 'star',
      },
      {
        number: '3',
        title: 'Access Everything',
        description: 'Instantly unlock all content and resources.',
        icon: 'rocket',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // FEATURES - What Members Get
  // -------------------------------------------------------------------------
  features: {
    headline: 'What You Get Inside',
    subheadline: 'Everything you need to succeed, all in one place',
    items: [
      {
        title: 'Video Library',
        description: 'Hours of exclusive tutorials and training content.',
        icon: 'play',
      },
      {
        title: 'Downloads & Templates',
        description: 'Ready-to-use resources you can start using today.',
        icon: 'download',
      },
      {
        title: 'Private Community',
        description: 'Connect with fellow members and get support.',
        icon: 'users',
      },
      {
        title: 'Live Workshops',
        description: 'Monthly sessions with Q&A and hands-on training.',
        icon: 'calendar',
      },
      {
        title: 'Weekly Updates',
        description: 'New content added regularly to keep you growing.',
        icon: 'lightning',
      },
      {
        title: 'Direct Support',
        description: 'Get answers to your questions from experts.',
        icon: 'shield',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // PRICING SECTION (tiers come from API)
  // -------------------------------------------------------------------------
  pricing: {
    headline: 'Simple Pricing',
    subheadline: 'Start free, upgrade when you need more',
  },

  // -------------------------------------------------------------------------
  // FAQ
  // -------------------------------------------------------------------------
  faq: {
    headline: 'Frequently Asked Questions',
    items: [
      {
        question: 'What do I get with my membership?',
        answer: 'Full access to our video library, downloadable resources, private community, and monthly live workshops. New content is added weekly.',
      },
      {
        question: 'Can I try before I buy?',
        answer: 'Yes! Create a free account to explore preview content and see if the membership is right for you.',
      },
      {
        question: 'Can I cancel anytime?',
        answer: 'Absolutely. Cancel your membership anytime with no questions asked. You\'ll keep access until the end of your billing period.',
      },
      {
        question: 'How often is new content added?',
        answer: 'We add new videos, resources, and materials every week. Plus monthly live workshops with Q&A sessions.',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // FINAL CTA
  // -------------------------------------------------------------------------
  finalCta: {
    headline: 'Ready to unlock your full potential?',
    subheadline: 'Join thousands of members already inside.',
    cta: 'Join Now',
  },

  // -------------------------------------------------------------------------
  // FOOTER
  // -------------------------------------------------------------------------
  footer: {
    links: [] as Array<{ label: string; href: string }>,
    // Example:
    // links: [
    //   { label: 'Privacy', href: '/privacy' },
    //   { label: 'Terms', href: '/terms' },
    // ],
  },

  // -------------------------------------------------------------------------
  // MEMBER CONTENT (shown in dashboard for paid users)
  // -------------------------------------------------------------------------
  memberContent: [
    {
      title: 'Getting Started Guide',
      description: 'Complete walkthrough to help you get the most out of your membership.',
      icon: 'rocket',
      cta: 'Start Learning',
    },
    {
      title: 'Video Library',
      description: 'Hours of exclusive video content covering advanced topics.',
      icon: 'play',
      cta: 'Watch Now',
    },
    {
      title: 'Templates & Downloads',
      description: 'Ready-to-use templates, checklists, and resources.',
      icon: 'download',
      cta: 'Download',
    },
    {
      title: 'Private Community',
      description: 'Connect with other members and get support.',
      icon: 'users',
      cta: 'Join Discussion',
    },
    {
      title: 'Monthly Workshops',
      description: 'Live sessions with Q&A and hands-on exercises.',
      icon: 'calendar',
      cta: 'View Schedule',
    },
    {
      title: 'Bonus Materials',
      description: 'Extra resources, case studies, and insider tips.',
      icon: 'star',
      cta: 'Explore',
    },
  ] as Array<{ title: string; description: string; icon: string; cta?: string }>,

  // -------------------------------------------------------------------------
  // UPGRADE PROMPT (shown to free users)
  // -------------------------------------------------------------------------
  upgrade: {
    headline: 'Unlock Full Access',
    description: 'Get instant access to all content, resources, and community features with a membership.',
    benefits: [
      'All video content',
      'Downloadable resources',
      'Private community',
      'Monthly workshops',
    ],
    cta: 'Become a Member',
    subtext: 'Cancel anytime. No commitments.',
  },
};

// ============================================================================
// COLOR UTILITIES - Don't modify below
// ============================================================================

const ACCENT_COLORS = {
  emerald: {
    bg: 'bg-emerald-600',
    bgHover: 'hover:bg-emerald-500',
    bgLight: 'bg-emerald-500/10',
    text: 'text-emerald-600',
    textHover: 'hover:text-emerald-500',
    border: 'border-emerald-600',
    hex: '#059669',
  },
  sky: {
    bg: 'bg-sky-600',
    bgHover: 'hover:bg-sky-500',
    bgLight: 'bg-sky-500/10',
    text: 'text-sky-600',
    textHover: 'hover:text-sky-500',
    border: 'border-sky-600',
    hex: '#0284c7',
  },
  violet: {
    bg: 'bg-violet-600',
    bgHover: 'hover:bg-violet-500',
    bgLight: 'bg-violet-500/10',
    text: 'text-violet-600',
    textHover: 'hover:text-violet-500',
    border: 'border-violet-600',
    hex: '#7c3aed',
  },
  rose: {
    bg: 'bg-rose-600',
    bgHover: 'hover:bg-rose-500',
    bgLight: 'bg-rose-500/10',
    text: 'text-rose-600',
    textHover: 'hover:text-rose-500',
    border: 'border-rose-600',
    hex: '#e11d48',
  },
  amber: {
    bg: 'bg-amber-600',
    bgHover: 'hover:bg-amber-500',
    bgLight: 'bg-amber-500/10',
    text: 'text-amber-600',
    textHover: 'hover:text-amber-500',
    border: 'border-amber-600',
    hex: '#d97706',
  },
  zinc: {
    bg: 'bg-zinc-800',
    bgHover: 'hover:bg-zinc-700',
    bgLight: 'bg-zinc-500/10',
    text: 'text-zinc-800',
    textHover: 'hover:text-zinc-700',
    border: 'border-zinc-800',
    hex: '#27272a',
  },
};

export function getAccentClasses() {
  return ACCENT_COLORS[CONFIG.accentColor as keyof typeof ACCENT_COLORS] || ACCENT_COLORS.emerald;
}

export function getAccentHex() {
  return getAccentClasses().hex;
}

// ============================================================================
// THEME UTILITIES
// ============================================================================

const THEMES = {
  light: {
    // Main backgrounds
    pageBg: 'bg-slate-50',
    navBg: 'bg-white border-b border-slate-200',
    cardBg: 'bg-white border border-slate-200',
    sectionAltBg: 'bg-white',
    footerBg: 'bg-slate-100 border-t border-slate-200',
    // Text colors
    heading: 'text-slate-900',
    body: 'text-slate-600',
    muted: 'text-slate-400',
    // Interactive
    cardHover: 'hover:border-slate-300 hover:shadow-md',
    link: 'text-slate-600 hover:text-slate-900',
    // Dropdown (Nav)
    dropdownBg: 'bg-white border border-slate-200',
    dropdownDivider: 'border-slate-200',
    dropdownItem: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100',
    buttonHover: 'hover:bg-slate-100',
    dangerItem: 'text-red-600 hover:text-red-700 hover:bg-red-50',
    progressBg: 'bg-slate-200',
    // Buttons
    buttonDisabled: 'bg-slate-200 text-slate-400',
    buttonSecondary: 'border border-slate-300 text-slate-600 hover:text-slate-900 hover:border-slate-400',
  },
  dark: {
    // Main backgrounds
    pageBg: 'bg-zinc-950',
    navBg: 'bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50',
    cardBg: 'bg-zinc-900/70 border border-zinc-700/50',
    sectionAltBg: 'bg-zinc-900/40',
    footerBg: 'bg-zinc-950 border-t border-zinc-800',
    // Text colors
    heading: 'text-white',
    body: 'text-zinc-300',
    muted: 'text-zinc-500',
    // Interactive
    cardHover: 'hover:border-zinc-700',
    link: 'text-zinc-500 hover:text-zinc-300',
    // Dropdown (Nav)
    dropdownBg: 'bg-zinc-900 border border-zinc-800',
    dropdownDivider: 'border-zinc-800',
    dropdownItem: 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800',
    buttonHover: 'hover:bg-zinc-900',
    dangerItem: 'text-red-400 hover:text-red-300 hover:bg-zinc-800',
    progressBg: 'bg-zinc-800',
    // Buttons
    buttonDisabled: 'bg-zinc-800 text-zinc-500',
    buttonSecondary: 'border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:border-zinc-600',
  },
};

export function getThemeClasses() {
  return THEMES[CONFIG.theme] || THEMES.light;
}
