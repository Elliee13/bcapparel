import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import { gsap } from "./gsap";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { EASE, DURATIONS } from "./tokens";

export interface HeroIntroElement {
  ref: RefObject<HTMLElement | null>;
  /** Delay before this element animates (in seconds) */
  delay?: number;
  /** Custom y offset (default: 20) */
  y?: number;
  /** Custom opacity (default: 0) */
  opacity?: number;
  /** Custom duration (default: DURATIONS.base) */
  duration?: number;
  /** Custom ease (default: EASE.out) */
  ease?: string;
}

export interface UseHeroIntroOptions {
  /** Array of elements to animate in sequence */
  elements: HeroIntroElement[];
  /** Total timeline duration (auto-calculated if not provided) */
  duration?: number;
  /** Whether to use autoAlpha (default: true) */
  useAutoAlpha?: boolean;
}

/**
 * Hook for hero section intro timeline animations
 * Creates a sequential timeline that plays on mount
 * Automatically respects prefers-reduced-motion
 */
export function useHeroIntro(options: UseHeroIntroOptions) {
  const { elements, useAutoAlpha = true } = options;
  const prefersReducedMotion = usePrefersReducedMotion();
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // Filter out null refs
    const validElements = elements.filter((el) => el.ref.current);

    if (validElements.length === 0) return;

    // Respect reduced motion
    if (prefersReducedMotion) {
      gsap.set(
        validElements.map((el) => el.ref.current!),
        {
          [useAutoAlpha ? "autoAlpha" : "opacity"]: 1,
          y: 0,
        }
      );
      return;
    }

    // Delay animation initialization until after first paint to avoid blocking LCP
    // Use requestIdleCallback if available, otherwise setTimeout with minimal delay
    const initAnimation = () => {
      // Set initial state
      validElements.forEach((el) => {
        if (!el.ref.current) return;
        gsap.set(el.ref.current, {
          [useAutoAlpha ? "autoAlpha" : "opacity"]: el.opacity ?? 0,
          y: el.y ?? 20,
        });
      });

      // Create timeline
      const tl = gsap.timeline({ defaults: { ease: EASE.out } });
      timelineRef.current = tl;

      // Add each element to timeline
      validElements.forEach((el, index) => {
        if (!el.ref.current) return;

        const delay = el.delay ?? (index === 0 ? 0 : 0.15);
        const duration = el.duration ?? DURATIONS.base;
        const ease = el.ease ?? EASE.out;

        tl.to(
          el.ref.current,
          {
            [useAutoAlpha ? "autoAlpha" : "opacity"]: 1,
            y: 0,
            duration,
            ease,
          },
          delay
        );
      });
    };

    // Delay until after first paint
    if (typeof requestIdleCallback !== "undefined") {
      requestIdleCallback(initAnimation, { timeout: 100 });
    } else {
      // Fallback: wait for next frame + small delay
      requestAnimationFrame(() => {
        setTimeout(initAnimation, 0);
      });
    }

    return () => {
      timelineRef.current?.kill();
      timelineRef.current = null;
    };
  }, [elements, useAutoAlpha, prefersReducedMotion]);

  return timelineRef;
}
