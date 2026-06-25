# FITBOX — Custom T-Shirt & Apparel Brand

A modern fashion-tech storefront for **FITBOX**: premium custom apparel, streetwear
drops, a real-time custom T-shirt builder, a gamified mystery box, and a community
designer marketplace. Made & printed in India 🇮🇳.

> This repository contains two things:
> 1. **`project/`** — the actual web app (Next.js 14, runnable, production-built).
> 2. **Design docs** (`00_Orchestrator.md` … `07_Guide.md`, `ecomm_01.md`) — the full
>    product/architecture/design specification that describes the production target.

---

## 🚀 Quick start (the app)

```bash
cd project
npm install
npm run dev      # http://localhost:3032
```

Other scripts (run inside `project/`):

| Script | What it does |
|--------|--------------|
| `npm run dev` | Start the dev server on port 3032 |
| `npm run build` | Production build (static export → `project/out/`) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (`next/core-web-vitals`) |
| `npm run typecheck` | TypeScript type-check (`tsc --noEmit`) |
| `npm test` | Run the Vitest unit suite |
| `npm run test:watch` | Vitest in watch mode |

---

## ✨ Features

- **Storefront** — homepage (new arrivals, trending, drops, collections, reviews),
  shop with filters (category / collection / price / size / fit / sort), product detail
  pages with gallery, size/colour selectors, fabric details, and reviews.
- **Custom T-Shirt Builder** (`/customize`) — 6-step flow: pick style → colour → add
  design (upload image/logo, AI-generate, templates) → add text → live front/back/360°
  preview → add to cart.
- **Mystery Box** (`/mystery-box`) — gamified: pick category → tier (Bronze/Silver/Gold)
  → animated unboxing → "wear the fit".
- **Collections** (`/collections`) — curated streetwear / creator / gym / college lines.
- **Cart & Checkout** — persistent cart, coupons (`FITBOX10`, `FLAT200`), gift cards
  (`GIFT500`), and a Razorpay-style UPI/Card/Net-Banking/Wallet checkout flow.
- **Info pages** — drops, account, order tracking, about, designer programme, shipping,
  returns, size guide, careers, privacy, terms, accessibility.

---

## 🧱 Tech stack (app)

Next.js 14 (App Router, **static export**) · React 18 · TypeScript (strict) ·
Tailwind CSS · Framer Motion · Zustand (cart + builder state) · Lucide icons ·
Cabinet Grotesk (headings) + Inter (body) · Vitest + Testing Library.

**Design tokens:** orange `#FF6B00` accent · `#F8F8F8` background · `#1A1A1A` ink ·
`#00C853` success. Prices are stored as integer **INR paise** and formatted with
`Intl.NumberFormat('en-IN')`.

> **Note:** the app is currently a **frontend with mock data** (`project/src/lib`) and is
> built as a static export — checkout, AI design generation, and mystery-box purchase are
> client-side mock flows. The full production architecture (Supabase, Razorpay + Stripe,
> Resend, and a Node/Express "Studio API" on Railway for AI/preview rendering) is
> specified in the design docs and `project/.env.example`.

---

## 🧪 Tests

65 unit tests cover the money/paise helpers, the Zustand cart & builder stores, and the
catalog / collections / mystery-box / builder / reviews data layers.

```bash
cd project && npm test
```

---

## 📁 Repository layout

```
.
├── 00_Orchestrator.md … 07_Guide.md   # product + architecture + design spec
├── ecomm_01.md                        # source prompt / platform variations
├── Assets/                            # original product photography
└── project/                          # the Next.js app
    ├── src/app/                      # routes
    ├── src/components/               # UI (layout, product, builder, mystery-box, …)
    ├── src/lib/                      # mock data + helpers
    ├── src/store/                    # Zustand stores (cart, builder)
    └── public/products/              # product images
```

## 🚢 Deploy

The app is a static export. Build with `cd project && npm run build` and deploy the
generated `project/out/` to any static host (Vercel, Netlify, GitHub Pages, S3, …).
On Vercel, set the **Root Directory** to `project`.

## License

MIT — see [LICENSE](LICENSE).
