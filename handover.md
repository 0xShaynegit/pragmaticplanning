# Pragmatic Planning   Handover

**Date:** 05 June 2026  
**Status:** Ready for deployment (analytics token pending)

---

## Recent Changes

### Timeframe Update (05 June)
Doubled all service timeframes to reflect realistic resource consent durations post-Planning Bill 2026:
- Service promise: **16-24 weeks** (was 8-12 weeks)
- Industry baseline: **24 months** (was 12 months)

**Files updated:**
- `index.html`: Meta descriptions (SEO), OG tags, Twitter Card, hero copy, outcome card

---

## Pre-Deployment Checklist

✅ All content locked  
✅ All pages built and tested  
✅ Analytics script inserted (token placeholder in place)  
✅ SEO tags complete (schema, sitemap, robots.txt)  
⏳ **Pending:** Replace `"REPLACE_WITH_TOKEN"` with actual Cloudflare Web Analytics token  

---

## Token Replacement (Before Going Live)

In `index.html`, line 80:
```html
<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "REPLACE_WITH_TOKEN"}'></script>
```

Replace `"REPLACE_WITH_TOKEN"` with Richard's Cloudflare Web Analytics token, then deploy.

---

## Deployment

1. Replace analytics token
2. Upload to Cloudflare Pages
3. Verify domain (pragmaticplanning.co.nz)
4. Test Core Web Vitals and 404 handling

---

## Next Session

- Confirm analytics token received from Richard
- Final live check (mobile responsiveness, font rendering, form submission)
- Monitor first 48hrs post-launch
