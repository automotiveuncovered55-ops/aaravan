# AAVARAN — Indian restaurant website (portfolio concept)

A static, multi-page restaurant website: Home, About, Menu, and Reservations & Contact.
Plain HTML, CSS and JavaScript — **no build step, no dependencies.**

> **AAVARAN is a fictional brand.** The address, phone, email, prices, testimonial and story are demo content.

## Run locally
```bash
python3 -m http.server 8000      # then open http://localhost:8000
```
(Opening `index.html` directly also works, but a local server is closer to how GitHub serves it.)

## Deploy to GitHub Pages (free)
1. Create a new **public** repository on GitHub (e.g. `aavaran-website`).
2. Upload everything in this folder to the **root** of the repo
   (web: *Add file → Upload files*; **include the hidden `.nojekyll` file**, or use git):
   ```bash
   git init
   git add .
   git commit -m "Add AAVARAN website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```
3. In the repo go to **Settings → Pages**. Under *Build and deployment* choose
   **Source: Deploy from a branch**, **Branch: `main`**, **Folder: `/ (root)`**, then **Save**.
4. After a minute your site is live at `https://YOUR-USERNAME.github.io/YOUR-REPO/`.

All links and assets are relative, so it works on a project URL like the one above and on a custom domain.

## Before you call it finished — replace these placeholders
| What | Where |
|---|---|
| Brand name, address, phone, email, WhatsApp, hours, Instagram | `data/restaurant-config.js` (empty phone/WhatsApp/Instagram hide their buttons) |
| Real site URL in the sitemap and robots file | `sitemap.xml`, `robots.txt` (search for `YOUR-USERNAME`) |
| Social-share image | `og:image` meta tag in each `.html` file — change `assets/images/og/og-aavaran.jpg` to the **full URL**, e.g. `https://YOUR-USERNAME.github.io/YOUR-REPO/assets/images/og/og-aavaran.jpg` (social sites need an absolute URL) |
| Demo notice banner | `demoNotice` in `data/restaurant-config.js` — clear it for a real restaurant |

## Editing content
- **Menu** (dishes, prices, descriptions, veg/non-veg, photo, alt text): `data/menu-data.js`.
  Keep each `img` as a full literal path such as `"assets/images/menu/dish-chaat.webp"`.
- **Photos:** `assets/images/…` — replace a file with a new one of the same name (WebP recommended).
  Menu thumbnails (≈560px square) live in `assets/images/menu/`.
- **Colours, fonts, spacing:** `assets/styles.css` (design tokens at the top).
- **Header, footer, menu tabs, form logic:** `assets/site.js`.
- **Page copy:** `index.html`, `about.html`, `menu.html`, `contact.html`.

## What works / what is demo-only
- Works: navigation, mobile menu, menu tabs, form validation, email draft links, scroll reveal, reduced-motion support.
- **Demo-only:** the reservation, contact and newsletter forms **do not send anything**. After validation they show a truthful "demo" message and offer an email draft (and WhatsApp, if configured). No booking is ever shown as confirmed.
  To take real bookings, connect a booking service (e.g. a form backend or reservations platform) and replace the handlers in `assets/site.js`.

## Notes
- Fonts are bundled locally (Playfair Display, DM Sans, Pinyon Script — SIL Open Font License; licences in `assets/fonts/`).
- Photos were AI-generated for this concept. Check the terms of your image tool before commercial use.
- Not yet done: Restaurant structured data (JSON-LD) — add it only once real business details exist. No lightbox for the gallery.
