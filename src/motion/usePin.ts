import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import { gsap, ScrollTrigger } from "./gsap";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { EASE } from "./tokens";

export interface UsePinOptions {
  /** Element ref to pin */
  element: RefObject<HTMLElement | null>;
  /** Pin start position (default: "top top") */
  start?: string;
  /** Pin end position (default: "+=100%") */
  end?: string;
  /** Whether to scrub animations (default: true) */
  scrub?: boolean | number;
  /** Callback to animate properties based on scroll progress */
  onUpdate?: (progress: number) => void;
  /** Animation properties to scrub (object with GSAP properties) */
  animationProps?: gsap.TweenVars;
}

/**
 * Hook for pinning sections with scroll-driven animations
 * Automatically respects prefers-reduced-motion
 */
export function usePin(options: UsePinOptions) {
  const {
    element,
    start = "top top",
    end = "+=100%",
    scrub = true,
    onUpdate,
    animationProps,
  } = options;

  const prefersReducedMotion = usePrefersReducedMotion();
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!element.current) return;

    // Respect reduced motion - just pin without animation
    if (prefersReducedMotion) {
      triggerRef.current = ScrollTrigger.create({
        trigger: element.current,
        start,
        end,
        pin: true,
      });
      return () => {
        triggerRef.current?.kill();
        triggerRef.current = null;
      };
    }

    let cancelled = false;

    const init = () => {
      if (cancelled || !element.current) return;

      // Create animation if props provided
      let animation: gsap.core.Tween | null = null;
      if (animationProps) {
        animation = gsap.to(element.current, {
          ...animationProps,
          ease: animationProps.ease ?? EASE.none,
        });
        animationRef.current = animation;
      }

      // Create pin with optional animation
      triggerRef.current = ScrollTrigger.create({
        trigger: element.current,
        start,
        end,
        pin: true,
        scrub: typeof scrub === "number" ? scrub : scrub ? 1 : false,
        animation: animation || undefined,
        onUpdate: onUpdate
          ? (self) => {
              onUpdate(self.progress);
            }
          : undefined,
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
      animationRef.current?.kill();
      triggerRef.current = null;
      animationRef.current = null;
    };
  }, [element, start, end, scrub, onUpdate, animationProps, prefersReducedMotion]);

  return triggerRef;
}
