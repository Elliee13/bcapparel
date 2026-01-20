import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import { gsap } from "./gsap";

/**
 * Hook that wraps GSAP animations in a context for easy cleanup
 * Returns the context ref and automatically cleans up on unmount
 */
export function useGsapScope<T extends HTMLElement = HTMLElement>(): RefObject<T | null> {
  const scopeRef = useRef<T | null>(null);

  useEffect(() => {
    if (!scopeRef.current) return;

    const ctx = gsap.context(() => {}, scopeRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return scopeRef;
}
