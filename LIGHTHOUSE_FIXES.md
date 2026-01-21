# Lighthouse Performance Fixes

## Summary
Fixed LCP (Largest Contentful Paint), CLS (Cumulative Layout Shift), and robots.txt issues to improve Lighthouse scores.

## Changes Made

### 1. LCP Improvements (Target: < 2.5s)

#### LCP Instrumentation (Dev-only)
- **File**: `src/hooks/useLcpInstrumentation.ts`
- **Purpose**: Logs LCP candidate details in development using PerformanceObserver
- **Usage**: Added to `HomePage.tsx` to identify the exact LCP element

#### Hero Image Preload
- **File**: `index.html`
- **Change**: Added `<link rel="preload">` tags for hero image (AVIF and WebP formats)
- **Note**: Paths work in dev mode; for production builds, consider using a Vite plugin to inject correct hashed paths

#### GSAP Animation Delay
- **File**: `src/motion/useHeroIntro.ts`
- **Change**: Delayed GSAP animation initialization until after first paint using `requestIdleCallback` (with `setTimeout` fallback)
- **Impact**: Prevents animations from blocking LCP measurement

#### Hero Image Optimization
- **File**: `src/pages/HomePage.tsx`
- **Changes**:
  - Already has `fetchPriority="high"` ✓
  - Already has `loading="eager"` ✓
  - Already uses modern formats (AVIF/WebP) with srcset ✓
  - Added explicit `aspectRatio` style to prevent layout shift

### 2. CLS Fixes (Target: < 0.1)

#### Font Display Optimization
- **File**: `vite-plugin-font-display.ts` (new)
- **File**: `vite.config.ts`
- **Change**: Created Vite plugin to automatically add `font-display: swap` to all @font-face rules from @fontsource/manrope
- **Impact**: Prevents layout shift when fonts load

#### Image Aspect Ratios
- **File**: `src/pages/HomePage.tsx`
- **Changes**: Added explicit `style={{ aspectRatio: "..." }}` to all images:
  - Hero image: `aspectRatio: "2200 / 1100"`
  - Catalog images: `aspectRatio: "800 / 600"`
  - Brochure images: `aspectRatio: "800 / 600"`
  - Brand/vendor logos: `aspectRatio: "auto"` (preserves natural ratio)
- **Impact**: Prevents layout shift as images load

#### Animation Timing
- **File**: `src/motion/useHeroIntro.ts`
- **Change**: Delayed hero intro animations until after first paint
- **Impact**: Prevents animations from causing layout shifts during initial render

### 3. robots.txt Fix

- **File**: `public/robots.txt` (new)
- **Content**: Minimal valid robots.txt allowing all crawlers
- **Note**: No sitemap included (add if sitemap.xml exists)

## Verification Steps

### Build and Test
```bash
npm run build
npm run preview
```

### Expected Improvements

1. **LCP**: Should improve from ~4.8s to < 2.5s
   - Hero image preloaded
   - GSAP animations delayed
   - Image loading optimized

2. **CLS**: Should improve from ~0.534 to < 0.1
   - All images have explicit aspect ratios
   - Fonts use `font-display: swap`
   - Animations delayed until after first paint

3. **robots.txt**: Should show 0 errors
   - Valid file created at `/robots.txt`

### Troubleshooting

If scores don't improve:

1. **LCP still high**:
   - Check browser console for LCP candidate (dev instrumentation will log it)
   - Verify hero image is actually the LCP element
   - Check network tab - ensure image loads early
   - Verify preload links are present in HTML

2. **CLS still high**:
   - Check if fonts are loading late (Network tab)
   - Verify aspect-ratio styles are applied to images
   - Check for other dynamic content causing shifts
   - Ensure animations use `transform`/`opacity` only (not `top`/`left`/`height`)

3. **robots.txt errors**:
   - Verify file exists at `public/robots.txt`
   - Check file is served at `/robots.txt` in build output
   - Ensure no syntax errors in file

## Files Changed

### New Files
- `src/hooks/useLcpInstrumentation.ts` - LCP logging hook
- `vite-plugin-font-display.ts` - Vite plugin for font-display
- `public/robots.txt` - robots.txt file
- `LIGHTHOUSE_FIXES.md` - This documentation

### Modified Files
- `index.html` - Added hero image preload links
- `src/pages/HomePage.tsx` - Added LCP instrumentation, aspect ratios for images
- `src/motion/useHeroIntro.ts` - Delayed animation initialization
- `vite.config.ts` - Added font-display plugin
- `src/styles.css` - Added font-display optimization note

## Next Steps (Optional)

1. **Production Preload Links**: Consider using a Vite plugin to inject correct preload links with hashed asset paths for production builds

2. **Font Preloading**: If needed, add explicit font preload links in `index.html` (requires knowing exact font file paths after build)

3. **Sitemap**: If you have a sitemap.xml, add `Sitemap: https://yourdomain.com/sitemap.xml` to robots.txt

4. **Further Optimization**: 
   - Consider code splitting for below-the-fold content
   - Lazy load non-critical components
   - Optimize bundle size
