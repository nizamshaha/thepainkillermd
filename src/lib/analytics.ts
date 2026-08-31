"use client";

import { useEffect, useCallback } from "react";

type AnalyticsEvent =
  | "page_view"
  | "pain_map_interaction"
  | "pain_area_selected"
  | "pain_area_search"
  | "pain_type_selected"
  | "questionnaire_started"
  | "questionnaire_completed"
  | "red_flag_triggered"
  | "video_started"
  | "video_completed"
  | "search_opened"
  | "search_used"
  | "appointment_clicked"
  | "phone_clicked"
  | "whatsapp_clicked"
  | "language_changed"
  | "cookie_consent";

interface AnalyticsPayload {
  event: AnalyticsEvent;
  category?: string;
  label?: string;
  value?: number;
  metadata?: Record<string, string | number>;
}

/**
 * Lightweight analytics module.
 * In production, replace the console.log with your analytics provider
 * (Google Analytics 4, Plausible, Fathom, etc.)
 *
 * No patient health data is ever tracked — only anonymous interaction events.
 */
export function trackEvent(payload: AnalyticsPayload) {
  const entry = {
    ...payload,
    timestamp: new Date().toISOString(),
    page: typeof window !== "undefined" ? window.location.pathname : "/",
  };

  // Development logging
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics] ${payload.event}`, entry);
  }

  // GA4 example (uncomment when ready):
  // if (typeof window !== "undefined" && window.gtag) {
  //   window.gtag("event", payload.event, {
  //     event_category: payload.category,
  //     event_label: payload.label,
  //     value: payload.value,
  //   });
  // }

  // Plausible example (uncomment when ready):
  // if (typeof window !== "undefined" && window.plausible) {
  //   window.plausible(payload.event, { props: entry });
  // }
}

export function useAnalytics() {
  const track = useCallback((event: AnalyticsEvent, meta?: Partial<AnalyticsPayload>) => {
    trackEvent({ event, ...meta });
  }, []);

  return { track };
}

/** Track a page view — call from page components */
export function trackPageView(path: string) {
  trackEvent({ event: "page_view", label: path });
}

/** Track CTA clicks */
export function trackCTAClick(type: "appointment" | "phone" | "whatsapp") {
  const eventMap = {
    appointment: "appointment_clicked" as const,
    phone: "phone_clicked" as const,
    whatsapp: "whatsapp_clicked" as const,
  };
  trackEvent({ event: eventMap[type], category: "conversion" });
}

/** Auto-track page views via Next.js route changes (use in layout) */
export function usePageViewTracking() {
  useEffect(() => {
    trackPageView(window.location.pathname);

    const handleRouteChange = () => {
      trackPageView(window.location.pathname);
    };

    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, []);
}
