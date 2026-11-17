import type React from 'react';

declare global {
  interface Window {
    __KH_IMG_FALLBACKS__?: Record<string, string>;
  }
}

export function handleClinicImageError(
  event: React.SyntheticEvent<HTMLImageElement>,
  onPermanentFailure?: () => void
): void {
  const img = event.currentTarget;
  if (typeof window !== 'undefined' && img.dataset.fallbackApplied !== '1') {
    const rawSrc = img.getAttribute('src') || '';
    const map = window.__KH_IMG_FALLBACKS__;
    const fallback = map?.[rawSrc];
    if (fallback) {
      img.dataset.fallbackApplied = '1';
      img.src = fallback;
      return;
    }
  }
  onPermanentFailure?.();
}
