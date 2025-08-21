# 🚀 Maydiv Deployment Guide

## Problem Solved
Your website was showing differently on Vercel vs Chrome because of conflicting Next.js configurations. This guide fixes that issue.

## 📁 Configuration Files

### 1. `next.config.ts` - For Vercel
- **Static export disabled** for proper server-side rendering
- **App directory enabled** for modern Next.js features
- **Optimized for Vercel** deployment

### 2. `next.config.hostinger.js` - For Hostinger
- **Static export enabled** for FTP deployment
- **App directory disabled** for static compatibility
- **Optimized for Hostinger** static hosting

## 🚀 Quick Deployment

### Option 1: Use the Script (Recommended)
```bash
# On Windows
deploy.bat

# On Mac/Linux
./deploy.sh
```

### Option 2: Manual Commands

#### For Vercel:
```bash
npm run build
git add .
git commit -m "Update for Vercel deployment"
git push origin main
```

#### For Hostinger:
```bash
npm run build:hostinger
# Upload 'out' folder contents via FTP to public_html
```

## 🔧 Build Scripts

- `npm run build` - Builds for Vercel
- `npm run build:hostinger` - Builds for Hostinger
- `npm run dev` - Development server

## 🧹 Cache Clearing

If you still see different versions:

1. **Clear Next.js cache:**
   ```bash
   rm -rf .next
   rm -rf out
   ```

2. **Clear npm cache:**
   ```bash
   npm cache clean --force
   ```

3. **Reinstall dependencies:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

## 🌐 Browser Cache Issues

### Chrome Hard Refresh:
- Press `Ctrl + Shift + R` (Windows)
- Press `Cmd + Shift + R` (Mac)

### DevTools Cache Disable:
1. Open DevTools (`F12`)
2. Go to Network tab
3. Check "Disable cache"
4. Refresh the page

## 📱 Deployment Checklist

### Before Deploying:
- [ ] All changes committed to GitHub
- [ ] Cache cleared (`deploy.bat` option 3)
- [ ] Dependencies up to date

### After Deploying:
- [ ] Check Vercel dashboard for build success
- [ ] Verify Hostinger FTP upload complete
- [ ] Test both URLs in incognito mode
- [ ] Clear browser cache if needed

## 🔗 URLs to Check

- **Vercel:** Your Vercel domain
- **Hostinger:** Your Hostinger domain
- **GitHub:** Your repository URL

## ❗ Common Issues

1. **Different versions showing:**
   - Clear all caches
   - Rebuild both deployments
   - Check browser cache

2. **Build errors:**
   - Check Node.js version compatibility
   - Clear node_modules and reinstall
   - Verify all dependencies

3. **Images not loading:**
   - Ensure `unoptimized: true` in config
   - Check image paths are correct

## 📞 Support

If issues persist:
1. Run `deploy.bat` option 3 (Clear cache)
2. Run `deploy.bat` option 4 (Reinstall dependencies)
3. Rebuild both deployments
4. Test in incognito mode

---

**Note:** Always deploy to both platforms to keep them in sync!
