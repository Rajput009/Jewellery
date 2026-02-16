export type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export const trackEvent = (event: string, payload: AnalyticsPayload = {}): void => {
  const data = { event, ...payload };

  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push(data);
  }

  if (typeof import.meta !== 'undefined' && import.meta.env?.DEV) {
    console.info('[analytics]', data);
  }
};
