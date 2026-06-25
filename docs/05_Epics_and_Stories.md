# 05 — Epics and User Stories
## FITBOX — Custom T-Shirt & Apparel Platform · ecomm_platform_01

---

## EPIC-001 — Foundation

Setup the project, full FITBOX database, auth, route protection, cart state, and design system. No feature until this is complete. Aligns with Plan Phase 0.

---

**STORY-001-01: Project Initialisation**
As a developer, I need a running Next.js 14 App Router project with all dependencies installed so I can start building FITBOX features.

Acceptance criteria:
- `npm run dev` starts without errors on the storefront app
- TypeScript strict mode enabled (`strict: true` in tsconfig)
- Tailwind CSS v3 configured with CSS variable tokens
- Core deps installed: `@supabase/ssr`, `@supabase/supabase-js`, `zustand`, `framer-motion`, `@radix-ui/*`, `lucide-react`, `clsx`, `tailwind-merge`, `razorpay`, `stripe`, `resend`
- All environment variables from `06_Setup`/master spec documented in `.env.example` (Supabase, Razorpay, Stripe, Resend, Studio API, config)

Dependencies: none
Estimate: 0.5 day

---

**STORY-001-02: Database Schema + RLS**
As a developer, I need the full FITBOX schema created in Supabase with RLS enabled so data is structured and secure.

Acceptance criteria:
- All tables from `02_Architecture.md` created: `categories`, `collections`, `products`, `product_collections`, `product_variants`, `product_images`, `profiles`, `addresses`, `custom_designs`, `design_layers`, `design_assets`, `ai_generations`, `wishlist_items`, `reviews`, `coupons`, `gift_cards`, `mystery_boxes`, `mystery_box_purchases`, `orders`, `order_items`, `order_events`, `designer_earnings`, `email_subscribers`
- `profiles.role` constrained to `('customer','designer','admin','super_admin')` default `'customer'`
- Monetary columns are integer paise (no floats); sizes are text `XS`–`XXXL`
- RLS enabled on every table; policies applied: public read on published products/variants/images/categories/collections/reviews; users manage own profile/addresses/wishlist/saved-designs/orders; designers manage own designs + read own earnings; admin/super_admin full access; only super_admin may change `profiles.role`
- `is_staff()` / `is_admin()` helper functions exist and are used by policies
- `updated_at` triggers fire on `products`, `orders`, `custom_designs`
- `handle_new_user` trigger inserts a `profiles` row on `auth.users` signup

Dependencies: STORY-001-01
Estimate: 1.5 days

---

**STORY-001-03: Authentication Setup**
As a visitor, I can sign up with email or Google so I can create a FITBOX account.

Acceptance criteria:
- `/auth/signup` — email + password + full name form, creates Supabase user (profile auto-created by trigger)
- `/auth/login` — email + password + Google OAuth button
- `/auth/callback` — handles OAuth redirect and sets session
- Supabase session cookie set via `@supabase/ssr` server client on login
- Redirect to `/account` (or `?next=`) after successful login

Dependencies: STORY-001-02
Estimate: 1 day

---

**STORY-001-04: Route Protection (4 roles)**
As a system, unauthenticated and unauthorised users cannot access protected routes.

Acceptance criteria:
- Middleware checks Supabase session on all `/account/*`, `/designer/*`, `/admin/*` routes
- Unauthenticated → redirect to `/auth/login?next=<path>`
- `/designer/*` requires `role = 'designer'`; non-designer → redirect to `/`
- `/admin/*` requires `role in ('admin','super_admin')`; others → redirect to `/`
- `/admin/users` requires `role = 'super_admin'`; admin without super_admin → redirect to `/admin`
- After login, redirect back to original `next` destination

Dependencies: STORY-001-03
Estimate: 1 day

---

**STORY-001-05: Cart Store (Zustand)**
As a visitor, my cart persists across page refreshes without logging in.

Acceptance criteria:
- Zustand store with `persist` middleware (localStorage key: `fitbox-cart`)
- Supports three item types: `product` (variant), `custom` (custom design), `mystery_box`
- `addItem`, `removeItem`, `updateQuantity` functions correct
- Adding the same variant/custom-design increments quantity — no duplicates
- `subtotal` (paise) and `itemCount` derived correctly
- Cart survives browser close and reopen

Dependencies: STORY-001-01
Estimate: 0.5 day

---

**STORY-001-06: Design Tokens & Typography**
As a developer, all design values are available as CSS variables so components never hardcode colors.

Acceptance criteria:
- All tokens from `03_Design.md` / master spec Section 4 in `globals.css` (backgrounds, borders, text, FITBOX orange accent `#FF6B00`, status, spacing, radius, transitions)
- Page background is `--bg-primary: #F8F8F8`; cards use `--bg-surface: #FFFFFF` — verified in browser
- Cabinet Grotesk loaded via `next/font/local` (Fontshare, self-hosted) for headings/display; Inter via `next/font/google` for body/UI
- Tailwind extended (not replaced) with custom colors mapping to CSS variables
- `cn()` utility from `clsx` + `tailwind-merge` available
- `formatPrice(paise)` helper renders `₹1,299` via `Intl.NumberFormat('en-IN', …)`

Dependencies: STORY-001-01
Estimate: 0.5 day

---

**STORY-001-07: Shared Types**
As a developer, I have typed models for all domain entities so the codebase is type-safe end to end.

Acceptance criteria:
- TypeScript types/interfaces for `Product`, `ProductVariant`, `ProductImage`, `Category`, `Collection`, `Profile` (with `role` union), `Address`, `CustomDesign`, `DesignLayer`, `Order`, `OrderItem`, `OrderEvent`, `MysteryBox`, `Coupon`, `GiftCard`, `DesignerEarning`, `CartItem`
- Enums/unions for size (`XS`–`XXXL`), fit (`oversized|regular|hoodie|polo`), order status, AI style (`anime|typography|streetwear|minimal`)
- Types co-located in `lib/types` and imported across app + Studio API client

Dependencies: STORY-001-02
Estimate: 0.5 day

---

## EPIC-002 — Product Catalog

Visitors can browse, filter, and view FITBOX products. Aligns with Plan Phase 1.

---

**STORY-002-01: Navigation Bar**
As a visitor, I can see the navigation and access cart from any page.

Acceptance criteria:
- Sticky nav, 64px height, tokens from design system (surface bg, accent on active)
- FITBOX logo + nav links: Shop, Collections, Customize, Mystery Box, Drops
- Icons (search, account, cart) — Lucide, size 18–20, strokeWidth 1.5
- Cart icon shows item-count badge from Zustand store
- Mobile: hamburger + centered logo + cart icon; menu opens as full-screen overlay with nav links
- "Customize" link routes to `/customize` (the builder USP), visually emphasised

Dependencies: EPIC-001 complete
Estimate: 1 day

---

**STORY-002-02: Homepage**
As a visitor, I can see the FITBOX brand and featured content on the homepage.

Acceptance criteria:
- Route `/`, server component — no client-side data fetch for initial load
- Hero banner: drop/lifestyle image + Cabinet Grotesk display headline + CTA into `/shop` or `/customize`
- New Arrivals section: latest published products (4-up grid)
- Trending Collections: curated collections strip linking to `/collections/[slug]`
- Featured Categories: category tiles linking to `/shop/[category]`
- Limited Edition Drops: products where `is_limited_drop = true`, with real drop date label ("Dropping Friday 6PM"); no fake countdowns on evergreen items
- Custom Design Section: CTA banner into the builder (`/customize`)
- Influencer Picks: curated product set
- Customer Reviews: testimonial cards sourced from `reviews`
- Newsletter Signup: email input → saves to `email_subscribers` (unique email)
- Footer: multi-column links incl. legal `/privacy`, `/terms`

Dependencies: STORY-002-01, STORY-001-02 with seeded data (STORY-002-09)
Estimate: 2.5 days

---

**STORY-002-03: Shop / Product Listing Page**
As a visitor, I can browse products and filter them.

Acceptance criteria:
- Routes: `/shop` (all products) and `/shop/[category]` (category slug matches `categories.slug`)
- Filter bar: category, price range, color swatches, size chips (`XS`–`XXXL`), collection
- Sort dropdown: newest, price ascending, price descending, bestselling
- Filter + sort state held in URL search params (`?color=black&size=L&sort=price_asc&collection=anime`)
- Product grid: 4 columns desktop, 2 mobile
- Load more: 12 items per page, offset pagination, "Load more" button (not infinite scroll)
- 404 if category slug not found
- Prices rendered via `formatPrice` (paise → ₹)

Dependencies: STORY-002-02
Estimate: 2 days

---

**STORY-002-04: Product Card Interactions**
As a visitor, I can preview product details and interact with product cards.

Acceptance criteria:
- Card image uses `--radius-card: 12px` rounding (modern premium)
- Second image fades in on hover (`opacity` transition, not `display` toggle)
- Color swatches (pill dots) clickable — changes displayed image to matching color variant
- "Quick add" button appears on hover at bottom of card
- Quick add: if a single size in stock → add directly; if multiple → open size-picker popover
- Badge renders if product has `badge` set (`new`/`bestseller`/`drop`/`restock`)
- Shows price via `formatPrice`

Dependencies: STORY-002-03
Estimate: 1 day

---

**STORY-002-05: Product Detail Page (PDP)**
As a visitor, I can view full product information and select my size, color, and review fabric.

Acceptance criteria:
- Route: `/products/[slug]`
- Desktop: sticky image gallery left, product info right; Mobile: image horizontal scroll with snap + dots indicator
- Color selector: switching color updates gallery to that color's images
- Size selector: grid of all sizes `XS`–`XXXL`; out-of-stock size (e.g. XXL) shows `opacity-40 line-through cursor-not-allowed` disabled — never hidden
- Size guide link → opens modal with cm size chart (chest/length)
- Fabric details section: `fabric`, `gsm`, `fabric_detail`, `care_instructions` (e.g. "240 GSM combed cotton")
- Accordions (description, care, shipping) — one open at a time
- Reviews & ratings: average stars + list; verified-purchase badge where applicable
- "You may also like" / related: 4 products from same category, excludes current product
- Add to Cart + Buy Now buttons present
- `generateStaticParams` for all published slugs (SSG); `generateMetadata` for SEO

Dependencies: STORY-002-03
Estimate: 2.5 days

---

**STORY-002-06: Add to Cart & Buy Now**
As a visitor, I can add a product to my cart or go straight to checkout from the PDP.

Acceptance criteria:
- Add to Cart disabled until size is selected; clicking without size shows "Please select a size" below button
- On add: item added to Zustand store (item_type `product`), cart drawer opens automatically
- Same variant already in cart → quantity increments
- Button shows loading state during add (300ms minimum)
- "Buy Now" adds item then routes directly to `/checkout`
- Network error shows toast: "Failed to add item — please try again"

Dependencies: STORY-002-05, STORY-001-05
Estimate: 0.5 day

---

**STORY-002-07: Cart Drawer**
As a visitor, I can view and manage my cart.

Acceptance criteria:
- Slides in from right on desktop, slides up from bottom on mobile (< 640px) via Framer Motion
- Line items: image, name, variant description (e.g. "Jet Black / L"), quantity stepper, remove button
- Custom-design and mystery-box line items render with their preview image and label
- Quantity stepper: min 1 (use remove to delete)
- Free-shipping progress bar fills as subtotal approaches ₹1499; shows "Free shipping unlocked!" when reached
- "Checkout" button links to `/checkout`; backdrop click closes drawer
- Accessible: focus trapped, `role="dialog"`, `aria-label="Shopping cart"`, Escape closes

Dependencies: STORY-002-06
Estimate: 1 day

---

**STORY-002-08: Cart Page**
As a visitor, I can view my cart on a dedicated page as a fallback to the drawer.

Acceptance criteria:
- Route: `/cart`
- Full-width line-item list with quantity steppers and remove actions
- Order summary: subtotal, shipping (free ≥ ₹1499 else ₹79), total — all via `formatPrice`
- Empty state: "Your cart is empty" with CTA to `/shop`
- "Proceed to checkout" links to `/checkout`

Dependencies: STORY-002-07
Estimate: 0.5 day

---

**STORY-002-09: Seed Data**
As a developer, the database has realistic FITBOX data for development and testing.

Acceptance criteria:
- All 11 categories seeded (Oversized T-Shirts, Regular Fit T-Shirts, Graphic Tees, Anime Collection, Streetwear Collection, Hoodies, Sweatshirts, Polo Shirts, Crop Tops, Jackets, Accessories)
- 6 curated collections seeded (Anime, Streetwear, Gym, College, Startup, Creator)
- At least 12 products with realistic names (e.g. "Akatsuki Oversized Tee", "Midnight Streetwear Hoodie", "Senpai Crop Top") and prices ₹699–₹2,499 stored in paise
- Each product has variants across base colors × sizes; SKUs in `FB-{CAT}-{COLOR}-{SIZE}` format (e.g. `FB-OVR-BLK-L`)
- Variant stock counts varied (in stock, low, and out of stock incl. at least one out-of-stock XXL)
- Product images: placeholders at 3:4 (1200×1600); at least one `badge='new'`, one `badge='bestseller'`, one `badge='drop'`
- At least one `is_limited_drop = true` product with drop window; a few seeded reviews

Dependencies: STORY-001-02
Estimate: 1 day

---

## EPIC-003 — Custom T-Shirt Builder (USP)

The signature real-time customization experience. Aligns with Plan Phase 2 (builder + Studio API). Persists `custom_designs` + `design_layers`; render and AI generation run on the FITBOX Studio API (Express on Railway).

---

**STORY-003-01: Builder Shell & Store**
As a customer, I can move through a 6-step builder with my choices preserved.

Acceptance criteria:
- Route: `/customize` (no auth required; saving requires login)
- Stepper UI with 6 steps: Style → Color → Design → Text → Preview → Add to cart
- Builder Zustand store holds: `base_style`, `base_color_name/hex`, `size`, per-side layers, computed `price` (paise)
- Forward/back navigation preserves all selections; can't advance past Style/Color until chosen
- `prefers-reduced-motion` respected for step transitions

Dependencies: EPIC-001 complete
Estimate: 1.5 days

---

**STORY-003-02: Step 1 — Choose Style**
As a customer, I can pick a base garment style.

Acceptance criteria:
- Options: Oversized, Regular, Hoodie, Polo (matches builder fits)
- Selecting a style updates the base mockup and starting price
- Selected card shows `--accent-light` selected state
- Choice stored as `base_style` in builder store

Dependencies: STORY-003-01
Estimate: 0.5 day

---

**STORY-003-03: Step 2 — Choose Color**
As a customer, I can pick the garment base color.

Acceptance criteria:
- Color dots for White, Black, Beige, Blue, Green, Red (name + hex)
- Selecting updates the live base mockup color
- `base_color_name` and `base_color_hex` stored in builder store
- Selected dot has clear focus/selected ring (accessible `aria-label` = color name)

Dependencies: STORY-003-02
Estimate: 0.5 day

---

**STORY-003-04: Step 3 — Add Design**
As a customer, I can place a graphic on the garment via upload, logo, AI, or a template.

Acceptance criteria:
- Four sources: Upload Image, Upload Logo, AI Generate, Choose Template
- Upload accepts JPEG/PNG/WebP/SVG up to 8MB → stored in `design-uploads` bucket → recorded in `design_assets` (`type='upload'|'logo'`)
- AI Generate opens prompt + style picker (anime/typography/streetwear/minimal); calls Studio API and returns 4 options in <15s or shows a fallback message + retry (logged in `ai_generations`)
- Templates: a gallery of preset graphics selectable into the canvas
- Selected design added as a `design_layers` row (`type` in `image|logo|ai`) on the active side with default position/scale
- Layer is draggable/scalable/rotatable on the canvas; `z_index` ordering respected

Dependencies: STORY-003-03, STORY-003-08 (Studio API)
Estimate: 2.5 days

---

**STORY-003-05: Step 4 — Add Text**
As a customer, I can add custom text to my garment.

Acceptance criteria:
- Add text input creates a `text` layer with `text_content`, `font`, `text_color`, `alignment` (`left|center|right`)
- Font picker offers multiple display fonts; live update on canvas
- Text color picker and alignment controls update the layer immediately
- Text layer is draggable/scalable/rotatable; multiple text layers supported
- Choices persisted into `design_layers` (`type='text'`)

Dependencies: STORY-003-04
Estimate: 1.5 days

---

**STORY-003-06: Step 5 — Live Preview (Front / Back / 360°)**
As a customer, I can preview a realistic render of my design before buying.

Acceptance criteria:
- Front / Back / 360° toggle
- Front and Back composite all layers for that side via the Studio API render endpoint
- 360° shows a rotating preview (Studio-generated frames or sequence), gated by `prefers-reduced-motion`
- Layers can be authored on both `front` and `back` sides (`design_layers.side`)
- Render returns within a reasonable budget or shows a "preview generating…" state, never a broken image
- Preview URLs saved to `custom_designs.preview_front_url/back_url/preview_360_url`

Dependencies: STORY-003-05, STORY-003-08
Estimate: 2 days

---

**STORY-003-07: Step 6 — Save & Add to Cart**
As a customer, I can finalise my custom design and add it to the cart.

Acceptance criteria:
- Requires a size selection (`XS`–`XXXL`)
- On add: a `custom_designs` row is persisted (status `draft`/`saved`) with all base attributes, computed `price` in paise, and its `design_layers`
- Logged-in users can name and save the design (appears under `/account/saved-designs`); guests get a design persisted with `user_id = null` until login
- Cart item added with item_type `custom`, showing the front preview and configured price
- Custom items are flagged non-returnable per commerce rules

Dependencies: STORY-003-06, STORY-001-05
Estimate: 1 day

---

**STORY-003-08: Studio API — Render & AI Generate**
As the platform, I run heavy image compositing and AI generation off the Vercel serverless path.

Acceptance criteria:
- Express service ("FITBOX Studio API") deployed on Railway; reachable via `STUDIO_API_URL`, authenticated with `STUDIO_API_KEY`
- `POST /render` composites a garment side (base style + color + layers) → returns a preview image URL stored in `design-previews`
- `POST /render/360` returns a 360° preview/frame set stored in `design-previews`
- `POST /ai/generate` calls the pluggable AI image provider (Replicate/Stability/OpenAI Images via `AI_IMAGE_PROVIDER_KEY`), returns 4 options in <15s or a typed fallback error; results stored in `ai-designs` and logged to `ai_generations` (status `pending|succeeded|failed`)
- No secrets, prompts-with-PII, or provider keys logged

Dependencies: STORY-001-02, STORY-001-07
Estimate: 3 days

---

## EPIC-004 — Cart & Checkout

Visitors can complete a purchase via Razorpay (India) or Stripe (international); orders are created idempotently from webhooks. Aligns with Plan Phase 3.

---

**STORY-004-01: Checkout Page & Address**
As a visitor, I can enter my shipping information to prepare for payment.

Acceptance criteria:
- Route: `/checkout`; guest checkout allowed (no forced account creation)
- Left column: guest email input (if logged out) + India-format shipping address form (full name, phone, line1, line2, city, state, PIN code, country default IN)
- Right column: order summary — line items from Zustand (product/custom/mystery_box), subtotal, shipping (free ≥ ₹1499 else ₹79), discounts, total — all via `formatPrice`
- Logged-in user: email pre-filled; saved addresses shown as radio options + "Use a new address"
- All fields validated client-side before a payment provider is initialised

Dependencies: STORY-002-08
Estimate: 1.5 days

---

**STORY-004-02: Razorpay Payment (India)**
As an Indian customer, I can pay via UPI, cards, net banking, or wallets.

Acceptance criteria:
- `POST /api/payments/razorpay/create-order` recalculates amount server-side from cart/custom designs in paise — never trusts client total — and creates a Razorpay Order
- Razorpay Checkout opens with the `order_id`, offering UPI, cards, net banking, wallets
- On success client receives `razorpay_payment_id`, `razorpay_order_id`, `razorpay_signature`
- Payment errors surfaced as readable messages; button shows loading state during processing
- No card data, UPI handles, signatures, or secrets logged

Dependencies: STORY-004-01
Estimate: 2 days

---

**STORY-004-03: Stripe Payment (International)**
As an international customer, I can pay with a card in USD.

Acceptance criteria:
- `POST /api/payments/stripe/create-payment-intent` recalculates amount server-side (cents) — never trusts client total
- Stripe Payment Element mounted (card + Apple Pay + Google Pay)
- Currency `USD`; order `currency` recorded accordingly
- Payment errors surfaced as readable messages (not raw Stripe codes); loading state on submit

Dependencies: STORY-004-01
Estimate: 1.5 days

---

**STORY-004-04: Order Creation via Webhooks (idempotent)**
As the system, a successful payment creates exactly one order in the database.

Acceptance criteria:
- `POST /api/payments/razorpay/webhook` handles `payment.captured`, verifying HMAC: `razorpay_signature = HMAC_SHA256(order_id|payment_id, secret)` with `RAZORPAY_WEBHOOK_SECRET`
- `POST /api/payments/stripe/webhook` handles `payment_intent.succeeded`, verifying with `STRIPE_WEBHOOK_SECRET`
- Idempotency: duplicate webhook event (same `razorpay_payment_id` / `stripe_payment_intent_id`) results in exactly one order — return 200 without creating a duplicate
- Order + `order_items` (snapshot of product/custom/mystery_box) created with a unique `order_number` (e.g. `FB-25-000123`), status `processing`, totals in paise
- `stock_count` decremented for each ordered variant (transactional / race-safe)
- A `designer_earnings` row is recorded for each sold marketplace design (designer's cut)
- Webhooks are the source of truth for order creation; respond 200 within provider timeout

Dependencies: STORY-004-02, STORY-004-03
Estimate: 2.5 days

---

**STORY-004-05: Coupon Engine**
As a visitor, I can apply a valid coupon to reduce my order total.

Acceptance criteria:
- Coupon input in cart/checkout validates against `coupons` (active, within `starts_at`/`expires_at`, under `max_redemptions`, meets `min_subtotal`)
- `percent` and `fixed` (paise) discount types applied correctly server-side
- Invalid/expired/over-limit codes show a clear inline error; valid code shows the discount line
- Discount recalculated server-side at payment time and stored on the order (`coupon_code`, `discount_amount`); `times_redeemed` incremented on order creation

Dependencies: STORY-004-01
Estimate: 1 day

---

**STORY-004-06: Gift Cards**
As a visitor, I can redeem a gift card toward my order.

Acceptance criteria:
- Gift-card code input validates against `gift_cards` (active, balance > 0)
- Applied amount is `min(balance, order total)` and recalculated server-side
- On successful order, `gift_cards.balance` is decremented and `gift_card_code` / `gift_card_amount` stored on the order
- Invalid or depleted cards show a clear inline error

Dependencies: STORY-004-05
Estimate: 1 day

---

**STORY-004-07: Order Confirmation & Email**
As a visitor, I receive confirmation after a successful purchase.

Acceptance criteria:
- On payment success → redirect to `/checkout/success`
- Cart cleared from Zustand; any associated `custom_designs` marked `ordered`
- Confirmation shows: order number, items, shipping address, totals, estimated delivery (5–7 days)
- "Continue shopping" button links to `/`
- Confirmation email sent via Resend (from `orders@fitbox.in`) within 2 minutes; subject `Your FITBOX order #XXXX is confirmed`, body lists order number, items table, total, shipping address

Dependencies: STORY-004-04
Estimate: 1 day

---

## EPIC-005 — User Accounts & Order Tracking

Customers manage their account, designs, rewards, and track orders live. Aligns with Plan Phase 4.

---

**STORY-005-01: Account Dashboard**
As a logged-in user, I can navigate my account sections.

Acceptance criteria:
- Route: `/account` → redirects to `/account/orders`
- Account layout sidebar: Orders, Wishlist, Saved Designs, Addresses, Rewards, Profile
- Sidebar shows user's name and email
- Mobile: sidebar collapses to a bottom tab bar

Dependencies: STORY-001-03, STORY-001-04
Estimate: 0.5 day

---

**STORY-005-02: Order History**
As a logged-in user, I can view all my past orders.

Acceptance criteria:
- Route: `/account/orders`
- List: order number, date, status chip, total (`formatPrice`), "View order" link
- Status chips colour-coded across the FITBOX status set (processing, printing, shipped, out_for_delivery, delivered, cancelled, refunded, etc.)
- Empty state: "No orders yet" with link to `/shop`
- Orders sorted by date descending; only `user_id = auth.uid()` rows (RLS)

Dependencies: STORY-005-01
Estimate: 0.5 day

---

**STORY-005-03: Order Detail**
As a logged-in user, I can view the details of a specific order.

Acceptance criteria:
- Route: `/account/orders/[id]`
- Shows order number, date, status, line items (snapshot incl. custom/mystery_box), shipping address, totals
- If shipped: tracking carrier + number shown as link; "Track order" links to `/account/orders/[id]/track`
- "Request return" only if status `delivered`, only within 7 days of delivery, and only for catalog items (custom & mystery-box items are non-returnable and clearly marked); sets status `return_requested`
- "Buy again" adds in-stock items to cart, toasts each skipped out-of-stock item

Dependencies: STORY-005-02
Estimate: 1 day

---

**STORY-005-04: Wishlist**
As a logged-in user, I can save products to a wishlist.

Acceptance criteria:
- Route: `/account/wishlist`; heart toggle on product cards/PDP adds/removes via `wishlist_items` (unique per user+product)
- Wishlist grid shows saved products with add-to-cart
- Removing an item updates immediately; empty state with link to `/shop`
- Only the user's own rows visible (RLS)

Dependencies: STORY-005-01
Estimate: 1 day

---

**STORY-005-05: Saved Designs**
As a logged-in user, I can view and reuse my custom designs.

Acceptance criteria:
- Route: `/account/saved-designs`
- Grid of `custom_designs` for the user (status `saved`) with front preview, name, price
- "Edit" reopens the design in `/customize` with layers restored; "Add to cart" adds it as a custom item
- Empty state with CTA to `/customize`

Dependencies: STORY-005-01, STORY-003-07
Estimate: 1 day

---

**STORY-005-06: Saved Addresses**
As a logged-in user, I can manage my saved shipping addresses.

Acceptance criteria:
- Route: `/account/addresses`
- List with edit, delete, "Set as default" actions
- Add/edit form: full name, phone, line1, line2, city, state, PIN code, country (IN default)
- Default address marked visually and pre-selected first in checkout
- Deleting the default leaves no default (user must choose); at most 5 addresses per user

Dependencies: STORY-005-01
Estimate: 1 day

---

**STORY-005-07: Rewards Points**
As a logged-in user, I can see and understand my rewards balance.

Acceptance criteria:
- Route: `/account/rewards` shows current `profiles.reward_points` and how points are earned
- Points are credited when an order reaches status `delivered` (not before)
- Points history/explanation visible; balance updates after a delivered order
- (Redemption surfaced if/where applicable per coupon engine)

Dependencies: STORY-005-01
Estimate: 1 day

---

**STORY-005-08: Profile & Password**
As a logged-in user, I can update my profile and change my password.

Acceptance criteria:
- Route: `/account/profile` — edit full name and phone (writes to `profiles`)
- Password change form: current, new, confirm; current verified via Supabase before change; new password min 8 chars
- Success: "Profile updated" / "Password updated" toast; form resets

Dependencies: STORY-005-01
Estimate: 0.5 day

---

**STORY-005-09: Live Order Tracking**
As a customer, I can track my order's progress in real time.

Acceptance criteria:
- Public route `/track`: look up by order number + email (no login)
- Authenticated route `/account/orders/[id]/track`: full timeline for the user's order
- Timeline rendered from `order_events` (status, message, location, timestamp), newest at top, current stage highlighted
- Status transitions write an `order_events` row and trigger a customer notification (email via Resend; e.g. shipped with tracking number)
- Tracking carrier + number link out when present

Dependencies: STORY-005-03, STORY-004-04
Estimate: 1.5 days

---

## EPIC-006 — Collections & Mystery Box

Curated collections plus the gamified Mystery Box experience. Aligns with Plan Phase 5.

---

**STORY-006-01: Collections Index**
As a visitor, I can browse curated collections.

Acceptance criteria:
- Route: `/collections` — grid of the 6 curated collections (Anime, Streetwear, Gym, College, Startup, Creator) with hero image and name
- Featured collections (`is_featured`) surfaced first; ordered by `position`
- Each card links to `/collections/[slug]`

Dependencies: EPIC-002 complete
Estimate: 0.5 day

---

**STORY-006-02: Collection Detail**
As a visitor, I can view all products in a collection.

Acceptance criteria:
- Route: `/collections/[slug]`
- Hero header (collection hero image + name + description) + product grid (via `product_collections`)
- Reuses the PLP product grid, filters, and load-more
- 404 if slug not found

Dependencies: STORY-006-01
Estimate: 1 day

---

**STORY-006-03: Mystery Box Landing**
As a visitor, I can discover the Mystery Box experience and pick a category.

Acceptance criteria:
- Route: `/mystery-box` — explains the gamified concept and lists the 4 categories (Anime, Streetwear, Gym, Creator)
- Each category links to `/mystery-box/[category]`
- States clearly that Mystery Box items are non-returnable

Dependencies: STORY-006-01
Estimate: 0.5 day

---

**STORY-006-04: Box Picker & Tier Select**
As a visitor, I can choose a Mystery Box tier within a category.

Acceptance criteria:
- Route: `/mystery-box/[category]` — shows Bronze / Silver / Gold tiers from `mystery_boxes` (active rows for that category) with price (`formatPrice`) and `item_count`
- Selecting a tier proceeds to purchase; purchase requires auth (redirect to login with `next`)
- Invalid category → 404

Dependencies: STORY-006-03
Estimate: 1 day

---

**STORY-006-05: Purchase & Animated Unbox Reveal**
As a customer, I can buy a Mystery Box and see an animated reveal of my fit.

Acceptance criteria:
- Mystery Box added to cart as item_type `mystery_box`; checkout flows through the standard Razorpay/Stripe webhook order path
- On order creation a `mystery_box_purchases` row is created (status `sealed`)
- After purchase the unbox screen plays a Framer Motion reveal animation, then sets the purchase `revealed` with `revealed_at`
- Unboxing animation is the allowed signature motion but is fully gated by `prefers-reduced-motion` (reduced-motion users get an instant, non-animated reveal)
- "Wear the fit" step shows the revealed outfit on a character/model preview

Dependencies: STORY-006-04, STORY-004-04
Estimate: 2 days

---

## EPIC-007 — Designer Marketplace & AI

Community designers upload and sell designs and earn payouts; AI assists customers. Aligns with Plan Phase 6.

---

**STORY-007-01: Designer Dashboard**
As a designer, I can see an overview of my marketplace activity.

Acceptance criteria:
- Route: `/designer` — role-protected (`role = 'designer'`)
- Shows summary tiles: total designs, total sales, pending vs paid earnings (paise → ₹)
- Links to Manage Designs and Earnings
- Non-designers redirected to `/`

Dependencies: STORY-001-04
Estimate: 0.5 day

---

**STORY-007-02: Upload & Sell Designs**
As a designer, I can upload designs and list them for sale.

Acceptance criteria:
- Routes: `/designer/designs` (manage) and `/designer/designs/new` (upload)
- Upload form: name, category, image asset (stored in storage), price; creates a `products` row with `designer_id = auth.uid()`
- Designer can edit/unpublish only their own designs (RLS); cannot touch house products
- Published designer products appear in Shop/collections like house products

Dependencies: STORY-007-01
Estimate: 1.5 days

---

**STORY-007-03: Earnings & Payouts**
As a designer, I can track my earnings and payout status.

Acceptance criteria:
- Route: `/designer/earnings`
- Lists `designer_earnings` rows (amount in paise, linked order item, status `pending`/`paid`)
- A recorded cut is credited on each sale of the designer's product (created during webhook order creation)
- Totals for pending and paid; designer reads only their own earnings (RLS)
- Payout notification email (Resend) when an earning is marked `paid`

Dependencies: STORY-007-02, STORY-004-04
Estimate: 1.5 days

---

**STORY-007-04: AI Outfit / Style Recommendation**
As a customer, I get personalised style and product recommendations.

Acceptance criteria:
- Recommends colors, collections, and styles based on browsing + purchase history
- Surfaced on homepage ("Influencer Picks"/"For you") and/or PDP related strip
- Falls back gracefully to popular/bestselling products when history is sparse
- Recommendation compute that is heavy runs via the Studio API; no PII logged

Dependencies: STORY-002-05, STORY-005-02
Estimate: 1.5 days

---

**STORY-007-05: AI Design Generator**
As a customer, I can generate a design from a text prompt inside the builder.

Acceptance criteria:
- Available in builder Step 3; styles: Anime, Typography, Streetwear, Minimal
- Calls Studio API `POST /ai/generate`; returns 4 design options in <15s or shows a fallback with retry
- Generated assets stored in `ai-designs`; each request logged in `ai_generations` (style + status)
- Chosen option is added as an `ai` design layer and is fully usable in preview and checkout

Dependencies: STORY-003-04, STORY-003-08
Estimate: 1 day

---

## EPIC-008 — Admin Dashboard

Store admins and the super admin manage the platform. Aligns with Plan Phase 7.

---

**STORY-008-01: Admin Layout & Role Check**
As an admin, I can navigate a role-protected admin panel.

Acceptance criteria:
- Route: `/admin` — requires `role in ('admin','super_admin')`
- Sidebar: Products, Inventory, Orders, Collections, Custom Designs, Customers, Coupons, Campaigns, Mystery Boxes, (Users — super_admin only)
- Admin layout visually distinct from storefront (different bg, "ADMIN" label)
- Non-staff redirected to `/` (middleware); `/admin/users` hidden for non-super_admin

Dependencies: STORY-001-04
Estimate: 0.5 day

---

**STORY-008-02: Product Management**
As an admin, I can create and edit products.

Acceptance criteria:
- `/admin/products` table of all products (published + unpublished); `/admin/products/new`, `/admin/products/[id]/edit`
- Create/edit: name, slug (auto from name, unique-validated), description, category, fabric/`gsm`/care, fit, badge, limited-drop toggle + drop window, published toggle, base price (paise)
- Delete requires a confirmation dialog
- Edits revalidate the affected PDP

Dependencies: STORY-008-01
Estimate: 1.5 days

---

**STORY-008-03: Variant Manager**
As an admin, I can manage product variants (size × color).

Acceptance criteria:
- Inline variant table on the product edit page
- Add/edit variant: size (`XS`–`XXXL`), color name, color hex (picker), SKU (`FB-…`, unique), stock count, optional price override (paise)
- Delete variant (confirm if stock > 0)
- Variant changes revalidate the product page

Dependencies: STORY-008-02
Estimate: 1 day

---

**STORY-008-04: Image Uploader**
As an admin, I can upload and order product images.

Acceptance criteria:
- Drag-and-drop uploader on the product edit page; accepts JPEG/PNG/WebP, max 8MB
- Uploaded to `product-images` at `products/{product_id}/{color}/{position}.webp`; URL saved to `product_images`
- Images reorderable by drag; per-color tagging supported
- Delete removes from storage + DB; primary image marked with a star and used on the card

Dependencies: STORY-008-02
Estimate: 1 day

---

**STORY-008-05: Inventory Quick-Update**
As an admin, I can quickly update stock counts.

Acceptance criteria:
- `/admin/inventory` — search by SKU or product name
- Results table: SKU, product, color, size, current stock
- Inline editable stock input; "Save" updates `stock_count`
- Success toast + PDP revalidation; storefront reflects change within ~30s

Dependencies: STORY-008-01
Estimate: 1 day

---

**STORY-008-06: Order Management & Refunds**
As an admin, I can view, update, and refund orders.

Acceptance criteria:
- `/admin/orders` table: order number, email, status, total, date; filter by status; `/admin/orders/[id]` detail
- Order detail: line items, shipping address, status dropdown across the FITBOX status set
- Updating status writes an `order_events` row (and triggers customer notification, e.g. shipping email with tracking on `shipped`)
- Refund action transitions to `refunded` and initiates provider refund (Razorpay/Stripe per `payment_provider`); refund recorded
- Status `delivered` credits reward points to the customer

Dependencies: STORY-008-01, STORY-004-04
Estimate: 2 days

---

**STORY-008-07: Collections Management**
As an admin, I can manage curated collections.

Acceptance criteria:
- `/admin/collections` — create/edit/delete collections (name, slug, description, hero image, featured, position)
- Assign/unassign products to a collection (`product_collections`)
- Changes reflected on `/collections` and collection detail pages

Dependencies: STORY-008-01
Estimate: 1 day

---

**STORY-008-08: Custom Designs Moderation**
As an admin, I can review user-uploaded and designer-submitted designs.

Acceptance criteria:
- `/admin/custom-designs` — lists user uploads / AI assets / custom designs with previews
- Admin can approve/reject or remove a design asset that violates policy
- Removed assets are unpublished/deleted from storage where required
- Moderation action is auditable

Dependencies: STORY-008-01
Estimate: 1 day

---

**STORY-008-09: Customers & Analytics**
As an admin, I can view customers and key store metrics.

Acceptance criteria:
- `/admin/customers` — searchable customer list (name, email, role, order count, lifetime value)
- Analytics tiles for the success metrics: conversion rate, cart completion rate, average order value, custom-design usage, repeat purchases, monthly revenue, retention
- All monetary figures via `formatPrice`

Dependencies: STORY-008-01
Estimate: 1.5 days

---

**STORY-008-10: Coupons & Campaigns**
As an admin, I can run promotions.

Acceptance criteria:
- `/admin/coupons` — create/edit coupons (code, percent/fixed value, min subtotal, max redemptions, window, active toggle)
- `/admin/campaigns` — create marketing campaigns (e.g. drop announcements / newsletter sends) targeting `email_subscribers` via Resend
- Coupon changes immediately affect the coupon engine validation

Dependencies: STORY-008-01, STORY-004-05
Estimate: 1.5 days

---

**STORY-008-11: Mystery Box Configuration**
As an admin, I can configure Mystery Box tiers.

Acceptance criteria:
- `/admin/mystery-boxes` — manage `mystery_boxes` rows: per (category, tier) price (paise), `item_count`, active toggle
- Enforces unique (category, tier); inactive tiers don't appear on the storefront
- Changes reflected on `/mystery-box/[category]`

Dependencies: STORY-008-01
Estimate: 1 day

---

**STORY-008-12: Super Admin — User & Role Management**
As a super admin, I can manage users and roles.

Acceptance criteria:
- `/admin/users` — restricted to `role = 'super_admin'`
- List users with current role; change role among `customer|designer|admin|super_admin`
- Role changes enforced by the super_admin-only RLS policy on `profiles.role`
- Action is audited; an admin (non-super) cannot access this page

Dependencies: STORY-008-01
Estimate: 1 day

---

## EPIC-009 — Launch

SEO, performance, accessibility, resilience, and consent. Aligns with Plan Phase 8.

---

**STORY-009-01: SEO & Metadata**
As a product owner, all public pages have correct metadata for search engines.

Acceptance criteria:
- `generateMetadata` on: homepage, Shop/PLP, PDP, collections, customize, mystery-box, privacy, terms
- PDP metadata: product name + "FITBOX" in title; description from product description; `og:image` = product primary image
- Default keywords include: Custom T Shirts India, Oversized T Shirts, Anime T Shirts, Streetwear Clothing, Graphic Tees India, Personalized T Shirts
- `app/sitemap.ts` generates a sitemap with all published products, categories, and collections
- `robots.txt` (`NEXT_PUBLIC_SITE_URL` based) blocks `/admin`, `/account`, `/designer`, `/api`

Dependencies: EPIC-002 complete
Estimate: 0.5 day

---

**STORY-009-02: Performance Optimisation**
As a visitor, all pages load quickly on mobile.

Acceptance criteria:
- All product images use `next/image` with explicit dimensions; hero image has `priority`
- LCP image identified and prioritised; Cabinet Grotesk + Inter preloaded via `next/font`
- Builder canvas and preview lazy-load heavy assets; Studio API renders are cached where possible
- No unused JS bundles (analyzer report reviewed)
- Lighthouse Performance 95+ on homepage and PDP (mobile)

Dependencies: EPIC-002 complete
Estimate: 1 day

---

**STORY-009-03: Accessibility Audit**
As a visitor with a disability, I can use the platform with a screen reader or keyboard.

Acceptance criteria:
- axe-core audit: zero critical violations on homepage, PDP, builder, checkout
- Cart drawer & all modals: focus trapped, `role="dialog"`, Escape closes
- All form inputs have labels; color swatches/dots have `aria-label` = color name
- Size selector uses `aria-pressed` and `aria-disabled`; out-of-stock sizes clearly conveyed
- Builder canvas controls are keyboard-operable; the Mystery Box unboxing and 360° preview animations fully respect `prefers-reduced-motion`

Dependencies: EPIC-001–006 complete
Estimate: 1 day

---

**STORY-009-04: Error & Loading States**
As a visitor, I see helpful feedback when pages load or fail.

Acceptance criteria:
- `loading.tsx` for all route segments — skeleton UI matching layout
- `error.tsx` with "Something went wrong" + "Go home" link
- `not-found.tsx` with navigation and search
- Network errors on Add to Cart / save design show a toast; checkout/payment API errors show an inline message below the payment form
- Studio API render/AI failures show a friendly fallback with retry (never a broken image)

Dependencies: EPIC-002–006 complete
Estimate: 1 day

---

**STORY-009-05: Cookie Consent**
As a visitor, I am asked for consent before non-essential cookies are set.

Acceptance criteria:
- Consent banner shown on first visit; choice persisted (does not re-prompt every load)
- Non-essential analytics scripts load only after consent
- Banner does not cover primary CTAs on mobile and is keyboard/screen-reader accessible
- Links to `/privacy` and `/terms`

Dependencies: EPIC-002 complete
Estimate: 0.5 day
