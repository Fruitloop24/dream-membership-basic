/**
 * MEMBERSHIP DASHBOARD - Gated content area
 *
 * Shows content based on user's plan:
 * - Free: Teaser + upgrade prompt
 * - Paid: Full content access
 */

import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDreamAPI, dreamAPI } from '../hooks/useDreamAPI';
import { CONFIG, getAccentClasses, getThemeClasses } from '../config';
import Nav from '../components/Nav';
import Icon from '../components/Icons';

export default function Dashboard() {
  const { api, isReady, user, refreshUser } = useDreamAPI();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [searchParams] = useSearchParams();
  const successHandled = useRef(false);
  const checkoutStarted = useRef(false);

  const accent = getAccentClasses();
  const theme = getThemeClasses();
  const plan = user?.plan || 'free';
  const hasPaidAccess = plan !== 'free';

  // Handle success redirect from Stripe
  useEffect(() => {
    const success = searchParams.get('success');
    if (success === 'true' && !successHandled.current) {
      successHandled.current = true;
      setMessage('Welcome! You now have full access.');
      window.history.replaceState({}, '', '/dashboard');
      setTimeout(() => refreshUser(), 1500);
      setTimeout(() => setMessage(''), 5000);
    }
  }, [searchParams, refreshUser]);

  // AUTO-CHECKOUT: Free users go straight to Stripe (with trial if configured)
  useEffect(() => {
    async function handleAutoCheckout() {
      if (!isReady || !user) return;
      if (plan !== 'free') return; // Already paid
      if (searchParams.get('success')) return; // Just paid, waiting for webhook
      if (searchParams.get('canceled')) return; // User canceled, show content
      if (checkoutStarted.current) return;

      checkoutStarted.current = true;

      try {
        // Fetch tiers to get the paid tier info
        const res = await dreamAPI.products.listTiers();
        const paidTier = res.tiers?.find(t => t.price > 0);

        if (!paidTier) {
          console.error('No paid tier found');
          return;
        }

        // Create checkout (trial days come from tier config in dashboard)
        const result = await api.billing.createCheckout({
          tier: paidTier.name,
          priceId: paidTier.priceId,
          successUrl: window.location.origin + '/dashboard?success=true',
          cancelUrl: window.location.origin + '/dashboard?canceled=true',
        });

        if (result.url) {
          window.location.href = result.url;
        }
      } catch (err) {
        console.error('Auto-checkout error:', err);
        checkoutStarted.current = false; // Allow retry
      }
    }

    handleAutoCheckout();
  }, [isReady, user, plan, api, searchParams]);

  return (
    <div className={`min-h-screen ${theme.pageBg}`}>
      <Nav />

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className={`text-2xl font-light ${theme.heading} mb-1`}>
              {hasPaidAccess ? 'Your Content' : 'Member Area'}
            </h1>
            <p className={theme.body}>
              {hasPaidAccess
                ? `Welcome back, ${user?.email}`
                : 'Upgrade to unlock all content'}
            </p>
          </div>
          {hasPaidAccess && (
            <div className="flex gap-3">
              <span className={`px-3 py-1.5 text-sm font-medium rounded-lg ${accent.bg} text-white`}>
                {plan.toUpperCase()} MEMBER
              </span>
              <button
                onClick={async () => {
                  const result = await api.billing.openPortal({ returnUrl: window.location.href });
                  if (result.url) window.location.href = result.url;
                }}
                className={`px-4 py-2 text-sm font-medium rounded-lg ${theme.buttonSecondary} transition-colors`}
              >
                Manage Billing
              </button>
            </div>
          )}
        </div>

        {/* Success Message */}
        {message && (
          <div className="mb-6 px-4 py-3 rounded-lg text-sm bg-emerald-950/50 border border-emerald-900 text-emerald-400">
            {message}
          </div>
        )}

        {/* ================================================================
            YOUR CONTENT GOES HERE
            ================================================================

            This template gates content based on user's plan:
            - Free users see: Teaser content + upgrade prompt
            - Paid users see: Full content

            PATTERN:
            {hasPaidAccess ? (
              <YourActualContent />
            ) : (
              <UpgradePrompt />
            )}

            EXAMPLES OF WHAT TO PUT HERE:
            - Video courses
            - Downloadable files (PDFs, templates, assets)
            - Exclusive articles
            - Member-only tools
            - Community access links
            - Coaching content

            NO USAGE TRACKING NEEDED - just check hasPaidAccess.
            The content below is a demo. Replace it with your stuff.
            ================================================================ */}

        {hasPaidAccess ? (
          /* ===== PAID CONTENT - Replace with your actual content ===== */
          <div className="space-y-6">
            {/* Content Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CONFIG.memberContent.map((item, i) => (
                <div key={i} className={`${theme.cardBg} rounded-xl p-6 ${theme.cardHover} transition-all cursor-pointer`}>
                  <div className={`w-12 h-12 rounded-xl ${accent.bgLight} ${accent.text} flex items-center justify-center mb-4`}>
                    <Icon name={item.icon || 'check'} className="w-6 h-6" />
                  </div>
                  <h3 className={`text-lg font-medium mb-2 ${theme.heading}`}>{item.title}</h3>
                  <p className={`${theme.body} text-sm mb-4`}>{item.description}</p>
                  <span className={`text-sm font-medium ${accent.text}`}>
                    {item.cta || 'Access Now'} →
                  </span>
                </div>
              ))}
            </div>

            {/* Featured Content Area */}
            <div className={`${theme.cardBg} rounded-xl p-8`}>
              <h2 className={`text-xl font-medium ${theme.heading} mb-2`}>Featured Content</h2>
              <p className={`${theme.body} mb-6`}>
                Replace this with your main content - videos, downloads, articles, etc.
              </p>
              <div className={`${theme.sectionAltBg} rounded-xl p-12 text-center`}>
                <div className="text-5xl mb-4">🎬</div>
                <p className={`${theme.heading} font-medium mb-2`}>Your Content Here</p>
                <p className={theme.muted}>Video player, download button, article, etc.</p>
              </div>
            </div>
          </div>
        ) : (
          /* ===== FREE/LOCKED VIEW - Teaser + upgrade prompt ===== */
          <div className="space-y-8">
            {/* Locked Content Preview */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CONFIG.memberContent.map((item, i) => (
                <div key={i} className={`${theme.cardBg} rounded-xl p-6 relative overflow-hidden`}>
                  {/* Blur/Lock overlay */}
                  <div className="absolute inset-0 backdrop-blur-[2px] bg-black/40 flex items-center justify-center z-10">
                    <div className={`px-4 py-2 rounded-full ${theme.cardBg} ${theme.heading} text-sm font-medium flex items-center gap-2 shadow-lg`}>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      Members Only
                    </div>
                  </div>
                  {/* Content preview (blurred) */}
                  <div className={`w-12 h-12 rounded-xl ${theme.progressBg} flex items-center justify-center mb-4`}>
                    <Icon name={item.icon || 'check'} className={`w-6 h-6 ${theme.muted}`} />
                  </div>
                  <h3 className={`text-lg font-medium mb-2 ${theme.heading}`}>{item.title}</h3>
                  <p className={`${theme.body} text-sm`}>{item.description}</p>
                </div>
              ))}
            </div>

            {/* Big Upgrade CTA */}
            <div className={`${theme.cardBg} rounded-2xl p-10 text-center`}>
              <div className={`w-20 h-20 rounded-2xl ${accent.bgLight} ${accent.text} flex items-center justify-center mx-auto mb-6`}>
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>

              <h2 className={`text-3xl font-medium ${theme.heading} mb-3`}>
                {CONFIG.upgrade.headline}
              </h2>
              <p className={`${theme.body} mb-8 max-w-lg mx-auto text-lg`}>
                {CONFIG.upgrade.description}
              </p>

              {/* Benefits List */}
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-8">
                {CONFIG.upgrade.benefits.map((benefit, i) => (
                  <div key={i} className={`flex items-center gap-2 ${theme.heading}`}>
                    <svg className={`w-5 h-5 ${accent.text}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {benefit}
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate('/choose-plan')}
                className={`px-10 py-4 text-lg font-medium rounded-xl ${accent.bg} text-white ${accent.bgHover} transition-all shadow-lg hover:shadow-xl`}
              >
                {CONFIG.upgrade.cta}
              </button>

              <p className={`mt-4 text-sm ${theme.muted}`}>
                {CONFIG.upgrade.subtext}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
