# Nova Webs — Content Management Guide

**Document Version:** 1.0  
**Purpose:** Enable non-developers to safely update website content  
**Complexity:** Low — only JSON editing required  
**Tools needed:** Any text editor (VS Code, Notepad++, TextEdit)

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [How Content Flows Through the Site](#2-how-content-flows-through-the-site)
3. [Editing Site-Wide Content](#3-editing-site-wide-content)
4. [Editing Services](#4-editing-services)
5. [Editing Portfolio Projects](#5-editing-portfolio-projects)
6. [Editing Testimonials](#6-editing-testimonials)
7. [Editing FAQ Questions](#7-editing-faq-questions)
8. [Editing Process Steps](#8-editing-process-steps)
9. [Editing Team Members](#9-editing-team-members)
10. [Editing Why Choose Us](#10-editing-why-choose-us)
11. [Editing Industries Served](#11-editing-industries-served)
12. [Editing Technologies](#12-editing-technologies)
13. [Editing Pricing Tiers](#13-editing-pricing-tiers)
14. [Editing About Page](#14-editing-about-page)
15. [Managing the Blog](#15-managing-the-blog)
16. [Managing Legal Pages](#16-managing-legal-pages)
17. [Managing Images](#17-managing-images)
18. [Adding Social Media Links](#18-adding-social-media-links)
19. [Contact Information](#19-contact-information)
20. [Navigation Changes](#20-navigation-changes)
21. [Future CMS Migration Path](#21-future-cms-migration-path)
22. [Troubleshooting](#22-troubleshooting)

---

## 1. Architecture Overview

```
                    ┌─────────────────────┐
                    │   content/data/*.json │  ← EDIT THESE FILES
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │   src/lib/content.ts │  ← Content Loader
                    └──────────┬──────────┘
                               │
          ┌────────────────────┼────────────────────┐
          ▼                    ▼                    ▼
  src/sections/*        src/app/*/page.tsx    src/components/*
  (Section components)  (Page components)     (UI components)
```

**The content architecture has 3 layers:**

1. **Content Files** (`content/data/*.json`) — Pure data, no code. These are the files you edit.
2. **Content Loader** (`src/lib/content.ts`) — Reads JSON files and provides data to the site. Can be swapped for a CMS in the future.
3. **Section Components** — Display the data. **Never edit these** for content changes.

### Why This Architecture?

- **Separation of concerns** — Content and presentation are completely separate
- **Future-proof** — Swap JSON files for a CMS API without touching any components
- **Safe editing** — JSON is simpler than JSX/HTML, reducing error risk
- **Version control** — All content changes are tracked in Git

---

## 2. How Content Flows Through the Site

```
User edits content/data/site.json
              │
              ▼
getSiteConfig() reads the file
              │
              ▼
Section component (e.g., HeroSection) 
calls getSiteConfig().hero.headline
              │
              ▼
Browser renders the new headline
```

**No code changes needed.** Just edit the JSON file and redeploy.

---

## 3. Editing Site-Wide Content

**File:** `content/data/site.json`

This is the most important content file. It controls:

### Site Identity
```json
"site": {
  "name": "Nova Webs",
  "tagline": "Digital Excellence, Crafted.",
  "description": "Lahore's premium web design agency...",
  "url": "https://novawebs.com"
}
```

### Navigation
```json
"navigation": {
  "ctaText": "Book a Call",
  "ctaLink": "/booking",
  "links": [
    { "label": "Services", "href": "/services" },
    ...
  ]
}
```

### Hero Section
```json
"hero": {
  "headline": "We Build Digital Experiences That Drive Results",
  "headlineHighlight": "Drive Results",
  "subheadline": "Lahore's premium web design agency...",
  "primaryCta": { "text": "Book a Call", "href": "/booking" },
  "secondaryCta": { "text": "View Our Work", "href": "/portfolio" }
}
```

### Announcement Bar
```json
"announcementBar": {
  "enabled": true,
  "messages": [
    { "text": "Limited slots available", "cta": "Book Now →", "href": "/booking" }
  ]
}
```

Set `"enabled": false` to hide the entire announcement bar.

### Client Logos
```json
"trustBar": {
  "heading": "Trusted by industry leaders across Lahore",
  "logos": [
    { "name": "TechVentures", "src": "/images/client-1.svg" }
  ]
}
```

### Trust Badges (Footer)
```json
"trustBadges": [
  { "label": "Secure SSL Encryption", "icon": "Shield" },
  { "label": "100% Custom Design", "icon": "Palette" }
]
```

### Statistics
```json
"stats": [
  { "value": "50", "label": "Projects Delivered", "suffix": "+" }
]
```

### Contact Information
```json
"contact": {
  "phone": "+92 300 1234567",
  "email": "hello@novawebs.com",
  "address": "123-Gulberg, Lahore, Pakistan",
  "whatsapp": "https://wa.me/923001234567",
  "whatsappMessage": "Hi Nova Webs! I'm interested in..."
}
```

---

## 4. Editing Services

**File:** `content/data/services.json`

Each service has:
```json
{
  "id": "web-design",           // Do NOT change — used for links
  "title": "Web Design",        // Display name
  "description": "Pixel-perfect UI/UX...",  // Short description
  "icon": "Palette",            // Lucide icon name
  "features": [                 // Bullet point features
    "Discovery & Research",
    "Wireframing & Prototyping"
  ],
  "href": "/services#web-design",  // Anchor link — keep matching id
  "order": 1                    // Display order (1 = first)
}
```

**To add a service:** Copy an existing entry, change the `id` and all fields, set its `order`.

**To remove a service:** Delete its entry from the `services` array.

**To reorder:** Change the `order` numbers.

> ⚠️ **Warning:** Service `id` values are used in the contact form dropdown. If you change an `id`, update `SERVICE_OPTIONS` in `src/constants/index.ts` too.

---

## 5. Editing Portfolio Projects

**File:** `content/data/portfolio.json`

```json
{
  "id": "techventures",         // Do NOT change — used in URLs
  "title": "TechVentures",
  "category": "Web Design & Development",
  "description": "Complete digital transformation...",
  "image": "/images/portfolio-1.jpg",
  "metrics": "+40% conversion rate",
  "aspectRatio": "wide",        // "wide", "tall", or "square"
  "featured": true,             // Show on homepage
  "technologies": ["React", "Next.js"],
  "industry": "SaaS",
  "liveUrl": "https://techventures.com",
  "order": 1
}
```

**To add a project:** Create a new entry with a unique `id`.

**To feature on homepage:** Set `"featured": true`.

**Aspect ratio options:** `"wide"` (16:9), `"tall"` (3:4), `"square"` (1:1).

---

## 6. Editing Testimonials

**File:** `content/data/testimonials.json`

```json
{
  "id": "ali-raza",
  "name": "Ali Raza",
  "role": "CEO",
  "company": "TechVentures",
  "quote": "Working with Nova completely transformed...",
  "avatar": "/images/testimonial-1.jpg",
  "rating": 5,                  // 1-5 stars
  "metrics": "+40% conversions", // Optional — shows as badge
  "featured": true,
  "order": 1
}
```

**To hide a testimonial:** Set `"featured": false` — it stays in the file but won't display in the carousel.

**To remove permanently:** Delete the entry.

---

## 7. Editing FAQ Questions

**File:** `content/data/faq.json`

```json
{
  "id": "timeline",
  "question": "How long does a typical project take?",
  "answer": "Most web design projects take 4–10 weeks...",
  "order": 1,
  "category": "general"         // "general", "pricing", "services", "process"
}
```

Categories are used for future filtering. Currently all questions display together.

---

## 8. Editing Process Steps

**File:** `content/data/process.json`

```json
{
  "id": 1,
  "title": "Discovery",
  "duration": "2 weeks",
  "description": "We learn everything about your business...",
  "items": [
    "Market research",
    "Competitor analysis"
  ]
}
```

Currently 4 steps (1-4). You can add more by incrementing the `id`.

---

## 9. Editing Team Members

**File:** `content/data/team.json`

```json
{
  "id": "founder-1",
  "name": "Ahmed Hassan",
  "role": "Founder & Creative Director",
  "bio": "Visionary designer with 10+ years...",
  "image": "/images/team-1.jpg",
  "linkedIn": "https://linkedin.com/in/ahmedhassan",
  "order": 1
}
```

**To add a member:** Create a new entry with a unique `id`.

**To remove:** Delete the entry.

---

## 10. Editing Why Choose Us

**File:** `content/data/why-choose-us.json`

```json
{
  "title": "Results-Driven",
  "description": "Every pixel is designed to convert...",
  "icon": "Target"              // Lucide icon name
}
```

**Icon names:** Use PascalCase from [Lucide Icons](https://lucide.dev/icons).

---

## 11. Editing Industries Served

**File:** `content/data/industries.json`

```json
{
  "id": "restaurant",         // Unique identifier
  "title": "Restaurants & Cafes",
  "icon": "UtensilsCrossed",    // Lucide icon name
  "count": "8+ projects",       // Display badge
  "description": "Digital menus, online ordering..."
}
```

To add an industry: Copy an existing entry with a unique `id`.

---

## 12. Editing Technologies

**File:** `content/data/technologies.json`

```json
{
  "name": "Next.js",           // Display name
  "category": "Frontend"        // Grouping category (not displayed)
}
```

Technologies are displayed as a tag cloud. Categories help organize them for future filtering.

---

## 13. Editing Pricing Tiers

**File:** `content/data/pricing.json`

```json
{
  "id": "starter",
  "name": "Starter",
  "price": "PKR 150,000",
  "description": "Perfect for small businesses...",
  "features": ["5-Page Website", "Responsive Design"],
  "isFeatured": false,         // Highlights this tier
  "cta": "Get Started"          // Button text
}
```

Only one tier should have `"isFeatured": true` — it gets visual emphasis.

---

## 14. Editing About Page

**File:** `content/data/about.json`

```json
{
  "story": {
    "heading": "Digital Excellence, Crafted in Lahore",
    "paragraphs": [              // Each item = one paragraph
      "Nova Webs was founded...",
      "We bridge that gap..."
    ],
    "image": "/images/about-studio.jpg",
    "founded": "2021",
    "location": "Lahore, Pakistan"
  }
}
```

To add a paragraph, add a new string to the `paragraphs` array.

---

## 15. Managing the Blog

### Adding a New Blog Post

1. Create a new `.mdx` file in `content/blog/`
2. Name it with a URL-friendly slug: `my-new-post.mdx`
3. Add frontmatter (the section between `---` markers):

```mdx
---
title: "Your Post Title"
description: "A brief description for search results and previews."
date: "2026-07-20"
author: "Ahmed Hassan"
authorRole: "Founder & Creative Director"
authorImage: "/images/team-1.jpg"
category: "Web Design"
tags: ["Web Design", "Business", "Lahore"]
image: "/images/blog-4.jpg"
readingTime: "4 min read"
featured: false
---

Your content here using **markdown**.

## Subheadings

- Bullet points
- More bullets

[Links](/booking) work normally.
```

### Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | ✅ | Post title (also used for SEO) |
| `description` | ✅ | Meta description (150-160 chars) |
| `date` | ✅ | Publication date (YYYY-MM-DD) |
| `author` | ✅ | Author display name |
| `authorRole` | ✅ | Author's role at Nova |
| `authorImage` | ✅ | Path to author photo |
| `category` | ✅ | Category slug for filtering |
| `tags` | ✅ | Array of tag strings |
| `image` | ✅ | Featured image path |
| `readingTime` | ✅ | Display text like "5 min read" |
| `featured` | ✅ | `true` or `false` |

### Editing a Blog Post

Open the `.mdx` file, edit the frontmatter or content. Save and redeploy.

### Removing a Blog Post

Delete the `.mdx` file. The post will disappear from all listings.

---

## 16. Managing Legal Pages

Legal pages are individual page files under `src/app/`. They contain their own HTML content.

| Page | File | Editable Content |
|------|------|-----------------|
| Privacy Policy | `src/app/privacy/page.tsx` | Policy sections in JSX |
| Terms of Service | `src/app/terms/page.tsx` | Terms sections |
| Cookie Policy | `src/app/cookie-policy/page.tsx` | Cookie information |
| Disclaimer | `src/app/disclaimer/page.tsx` | Disclaimer text |
| Refund Policy | `src/app/refund-policy/page.tsx` | Refund terms |
| Accessibility | `src/app/accessibility/page.tsx` | Accessibility statement |

To edit a legal page, open the file and modify the text inside the `<div className="space-y-6">` section.

> **Future improvement:** Legal pages can be moved to `content/pages/` as JSON or MDX files for fully code-free editing.

---

## 17. Managing Images

### Image Locations

| Type | Path | Format |
|------|------|--------|
| Portfolio | `public/images/portfolio-*.jpg` | JPEG, 1600×900px |
| Testimonials | `public/images/testimonial-*.jpg` | JPEG, 200×200px |
| Team | `public/images/team-*.jpg` | JPEG, 400×400px |
| Client logos | `public/images/client-*.svg` | SVG |
| Blog | `public/images/blog-*.jpg` | JPEG, 1200×630px |
| OG Image | `public/images/og.jpg` | JPEG, 1200×630px |
| Icons | `public/images/icon-*.png` | PNG, 192/512px |

### Adding a New Image

1. Place the image file in `public/images/`
2. Reference it in the content JSON as `/images/your-file.jpg`
3. Redeploy

### Image Best Practices

- Use **JPEG** for photos (good quality, small size)
- Use **SVG** for logos and icons (scalable, tiny size)
- Use **PNG** only when transparency is needed
- **Compress images** before adding them (use Squoosh, TinyPNG, or ImageOptim)
- **Max width:** 1600px for full-width images
- **File size target:** Under 200KB per image

---

## 18. Adding Social Media Links

**File:** `content/data/site.json` → `socialLinks`

```json
"socialLinks": [
  { "platform": "Instagram", "url": "https://instagram.com/novawebs", "icon": "Instagram", "label": "Follow us on Instagram" }
]
```

**To add a new platform:** Add a new object to the array. Use the PascalCase name from [Lucide Icons](https://lucide.dev/icons) for the `icon` field.

**Supported icon platforms:** Instagram, Linkedin, Youtube, Music2 (TikTok), MessageCircle (WhatsApp), Facebook, Twitter, Globe, etc.

---

## 19. Contact Information

**File:** `content/data/site.json` → `contact`

All contact info is editable here. Changes take effect site-wide:

- **Phone** — Used in footer, contact page, and `tel:` links
- **Email** — Used in footer, contact page, and `mailto:` links
- **Address** — Used in footer, contact page, and Google Maps
- **WhatsApp** — Floating button and all WhatsApp links
- **WhatsApp message** — Pre-filled message when users click WhatsApp

---

## 20. Navigation Changes

**File:** `content/data/site.json` → `navigation`

```json
"links": [
  { "label": "Services", "href": "/services", "children": [...] },
  { "label": "Portfolio", "href": "/portfolio" }
]
```

**To add a nav item:** Add a new object to the array.

**To add a dropdown:** Add a `children` array with sub-items.

**To remove:** Delete the item from the array.

---

## 21. Future CMS Migration Path

When you outgrow JSON files, you can migrate to a headless CMS:

### Option 1: Decap CMS (Recommended for simplicity)
- Open-source, Git-based CMS
- Edits JSON files directly through a web interface
- Zero backend required
- Authentication via GitHub/GitLab

**Migration steps:**
1. Install `decap-cms` npm package
2. Create `public/admin/index.html` with CMS config
3. Decap CMS reads/writes the same `content/data/*.json` files
4. No code changes to the site needed

### Option 2: Sanity / Strapi (For advanced needs)
- Full headless CMS with API
- Replaces `src/lib/content.ts` to fetch from CMS API instead of JSON files

**Migration steps:**
1. Set up Sanity/Strapi project
2. Create content models matching the JSON structure
3. Update `src/lib/content.ts` to use CMS API calls
4. No changes to section components needed

### Option 3: Contentlayer (Deprecated — use alternative)
- If using a static-site approach, consider `next-mdx-remote` or similar

---

## 22. Troubleshooting

### "The site doesn't show my changes"

1. **Did you save the file?** Check that the JSON file has been saved
2. **Did you redeploy?** Changes to `content/` files require a rebuild:
   ```bash
   npm run build
   ```
   Or push to Git to trigger auto-deploy on Vercel
3. **Is the JSON valid?** Use [JSONLint](https://jsonlint.com/) to validate

### "My images aren't showing"

1. Check the file exists in `public/images/`
2. Check the path in the JSON file starts with `/images/`
3. File names are case-sensitive: `/images/Portfolio-1.jpg` ≠ `/images/portfolio-1.jpg`

### "The build is failing"

Common causes:
- Missing comma in JSON (validate with JSONLint)
- Missing closing bracket or brace
- Referenced an image that doesn't exist

### "I want to change the design, not just the content"

Design changes require editing component files in `src/`. For significant design changes, consult a developer.

---

## Quick Reference

| What do you want to change? | File to edit | Section |
|----------------------------|-------------|---------|
| Company name, tagline | `content/data/site.json` | `site` |
| Hero headline, CTAs | `content/data/site.json` | `hero` |
| Navigation links | `content/data/site.json` | `navigation` |
| Announcement bar | `content/data/site.json` | `announcementBar` |
| Stat counters | `content/data/site.json` | `stats` |
| Client logos | `content/data/site.json` | `trustBar.logos` |
| Social media links | `content/data/site.json` | `socialLinks` |
| Contact info (phone, email, address, WhatsApp) | `content/data/site.json` | `contact` |
| Trust badges (footer) | `content/data/site.json` | `trustBadges` |
| Services offered | `content/data/services.json` | `services` |
| Portfolio projects | `content/data/portfolio.json` | `projects` |
| Client testimonials | `content/data/testimonials.json` | `testimonials` |
| FAQ questions | `content/data/faq.json` | `questions` |
| Process steps | `content/data/process.json` | `steps` |
| Team members | `content/data/team.json` | `members` |
| Why choose us points | `content/data/why-choose-us.json` | `reasons` |
| Industries served | `content/data/industries.json` | `industries` |
| Technologies list | `content/data/technologies.json` | `technologies` |
| Pricing tiers | `content/data/pricing.json` | `tiers` |
| About page story | `content/data/about.json` | `story` |
| Blog posts | `content/blog/*.mdx` | Entire file |
| Legal page text | `src/app/*/page.tsx` | JSX content |

---

*Document maintained by the Nova Webs Engineering Team*  
*"Digital Excellence, Crafted."*
