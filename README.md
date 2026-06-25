# FITBOX — Custom T-Shirt & Apparel Brand

A modern fashion-tech storefront for **FITBOX**: premium custom apparel, streetwear
drops, a real-time custom T-shirt builder, a gamified mystery box, and a community
designer marketplace. Made & printed in India 🇮🇳.

> The Next.js app lives at the repository root (zero-config deploy on Vercel).
> The full product/architecture/design specification is in [`docs/`](docs/).

---

## 🚀 Quick start

```bash
npm install
npm run dev      # http://localhost:3032
```

| Script | What it does |
|--------|--------------|
| `npm run dev` | Start the dev server on port 3032 |
| `npm run build` | Production build (static export → `out/`) |
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

## 🧱 Tech stack

Next.js 14 (App Router, **static export**) · React 18 · TypeScript (strict) ·
Tailwind CSS · Framer Motion · Zustand (cart + builder state) · Lucide icons ·
Cabinet Grotesk (headings) + Inter (body) · Vitest + Testing Library.

**Design tokens:** orange `#FF6B00` accent · `#F8F8F8` background · `#1A1A1A` ink ·
`#00C853` success. Prices are stored as integer **INR paise** and formatted with
`Intl.NumberFormat('en-IN')`.

> **Note:** this app is currently a **frontend with mock data** (`src/lib`) built as a
> static export — checkout, AI design generation, and mystery-box purchase are
> client-side mock flows. The full production architecture (Supabase, Razorpay + Stripe,
> Resend, and a Node/Express "Studio API" on Railway for AI/preview rendering) is
> specified in [`docs/`](docs/) and `.env.example`.

---

## 🧪 Tests

65 unit tests cover the money/paise helpers, the Zustand cart & builder stores, and the
catalog / collections / mystery-box / builder / reviews data layers.

```bash
npm test
```

---

## 📁 Layout

```
.
├── src/app/            # routes
├── src/components/     # UI (layout, product, builder, mystery-box, …)
├── src/lib/            # mock data + helpers
├── src/store/          # Zustand stores (cart, builder)
├── public/products/    # product images
└── docs/               # product + architecture + design spec, Assets/ (source photos)
```

---

## 🚢 Deploy (Vercel — zero config)

The app is at the repo root, so Vercel auto-detects Next.js — just import the repo and
deploy. It builds as a static export (`out/`). For any other static host, run
`npm run build` and serve `out/`.

## License

MIT — see [LICENSE](LICENSE).
