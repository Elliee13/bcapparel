type LayoutShiftEntry = PerformanceEntry & {
  value: number;
  hadRecentInput: boolean;
  sources?: Array<{
    node?: Element;
    previousRect?: DOMRectReadOnly;
    currentRect?: DOMRectReadOnly;
  }>;
};

function getNodeDescriptor(node: Element) {
  const tag = node.tagName.toLowerCase();
  const id = node.id ? `#${node.id}` : "";
  const className =
    typeof node.className === "string" && node.className.trim()
      ? `.${node.className.trim().split(/\s+/).slice(0, 3).join(".")}`
      : "";
  return `${tag}${id}${className}` || "unknown";
}

export function initClsLogger() {
  if (typeof window === "undefined" || !("PerformanceObserver" in window)) {
    return;
  }

  let totalCls = 0;
  const sourceTotals = new Map<Element, number>();

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries() as LayoutShiftEntry[]) {
      if (entry.hadRecentInput) continue;

      totalCls += entry.value;

      const sources =
        entry.sources?.map((source) => {
          if (source.node) {
            const current = sourceTotals.get(source.node) ?? 0;
            sourceTotals.set(source.node, current + entry.value);
            return getNodeDescriptor(source.node);
          }
          return "unknown";
        }) ?? [];

      const sourcesLabel = sources.length ? sources.join(", ") : "unknown";
      // eslint-disable-next-line no-console
      console.log("[CLS] shift", entry.value.toFixed(4), sourcesLabel);
    }
  });

  try {
    observer.observe({ type: "layout-shift", buffered: true });
  } catch {
    observer.disconnect();
    return;
  }

  window.addEventListener("load", () => {
    window.setTimeout(() => {
      const ranked = Array.from(sourceTotals.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([node, value]) => ({
          value,
          node: getNodeDescriptor(node),
        }));

      // eslint-disable-next-line no-console
      console.log("[CLS] total", totalCls.toFixed(4));
      if (ranked.length) {
        // eslint-disable-next-line no-console
        console.log("[CLS] top elements", ranked);
      }

      observer.disconnect();
    }, 2000);
  });
}
