/**
 * Animation timing tokens for consistent motion across the site
 */

export const EASE = {
  // Standard eases
  out: "power3.out",
  in: "power3.in",
  inOut: "power3.inOut",
  // Smooth, subtle eases
  smooth: "power2.out",
  smoothIn: "power2.in",
  smoothInOut: "power2.inOut",
  // Linear for scrubbed animations
  none: "none",
} as const;

export const DURATIONS = {
  // Fast micro-interactions
  fast: 0.3,
  // Standard transitions
  base: 0.5,
  // Slightly slower for emphasis
  slow: 0.7,
  // Hero/intro animations
  hero: 0.8,
  // Very slow for dramatic reveals
  slowest: 1.2,
} as const;
