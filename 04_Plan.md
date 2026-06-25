# 04 — Build Plan
## FITBOX — Custom T-Shirt & Apparel Platform · ecomm_platform_01

---

### Overview

| Phase | Name | Duration | Goal |
|-------|------|----------|------|
| 0 | Foundation | 1.5 weeks | Project setup, full DB schema, Supabase auth, design tokens, 4-role middleware, Studio API skeleton |
| 1 | Catalog | 2 weeks | Homepage, Shop/PLP, PDP, cart drawer — browse and discover |
| 2 | Custom Builder + Studio API | 2.5 weeks | 6-step builder, live front/back/360 preview, uploads, AI generate, add custom design to cart |
| 3 | Cart & Checkout | 2 weeks | Razorpay (UPI/cards/netbanking/wallets) + Stripe intl, dual webhooks, coupons, gift cards, order email |
| 4 | Accounts & Order Tracking | 1.5 weeks | Auth, dashboard, orders, wishlist, saved designs, addresses, rewards, live tracking |
| 5 | Collections & Mystery Box | 1.5 weeks | Collections index/detail, gamified Mystery Box pick→unbox→wear the fit |
| 6 | Designer Marketplace & AI | 2 weeks | Designer dashboard, upload/sell designs, earnings/payouts, AI outfit & style recommendation |
| 7 | Admin Dashboard | 2 weeks | Products/inventory, orders/refunds, collections, design moderation, customers, marketing, super-admin |
| 8 | Polish & Launch | 1.5 weeks | SEO, sitemap, performance, a11y, legal, live Razorpay + Stripe keys, go-live |

**Total: ~16.5 weeks**

---

### Phase 0 — Foundation (Week 1–1.5)

**Goal:** Running Next.js project + Studio API skeleton with full database, auth, and design system ready. No feature work until this is solid.

**Deliverables:**
- Next.js 14 App Router project initialised with TypeScript strict (Vercel target)
- Tailwind CSS v3 configured with custom tokens (extends config, does not replace defaults)
- `globals.css` with all CSS variables from `03_Design.md` (orange accent `#FF6B00`, `#F8F8F8` page bg)
- **Cabinet Grotesk** loaded via `next/font/local` (self-hosted Fontshare) for headings; **Inter** via `next/font/google` for body
- Supabase project created — all FITBOX tables migrated via SQL in `02_Architecture.md`: `categories`, `collections`, `products`, `product_collections`, `product_variants`, `product_images`, `profiles`, `addresses`, `custom_designs`, `design_layers`, `design_assets`, `ai_generations`, `wishlist_items`, `reviews`, `coupons`, `gift_cards`, `mystery_boxes`, `mystery_box_purchases`, `orders`, `order_items`, `order_events`, `designer_earnings`, `email_subscribers`
- `updated_at` triggers + `handle_new_user()` profile-on-signup trigger applied
- RLS policies applied and tested; helpers `is_staff()` / `is_admin()` created
- Supabase Auth configured (email/password + Google OAuth)
- Storage buckets created: `product-images`, `design-uploads`, `ai-designs`, `design-previews`
- Razorpay + Stripe accounts configured, test keys in `.env.local`
- Resend account created, `orders@fitbox.in` from address verified
- Middleware enforcing four roles: protects `/account` (customer), `/designer` (designer), `/admin` (admin/super_admin), `/admin/users` (super_admin only)
- Zustand cart store (`store/cart.ts`) with `persist` middleware (localStorage)
- All TypeScript types in `types/index.ts` (Product, Variant, CustomDesign, DesignLayer, Order, MysteryBox, etc.)
- `formatPrice(paise)` helper using `Intl.NumberFormat('en-IN', …)` → `"₹1,299"`
- Vercel project created and linked to repo; preview deployment working
- **Railway project created** for FITBOX Studio API (Node.js + Express skeleton): health route, API-key auth middleware, `/render` and `/generate` route stubs returning 501

**Ship gate — all must pass before Phase 1:**
- [ ] `npm run build` succeeds with zero TypeScript errors
- [ ] All 23 Supabase tables exist and RLS is enabled on every table
- [ ] `SELECT * FROM pg_tables WHERE schemaname='public'` shows `row_security = true` on all tables
- [ ] A test user can sign up, log in, and log out; a `profiles` row auto-creates on signup
- [ ] `/account` redirects to `/auth/login` when not authenticated
- [ ] `/admin` redirects home for a `customer`; `/designer` redirects home for non-designer; `/admin/users` blocked for plain `admin`
- [ ] Cart state persists after browser refresh
- [ ] CSS variables render correctly — page background is `#F8F8F8`, accent is `#FF6B00`
- [ ] Studio API health check returns 200 on Railway; API-key middleware rejects unauthenticated calls

**NOT in this phase:**
- Any visible product UI
- Payment integration
- Builder, AI generation, or render compositing logic
- Any product/seed data

---

### Phase 1 — Catalog (Weeks 2–3)

**Goal:** A visitor can browse the brand, filter the shop, view a PDP, and add to cart. No purchasing yet.

**Deliverables:**

**Homepage (`/`):**
- Navbar with cart icon (count badge from Zustand, shows 0 initially)
- Hero Banner: lifestyle/drop image + headline + CTA
- New Arrivals row, Trending Collections, Featured Categories (11 categories)
- Limited Edition Drops section (respects `is_limited_drop`, `drop_starts_at/ends_at`, sold-out states — real scarcity only, no fake countdowns on evergreen stock)
- Custom Design Section: CTA into `/customize` builder
- Influencer Picks, Customer Reviews carousel (no auto-advance), Newsletter Signup (writes to `email_subscribers`)
- Footer: columns + copyright

**Shop / PLP (`/shop`, `/shop/[category]`):**
- Filter bar: category pills, price range slider, color swatches, size chips, collection filter, sort dropdown
- 4-column product grid (2 on mobile)
- ProductCard with hover image swap + color swatches + badge (new/bestseller/drop/restock)
- Search input; load-more pagination (offset-based, 12 items/page)

**PDP (`/products/[slug]`):**
- Image gallery: desktop sticky left column, mobile horizontal scroll
- Product name, price (`formatPrice`), badge
- Color selector — switching color changes image set
- Size selector (XS–XXXL) — out-of-stock shown disabled with strikethrough
- Fabric details + GSM, description, care instructions accordions
- Size guide modal (cm chest/length table)
- Reviews & ratings display (read), star average
- Add to Cart (adds to Zustand, opens cart drawer) + Buy Now
- "You may also like" — related products from same category

**Cart drawer:**
- Slide-in (Framer Motion), line items, quantity stepper, remove
- Free-shipping progress bar toward ₹1499 threshold
- "Checkout" button (links to `/checkout` — page not built yet)

**Data:** Seed at least 12 products across categories with realistic FITBOX names ("Akatsuki Oversized Tee", "Tokyo Drift Graphic Tee", "Midnight Streetwear Hoodie"), variants, images, collections, and reviews. Prices ₹699–₹2,499 stored in paise.

**Ship gate:**
- [ ] Homepage loads with real products from Supabase
- [ ] PLP filter by color/size/price/collection changes grid results without page reload
- [ ] PDP color selector changes image gallery
- [ ] PDP size selector shows disabled state for out-of-stock variants
- [ ] Add to Cart adds to Zustand, cart badge increments, drawer opens, shipping bar updates
- [ ] Cart persists after page refresh
- [ ] Prices render as `₹1,299` (integer INR, no float artifacts)
- [ ] Lighthouse: Performance 90+, Accessibility 95+ on PDP (mobile)
- [ ] LCP under 2.5s on homepage (mobile, 4G simulated)

**NOT in this phase:**
- Custom builder / Studio API
- Checkout or payments
- User authentication UI
- Mystery box, designer marketplace, admin

---

### Phase 2 — Custom T-Shirt Builder + Studio API (Weeks 4–6)

**Goal:** A visitor can design a custom tee through the 6-step builder, see a live front/back/360 preview, and add the custom design to cart. This is the core USP.

**Deliverables:**

**Builder UI (`/customize`) — 6 steps (Framer Motion transitions):**
- Step 1 — Choose style: Oversized / Regular / Hoodie / Polo
- Step 2 — Choose color: White / Black / Beige / Blue / Green / Red (+ per-product extras)
- Step 3 — Add design: Upload Image / Upload Logo / AI Generate / Choose Template
- Step 4 — Add text: custom text, font, text color, alignment (left/center/right)
- Step 5 — Live preview: Front / Back / 360° toggle
- Step 6 — Add to cart

**Builder state:**
- Zustand builder store holding base style/color/size, per-side layers (image/logo/text/ai), transforms (pos_x/y, scale, rotation, z_index)
- Persist draft to `custom_designs` + `design_layers` on save (login required to save; guest can build and add to cart with a draft)
- Server-side price computation in paise (base + per-layer surcharges)

**Studio API (Railway, Express):**
- `POST /render` — server-side mockup compositing → returns front/back/360 preview URLs written to `design-previews` bucket (`previews/{custom_design_id}/{side}.webp`)
- `POST /generate` — AI Design Generator: prompt + style (anime/typography/streetwear/minimal) → pluggable provider (Replicate/Stability/OpenAI Images) → writes to `ai-designs` bucket; logs to `ai_generations` (pending→succeeded/failed)
- API-key auth, request timeouts, and graceful failure responses

**Next.js integration:**
- Upload image/logo to Supabase Storage `design-uploads` (`uploads/{user_id}/{asset_id}.{ext}`), record in `design_assets`
- AI generate calls Studio API via `STUDIO_API_URL`/`STUDIO_API_KEY`; shows loading + fallback on timeout/failure
- Template picker (curated starter designs)
- Add custom design to cart as an `item_type='custom'` line item carrying `custom_design_id` + preview image

**Ship gate:**
- [ ] All 6 steps navigate forward/back without losing state
- [ ] Live preview reflects style, color, uploaded/AI/template artwork, and text within the configured render budget
- [ ] Upload image and upload logo both land in `design-uploads` and appear on the preview
- [ ] AI generation returns an image, logs an `ai_generations` row, and degrades gracefully (clear message + retry) on timeout/failure
- [ ] Saving a design writes `custom_designs` + `design_layers`; reopening restores the design
- [ ] Custom design adds to cart with correct server-computed price in paise and a preview image
- [ ] Studio API rejects unauthenticated requests and times out cleanly instead of hanging the UI
- [ ] `prefers-reduced-motion` is respected in builder transitions

**NOT in this phase:**
- Checkout / payment of the custom item (Phase 3)
- Designer-sold designs (Phase 6)
- AI outfit/style recommendation (Phase 6)

---

### Phase 3 — Cart & Checkout (Weeks 6.5–8.5)

**Goal:** A visitor can complete a purchase as a guest paying via Razorpay (UPI/cards/netbanking/wallets) or Stripe (international). Orders are created idempotently by webhooks. Confirmation email is sent.

**Deliverables:**

**Checkout page (`/checkout`):**
- Order summary: line items from Zustand (catalog + custom), subtotal, shipping (free ≥ ₹1499 else ₹79), discount, gift-card, total — all paise
- Guest checkout: email + India-format shipping address (PIN code, state)
- Logged-in: pre-fill email, saved-address selector or new address
- Coupon field (percent/fixed, min subtotal, redemption limits) + gift-card redeem field
- Payment selector: Razorpay (India, default) / Stripe (international)

**API routes (Vercel):**
- `POST /api/payments/razorpay/create-order` — recalculates total server-side in paise, creates Razorpay Order
- Razorpay Checkout opens (UPI, cards, net banking, wallets) with `order_id`
- `POST /api/payments/razorpay/webhook` — verifies HMAC `razorpay_signature` = HMAC_SHA256(`order_id|payment_id`, secret) on `payment.captured`
- `POST /api/payments/stripe/create-payment-intent` — server-recalculated total in cents
- `POST /api/payments/stripe/webhook` — `payment_intent.succeeded`
- Both webhooks (service-role client): idempotency check → create `orders` + `order_items` → decrement variant stock → record coupon redemption / gift-card balance → emit initial `order_events` row → send Resend confirmation email

**Coupon & gift-card engine:**
- Validate `coupons` (active, window, min_subtotal, max_redemptions); apply percent or fixed (paise)
- Apply `gift_cards` balance, decrement on order creation

**Order confirmation (`/checkout/success`):**
- Clear Zustand cart, show `order_number` (e.g. `FB-25-000123`), items, address, estimated delivery, "Continue shopping"
- State that custom/personalized and Mystery Box items are non-returnable

**Email:** Resend React Email order confirmation — subject "Your FITBOX order #XXXX is confirmed", line items, address, totals in INR.

**Ship gate:**
- [ ] Guest completes purchase end-to-end via Razorpay (UPI test) without an account
- [ ] International guest completes purchase via Stripe
- [ ] Razorpay signature verification rejects a tampered/invalid signature
- [ ] Each webhook creates the order with correct line items and server-recalculated total in paise
- [ ] Variant stock decrements after successful payment; custom items persist their design
- [ ] Duplicate webhook delivery is idempotent — calling twice creates ONE order (unique on `razorpay_payment_id` / `stripe_payment_intent_id`)
- [ ] Coupon and gift card correctly reduce the server-side total; expired/over-redeemed coupons rejected
- [ ] Confirmation email received within 2 minutes
- [ ] Failed payment does not clear cart and shows an error
- [ ] No card data, UPI handle, signature, or client secret logged
- [ ] Checkout is keyboard-navigable with labelled inputs

**NOT in this phase:**
- Returning-customer rich account features (Phase 4)
- Live order tracking timeline UI (Phase 4)
- Admin refunds (Phase 7)

---

### Phase 4 — Accounts & Order Tracking (Weeks 9–10.5)

**Goal:** Customers can manage their account, see orders, save designs and wishlist, manage addresses and rewards, and track orders live.

**Deliverables:**

**Auth pages:**
- `/auth/login` — email/password + Google OAuth
- `/auth/signup` — email/password + name (profile auto-created)
- `/auth/callback` — Supabase OAuth handler

**Account section (`/account/*`):**
- Dashboard (`/account`) with sidebar nav
- Orders (`/account/orders`, `/account/orders/[id]`): list with status chips, detail with line items, address, tracking
- Wishlist (`/account/wishlist`): add/remove from PDP, move to cart
- Saved Designs (`/account/saved-designs`): list custom designs, re-open in builder, add to cart
- Addresses (`/account/addresses`): list, add, edit, set default, delete
- Rewards (`/account/rewards`): `reward_points` balance + history
- Profile (`/account/profile`): name, phone, password change

**Order tracking:**
- Public tracking `/track` via order number + email; authed view `/account/orders/[id]/track`
- Timeline rendered from `order_events` (pending → processing → printing → shipped → out_for_delivery → delivered)
- Delivery notifications via Resend on status changes
- Checkout enhancement: logged-in pre-fill email + default address; "Buy again" adds in-stock items to cart

**Ship gate:**
- [ ] User can sign up, log in, and see order history
- [ ] Guest-checkout orders are NOT visible in account history (guest_email only, no user_id)
- [ ] Saved addresses appear and default pre-selects in checkout
- [ ] Wishlist add/remove works and persists (RLS-scoped to user)
- [ ] Saved custom designs re-open in the builder and can be re-added to cart
- [ ] Rewards points balance displays correctly
- [ ] Public `/track` shows the timeline for a valid order#+email and rejects mismatches
- [ ] Status change emits an `order_events` row and sends a notification email
- [ ] `/account/*` inaccessible without authentication (middleware confirmed)

**NOT in this phase:**
- Mystery box, collections detail (Phase 5)
- Designer marketplace (Phase 6)
- Admin-side status updates UI (Phase 7) — events seeded/simulated for testing here

---

### Phase 5 — Collections & Mystery Box (Weeks 11–12.5)

**Goal:** Visitors can browse curated collections and play the gamified Mystery Box flow.

**Deliverables:**

**Collections:**
- `/collections` index (Anime, Streetwear, Gym, College, Startup, Creator) with hero images
- `/collections/[slug]` detail — curated product grid via `product_collections`, featured ordering

**Mystery Box (`/mystery-box`, `/mystery-box/[category]`):**
- Landing explaining the gamified flow
- 01 Pick category: Anime / Streetwear / Gym / Creator
- 02 Select box tier: Bronze / Silver / Gold (price + item_count from `mystery_boxes`)
- 03 Purchase (auth required) → creates an `item_type='mystery_box'` order line; on payment, a `mystery_box_purchases` row (status `sealed`)
- 04 Unbox: animated reveal (Framer Motion, gated by `prefers-reduced-motion`) → marks `revealed`, sets `revealed_at`
- "Wear the fit": character/model wears the revealed outfit
- Non-returnable notice on Mystery Box purchases

**Ship gate:**
- [ ] Collections index and detail render curated products from `product_collections`
- [ ] Mystery Box flow walks category → tier → purchase → reveal end-to-end
- [ ] Purchase creates a `mystery_box_purchases` row tied to the order; reveal updates status to `revealed`
- [ ] Box tiers reflect `mystery_boxes` config (price/item_count); inactive boxes are hidden
- [ ] Stock/fairness: a sealed box cannot be revealed twice; reveal is idempotent
- [ ] Unboxing animation respects `prefers-reduced-motion` (instant reveal fallback)
- [ ] Mystery Box clearly marked non-returnable at purchase

**NOT in this phase:**
- Admin mystery-box configuration UI (Phase 7) — configured via seed here
- Designer marketplace, AI recommendation (Phase 6)

---

### Phase 6 — Designer Marketplace & AI Features (Weeks 13–14.5)

**Goal:** Community designers can upload and sell designs and track earnings; customers get AI outfit/style recommendations.

**Deliverables:**

**Designer marketplace (`/designer/*`, designer role):**
- Designer dashboard (`/designer`) — sales summary, active designs
- Manage/upload designs (`/designer/designs`, `/designer/designs/new`) — upload artwork, set as sellable; designer-owned products carry `products.designer_id`
- Earnings (`/designer/earnings`) — `designer_earnings` ledger, pending vs paid, payout requests
- On a sale of a designer product, create a `designer_earnings` row (designer's cut, paise) tied to the `order_item`

**AI outfit/style recommendation:**
- Recommend colors, collections, and styles from browsing + purchase history
- Surfaced on homepage and PDP ("Recommended for you"); reads order/wishlist/view signals

**Ship gate:**
- [ ] Designer can upload a design and list it for sale; it appears in shop with `designer_id` set
- [ ] A sale of a designer product creates a correctly-valued `designer_earnings` row (paise)
- [ ] Earnings page shows accurate pending/paid totals; payout request flow works
- [ ] Non-designers cannot access `/designer/*` (middleware confirmed)
- [ ] Designers can only see/manage their own designs and earnings (RLS confirmed)
- [ ] AI recommendation returns relevant styles/collections and degrades gracefully when history is sparse or the provider fails

**NOT in this phase:**
- Admin payout approval UI (Phase 7) — earnings recorded here, paid out via admin later
- Admin design moderation queue (Phase 7)

---

### Phase 7 — Admin Dashboard (Weeks 15–16.5)

**Goal:** Store admins manage the full catalog, orders, collections, design moderation, customers, and marketing; super-admins manage roles and payouts — without touching the database.

**Deliverables:**

**Admin layout (`/admin`):** sidebar nav + role check (admin/super_admin); super-admin-only items gated.

- **Products / Inventory (`/admin/products`, `/admin/inventory`):** product table; add/edit form (name, slug, description, category, fabric, GSM, fit, care, badge, limited-drop window, published toggle); variant manager (size/color/SKU/stock/price); image uploader → `product-images`; quick inline stock editor with on-demand revalidation
- **Orders (`/admin/orders`, `/admin/orders/[id]`):** order table + status filter; detail with status updater; tracking number entry → status change → customer notified; **refunds** via Razorpay/Stripe with order status → `refunded`
- **Collections (`/admin/collections`):** create/curate collections, assign products, feature/order
- **Custom Designs moderation (`/admin/custom-designs`):** review user-uploaded artwork (approve/reject) before fulfilment
- **Customers + analytics (`/admin/customers`):** customer list, order history, success metrics (Conversion, Cart Completion, AOV, Custom Design Usage, Repeat Purchases, Monthly Revenue, Retention)
- **Coupons (`/admin/coupons`):** create/manage `coupons`
- **Campaigns (`/admin/campaigns`):** marketing campaigns / drop announcements
- **Mystery boxes (`/admin/mystery-boxes`):** configure category/tier/price/item_count/active
- **Super-admin — Users (`/admin/users`):** manage admins, role changes on `profiles`, approve designer payouts (`designer_earnings` → paid)

**Ship gate:**
- [ ] Admin can create a product with variants and images — appears on PLP
- [ ] Admin stock update reflects on PDP within 30s (revalidation)
- [ ] Admin can mark an order shipped with tracking → customer email + `order_events` row
- [ ] Admin can issue a refund through the correct gateway → order status `refunded`
- [ ] Admin can curate collections, configure mystery boxes, and create coupons that apply at checkout
- [ ] Custom-design moderation approve/reject gates fulfilment
- [ ] Super-admin can change a user's role and mark a designer payout as paid
- [ ] Non-admin cannot access any `/admin` route; plain admin cannot access `/admin/users`
- [ ] Image upload appears in Supabase Storage and on the product page

**NOT in this phase:**
- New customer-facing features
- Automated payout disbursement (recorded/marked paid manually)

---

### Phase 8 — Polish & Launch (Weeks 17–18)

**Goal:** Production-ready. Fast, accessible, SEO-optimised, on live payment keys.

**Deliverables:**
- Lighthouse: all pages 95+ performance, 95+ accessibility
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms
- `next/image` optimisation: explicit `width`/`height`, `priority` on hero
- Metadata: `generateMetadata` on all public pages (title, description, og:image)
- SEO keywords woven into copy/metadata: Custom T Shirts India, Oversized T Shirts, Anime T Shirts, Streetwear Clothing, Graphic Tees India, Personalized T Shirts
- Sitemap (`app/sitemap.ts`) — published products, categories, collections
- robots.txt: allow all except `/admin`, `/account`, `/designer`, `/api`
- Cookie consent banner (minimal, non-blocking)
- Privacy (`/privacy`) and Terms (`/terms`) pages
- Error pages (`error.tsx`, `not-found.tsx`) + loading skeletons (`loading.tsx`) for all routes
- axe-core accessibility audit: zero critical violations
- Switch to **live Razorpay + Stripe keys** in Vercel production env; verify both webhook endpoints in production dashboards
- Studio API production hardened on Railway (rate limits, timeouts, provider keys)
- Final end-to-end test: catalog purchase (Razorpay), custom-design purchase, mystery box, admin order update, account tracking

**Ship gate — launch checklist:**
- [ ] All Lighthouse metrics 95+ on mobile and desktop
- [ ] Zero TypeScript errors (`tsc --noEmit`), zero ESLint errors
- [ ] axe-core: zero critical violations on PDP, builder, checkout, cart
- [ ] Guest purchase end-to-end works with live Razorpay keys; international with live Stripe
- [ ] Both webhook endpoints verified in production (Razorpay + Stripe)
- [ ] Custom builder + Studio API render/generate work against production Railway
- [ ] All environment variables set in Vercel production + Railway
- [ ] Custom domain + SSL active (`fitbox.in`)
- [ ] No console errors on any public page in production
- [ ] No PII/secret logging anywhere in payment or Studio API paths

---

### Cut Order

If timeline compresses, cut in this order (last to cut listed first):

| Priority | Feature | Can cut? |
|----------|---------|----------|
| NEVER CUT | PDP + Add to Cart | No |
| NEVER CUT | Custom T-Shirt Builder (core USP) | No |
| NEVER CUT | Cart drawer | No |
| NEVER CUT | Checkout + Razorpay | No |
| NEVER CUT | Order confirmation email | No |
| High | Mystery Box (gamified) | Cut — launch without gamification |
| High | Designer marketplace + earnings | Cut — house products only at launch |
| High | AI outfit/style recommendation | Cut — static "Recommended" rows |
| High | AI Design Generator | Cut — fall back to Upload Image/Logo + Templates only |
| Medium | Gift cards | Cut — coupons cover discounts |
| Medium | Rewards points | Cut — add post-launch |
| Medium | Wishlist | Cut — guest/account purchase still works |
| Medium | Collections filters | Cut to basic category nav only |
| Medium | Stripe (international) | Cut — Razorpay/India-only at launch |
| Lower | Live order tracking timeline | Cut — email status updates only |
| Lower | Admin inventory quick-edit | Cut — use product form / DB for launch |
| Lower | Size guide modal | Cut — link to static page |
| Lower | 360° preview | Cut — front/back preview only |
| Lowest | Newsletter signup | Cut |

---

### Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Dual-gateway webhooks (Razorpay + Stripe) deliver duplicate events → duplicate orders | High | High | Idempotency check on unique `razorpay_payment_id` / `stripe_payment_intent_id` before insert; webhooks are sole order source; test with duplicate POST per gateway |
| Razorpay HMAC signature verification wrong/missing → fraudulent or rejected orders | Medium | High | Verify `razorpay_signature` = HMAC_SHA256(`order_id\|payment_id`, secret) on every `payment.captured`; unit-test valid + tampered signatures |
| Custom-builder preview render latency / Studio API timeouts → laggy, fake-looking preview (loses Aarav) | High | High | Budget render time, async with skeleton + optimistic placeholder, request timeout + retry, cache previews in `design-previews`; degrade to client mock if Studio API slow |
| AI design generation cost / latency / failure | Medium | Medium | Pluggable provider behind Studio API, per-user rate limit, log to `ai_generations`, hard timeout, graceful fallback to Upload/Templates; monitor spend |
| Large user-uploaded images (logos/photos) → storage bloat + slow render | Medium | Medium | Enforce 8MB max, server-side resize/convert to webp in Studio API, store originals in `design-uploads` only |
| RLS not applied/leaky across 23 tables (customer/designer/admin/super_admin) → cross-user data leaks | Medium | High | Verify `row_security = true` on every table; test each role; designers see only own designs/earnings; super_admin-only role changes; webhooks use service-role |
| Mystery-box fairness / stock — double reveal or overselling a tier | Medium | Medium | Idempotent reveal (status guard, `revealed_at`); validate `mystery_boxes.is_active` and availability at purchase; reveal server-side only |
| Designer payout accuracy — wrong cut or double-credit on a sale | Medium | High | Create `designer_earnings` only from webhook on confirmed order_item; recompute cut server-side in paise; super-admin approves before `paid` |
| Builder state loss on refresh/navigation → user re-designs from scratch | Medium | High | Persist Zustand builder store + draft `custom_designs`/`design_layers`; restore on return; warn before discard |
| INR paise integer mishandling → float rounding / wrong totals | Medium | High | Store/compute all money as integer paise; recalculate totals server-side; never trust client total; `formatPrice` only at display |
| Razorpay/Stripe secret, UPI handle, or signature logged | Low | High | `grep -r "console.log" src/app/api/payments` → zero; no secret/PII logging in Studio API either |
| TypeScript strict errors blocking build late | Medium | High | Run `tsc --noEmit` after each phase, not only at launch |
