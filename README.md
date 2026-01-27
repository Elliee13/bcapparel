# BC Apparel Demo

A modern, responsive demo storefront built with React, TypeScript, Vite, and Tailwind CSS. Features a comprehensive motion system using GSAP and Framer Motion.

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **GSAP + ScrollTrigger** - Scroll animations
- **Framer Motion** - Page transitions
- **React Router** - Client-side routing

## Features

- 🎨 Modern, responsive design
- ✨ Site-wide motion system with scroll reveals, parallax, and pinning
- 🎭 Smooth page transitions
- ♿ Respects `prefers-reduced-motion`
- 🚀 Optimized for performance
- ?? Featured Picks landing page at `/featured`

## Pages / Routes

- `/` Home
- `/featured` Featured Picks (curated gallery)
- `/about` About
- `/products` Products
- `/brochures-catalogs` Brochures/Catalog
- `/contact` Contact

## SEO

- JSON-LD ItemList structured data on Home Featured Picks and `/featured`
- `robots.txt` and `sitemap.xml` in `public/`
- Canonical, Open Graph, and Twitter meta tags in `index.html`
- Featured page updates its title/description/OG/Twitter/canonical at runtime


## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173`

### Build

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Deployment

### Vercel (Recommended)

This project is configured for easy deployment on Vercel:

1. **Via Vercel CLI:**
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Via GitHub:**
   - Push your code to GitHub
   - Import your repository in [Vercel](https://vercel.com)
   - Vercel will auto-detect the Vite configuration
   - Deploy!

3. **Manual Deployment:**
   - Build the project: `npm run build`
   - Upload the `dist/` folder to Vercel

The `vercel.json` configuration file handles:
- SPA routing (all routes serve `index.html`)
- Asset caching (1 year for `/assets/*`)
- Build and dev commands

### Other Platforms

For other platforms (Netlify, Cloudflare Pages, etc.), ensure:
- Build command: `npm run build`
- Output directory: `dist`
- SPA routing: All routes should serve `index.html`

## Project Structure

```
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── motion/         # Motion system utilities
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   └── assets/         # Images and static assets
├── public/             # Public assets
├── dist/               # Build output
└── vercel.json         # Vercel configuration
```

## Motion System

The project includes a comprehensive motion system in `src/motion/`:

- **useHeroIntro** - Sequential hero animations
- **useReveal** - Scroll-triggered reveals with stagger
- **useParallax** - Parallax effects
- **usePin** - Pinned sections with scroll-driven animations
- **MotionLayout** - Page transition wrapper

All animations respect `prefers-reduced-motion`.

## License

Private project - All rights reserved.
