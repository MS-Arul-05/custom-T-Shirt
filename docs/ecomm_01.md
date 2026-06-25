---
prompt_id: ecomm_01
sub_category: E-commerce
sub_type: Custom Apparel / Fashion-Tech D2C
title: FITBOX — Custom T-Shirt & Apparel Brand
reference_patterns: streetwear_drop_layout, custom_design_builder, gamified_commerce
inspiration: nike.com / streetwear drops
quality_score:
status: draft
notes:
---

## Base Prompt

### Section 1 — Role

You are a senior product designer and engineer with 10+ years building fashion-tech and custom-apparel platforms for streetwear and D2C brands. You understand how modern apparel brands win — not only through clean product presentation, but through interactive product creation (real-time custom builders), drop culture, and gamified commerce that turns shopping into an experience. You have shipped storefronts where the customer doesn't just buy a product, they *design* it: live preview canvases, AI-assisted artwork, mystery-box unboxing, and community designer marketplaces. You design for India-first commerce (UPI/Razorpay/INR) with international support, and you know how to make a custom builder feel instant on a mid-range Android phone.

---

### Section 2 — Application Overview

FITBOX is a modern fashion-tech platform that fuses four experiences into one: a **premium streetwear store** (oversized tees, graphic tees, hoodies, drops), a **real-time Custom T-Shirt Builder** (the core USP — style → color → design → text → live front/back/360 preview), **gamified shopping** (Mystery Box unboxing), and a **community designer marketplace** (designers upload and sell their artwork). The customer is a Gen-Z / young-millennial buyer (18–30) who found FITBOX on Instagram reels, wants self-expression through what they wear, and shops on mobile with UPI.

The store is India-first (Razorpay, UPI, INR) with international support (Stripe, USD). The **primary goal is a custom design → Add to Cart / purchase** (the builder is the conversion engine); secondary goals are catalog purchase, drop signups, and email capture.

Key pages from the page map: Homepage (`/`), Shop / PLP (`/shop`, `/shop/[category]`), Product Detail (`/products/[slug]`), **Custom T-Shirt Builder** (`/customize`), Collections (`/collections`, `/collections/[slug]`), Mystery Box (`/mystery-box`, `/mystery-box/[category]`), Cart (`/cart` + drawer) and Checkout (`/checkout`, `/checkout/success`), Order Tracking (`/track`), Account (wishlist, saved designs, rewards, orders), Designer dashboard (`/designer`), and Admin (`/admin`).

---

### Section 3 — Brand Voice & Mood

The feeling is bold, youthful, confident, and energetic — premium streetwear with hype. FITBOX has attitude. Drops are events; the copy can build excitement ("Dropping Friday 6PM", "The Akatsuki drop is live"). This is the opposite of a calm, quiet brand — but it is never deceptive.

Hype is allowed; lying is not. **Limited-edition scarcity is a legitimate mechanic** — real countdowns for real drops, genuine "sold out" states, true low-stock numbers. But there are **no fake countdowns on evergreen catalog items** and no deceptive "only 1 left" on stock that is actually plentiful.

Copy is punchy and specific. Headlines name the vibe or the drop, not vague aspiration. Product copy is real and concrete — "240 GSM combed cotton, oversized fit" — never Lorem Ipsum. Exclamation and energy are fine for drops; keep it bold, not spammy.

The visual mood: modern premium streetwear. Clean off-white canvas, crisp white product cards, bold orange energy, occasional dark hero/drop blocks. Apple-level cleanliness with Nike-grade product presentation and streetwear edge.

Vibe word: **drop**.

---

### Section 4 — Core Features & Functionality

Ten core modules plus AI:

1. **Homepage** — Hero / drop banner, New Arrivals, Trending Collections, Featured Categories, Limited Edition Drops, Custom Design CTA section (into the builder), Influencer Picks, Customer Reviews, Newsletter signup, footer.
2. **Shop (PLP)** — product grid, search, filters (category, price, color, size, collection), sort.
3. **Product Details (PDP)** — image gallery, size selector, color selector, fabric details (GSM), description, related products, reviews & ratings, Add to Cart, Buy Now.
4. **Custom T-Shirt Builder (USP)** — 6 steps: (1) Choose style (Oversized / Regular / Hoodie / Polo) → (2) Choose color (White / Black / Beige / Blue / Green / Red) → (3) Add design (Upload Image / Upload Logo / AI Generate / Choose Template) → (4) Add text (custom text, font, color, alignment) → (5) Live preview (Front / Back / 360°) → (6) Add to cart.
5. **Collections** — curated: Anime, Streetwear, Gym, College, Startup, Creator.
6. **Mystery Box (gamified)** — 01 Pick category (Anime / Streetwear / Gym / Creator) → 02 Select box (Bronze / Silver / Gold) → 03 Unbox (animated reveal) → 04 "Wear the fit".
7. **User Account** — login, register, wishlist, saved designs, orders, profile, address management, rewards.
8. **Cart & Checkout** — cart management, coupon engine, gift cards; payment via UPI / cards / net banking / wallets (Razorpay) + international cards (Stripe).
9. **Order Tracking** — live tracking, shipping updates, delivery notifications.
10. **Admin Dashboard** — product management (add/update/inventory), order management (orders/refunds), customers + analytics, collections, custom-design moderation, marketing (coupons/campaigns).

**AI Features:**
- **AI Outfit / Style Recommendation** — recommends colors, collections, and styles from browsing + purchase history.
- **AI Design Generator** — generates Anime / Typography / Streetwear / Minimal artwork from a text prompt, used inside the builder. Runs on the FITBOX Studio API (Express on Railway).

---

### Section 5 — Design Specifications

**Visual style:** Modern premium streetwear. Clean off-white canvas, crisp white surfaces for cards/panels, bold orange as the single brand accent, and dark blocks for hero/drop/footer. Product photography and live builder previews are the heroes.

**Color mode:** Light only (dark blocks are surfaces, not a dark theme).

**Color palette:**
- Background: `#F8F8F8` (main page background)
- Surface / card: `#FFFFFF` (cards, panels, elevated sections)
- Dark surface: `#1A1A1A` (dark hero blocks, drop sections, footer)
- Overlay: `rgba(0,0,0,0.55)` (drawer / modal backdrop)
- Border: `rgba(26,26,26,0.08)` / focus `rgba(26,26,26,0.24)`
- Primary text: `#1A1A1A`
- Secondary text: `#6B6B6B` (metadata, labels, descriptions)
- Text on dark / accent: `#FFFFFF`
- Accent (CTA / interactive): `#FF6B00` (FITBOX orange — brand signature)
- Accent hover: `#E55F00`
- Accent light: `#FFF0E6` (badge backgrounds, selected-state fill)
- Success: `#00C853` (light `#E6F9ED`) — used for free-shipping/in-stock states

**No additional palette colors. No forest-green, no cream. Orange is the only brand accent.**

**Typography:** Cabinet Grotesk (headings/display, self-hosted via `next/font/local` — from Fontshare, NOT Google Fonts) + Inter (body/UI, via `next/font/google`).
- Display / hero heading: `clamp(40px, 6vw, 84px)`, weight 700, Cabinet Grotesk
- H1 page title: `clamp(28px, 4vw, 52px)`, weight 700, Cabinet Grotesk
- Section heading (H2): `clamp(22px, 3vw, 38px)`, weight 600, Cabinet Grotesk
- Product name (H3): `18px`, weight 600, Cabinet Grotesk
- Body / description: `16px`, weight 400, Inter, line-height 1.6
- Small / metadata: `14px`, weight 400, Inter
- Label / badge: `11px`, weight 600, letter-spacing `0.06em`, Inter (uppercase)

**Spacing:** 8pt base unit.
- Section vertical spacing: `96px` desktop, `64px` mobile
- Product grid gap: `24px` desktop, `16px` mobile
- Component internal padding: `24px` standard, `16px` compact
- Cart drawer width: `420px`

**Border radius (modern premium — softer, rounded):**
- Buttons: `8px`
- Product image cards: `12px` (rounding IS used now — modern premium)
- Inputs / dropdowns: `8px`
- Badges: `4px`
- Modals: `16px`
- Pills (category chips, filter chips, color dots): `999px`

**Responsive:** Mobile-first. Breakpoints: `640px`, `768px`, `1024px`, `1280px`. Grid: 12-column, `1360px` max-width, `24px` gutters. Product grid: 4 columns desktop, 2 columns tablet, 2 columns mobile.

**Accessibility:** WCAG AA minimum. All text on `#F8F8F8` and `#FFFFFF` must pass 4.5:1 contrast. Focus rings: `2px solid #FF6B00` with `2px` offset. Full keyboard navigation on all interactive elements.

**Motion:**
- Cart drawer slide-in: `transform translateX(100%) → translateX(0)`, `300ms ease-out`
- Mystery-box unbox reveal: signature animated reveal (scale + fade + confetti-style flourish) — **allowed**
- Custom builder transitions: smooth step-to-step and live front/back/360 preview transitions — **allowed**
- Product image hover swap: `opacity 0.2s ease`
- Forbidden: auto-advancing hero carousel, parallax, bounce easing
- All animations respect `prefers-reduced-motion: reduce` (including the mystery-box unboxing)

---

### Section 6 — Structure

**Architecture:** Multi-page Next.js storefront with a separate Studio API for AI/render. This prompt covers: Homepage, Shop/PLP, PDP, Custom Builder, Mystery Box, and Cart Drawer.

**Homepage top to bottom:**

1. **Navigation bar** — sticky, `#FFFFFF` background, `1px` bottom border `rgba(26,26,26,0.08)`. Logo left (FITBOX wordmark in `#1A1A1A`). Center links: Shop, Customize, Collections, Mystery Box, Drops. Right: search icon, account icon, cart icon with item-count badge (orange). `64px` height desktop. A prominent "Customize" / "Design Yours" entry stands out. Mobile: hamburger left, logo center, cart right.

2. **Hero / Drop** — full-width, `560px`+ height desktop, may use the dark `#1A1A1A` block. Drop or campaign visual (model in product or live builder teaser). Headline max 6 words, `clamp(40px,6vw,84px)` weight 700 Cabinet Grotesk. Real drop hook allowed ("Dropping Friday 6PM" with a *real* countdown). Primary CTA "Design Yours" → builder, secondary "Shop the Drop". `bg-[#FF6B00] text-white rounded-[8px] h-11 px-6 text-sm font-semibold`. No auto-advancing carousel.

3. **New Arrivals** — `#FFFFFF` surface. Section label `11px uppercase tracking-wide #6B6B6B`, H2, 4-column product card grid. Card: image (3:4, `rounded-[12px]`), product name `18px weight-600`, price `16px`, color swatch pills.

4. **Trending Collections** — horizontal collection tiles (Anime, Streetwear, Gym, College, Startup, Creator) each linking to `/collections/[slug]`.

5. **Featured Categories** — pill-style category navigation (Oversized, Graphic Tees, Hoodies, Anime, Streetwear…) with imagery.

6. **Limited Edition Drops** — dark `#1A1A1A` block with real drop cards: countdown (real), "Live" / "Sold out" states, stock counts that are genuine.

7. **Custom Design CTA strip** — bold orange-accented strip selling the builder USP: "Design your own tee in 60 seconds." Big "Start Designing" CTA → `/customize`. This is the highest-priority conversion entry on the home page.

8. **Influencer Picks** — curated grid of creator-worn fits / tagged products.

9. **Customer Reviews** — rating summary + review cards (star rating in orange, verified-purchase tag).

10. **Newsletter signup** — centered, `#FFFFFF` or dark block, inline input + "Get Drops" button. "Get drop alerts. No spam." in tertiary text. No pop-up — inline only.

11. **Footer** — `#1A1A1A` dark, 4 columns: Shop, Customize, Company, Social. Links `14px` hover to white. Bottom row: copyright + payment icons (UPI, Razorpay, Visa). India address / INR.

**Shop / PLP structure:**
- Filter bar sticky below nav: category pills (`rounded-full`), color dots, size chips (XS–XXXL), collection filter, sort dropdown
- 4-column product grid (desktop), 2-column (mobile)
- Product card: image (`rounded-[12px]`, hover to second image), name, price, color swatches, badge (new / bestseller / drop / restock), "Quick add" ghost button on hover
- **Load more** button (not infinite scroll)

**PDP structure:**
- Left: image gallery (4 images, thumbnail strip below), each `rounded-[12px]`
- Right: breadcrumb, product name H1, price (INR), color selector (labeled swatch pills), size selector (button grid XS–XXXL, selected = orange), size-guide link (cm chart), fabric/GSM callout ("240 GSM combed cotton"), "Add to Cart" primary full-width orange + "Buy Now", description, care-instructions accordion, shipping/returns accordion (note: catalog returnable 7 days; custom & mystery items non-returnable)
- Below fold: "You may also like" 4-card row + reviews & ratings

**Custom Builder structure (`/customize`) — 6-step stepper:**
- Top: horizontal stepper (1 Style · 2 Color · 3 Design · 4 Text · 5 Preview · 6 Cart), current step in orange
- Left/main: large live preview canvas (the garment with placed layers)
- Right/controls panel per step:
  - **Step 1 Style:** Oversized / Regular / Hoodie / Polo selector
  - **Step 2 Color:** White / Black / Beige / Blue / Green / Red color pills (preview updates instantly)
  - **Step 3 Design:** tabs — Upload Image · Upload Logo · AI Generate (prompt + style: Anime/Typography/Streetwear/Minimal, calls Studio API) · Choose Template
  - **Step 4 Text:** text input, font, text color, alignment (left/center/right), drag/scale on canvas
  - **Step 5 Preview:** Front / Back / 360° toggle, smooth transitions
  - **Step 6 Cart:** size select (XS–XXXL), computed price, Add to Cart (saves a CustomDesign; login required only to *save* a design, not to add to cart)
- Must feel instant; show server-render previews progressively, never block the canvas.

**Mystery Box flow (`/mystery-box`):**
- 01 Pick category (Anime / Streetwear / Gym / Creator) tiles
- 02 Select box tier (Bronze / Silver / Gold) with price (INR) and item count
- 03 Unbox — animated reveal (gated by reduced-motion) after purchase
- 04 "Wear the fit" — show the revealed outfit on a character/model
- Mystery Box items are clearly marked **non-returnable**.

**Cart Drawer:**
- Overlay backdrop `rgba(0,0,0,0.55)`
- Drawer: `420px` wide, full height, `#FFFFFF` background, slide from right
- Header: "Cart (n)" + close X
- Line items: product/design image `72px` (`rounded-[8px]`), name + variant ("Jet Black / L") or "Custom Design", quantity stepper `−  2  +`, remove link. Custom designs show a "Custom" tag + preview thumbnail.
- **Free shipping progress bar**: `#FFF0E6` track, `#FF6B00` fill, "You're ₹X away from free shipping" (threshold ₹1499)
- Subtotal row (INR) + "Checkout" button full-width `bg-[#FF6B00]`

---

### Section 7 — Technical Specifications

- **Framework:** Next.js 14 App Router, React 18, TypeScript strict mode (storefront, account, admin, checkout on Vercel)
- **Studio backend:** Node.js + Express ("FITBOX Studio API" on Railway) for AI design generation and server-side mockup/preview compositing (front/back/360) — heavy image work unsuitable for Vercel serverless time limits
- **Styling:** Tailwind CSS v3 with CSS variables for all color tokens in `globals.css`
- **State:** Zustand for **cart** and **custom-builder** state (cart persisted to localStorage; custom designs persisted server-side). No Redux.
- **Components:** Radix UI for dialogs, accordions, selects, tabs, sliders. Custom components for product cards, cart drawer, and builder canvas.
- **Animation:** Framer Motion for cart drawer, mystery-box unboxing, builder step/preview transitions, and scroll fades. Gate all with `useReducedMotion()`.
- **Database / Auth / Storage:** Supabase (PostgreSQL + Auth email/Google + Storage + RLS + Realtime)
- **Payments:** Razorpay (UPI, cards, net banking, wallets — India) + Stripe (international cards). Prices stored as integer paise; never trust client total — recalculate server-side; webhooks are the order source of truth.
- **Images:** Next.js `<Image>` throughout. Product images WebP, aspect ratio `3:4` (1200×1600); lifestyle/drop `16:9`.
- **Icons:** Lucide — `size={18}` / `{20}`, `strokeWidth={1.5}`.
- **Fonts:** Cabinet Grotesk via `next/font/local` (self-hosted), Inter via `next/font/google`.
- **Performance target:** Lighthouse 90+. LCP under 2.5s. No layout shift from fonts. Builder canvas interactions feel instant on mid-range mobile.

---

### Section 8 — Implementation Steps

Build in this priority order:

1. **Design tokens** — CSS variables + Tailwind config first (orange palette, 8px/12px radii, spacing). Cabinet Grotesk + Inter loaded.
2. **Navigation + Cart Drawer** — present on every page; cart + builder Zustand stores wired before product pages are useful.
3. **Homepage Hero/Drop + Catalog** (New Arrivals / collections) — first impression.
4. **PDP** — high conversion value: size selector (XS–XXXL), color selector, Add to Cart / Buy Now.
5. **Custom Builder (USP)** — the 6-step builder + live preview + Studio API preview render. This is the differentiator.
6. **Checkout (Razorpay)** — Razorpay UPI/cards primary + Stripe international; server-side price recalculation; webhook order creation.
7. **Collections + Mystery Box** — curated collections + gamified unbox flow.
8. **Designer marketplace + AI features** — designer upload/earnings + AI Design Generator + AI recommendations.
9. **Admin dashboard** — products, orders/refunds, inventory, custom-design moderation, marketing.

**Cut order if scope shrinks:** admin extras, designer marketplace, AI recommendations, mystery box. **Never cut PDP, the Custom Builder, the cart, or checkout** — they are the core funnel.

---

### Section 9 — User Experience

Aarav, 21, a college student in Mumbai, found FITBOX on Instagram reels. He wants a custom oversized anime tee with his own text. He shops on an Android phone and pays via UPI. He will bounce immediately if the builder is laggy or the preview looks fake/cheap.

He lands on the home page from a reel. The hero or Custom Design CTA strip pulls him straight into `/customize`. The builder must feel **instant**: picking a style and color updates the preview with no perceptible lag; uploading or AI-generating a design shows a real-looking front/back/360 mockup, not a flat sticker. He adds text, sees it on the garment, picks size L, and adds to cart — no forced login to add to cart.

Checkout is UPI-first via Razorpay: a couple of taps, no friction, INR amounts. Drop hunters like Sneha get **real** urgency — a genuine countdown to a Friday 6PM drop, real sold-out states — which is exciting, not manipulative. The Mystery Box delivers a dopamine hit through the unboxing reveal animation.

Friction to remove: no laggy builder, no fake preview, no forced account creation to add to cart, no chat widget covering the mobile Add to Cart / Add to Cart-on-builder button, no fake "only 1 left" on evergreen tees. Real scarcity only on real drops.

---

### Section 10 — Constraints

- **Prices in INR as integer paise** — `₹1,299` is stored `129900`. Never floats. `formatPrice(paise)` via `Intl.NumberFormat('en-IN', { currency:'INR', maximumFractionDigits:0 })`.
- **Orange brand palette only** — accent `#FF6B00`. No forest-green, no cream. Page bg `#F8F8F8`, surface `#FFFFFF`, dark `#1A1A1A`. Success green `#00C853` only for status (in-stock / free-shipping), not as a brand accent.
- **Product image radius `12px`** — cards use `rounded-[12px]` (modern premium). Buttons `8px`.
- **No auto-advancing hero carousel** — one drop / one message; real countdown allowed.
- **No infinite scroll** — "Load more" button on PLP (preserves back-button behavior).
- **No fake urgency on evergreen items** — real limited-drop scarcity (real countdowns, true sold-out, genuine low stock) is OK; never fake "Sale ends in" / "only 1 left" on plentiful catalog stock.
- **Realistic apparel copy — no Lorem Ipsum.** Use plausible names ("Akatsuki Oversized Tee", "Tokyo Drift Graphic Tee", "Midnight Streetwear Hoodie"), prices ₹699–₹2,499, and concrete fabric specs ("240 GSM combed cotton", "oversized fit").
- **Apparel sizes XS–XXXL** with a cm size chart (chest/length). No shoe sizes.
- **Custom & Mystery Box items are non-returnable** — state this; catalog items returnable 7 days.
- **Fonts:** Cabinet Grotesk (headings, local) + Inter (body, Google). Cabinet Grotesk is self-hosted, not Google Fonts.
- **No mobile chat widget** covering the Add to Cart / builder CTA below `768px`.

---

## Platform Versions

### Category A — Lovable

Build a custom T-shirt & streetwear apparel storefront for FITBOX, inspired by Nike/streetwear drop culture. This is a fashion-tech D2C brand whose USP is a real-time custom T-shirt builder, plus drops, a gamified Mystery Box, and a designer marketplace. India-first (UPI/INR).

**Design system:**
Background `#F8F8F8`, card surface `#FFFFFF`, dark blocks `#1A1A1A`, borders `rgba(26,26,26,0.08)`, primary text `#1A1A1A`, secondary text `#6B6B6B`, accent orange `#FF6B00` (hover `#E55F00`, light `#FFF0E6`), success `#00C853`. Fonts: Cabinet Grotesk (headings, self-hosted local) + Inter (body, Google). Button radius `8px`. Product image cards `rounded-[12px]`. Section spacing `96px`.

**Build these components in order:**

**Navigation** — sticky, `64px` height, white, `1px` bottom border. FITBOX wordmark left. Center links: Shop, Customize, Collections, Mystery Box, Drops. Right: search, account, cart icon with orange item-count badge. Mobile: hamburger left, logo center, cart right.

**Homepage Hero / Drop** — full-width `560px` tall, may use dark `#1A1A1A` block. Drop visual + headline max 6 words `clamp(40px,6vw,84px)` weight 700 Cabinet Grotesk. Real drop hook allowed ("Dropping Friday 6PM" + real countdown). Primary CTA "Design Yours" → builder `bg-[#FF6B00] text-white rounded-[8px] h-11 px-6 text-sm font-semibold`; secondary "Shop the Drop". No auto carousel.

**New Arrivals** — `#FFFFFF`. Section label `11px uppercase tracking-wide #6B6B6B`. 4-column product grid (2 on mobile). Product card: image `aspect-[3/4] rounded-[12px]`, name `18px weight-600 #1A1A1A`, price `16px` INR, color swatch pills, badge (new/drop).

**Custom Design CTA strip** — bold orange-accented strip: "Design your own tee in 60 seconds." Big "Start Designing" → `/customize`.

**Cart Drawer** — slide-in from right `420px`. Line items: image + name + variant (or "Custom Design" tag) + quantity stepper + remove. Free shipping progress bar (`#FFF0E6` track, `#FF6B00` fill, threshold ₹1499). Subtotal (INR) + "Checkout" button.

**PDP** — left image gallery (4 images `rounded-[12px]` + thumbnail strip), right: product name H1, price INR, color selector, size button grid XS–XXXL (selected = orange), fabric/GSM callout, "Add to Cart" full-width `bg-[#FF6B00]` + "Buy Now", care accordion.

**Custom Builder (`/customize`)** — 6-step stepper (Style → Color → Design → Text → Preview → Cart), live preview canvas, AI Generate option. Checkout uses Razorpay (UPI/cards) for India + Stripe international.

Copy: realistic apparel text only ("Akatsuki Oversized Tee", "240 GSM combed cotton", ₹699–₹2499). No Lorem Ipsum. No fake urgency on evergreen items. No auto carousel. No infinite scroll.

---

### Category A — ChatGPT Canvas

Build a full custom-apparel e-commerce storefront for FITBOX. Use React with TypeScript, Tailwind CSS, and Zustand for cart + custom-builder state.

FITBOX sells premium streetwear (oversized tees, graphic tees, hoodies) and its USP is a real-time custom T-shirt builder, plus a gamified Mystery Box and designer marketplace. India-first (UPI/Razorpay/INR). Target customer: 18–30, Gen-Z, mobile, found the brand on Instagram reels.

**Design:** Clean modern streetwear. Background `#F8F8F8`, card surface `#FFFFFF`, dark blocks `#1A1A1A`, accent orange `#FF6B00`, text `#1A1A1A`. Fonts: Cabinet Grotesk (headings, self-hosted) + Inter (body, Google). Buttons `8px` radius. Product image cards `rounded-[12px]`.

**Pages to build:**
- `/` — Homepage: nav, hero/drop, new arrivals, trending collections, custom-design CTA strip, reviews, newsletter, footer
- `/shop` — PLP: filter bar, 4-column grid, product cards with hover states
- `/products/[slug]` — PDP: image gallery, size/color selectors, fabric callout, add to cart
- `/customize` — Custom T-shirt Builder: 6-step stepper + live preview
- Cart drawer component (accessible from any page via nav cart icon)

**Cart state (Zustand) — supports custom designs:**
```typescript
interface CustomDesign {
  id: string
  baseStyle: 'oversized' | 'regular' | 'hoodie' | 'polo'
  baseColorName: string
  baseColorHex: string
  previewFront: string
  previewBack?: string
}

interface CartItem {
  id: string            // productId or customDesignId
  type: 'product' | 'custom' | 'mystery_box'
  name: string
  price: number         // paise (INR)
  size: string          // 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL'
  color: string
  quantity: number
  image: string
  custom?: CustomDesign // present when type === 'custom'
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: CartItem) => void
  removeItem: (id: string, size: string, color: string) => void
  updateQuantity: (id: string, size: string, color: string, qty: number) => void
  toggleCart: () => void
}
```

Use realistic product data (not Lorem Ipsum): "Akatsuki Oversized Tee", "Tokyo Drift Graphic Tee", "Midnight Streetwear Hoodie". Prices ₹699–₹2499 (stored in paise). Fabric must be specific: "240 GSM combed cotton" not "premium materials".

Free shipping threshold: ₹1499 (149900 paise). Show progress bar in cart drawer. Checkout via Razorpay (UPI/cards) for India + Stripe international. No fake urgency on evergreen items (real drop countdowns OK). No auto carousel. No infinite scroll on PLP.

---

### Category A — Bolt

Build a React + TypeScript application using Vite and Tailwind CSS. This is FITBOX — a custom T-shirt & streetwear storefront with a real-time custom builder (USP), drops, and a gamified Mystery Box.

**Tech:** Vite, React 18, TypeScript, Tailwind CSS, Zustand (cart + builder state), Framer Motion (cart drawer, builder transitions, mystery-box unbox).

**Design tokens in tailwind.config.ts:**
```typescript
colors: {
  bg: { primary: '#F8F8F8', surface: '#FFFFFF', dark: '#1A1A1A' },
  text: { primary: '#1A1A1A', secondary: '#6B6B6B', tertiary: 'rgba(26,26,26,0.35)', onDark: '#FFFFFF' },
  border: 'rgba(26,26,26,0.08)',
  accent: { DEFAULT: '#FF6B00', hover: '#E55F00', light: '#FFF0E6' },
  success: { DEFAULT: '#00C853', light: '#E6F9ED' },
}
```

**Components:**

`Navbar` — sticky, `h-16`, white, `border-b border-[rgba(26,26,26,0.08)]`. FITBOX wordmark left. Links center (Shop, Customize, Collections, Mystery Box, Drops). Search + account + cart icons right with orange cart-count badge.

`Hero` — `h-[560px]` relative, optionally `bg-[#1A1A1A]`. Drop visual with object-cover. Headline `text-[clamp(40px,6vw,84px)] font-bold leading-[1.05]` (Cabinet Grotesk). Primary CTA "Design Yours" `bg-[#FF6B00] hover:bg-[#E55F00] text-white rounded-[8px] h-11 px-6 text-sm font-semibold`. Real drop countdown allowed; no auto carousel.

`ProductCard` — accepts `{ name, price, colors, images: [string, string], badge? }`. Image `aspect-[3/4] rounded-[12px] overflow-hidden`. Hover swaps to `images[1]` with `opacity` transition `0.2s`. Color swatches `w-[14px] h-[14px] rounded-full border border-black/10`. Price formatted INR. Quick-add ghost button on hover.

`CartDrawer` — Framer Motion `AnimatePresence`. Drawer `w-[420px] h-screen fixed right-0 top-0 bg-white`. Backdrop `bg-black/55`. Custom-design line items show a "Custom" tag. Free shipping bar: `div` with `bg-[#FFF0E6]` track, `bg-[#FF6B00]` fill, width `${Math.min(100,(subtotal/149900)*100)}%`, label "You're ₹X away from free shipping".

`PDP` — left `grid` image gallery with thumbnails (`rounded-[12px]`). Right: size buttons XS–XXXL `border border-[rgba(26,26,26,0.08)] rounded-[8px] h-10 px-4 text-sm`, selected `border-[#FF6B00] bg-[#FFF0E6] text-[#FF6B00]`. Add to Cart `w-full bg-[#FF6B00] text-white rounded-[8px] h-12 font-semibold`. Fabric callout "240 GSM combed cotton".

`CustomBuilder` (`/customize`) — 6-step stepper (Style → Color → Design → Text → Preview → Cart), current step pill in `bg-[#FF6B00] text-white rounded-full`. Live preview canvas; color/style change updates preview instantly. AI Generate tab. Checkout via Razorpay.

No Lorem Ipsum. No auto carousel. No fake urgency on evergreen items. No infinite scroll. Gate all Framer Motion (incl. mystery-box unbox) with `useReducedMotion()`.

---

### Category A — v0

Create a Next.js 14 App Router custom-apparel storefront for FITBOX. Use Tailwind CSS, shadcn/ui, and Radix UI primitives.

**Globals.css tokens:**
```css
:root {
  --bg-primary: #F8F8F8;
  --bg-surface: #FFFFFF;
  --bg-dark: #1A1A1A;
  --bg-overlay: rgba(0, 0, 0, 0.55);
  --border: rgba(26, 26, 26, 0.08);
  --border-focus: rgba(26, 26, 26, 0.24);
  --text-primary: #1A1A1A;
  --text-secondary: #6B6B6B;
  --text-tertiary: rgba(26, 26, 26, 0.35);
  --text-on-dark: #FFFFFF;
  --accent: #FF6B00;
  --accent-hover: #E55F00;
  --accent-light: #FFF0E6;
  --success: #00C853;
  --success-light: #E6F9ED;
  --radius-btn: 8px;
  --radius-card: 12px;
}
```

**Component specs:**

`<Navbar />` — sticky, `h-16 border-b border-[var(--border)] bg-[var(--bg-surface)]`. FITBOX wordmark left. shadcn NavigationMenu center (Shop, Customize, Collections, Mystery Box, Drops). Icons right: `<Search />` `<User />` `<ShoppingBag />` Lucide `size={18} strokeWidth={1.5}`. Cart count: `absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[var(--accent)] text-white text-[10px] flex items-center justify-center`.

`<Hero />` — `relative h-[560px]`, may use `bg-[var(--bg-dark)]`. `<Image fill className="object-cover" priority>`. Text `absolute left-16 bottom-16`. Headline Cabinet Grotesk `font-bold`. CTA "Design Yours" `bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-[var(--radius-btn)] h-11 px-6 text-sm font-semibold transition-colors duration-150`. Real drop countdown allowed; no auto carousel.

`<ProductCard />` — `group cursor-pointer`. Image `aspect-[3/4] rounded-[var(--radius-card)] overflow-hidden`. Second image on `group-hover:opacity-100 opacity-0 transition-opacity duration-200 absolute inset-0`. Color swatches `flex gap-1.5 mt-2` (`rounded-full`). Name `text-[18px] font-semibold mt-3`. Price `text-sm text-[var(--text-secondary)]` formatted INR.

`<CartDrawer />` — Radix Dialog. Slide from right `data-[state=open]:animate-in slide-in-from-right duration-300`. Custom items show a "Custom" badge. Free shipping progress: shadcn `<Progress>` with `bg-[var(--accent)]`, threshold ₹1499.

`<SizeSelector />` — `grid grid-cols-4 gap-2`, sizes XS–XXXL. Each: `border border-[var(--border)] rounded-[var(--radius-btn)] h-10 text-sm font-medium`. Selected: `border-[var(--accent)] bg-[var(--accent-light)] text-[var(--accent)]`. Disabled: `opacity-40 cursor-not-allowed line-through`.

`<CustomBuilder />` (`/customize`) — 6-step stepper (Style → Color → Design → Text → Preview → Cart). Live preview via Radix Tabs (Front/Back/360°). AI Generate calls the Studio API. Checkout via Razorpay.

No hardcoded hex in JSX — CSS variables only. No Lorem Ipsum. No fake urgency on evergreen items. All images via `next/image`. Cabinet Grotesk via `next/font/local`, Inter via `next/font/google`.

---

### Category B — Claude Artifacts

You are building FITBOX — a custom T-shirt & streetwear apparel storefront with a real-time custom builder (USP), drops, gamified Mystery Box, and a designer marketplace. This is a Next.js 14 App Router project with TypeScript strict mode, Tailwind CSS, Zustand, and Framer Motion already installed. India-first (UPI/Razorpay/INR).

**Project folder structure:**
```
src/
├── app/
│   ├── layout.tsx           # Root layout: Navbar + CartDrawer always mounted
│   ├── page.tsx             # Homepage
│   ├── globals.css          # CSS variables + base styles
│   ├── shop/
│   │   └── page.tsx         # PLP
│   ├── products/
│   │   └── [slug]/
│   │       └── page.tsx     # PDP
│   ├── customize/
│   │   └── page.tsx         # Custom T-shirt Builder (USP)
│   └── mystery-box/
│       └── page.tsx         # Mystery Box landing + unbox
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── cart/
│   │   ├── CartDrawer.tsx
│   │   ├── CartItem.tsx
│   │   └── ShippingProgress.tsx
│   ├── product/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ImageGallery.tsx
│   │   ├── SizeSelector.tsx
│   │   ├── ColorSelector.tsx
│   │   └── AddToCartButton.tsx
│   ├── builder/
│   │   ├── BuilderStepper.tsx
│   │   ├── BuilderCanvas.tsx     # live front/back/360 preview
│   │   ├── StyleStep.tsx
│   │   ├── ColorStep.tsx
│   │   ├── DesignStep.tsx        # upload / logo / AI generate / template
│   │   └── TextStep.tsx
│   └── home/
│       ├── Hero.tsx
│       ├── NewArrivals.tsx
│       ├── CustomDesignCTA.tsx
│       └── Newsletter.tsx
├── store/
│   ├── cart.ts              # Zustand cart store
│   └── builder.ts           # Zustand custom-builder store
├── lib/
│   ├── motion.ts            # Framer Motion variants
│   ├── format.ts            # formatPrice(paise) → ₹
│   └── products.ts          # Mock product data
└── types/
    └── index.ts             # Shared types
```

**globals.css (define first, use everywhere):**
```css
:root {
  --bg-primary: #F8F8F8;
  --bg-surface: #FFFFFF;
  --bg-dark: #1A1A1A;
  --bg-overlay: rgba(0, 0, 0, 0.55);
  --border: rgba(26, 26, 26, 0.08);
  --text-primary: #1A1A1A;
  --text-secondary: #6B6B6B;
  --text-tertiary: rgba(26, 26, 26, 0.35);
  --text-on-dark: #FFFFFF;
  --accent: #FF6B00;
  --accent-hover: #E55F00;
  --accent-light: #FFF0E6;
  --success: #00C853;
  --radius-btn: 8px;
  --radius-card: 12px;
}
body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: 'Inter', sans-serif;
}
h1, h2, h3 { font-family: 'Cabinet Grotesk', sans-serif; }
```

**types/index.ts:**
```typescript
export type ApparelSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL'
export type BaseStyle = 'oversized' | 'regular' | 'hoodie' | 'polo'

export interface Product {
  id: string
  slug: string
  name: string
  price: number              // paise (INR)
  colors: { name: string; hex: string }[]
  sizes: ApparelSize[]
  images: string[]
  category: string           // 'oversized' | 'graphic' | 'anime' | 'hoodie' | ...
  fabric: string             // e.g. "240 GSM combed cotton"
  gsm: number
  badge?: 'new' | 'bestseller' | 'drop' | 'restock'
  isLimitedDrop?: boolean
}

export interface CustomDesign {
  id: string
  baseStyle: BaseStyle
  baseColorName: string
  baseColorHex: string
  size?: ApparelSize
  previewFront: string
  previewBack?: string
  preview360?: string
  price: number              // paise
}

export interface CartItem {
  id: string                 // productId or customDesignId
  type: 'product' | 'custom' | 'mystery_box'
  name: string
  price: number              // paise (INR)
  size: string
  color: string
  quantity: number
  image: string
  custom?: CustomDesign
}
```

**store/cart.ts:**
```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem } from '@/types'

const FREE_SHIPPING_THRESHOLD = 149900 // paise (₹1499)

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: CartItem) => void
  removeItem: (id: string, size: string, color: string) => void
  updateQuantity: (id: string, size: string, color: string, qty: number) => void
  toggleCart: () => void
  closeCart: () => void
  get subtotal(): number          // paise
  get itemCount(): number
  get amountToFreeShipping(): number  // paise remaining, 0 if met
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (item) => set((state) => {
        const existing = state.items.find(
          i => i.id === item.id && i.size === item.size && i.color === item.color
        )
        if (existing) {
          return { items: state.items.map(i =>
            i.id === item.id && i.size === item.size && i.color === item.color
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )}
        }
        return { items: [...state.items, item] }
      }),
      removeItem: (id, size, color) => set((state) => ({
        items: state.items.filter(i => !(i.id === id && i.size === size && i.color === color))
      })),
      updateQuantity: (id, size, color, qty) => set((state) => ({
        items: qty <= 0
          ? state.items.filter(i => !(i.id === id && i.size === size && i.color === color))
          : state.items.map(i =>
            i.id === id && i.size === size && i.color === color
              ? { ...i, quantity: qty }
              : i
          )
      })),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      closeCart: () => set({ isOpen: false }),
      get subtotal() { return get().items.reduce((sum, i) => sum + i.price * i.quantity, 0) },
      get itemCount() { return get().items.reduce((sum, i) => sum + i.quantity, 0) },
      get amountToFreeShipping() { return Math.max(0, FREE_SHIPPING_THRESHOLD - get().subtotal) },
    }),
    { name: 'fitbox-cart' }
  )
)
```

**Conventions to follow:**
- All colors via CSS variables — never hardcode hex in components
- Buttons always: `rounded-[var(--radius-btn)]` (8px); product image cards `rounded-[var(--radius-card)]` (12px)
- Product images: `aspect-[3/4]` with `object-cover` and `rounded-[12px]`
- Prices are integer **paise**; render with `formatPrice(paise)` → `₹1,299`
- Sizes are XS–XXXL (apparel), never shoe sizes
- Section padding: `py-24` desktop, `py-16` mobile
- Font loading: Cabinet Grotesk via `next/font/local` (headings), Inter via `next/font/google` (body)
- Cart drawer always rendered in root layout, visibility via Zustand `isOpen`

**Mistakes to avoid:**
- Do not use forest-green/cream — accent is orange `#FF6B00`; success green only for status
- Do not add **fake** urgency on evergreen items; real drop countdowns / sold-out states are OK
- Do not use `rounded-full` on buttons (pills are for chips/swatches only); buttons are 8px
- Do not omit `rounded-[12px]` on product image cards
- Do not store prices as floats — always integer paise
- Size selector disabled state: `opacity-40 cursor-not-allowed line-through`, never hidden
- Cart item quantity minimum is 1 — use remove (×) to delete a line item
- Free shipping threshold is ₹1499 (149900 paise) — progress bar fills 0 → 100%
- Custom-design line items must show a "Custom" tag + preview thumbnail; mystery-box items are non-returnable

---

### Category B — Grok

Build a custom T-shirt & streetwear storefront for FITBOX using Next.js 14, TypeScript strict, Tailwind CSS, and Zustand.

**Context:** FITBOX sells premium streetwear (oversized tees, graphic tees, hoodies) and its USP is a real-time custom T-shirt builder, plus drops, a gamified Mystery Box, and a designer marketplace. Prices ₹699–₹2499 (stored in paise). Target customer: 18–30, Gen-Z, mobile, found the brand on Instagram reels. India-first (UPI/Razorpay/INR).

**What to build:**
- `app/page.tsx` — Homepage: Hero/Drop, NewArrivals, TrendingCollections, CustomDesignCTA, Reviews, Newsletter
- `app/shop/page.tsx` — PLP: FilterBar, ProductGrid
- `app/products/[slug]/page.tsx` — PDP: ImageGallery, SizeSelector, ColorSelector, FabricCallout, AddToCart
- `app/customize/page.tsx` — Custom Builder: 6-step stepper + live preview canvas
- `components/cart/CartDrawer.tsx` — Slide-in cart, always mounted in root layout

**Design tokens (globals.css, set up first):**
- `--bg-primary: #F8F8F8` | `--bg-surface: #FFFFFF` | `--bg-dark: #1A1A1A` | `--border: rgba(26,26,26,0.08)`
- `--text-primary: #1A1A1A` | `--text-secondary: #6B6B6B` | `--accent: #FF6B00` | `--accent-hover: #E55F00` | `--accent-light: #FFF0E6` | `--success: #00C853`
- Buttons `rounded-[8px]`; product image cards `rounded-[12px]`. Fonts: Cabinet Grotesk (headings, local) + Inter (body).

**Cart state:** Zustand persisted to localStorage. Cart items keyed by `id + size + color` and support `type: 'product' | 'custom' | 'mystery_box'` (custom items carry a `CustomDesign` with front/back previews). Prices are integer paise. Subtotal and itemCount are derived values.

**Key component behaviors:**
- ProductCard: image card `rounded-[12px]`, hover swaps image via `opacity` (not display toggle). Color swatches are `14px` pill buttons; clicking changes the displayed image set. Price formatted INR.
- SizeSelector: renders all sizes XS–XXXL. Out-of-stock sizes show `opacity-40 line-through`, remain clickable to show "notify me" — never hidden.
- CartDrawer: Framer Motion slide from right `300ms ease-out`. Backdrop `bg-black/55` closes on click. Free shipping progress bar threshold ₹1499; custom-design items show a "Custom" tag.
- CustomBuilder: 6 steps (Style → Color → Design → Text → Preview → Cart); selecting style/color updates the live preview instantly; AI Generate tab calls the Studio API.
- AddToCart: disabled until size + color selected; "Select a size" validation if submitted without size.
- Checkout via Razorpay (UPI/cards) for India + Stripe international; server-side price recalculation (paise).

**Copy rules:** Names like "Akatsuki Oversized Tee". Fabric specific ("240 GSM combed cotton" not "premium materials"). No fake urgency on evergreen items (real drop countdowns OK). No Lorem Ipsum.

**Do not use:** forest-green/cream palette, `rounded-full` on buttons, missing radius on product images, infinite scroll, auto carousel, float prices, hardcoded hex in JSX.

---

### Category B — Gemini

Build a custom T-shirt & streetwear storefront for FITBOX. The brand sells premium tees, graphic tees, and hoodies; its USP is a real-time custom T-shirt builder, plus drops and a gamified Mystery Box. Prices ₹699–₹2499. India-first (UPI/Razorpay/INR). Customers are 18–30, mobile, into self-expression and streetwear.

**Tech stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, Zustand for cart + builder state.

**Pages:**
1. Homepage — hero/drop + headline, new-arrivals grid, trending collections, custom-design CTA strip, reviews, newsletter, footer
2. Shop (PLP) — filter bar (category, color, size, collection), 4-column grid, product cards
3. Product detail page — image gallery left, product info right (name, price INR, color selector, size selector XS–XXXL, fabric/GSM callout, add to cart)
4. Custom Builder (`/customize`) — 6-step stepper (Style → Color → Design → Text → Preview → Cart) with a live front/back/360 preview canvas
5. Cart drawer — slide-in from right, line items (incl. custom-design tag), free shipping progress, checkout button

**Visual system:**
- Background: `#F8F8F8`
- Cards / surfaces: `#FFFFFF`; dark blocks: `#1A1A1A`
- Borders: `rgba(26,26,26,0.08)`
- Primary text: `#1A1A1A`; secondary text: `#6B6B6B`
- Brand accent / CTA: `#FF6B00` (orange); success status `#00C853`
- Fonts: Cabinet Grotesk (headings, self-hosted) + Inter (body, Google)
- Button radius: `8px`; product image cards `rounded-[12px]`
- Product image aspect ratio: `3:4`
- Section spacing: `96px` desktop

**Specific behaviors:**
- Color and size selectors on PDP must be functional — selecting color changes image, selecting size highlights in orange
- Out-of-stock sizes: visible but disabled with strikethrough, not hidden
- Cart: Zustand store, persisted localStorage; supports product, custom, and mystery_box items; quantity update + remove
- Free shipping threshold: ₹1499, shown as a progress bar in the cart drawer
- Custom Builder: changing style/color updates the live preview instantly; AI Generate produces design artwork (Studio API)
- Checkout via Razorpay (UPI/cards) for India + Stripe international
- Hover on product card: second image fades in with `opacity` transition

**Rules:**
- No Lorem Ipsum — realistic apparel copy ("Akatsuki Oversized Tee", "240 GSM combed cotton")
- No fake urgency on evergreen items (real limited-drop countdowns / sold-out states are OK)
- No auto-advancing carousels
- No infinite scroll — "Load more" button on PLP
- Orange brand palette only — no forest-green, no cream
- Prices as integer paise (never float); all colors via CSS variables

---

### Category B — Cursor

In `src/app/`, implement the FITBOX custom T-shirt & streetwear storefront. Next.js 14 App Router, TypeScript strict, Tailwind CSS, Zustand already installed. India-first (UPI/Razorpay/INR).

**Read first:** `src/app/globals.css` for design tokens, `src/types/index.ts` for `Product`, `CustomDesign`, and `CartItem` types, `src/store/cart.ts` and `src/store/builder.ts` for the Zustand store interfaces.

**File implementation order:**
1. `src/app/globals.css` — CSS variables (do this first, everything else depends on it)
2. `src/store/cart.ts` — Zustand cart store with persist middleware (supports custom + mystery_box items)
3. `src/store/builder.ts` — Zustand custom-builder store (BuilderState: style, color, design layers, text, size)
4. `src/types/index.ts` — Product, CustomDesign, CartItem, ApparelSize interfaces
5. `src/components/cart/CartDrawer.tsx` — Framer Motion slide-in, always mounted in root layout
6. `src/components/layout/Navbar.tsx` — sticky nav with cart icon + live item count
7. `src/app/layout.tsx` — mount Navbar + CartDrawer
8. `src/components/product/ProductCard.tsx` — image swap on hover (`rounded-[12px]`), color swatches, quick-add
9. `src/app/page.tsx` — homepage (Hero/Drop, NewArrivals, TrendingCollections, CustomDesignCTA, Newsletter)
10. `src/app/shop/page.tsx` — PLP with filter bar + ProductGrid
11. `src/app/products/[slug]/page.tsx` — PDP with ImageGallery + selectors + FabricCallout + AddToCart
12. `src/app/customize/page.tsx` — Custom Builder: BuilderStepper + BuilderCanvas (live preview) + 6 steps

**CSS variable conventions:**
```css
/* Always use these — never use Tailwind color classes for brand colors */
var(--bg-primary)      /* #F8F8F8 — main background */
var(--bg-surface)      /* #FFFFFF — cards, panels */
var(--bg-dark)         /* #1A1A1A — dark hero/drop/footer blocks */
var(--border)          /* rgba(26,26,26,0.08) — all dividers */
var(--text-primary)    /* #1A1A1A — headlines, body */
var(--text-secondary)  /* #6B6B6B — metadata, labels */
var(--accent)          /* #FF6B00 — CTA buttons, active states */
var(--accent-hover)    /* #E55F00 — button hover */
var(--accent-light)    /* #FFF0E6 — badge backgrounds, selected state bg */
var(--success)         /* #00C853 — in-stock / free-shipping status */
```

**Component contracts:**
```typescript
// ProductCard
interface ProductCardProps {
  product: Product
  onQuickAdd?: (product: Product) => void
}

// SizeSelector — apparel sizes XS–XXXL
interface SizeSelectorProps {
  sizes: ApparelSize[]
  outOfStock: ApparelSize[]
  selected: ApparelSize | null
  onChange: (size: ApparelSize) => void
}

// CartDrawer — receives no props; reads from Zustand (handles product/custom/mystery_box)
// ImageGallery
interface ImageGalleryProps {
  images: string[]
  alt: string
}

// BuilderStepper — Custom Builder steps
interface BuilderStepperProps {
  step: 1 | 2 | 3 | 4 | 5 | 6   // Style → Color → Design → Text → Preview → Cart
  onStep: (step: number) => void
}
```

**Motion variants (lib/motion.ts):**
```typescript
export const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
}
export const cartDrawer = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: { duration: 0.3, ease: 'easeOut' } }
}
export const unbox = {  // Mystery Box reveal — signature motion
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }
}
```

**Absolute rules:**
- Never use forest-green/cream — brand accent is orange `var(--accent)`; success green only for status
- Product image card wrappers are always `rounded-[12px]`; buttons always `rounded-[8px]` (no `rounded-full` on buttons — pills only for chips/swatches)
- Prices are integer paise — format with `formatPrice(paise)` → `₹1,299`, never floats
- Sizes are XS–XXXL apparel sizes — never shoe sizes
- Out-of-stock sizes: `opacity-40 line-through cursor-not-allowed` — never `hidden`
- No **fake** urgency on evergreen items; real drop countdowns / sold-out states are allowed
- Gate all Framer Motion (incl. mystery-box unbox) with `const prefersReduced = useReducedMotion()` — skip if true
- `useCartStore()` / `useBuilderStore()` are the only ways to access cart / builder state — never local useState for them
- Checkout via Razorpay (UPI/cards) for India + Stripe international; recalculate totals server-side in paise

---

## Review Notes

- Lovable:
- ChatGPT Canvas:
- Bolt:
- v0:
- Claude Artifacts:
- Grok:
- Gemini:
- Cursor:
- Overall score: /5
- What to fix:
