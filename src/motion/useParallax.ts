import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import { gsap, ScrollTrigger } from "./gsap";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { EASE } from "./tokens";

export interface UseParallaxOptions {
  /** Element ref to apply parallax to */
  element: RefObject<HTMLElement | null>;
  /** Y offset in pixels (positive = moves down on scroll) */
  y?: number;
  /** Y offset as percentage (e.g., -50 = moves up 50% of scroll distance) */
  yPercent?: number;
  /** ScrollTrigger start position (default: "top bottom") */
  start?: string;
  /** ScrollTrigger end position (default: "bottom top") */
  end?: string;
  /** Whether to scrub the animation (default: true) */
  scrub?: boolean | number;
  /** Ease function (default: EASE.none for scrubbed, EASE.out otherwise) */
  ease?: string;
}

/**
 * Hook for parallax effects on scroll
 * Automatically respects prefers-reduced-motion
 */
export function useParallax(options: UseParallaxOptions) {
  const {
    element,
    y,
    yPercent,
    start = "top bottom",
    end = "bottom top",
    scrub = true,
    ease,
  } = options;

  const prefersReducedMotion = usePrefersReducedMotion();
  const triggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!element.current) return;

    // Respect reduced motion
    if (prefersReducedMotion) {
      gsap.set(element.current, { y: 0, yPercent: 0 });
      return;
    }

    // Determine which property to animate
    const props: Record<string, number> = {};
    if (y !== undefined) props.y = y;
    if (yPercent !== undefined) props.yPercent = yPercent;

    if (Object.keys(props).length === 0) return;

    // Use none ease for scrubbed animations, or provided ease
    const finalEase = ease ?? (scrub ? EASE.none : EASE.out);

    let cancelled = false;

    const init = () => {
      if (cancelled || !element.current) return;

      const animation = gsap.to(element.current, {
        ...props,
        ease: finalEase,
      });

      triggerRef.current = ScrollTrigger.create({
        trigger: element.current,
        start,
        end,
        scrub: typeof scrub === "number" ? scrub : scrub ? 1 : false,
        animation,
      });
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
      triggerRef.current?.kill();
      triggerRef.current = null;
    };
  }, [element, y, yPercent, start, end, scrub, ease, prefersReducedMotion]);

  return triggerRef;
}
