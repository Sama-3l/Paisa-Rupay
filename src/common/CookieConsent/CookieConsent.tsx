'use client';

import React, { useState, useEffect } from 'react';
import styles from './CookieConsent.module.css';
import Link from 'next/link';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    clarity?: {
      (...args: any[]): void;
      q?: any[];
    };
  }
}

interface CookiePreferences {
  analytics: boolean;
  timestamp: string;
  policyVersion: string;
}

const CURRENT_POLICY_VERSION = '2026-06-11';

export default function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [analyticsChecked, setAnalyticsChecked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const savedChoice = localStorage.getItem('cookie-consent-choice');
    const savedPreferences = localStorage.getItem('cookie-consent-preferences');

    if (!savedChoice || !savedPreferences) {
      // No decision made yet
      setIsOpen(true);
    } else {
      try {
        const prefs: CookiePreferences = JSON.parse(savedPreferences);
        // If policy version has changed, we could prompt again, but for now we apply saved prefs
        applyPreferences(prefs.analytics);
      } catch (e) {
        setIsOpen(true);
      }
    }

    const handleOpenSettings = () => {
      const prefsStr = localStorage.getItem('cookie-consent-preferences');
      if (prefsStr) {
        try {
          const prefs: CookiePreferences = JSON.parse(prefsStr);
          setAnalyticsChecked(prefs.analytics);
        } catch (e) {
          setAnalyticsChecked(false);
        }
      }
      setIsCustomizing(true);
      setIsOpen(true);
    };

    window.addEventListener('open-cookie-settings', handleOpenSettings);
    return () => window.removeEventListener('open-cookie-settings', handleOpenSettings);
  }, []);

  const loadClarity = () => {
    const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
    if (!clarityId || clarityId === 'mock_clarity_id') {
      return;
    }
    if (typeof window !== 'undefined' && !window.clarity) {
      window.clarity = window.clarity || function(...args: any[]) {
        (window.clarity!.q = window.clarity!.q || []).push(args);
      };
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.clarity.ms/tag/${clarityId}`;
      const firstScript = document.getElementsByTagName('script')[0];
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript);
      } else {
        document.head.appendChild(script);
      }
    }
  };

  const applyPreferences = (analyticsAllowed: boolean) => {
    if (typeof window === 'undefined') return;

    // Update Google Consent Mode v2
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': analyticsAllowed ? 'granted' : 'denied',
        'ad_storage': analyticsAllowed ? 'granted' : 'denied',
        'ad_user_data': analyticsAllowed ? 'granted' : 'denied',
        'ad_personalization': analyticsAllowed ? 'granted' : 'denied',
      });
    }

    // Load Clarity if allowed
    if (analyticsAllowed) {
      loadClarity();
    }
  };

  const savePreferences = (analyticsAllowed: boolean, choiceType: 'all' | 'rejected' | 'custom') => {
    const prefs: CookiePreferences = {
      analytics: analyticsAllowed,
      timestamp: new Date().toISOString(),
      policyVersion: CURRENT_POLICY_VERSION,
    };

    localStorage.setItem('cookie-consent-choice', choiceType);
    localStorage.setItem('cookie-consent-preferences', JSON.stringify(prefs));

    applyPreferences(analyticsAllowed);
    setIsOpen(false);
    setIsCustomizing(false);
  };

  const handleAcceptAll = () => {
    savePreferences(true, 'all');
  };

  const handleDeclineAll = () => {
    savePreferences(false, 'rejected');
  };

  const handleSaveCustom = () => {
    savePreferences(analyticsChecked, 'custom');
  };

  // Prevent hydration mismatch
  if (!mounted || !isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={() => setIsOpen(false)} />
      <div className={`${styles.container} ${isCustomizing ? styles.expanded : ''}`} role="dialog" aria-labelledby="cookie-title">
        {!isCustomizing ? (
          <div className={styles.bannerView}>
            <div className={styles.textSection}>
              <h3 id="cookie-title" className={styles.title}>Cookie Consent</h3>
              <p className={styles.description}>
                We use cookies to improve your browsing experience, analyze site traffic, and personalize content. 
                By clicking &quot;Accept All&quot;, you consent to our use of cookies. 
                You can manage your preferences or read our{' '}
                <Link href="/legal/privacy-policy" className={styles.policyLink} onClick={() => setIsOpen(false)}>
                  Privacy Policy
                </Link>{' '}
                to learn more.
              </p>
            </div>
            <div className={styles.buttonGroup}>
              <button onClick={handleDeclineAll} className={styles.secondaryButton}>
                Decline
              </button>
              <button onClick={() => setIsCustomizing(true)} className={styles.secondaryButton}>
                Customize
              </button>
              <button onClick={handleAcceptAll} className={styles.primaryButton}>
                Accept All
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.customizeView}>
            <h3 id="cookie-title" className={styles.title}>Manage Cookie Preferences</h3>
            <p className={styles.customizeDesc}>
              Configure which cookies you allow us to set. Necessary cookies are required for the website to run and cannot be disabled.
            </p>

            <div className={styles.categories}>
              <div className={styles.categoryItem}>
                <div className={styles.categoryInfo}>
                  <span className={styles.categoryName}>Strictly Necessary</span>
                  <span className={styles.categoryDesc}>
                    Required for the website layout, security, and basic operations.
                  </span>
                </div>
                <div className={styles.toggleWrapper}>
                  <input
                    type="checkbox"
                    id="necessary-cookies"
                    disabled
                    checked
                    className={styles.hiddenCheckbox}
                  />
                  <label htmlFor="necessary-cookies" className={`${styles.toggleLabel} ${styles.disabledToggle}`} />
                </div>
              </div>

              <div className={styles.categoryItem}>
                <div className={styles.categoryInfo}>
                  <span className={styles.categoryName}>Analytics & Performance</span>
                  <span className={styles.categoryDesc}>
                    Uses Google Analytics and Microsoft Clarity to collect anonymous usage metrics to improve website performance.
                  </span>
                </div>
                <div className={styles.toggleWrapper}>
                  <input
                    type="checkbox"
                    id="analytics-cookies"
                    checked={analyticsChecked}
                    onChange={(e) => setAnalyticsChecked(e.target.checked)}
                    className={styles.hiddenCheckbox}
                  />
                  <label htmlFor="analytics-cookies" className={styles.toggleLabel} />
                </div>
              </div>
            </div>

            <div className={styles.customizeActions}>
              <button onClick={() => setIsCustomizing(false)} className={styles.backButton}>
                <i className="ti ti-arrow-left" style={{ marginRight: '6px' }} /> Back
              </button>
              <div className={styles.rightActions}>
                <button onClick={handleDeclineAll} className={styles.secondaryButton}>
                  Reject All
                </button>
                <button onClick={handleSaveCustom} className={styles.primaryButton}>
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
