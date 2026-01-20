# Deployment Guide

## Quick Deploy to Vercel

### Option 1: Vercel CLI (Fastest)

```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy (first time will ask for login)
vercel

# For production deployment
vercel --prod
```

### Option 2: GitHub Integration (Recommended for CI/CD)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel will auto-detect:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Click "Deploy"

### Option 3: Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import from Git or upload `dist/` folder manually

## Configuration

The project includes `vercel.json` with:
- ✅ SPA routing (all routes → `index.html`)
- ✅ Asset caching (1 year for static assets)
- ✅ Build and dev commands

## Environment Variables

**No environment variables required** - this project uses static data.

If you need to add environment variables in the future:
1. Go to Vercel Dashboard → Project Settings → Environment Variables
2. Add variables for Production, Preview, and Development
3. Redeploy

## Build Verification

Before deploying, verify the build works locally:

```bash
npm run build
npm run preview
```

Visit `http://localhost:4173` to preview the production build.

## Post-Deployment

After deployment:
1. ✅ Test all routes (home, about, products, contact, etc.)
2. ✅ Verify animations work correctly
3. ✅ Check mobile responsiveness
4. ✅ Test page transitions
5. ✅ Verify asset loading (images, fonts)

## Troubleshooting

### Routes not working (404 errors)
- Ensure `vercel.json` includes the rewrites configuration
- Check that `outputDirectory` is set to `dist`

### Assets not loading
- Verify assets are in `public/` or imported in code
- Check build output in `dist/assets/`

### Build fails
- Run `npm run build` locally to see errors
- Check Node.js version (requires 18+)
- Ensure all dependencies are in `package.json`

## Custom Domain

1. Go to Vercel Dashboard → Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. SSL certificate is automatically provisioned
