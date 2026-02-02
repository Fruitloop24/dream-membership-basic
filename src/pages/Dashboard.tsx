/**
 * MEMBERSHIP DASHBOARD
 *
 * Simple content gating:
 * - Free users: See limited content + locked premium + upgrade CTA
 * - Paid users: See all content + manage billing
 */

import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDreamAPI } from '../hooks/useDreamAPI';
import { CONFIG, getAccentClasses, getThemeClasses } from '../config';
import Nav from '../components/Nav';
import Icon from '../components/Icons';

export default function Dashboard() {
  const { api, isReady, user, refreshUser } = useDreamAPI();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [searchParams] = useSearchParams();
  const successHandled = useRef(false);

  const accent = getAccentClasses();
  const theme = getThemeClasses();
  const plan = user?.plan || 'free';
  const hasPaidAccess = plan !== 'free';

  // Handle success redirect from Stripe
  useEffect(() => {
    const success = searchParams.get('success');
    if (success === 'true' && !successHandled.current) {
      successHandled.current = true;
      setMessage('Welcome! Your membership is now active.');
      window.history.replaceState({}, '', '/dashboard');
      setTimeout(() => refreshUser(), 1500);
      setTimeout(() => setMessage(''), 5000);
    }
  }, [searchParams, refreshUser]);

  // Split content: first 2 free, rest premium
  const freeContent = CONFIG.memberContent.slice(0, 2);
  const premiumContent = CONFIG.memberContent.slice(2);

  return (
    <div className={`min-h-screen ${theme.pageBg}`}>
      <Nav />

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className={`text-2xl font-light ${theme.heading} mb-1`}>
              Welcome{user?.email ? `, ${user.email.split('@')[0]}` : ''}!
            </h1>
            <p className={theme.body}>Your personal dashboard</p>
          </div>
          <div className="flex gap-3">
            <span className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
              hasPaidAccess ? `${accent.bg} text-white` : 'bg-zinc-700 text-zinc-300'
            }`}>
              {plan.toUpperCase()}
            </span>
            {hasPaidAccess ? (
              <button
                onClick={async () => {
                  const result = await api.billing.openPortal({ returnUrl: window.location.href });
                  if (result.url) window.location.href = result.url;
                }}
                className={`px-4 py-2 text-sm font-medium rounded-lg ${theme.buttonSecondary} transition-colors`}
              >
                Manage Billing
              </button>
            ) : (
              <button
                onClick={() => navigate('/choose-plan')}
                className={`px-4 py-2 text-sm font-medium rounded-lg ${accent.bg} text-white ${accent.bgHover} transition-colors`}
              >
                Upgrade
              </button>
            )}
          </div>
        </div>

        {/* Success Message */}
        {message && (
          <div className="mb-6 px-4 py-3 rounded-lg text-sm bg-emerald-100 border border-emerald-200 text-emerald-800">
            {message}
          </div>
        )}

        {/* ============================================================ */}
        {/* PAID USER: Full access to all content */}
        {/* ============================================================ */}
        {hasPaidAccess ? (
          <div className="space-y-6">
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

            {/* Featured Content */}
            <div className={`${theme.cardBg} rounded-xl p-8`}>
              <h2 className={`text-xl font-medium ${theme.heading} mb-2`}>Featured Content</h2>
              <p className={`${theme.body} mb-6`}>
                Replace this section with your main content - videos, downloads, articles, etc.
              </p>
              <div className={`${theme.sectionAltBg} rounded-xl p-12 text-center`}>
                <div className="text-5xl mb-4">🎬</div>
                <p className={`${theme.heading} font-medium mb-2`}>Your Content Here</p>
                <p className={theme.muted}>Video player, download button, article, etc.</p>
              </div>
            </div>
          </div>
        ) : (
          /* ============================================================ */
          /* FREE USER: Limited content + locked premium + upgrade CTA */
          /* ============================================================ */
          <div className="space-y-6">
            {/* Free Content - Accessible */}
            <div>
              <h2 className={`text-sm font-medium ${theme.muted} uppercase tracking-wider mb-4`}>
                Your Free Content
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {freeContent.map((item, i) => (
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
            </div>

            {/* Premium Content - Locked */}
            <div>
              <h2 className={`text-sm font-medium ${theme.muted} uppercase tracking-wider mb-4`}>
                Premium Content
                <span className="ml-2 px-2 py-0.5 text-xs bg-amber-500/20 text-amber-400 rounded">
                  Upgrade to Unlock
                </span>
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                {premiumContent.map((item, i) => (
                  <div
                    key={i}
                    className={`${theme.cardBg} rounded-xl p-6 opacity-60 relative overflow-hidden`}
                  >
                    {/* Lock overlay */}
                    <div className="absolute top-4 right-4">
                      <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                        <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                    </div>

                    <div className={`w-12 h-12 rounded-xl bg-zinc-800 text-zinc-500 flex items-center justify-center mb-4`}>
                      <Icon name={item.icon || 'check'} className="w-6 h-6" />
                    </div>
                    <h3 className={`text-lg font-medium mb-2 ${theme.heading}`}>{item.title}</h3>
                    <p className={`${theme.muted} text-sm mb-4`}>{item.description}</p>
                    <span className={`text-sm font-medium text-zinc-600`}>
                      Locked
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upgrade CTA */}
            <div className={`${theme.cardBg} rounded-xl p-8 text-center border-2 border-dashed border-zinc-700`}>
              <div className="max-w-md mx-auto">
                <div className={`w-16 h-16 rounded-full ${accent.bgLight} ${accent.text} flex items-center justify-center mx-auto mb-4`}>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className={`text-xl font-medium ${theme.heading} mb-2`}>
                  {CONFIG.upgrade.headline}
                </h3>
                <p className={`${theme.body} mb-6`}>
                  {CONFIG.upgrade.description}
                </p>
                <ul className="text-left space-y-2 mb-6 max-w-xs mx-auto">
                  {CONFIG.upgrade.benefits.map((benefit, i) => (
                    <li key={i} className={`flex items-center gap-2 ${theme.body} text-sm`}>
                      <svg className={`w-4 h-4 ${accent.text} flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {benefit}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate('/choose-plan')}
                  className={`px-8 py-3 rounded-lg font-medium ${accent.bg} text-white ${accent.bgHover} transition-colors`}
                >
                  {CONFIG.upgrade.cta}
                </button>
                <p className={`${theme.muted} text-xs mt-3`}>
                  {CONFIG.upgrade.subtext}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
