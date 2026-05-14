declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    fbq: (...args: unknown[]) => void;
  }
  // eslint-disable-next-line no-var
  var fbq: (...args: unknown[]) => void;
}

export {};
