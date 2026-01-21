import type { Plugin } from "vite";

/**
 * Vite plugin to add font-display: swap to all @font-face rules
 * This prevents layout shift from font loading
 */
export function fontDisplaySwap(): Plugin {
  return {
    name: "font-display-swap",
    enforce: "post",
    transformIndexHtml(html) {
      // This runs at build time, but we need to transform CSS
      return html;
    },
    transform(code, id) {
      // Transform CSS files from @fontsource to add font-display: swap
      if (id.includes("@fontsource") && id.endsWith(".css")) {
        // Add font-display: swap to @font-face rules that don't have it
        const transformed = code.replace(
          /@font-face\s*\{([^}]*)\}/gs,
          (match, content) => {
            // If font-display is already present, don't modify
            if (content.includes("font-display")) {
              return match;
            }
            // Add font-display: swap before the closing brace
            // Preserve existing formatting
            const trimmed = content.trim();
            return `@font-face {\n${trimmed}\n  font-display: swap;\n}`;
          }
        );
        return { code: transformed, map: null };
      }
      return null;
    },
  };
}
