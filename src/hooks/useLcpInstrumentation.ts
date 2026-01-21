import { useEffect } from "react";

/**
 * Dev-only hook to log LCP (Largest Contentful Paint) candidate details
 * Uses PerformanceObserver to track LCP elements
 */
export function useLcpInstrumentation() {
  useEffect(() => {
    // Only run in development
    if (import.meta.env.PROD) return;

    if (typeof window === "undefined" || !("PerformanceObserver" in window)) {
      return;
    }

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as LargestContentfulPaint;

        console.group("🎯 LCP Candidate");
        console.log("Element:", lastEntry.element);
        console.log("URL:", lastEntry.url);
        console.log("Size:", lastEntry.size);
        console.log("Render Time:", `${lastEntry.renderTime.toFixed(2)}ms`);
        console.log("Load Time:", `${lastEntry.loadTime.toFixed(2)}ms`);
        console.log("ID:", lastEntry.id);
        console.log("Type:", lastEntry.element?.tagName);
        console.log("Element Details:", {
          tagName: lastEntry.element?.tagName,
          className: lastEntry.element?.className,
          src: (lastEntry.element as HTMLImageElement)?.src,
          alt: (lastEntry.element as HTMLImageElement)?.alt,
        });
        console.groupEnd();
      });

      observer.observe({ type: "largest-contentful-paint", buffered: true });

      return () => {
        observer.disconnect();
      };
    } catch (error) {
      console.warn("LCP instrumentation failed:", error);
    }
  }, []);
}
