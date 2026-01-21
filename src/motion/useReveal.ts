import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import { gsap, ScrollTrigger } from "./gsap";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { EASE, DURATIONS } from "./tokens";

export interface UseRevealOptions {
  /** Selector string or array of elements/refs */
  elements?: string | Array<RefObject<HTMLElement> | HTMLElement | null>;
  /** Initial y offset (default: 20) */
  y?: number;
  /** Initial opacity (default: 0) */
  opacity?: number;
  /** ScrollTrigger start position (default: "top 80%") */
  start?: string;
  /** Animation duration (default: DURATIONS.base) */
  duration?: number;
  /** Stagger delay between elements (default: 0.08) */
  stagger?: number;
  /** Ease function (default: EASE.out) */
  ease?: string;
  /** Whether to use autoAlpha instead of opacity (default: true) */
  useAutoAlpha?: boolean;
}

/**
 * Hook for scroll-triggered reveal animations with optional stagger
 * Automatically respects prefers-reduced-motion
 */
export function useReveal(options: UseRevealOptions = {}) {
  const {
    elements,
    y = 20,
    opacity = 0,
    start = "top 80%",
    duration = DURATIONS.base,
    stagger = 0.08,
    ease = EASE.out,
    useAutoAlpha = true,
  } = options;

  const prefersReducedMotion = usePrefersReducedMotion();
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    if (!elements) return;

    // Collect all target elements
    let targets: HTMLElement[] = [];

    if (typeof elements === "string") {
      // Selector string
      targets = Array.from(document.querySelectorAll<HTMLElement>(elements));
    } else {
      // Array of refs/elements
      targets = elements
        .map((el) => {
          if (!el) return null;
          if ("current" in el) return el.current;
          return el;
        })
        .filter((el): el is HTMLElement => el !== null);
    }

    if (targets.length === 0) return;

    // Respect reduced motion
    if (prefersReducedMotion) {
      gsap.set(targets, {
        [useAutoAlpha ? "autoAlpha" : "opacity"]: 1,
        y: 0,
      });
      return;
    }

    let cancelled = false;

    const init = () => {
      if (cancelled) return;

      // Set initial state
      gsap.set(targets, {
        [useAutoAlpha ? "autoAlpha" : "opacity"]: opacity,
        y: y,
      });

      // Create ScrollTriggers
      if (targets.length === 1) {
        // Single element - simple reveal
        const trigger = ScrollTrigger.create({
          trigger: targets[0],
          start,
          animation: gsap.to(targets[0], {
            [useAutoAlpha ? "autoAlpha" : "opacity"]: 1,
            y: 0,
            duration,
            ease,
          }),
        });
        triggersRef.current.push(trigger);
      } else {
        // Multiple elements - staggered reveal
        targets.forEach((target, index) => {
          const trigger = ScrollTrigger.create({
            trigger: target,
            start,
            animation: gsap.to(target, {
              [useAutoAlpha ? "autoAlpha" : "opacity"]: 1,
              y: 0,
              duration,
              ease,
              delay: index * stagger,
            }),
          });
          triggersRef.current.push(trigger);
        });
      }
    };

    if (typeof requestIdleCallback !== "undefined") {
      requestIdleCallback(init, { timeout: 120 });
    } else {
      requestAnimationFrame(() => {
        setTimeout(init, 0);
      });
    }

    return () => {
      cancelled = true;
      triggersRef.current.forEach((trigger) => trigger.kill());
      triggersRef.current = [];
    };
  }, [elements, y, opacity, start, duration, stagger, ease, useAutoAlpha, prefersReducedMotion]);

  return triggersRef;
}
