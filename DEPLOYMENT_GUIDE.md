# Nova Webs — Production Deployment Guide

**Version:** 1.0  
**Target:** Vercel Production  
**Status:** Ready for Deployment  

---

## 1. Prerequisites

| Requirement | Version | Notes |
|------------|---------|-------|
| Node.js | 20.x LTS | Required by Next.js 16 |
| npm | 10.x+ | Comes with Node.js |
| Git | Latest | For version control |
| Vercel CLI | Latest | `npm i -g vercel` (optional) |

---

## 2. Environment Variables

### Required Variables

| Variable | Example Value | Provider | Description |
|----------|--------------|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | `https://novawebs.com` | — | Production domain |
| `NEXT_PUBLIC_PHONE` | `+92 300 1234567` | — | Business phone (display) |
| `NEXT_PUBLIC_EMAIL` | `hello@novawebs.com` | — | Business email (display) |
| `NEXT_PUBLIC_ADDRESS` | `123-Gulberg, Lahore, Pakistan` | — | Physical address |
| `NEXT_PUBLIC_MAPS_URL` | `https://maps.google.com/?q=...` | — | Google Maps link |
| `NEXT_PUBLIC_WHATSAPP_URL` | `https://wa.me/923001234567` | — | WhatsApp number |
| `NEXT_PUBLIC_WHATSAPP_MESSAGE` | `Hi Nova Webs! I'm...` | — | Pre-filled message |

### Optional Variables (Integration)

| Variable | Example | Provider | Purpose |
|----------|---------|----------|---------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-XXXXXXXXXX` | Google Analytics | Page analytics |
| `NEXT_PUBLIC_CLARITY_ID` | `xxxxxxxxxx` | Microsoft Clarity | Session recording |
| `NEXT_PUBLIC_META_PIXEL_ID` | `1234567890` | Meta Ads | Conversion tracking |
| `NEXT_PUBLIC_GSC_VERIFICATION` | `xxxxxxxx` | Google Search Console | Site ownership |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | `service_xxx` | EmailJS | Form submissions |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | `template_xxx` | EmailJS | Email template |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | `public_key` | EmailJS | API public key |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | `access_key` | Web3Forms | Fallback form service |
| `NEXT_PUBLIC_FORM_ENDPOINT` | `https://formspree.io/f/...` | Formspree | Final fallback |

### Social Media URLs

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_INSTAGRAM_URL` | Instagram profile link |
| `NEXT_PUBLIC_LINKEDIN_URL` | LinkedIn company page |
| `NEXT_PUBLIC_TIKTOK_URL` | TikTok profile |
| `NEXT_PUBLIC_YOUTUBE_URL` | YouTube channel |

---

## 3. Vercel Deployment Steps

### Method A: Git Integration (Recommended)

1. Push the repository to GitHub/GitLab/Bitbucket
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Configure the project:
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (default)
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
4. Add all environment variables from Section 2
5. Deploy

### Method B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy from project root
cd "D:\nova webs\nova-webs"
vercel --prod

# Follow prompts to link project and set environment variables
```

### Post-Deployment

```bash
# Verify deployment
vercel ls
vercel domains ls

# Set custom domain
vercel domains add novawebs.com
vercel domains add www.novawebs.com
```

---

## 4. Domain Configuration

### DNS Records

| Type | Name | Value | Notes |
|------|------|-------|-------|
| CNAME | `www` | `cname.vercel-dns.com` | WWW subdomain |
| A | `@` | `76.76.21.21` | Apex domain (Vercel) |
| A | `@` | `76.76.21.98` | Apex domain (Vercel) |

### SSL/TLS

Vercel automatically provisions SSL certificates via Let's Encrypt.
- Certificate type: Auto (fully managed)
- Renewal: Automatic
- HTTPS redirect: Enabled by default

---

## 5. SEO Setup

### Google Search Console

1. Add property: `https://novawebs.com` (URL prefix)
2. Verification method: HTML tag
3. Set `NEXT_PUBLIC_GSC_VERIFICATION` in Vercel
4. Redeploy
5. Verify ownership in Search Console
6. Submit sitemap: `https://novawebs.com/sitemap.xml`

### Bing Webmaster Tools

1. Add property
2. Verification via HTML tag or DNS
3. Submit sitemap

### Google Analytics 4

1. Create GA4 property
2. Copy Measurement ID (G-XXXXXXXXXX)
3. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in Vercel
4. Redeploy

### Microsoft Clarity

1. Create project in Clarity
2. Copy Clarity ID
3. Set `NEXT_PUBLIC_CLARITY_ID` in Vercel

### Meta Pixel

1. Create Pixel in Meta Events Manager
2. Copy Pixel ID
3. Set `NEXT_PUBLIC_META_PIXEL_ID` in Vercel

---

## 6. Image & Asset Checklist

| Asset | Path | Size | Notes |
|-------|------|------|-------|
| **OG Image** | `public/images/og.jpg` | 1200×630px | Required for social sharing |
| **OG Image (Portfolio)** | `public/images/og-portfolio.jpg` | 1200×630px | Optional |
| **Favicon** | `public/favicon.ico` | 48×48px | Multi-size ICO |
| **App Icon 192** | `public/images/icon-192.png` | 192×192px | PWA manifest |
| **App Icon 512** | `public/images/icon-512.png` | 512×512px | PWA manifest |
| **Apple Touch Icon** | `public/images/apple-icon.png` | 180×180px | iOS home screen |
| **Client Logos** | `public/images/client-*.svg` | SVG | 6 client logo SVGs |
| **Portfolio Images** | `public/images/portfolio-*.jpg` | 1600×900px | 4 portfolio images |
| **Testimonial Avatars** | `public/images/testimonial-*.jpg` | 200×200px | 4 avatar photos |

---

## 7. Production Build Verification

```bash
# 1. Install dependencies
npm ci

# 2. Run type check
npx tsc --noEmit

# 3. Build
npm run build

# 4. Verify routes
# Expected output:
# ┌ ○ /
# ├ ○ /about
# ├ ○ /booking
# ├ ○ /contact
# ├ ○ /faq
# ├ ○ /portfolio
# ├ ○ /privacy
# ├ ○ /services
# ├ ○ /terms
# └ ○ /sitemap.xml, /robots.txt, /manifest.webmanifest

# 5. Start production server locally
npm run start

# 6. Verify at http://localhost:3000
```

---

## 8. Quality Gates

| Gate | Target | Verification Method |
|------|--------|-------------------|
| **Lighthouse Performance** | 95+ | Chrome DevTools |
| **Lighthouse Accessibility** | 100 | Chrome DevTools |
| **Lighthouse Best Practices** | 100 | Chrome DevTools |
| **Lighthouse SEO** | 100 | Chrome DevTools |
| **TypeScript** | No errors | `npx tsc --noEmit` |
| **Build** | Successful | `npm run build` |
| **Responsive Design** | All breakpoints | Manual check |
| **Form Submission** | End-to-end test | Submit test inquiry |
| **Analytics** | Events firing | GA4 DebugView |
| **Schema.org** | Valid | Google Rich Results Test |
| **Open Graph** | Valid | Facebook Sharing Debugger |
| **Sitemap** | Valid | Google Search Console |

---

## 9. Post-Launch Monitoring

### First 24 Hours
- [ ] Monitor Vercel analytics for traffic
- [ ] Check GA4 for active users
- [ ] Review Clarity recordings for UX issues
- [ ] Test all forms submit correctly
- [ ] Verify WhatsApp link works
- [ ] Check Google Search Console for crawl errors

### First Week
- [ ] Review Lighthouse scores
- [ ] Check Core Web Vitals in Search Console
- [ ] Monitor bounce rate and session duration
- [ ] Review conversion data (form submissions)
- [ ] Check for 404 errors in Search Console

### First Month
- [ ] Submit sitemap to Google News (if applicable)
- [ ] Build backlinks (local Lahore businesses)
- [ ] Create Google Business Profile
- [ ] Set up Google Ads (if budget allows)
- [ ] Begin A/B testing (CTA copy, hero layout)

---

## 10. Rollback Plan

```bash
# Vercel: Instant rollback via dashboard
# 1. Go to project dashboard
# 2. Click "Deployments" tab
# 3. Find previous working deployment
# 4. Click "..." → "Promote to Production"

# Or via CLI:
vercel rollback --prod
```
