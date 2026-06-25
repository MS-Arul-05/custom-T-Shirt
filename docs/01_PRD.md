# 01 — Product Requirements Document
## FITBOX — Custom T-Shirt & Apparel Platform · ecomm_platform_01

---

### 1. Product Vision

FITBOX is a modern fashion-tech platform that fuses four experiences into one storefront: a **premium apparel brand store** (oversized tees, hoodies, limited drops), a **real-time Custom T-Shirt Designer** (the core USP), **gamified shopping** via animated Mystery Box unboxing, and a **community designer marketplace** where creators upload and sell their designs. The aesthetic is modern premium streetwear — Apple-level cleanliness, Nike-inspired product presentation, H&M-inspired catalog layout — with bold, youthful, confident energy. Hype is allowed for drops; deceptive dark patterns are not.

FITBOX is **India-first** (Razorpay, UPI, INR pricing in paise, "Custom T Shirts India" SEO) with international support (Stripe, USD). The store must feel as fast and considered as the products it sells. Limited-edition scarcity is a legitimate mechanic (real countdowns for real drops), but there are no fake countdowns on evergreen catalog items and no deceptive "only 1 left" lies.

**Success metric:** A shopper on mobile can design a custom tee in the builder and complete checkout via UPI in **under ~4 minutes** without creating an account.

---

### 2. Personas

**Aarav — Gen-Z custom shopper (primary)**
- 21 years old, college student, Mumbai
- Discovered FITBOX on Instagram reels
- Shopping on Android; pays via UPI
- Wants: a custom oversized anime tee with his own text, fast and frictionless
- Concern: "Will the builder lag? Will the preview look fake / not match what I get?"
- He will leave if: the builder is laggy, the live preview looks unconvincing, or checkout doesn't offer UPI

**Sneha — Drop hunter / returning customer**
- 26 years old, designer, Bangalore
- Has bought limited drops before; follows the brand for new releases
- Uses Wishlist, Saved Designs, and Rewards points
- Wants: fast reorder of a saved design, live order tracking, early access to drops
- Concern: "Is my size still in stock for this drop? Can I reorder the exact design I saved?"
- She will use: wishlist, saved designs, reward points, live tracking

**Rohan — Community designer**
- 24 years old, freelance illustrator
- Uploads anime/streetwear designs to the FITBOX marketplace and earns on each sale
- Needs: a clean upload flow, design moderation status, and a clear earnings/payout view
- Concern: "How much have I earned, and when do I get paid out?"
- Pain point: most marketplaces hide earnings and bury the upload flow

**Priya — Store admin**
- Operations manager at FITBOX
- Manages products, drops, inventory, orders, refunds, coupons/campaigns, and moderates user-uploaded designs
- Not technical — needs a clear admin UI, not direct database access
- Pain point: currently coordinates stock and drop timing over messages with the developer

**Super Admin — Platform owner (secondary)**
- Full system control: manages admins and roles, platform settings, designer payouts
- Needs: role management, payout approvals, and global configuration

---

### 3. Core Features

#### 3.1 Homepage
- **Hero banner:** bold drop-led headline, primary CTA into Shop and into the Custom Builder (no auto-advancing carousel; respects `prefers-reduced-motion`)
- **New Arrivals:** latest published products with `new` / `drop` badges
- **Trending Collections:** Anime, Streetwear, Gym, College, Startup, Creator entry tiles
- **Featured Categories:** Oversized, Graphic Tees, Hoodies, Sweatshirts, etc.
- **Limited Edition Drops:** real countdowns for real drops ("Dropping Friday 6PM"), sold-out states — legitimate scarcity only
- **Custom Design Section:** prominent CTA into the 6-step builder (the USP), with sample previews
- **Influencer Picks:** curated looks / creator-endorsed products
- **Customer Reviews:** rotating verified-purchase reviews and ratings
- **Newsletter Signup:** email capture (drop alerts), stored in `email_subscribers`

#### 3.2 Shop
- Browse all products in a responsive grid; category landing pages at `/shop/[category]`
- **Search:** product name / keyword search
- **Filters:** category, price range, color, size (availability), collection
- **Sort by:** newest, price low-high, price high-low, bestsellers, trending
- Product cards show: name, price (`₹` formatted from paise), color swatches, badge (`new`/`bestseller`/`drop`/`restock`), hover-to-second-image
- Pagination: Load more button (not infinite scroll)

#### 3.3 Product Detail Page (PDP)
- **Image gallery:** 4–8 images, thumbnail strip, zoom on click; switching color changes the image set
- **Size selector:** button grid (XS–XXXL); out-of-stock sizes shown strikethrough + disabled; size-guide link opens a modal (chest/length in cm)
- **Color selector:** visual swatches with color name on hover
- **Fabric details:** GSM, fabric composition (e.g. "240 GSM combed cotton"), specific (not generic) descriptions
- **Description** + care instructions (accordion)
- **Reviews & ratings:** 1–5 star ratings, verified-purchase badge, review body; aggregate rating shown
- **Related products:** "You may also like" — 4 related items by category/collection
- **Add to Cart:** disabled until size selected; shows "Select a size" validation if submitted without
- **Buy Now:** straight to checkout with this single item

#### 3.4 Custom T-Shirt Builder (USP)
The signature real-time builder, presented as 6 steps. Live preview compositing (front/back/360°) and AI generation run on the **FITBOX Studio API** (Express on Railway).
- **Step 1 — Choose style:** Oversized / Regular / Hoodie / Polo
- **Step 2 — Choose color:** White / Black / Beige / Blue / Green / Red (plus per-style extras)
- **Step 3 — Add design:** Upload Image / Upload Logo / **AI Generate** (anime/typography/streetwear/minimal from a prompt) / Choose Template
- **Step 4 — Add text:** custom text, font, text color, alignment (left/center/right)
- **Step 5 — Live preview:** real-time Front / Back / 360° preview rendered via the Studio API; drag/scale/rotate layers
- **Step 6 — Add to cart:** computes price, saves the custom design (server-side; login required to persist as a Saved Design), adds to cart
- Custom/personalized items are **non-returnable** — stated explicitly in the builder and at checkout

#### 3.5 Collections
- Curated collections index at `/collections` plus detail pages at `/collections/[slug]`
- Six launch collections: **Anime, Streetwear, Gym, College, Startup, Creator**
- Each collection has a hero image, description, and a filtered product grid
- Products belong to collections via a many-to-many relationship (a product can appear in several)

#### 3.6 Mystery Box (gamified)
- Landing page at `/mystery-box` explaining the mechanic
- **Step 01 — Pick category:** Anime / Streetwear / Gym / Creator
- **Step 02 — Select box tier:** Bronze / Silver / Gold (price + piece count increase by tier)
- **Step 03 — Unbox:** animated reveal (signature Framer Motion unboxing; gated by `prefers-reduced-motion`) after purchase
- **Step 04 — "Wear the fit":** character/model wears the revealed outfit
- Mystery Box items are **non-returnable** — stated explicitly before purchase

#### 3.7 User Accounts
- Sign up / log in via Supabase Auth (email + password, Google OAuth)
- Account sections: **Profile, Order History, Wishlist, Saved Designs, Saved Addresses, Rewards**
- **Order history:** list of orders with status (Pending, Processing, Printing, Shipped, Out for Delivery, Delivered, Returned, Refunded)
- **Order detail:** line items, live tracking timeline, return request (where eligible)
- **Wishlist:** save/remove products; one row per (user, product)
- **Saved Designs:** custom designs persisted from the builder; reorder directly
- **Saved addresses:** India-format (PIN code, state); add, edit, set default, delete
- **Rewards:** points balance earned on purchases, shown and redeemable
- **Profile:** name, phone, password change (current password required)

#### 3.8 Cart & Checkout
- Persistent cart via Zustand + localStorage (no login required); custom designs persisted server-side
- Cart drawer slides in from right — accessible on every page
- Line items support catalog products, custom designs, and mystery boxes: image/preview, name, color, size, quantity stepper (min 1), remove
- **Free shipping progress bar:** threshold **₹1,499**; standard shipping **₹79** below threshold
- **Coupon engine:** apply percent/fixed coupons (validated server-side: active, within window, min subtotal, redemption limit)
- **Gift cards:** redeem against order total (balance tracked server-side)
- **Guest checkout:** email + India-format shipping address + payment (no account required)
- **Logged-in checkout:** pre-fill email, saved-address selector, new-address option
- **Payment:**
  - **Razorpay (India / INR):** UPI, credit/debit card, net banking, wallets
  - **Stripe (international / USD):** card via Payment Element
- Order summary sidebar: line items, discount, gift-card amount, shipping, subtotal, total (all recalculated server-side in paise — client total never trusted)
- On success: clear cart, show order confirmation, send confirmation email via Resend
- On failure: surface the provider error message, do not clear cart

#### 3.9 Order Tracking
- **Live tracking** at `/track` (public via order number + email) and `/account/orders/[id]/track` (authenticated)
- Tracking timeline driven by `order_events` (status, message, location, timestamp)
- **Shipping updates** with carrier + tracking number
- **Delivery notifications** via Resend (shipped, out for delivery, delivered)

#### 3.10 Admin Dashboard (route: `/admin`)
- Protected by Supabase role — only `admin` / `super_admin` may access
- **Products:** list, add, edit; manage variants (size + color + stock + SKU + price), upload images, set drops (`is_limited_drop`, drop window), badges
- **Inventory:** quick stock update per variant — search by SKU, enter new stock count
- **Orders:** list (filterable by status), view detail, update status, issue **refunds**
- **Collections:** create/curate collections and assign products
- **Custom Designs:** moderate user-uploaded designs (approve/reject)
- **Customers + Analytics:** customer list and store analytics (conversion, AOV, revenue, repeat purchases)
- **Marketing:** coupon engine (create/manage coupons) and campaigns
- **Mystery Boxes:** configure category/tier pricing and piece counts
- **Users / Roles** (`/admin/users`): role management — **super_admin only**

#### 3.11 AI Features
- **AI Outfit / Style Recommendation:** recommends colors, collections, and styles based on the user's browsing + purchase history
- **AI Design Generator:** generates **Anime / Typography / Streetwear / Minimal** designs from text prompts inside the builder; runs on the Studio API (Railway) via a pluggable image provider; logged in `ai_generations`

---

### 4. User Journeys

#### Journey 1 — First custom-tee purchase (guest, via UPI)
1. Land on homepage from an Instagram reel
2. Tap the Custom Design CTA → builder opens
3. Step 1 pick **Oversized** → Step 2 pick **Black** → Step 3 **AI Generate** an anime design from a prompt → Step 4 add text (font, color, center) → Step 5 check Front/Back/360° live preview → Step 6 "Add to Cart"
4. Cart drawer opens → review (non-returnable notice shown) → "Checkout"
5. Enter email + India shipping address → pay via **UPI** (Razorpay)
6. Razorpay webhook confirms payment → order created → confirmation page + email
7. Total time target: **under ~4 minutes** on mobile

#### Journey 2 — Returning drop-hunter reorder (wishlist / saved design)
1. Sneha lands on homepage and logs in
2. Goes to **Saved Designs** (or **Wishlist**) → finds her saved custom design / wishlisted drop
3. "Reorder" / "Add to cart" → selects size if needed (stock checked live)
4. Cart → Checkout with **pre-filled saved address** + reward points applied
5. Pays via UPI → confirms order → opens **live tracking** for delivery updates

#### Journey 3 — Admin updates inventory / drops
1. Priya logs in as admin → `/admin`
2. Opens **Inventory** tab → searches SKU `FB-OVR-BLK-L` → updates stock to 45 → Save → confirmation toast
3. Opens **Products** → sets a product as a **limited drop** with a drop window ("Dropping Friday 6PM")
4. Stock and drop state reflect on PDP / Shop within seconds

#### Journey 4 — Designer uploads a design and earns
1. Rohan logs in (designer role) → `/designer`
2. Opens **Designs → New** → uploads an anime artwork with title/tags
3. Submits → status shows **pending moderation**; Priya approves it in `/admin/custom-designs`
4. The design is attached to sellable products; on each sale, Rohan's cut is recorded in `designer_earnings`
5. Rohan checks **Earnings** → sees pending vs paid payouts

#### Journey 5 — Buyer opens a Mystery Box
1. Aarav opens `/mystery-box` → picks the **Anime** category
2. Selects the **Gold** tier → reviews price + piece count (non-returnable notice shown)
3. Pays via UPI → purchase recorded (`sealed`)
4. Returns to the box → taps **Unbox** → animated reveal plays (reduced-motion safe) → status `revealed`
5. Sees the **"Wear the fit"** view of the revealed outfit; order proceeds to fulfillment + tracking

---

### 5. Non-Goals

These are explicitly out of scope for v1. Several items that were out of scope for the old brand (reviews, wishlist, gift cards, loyalty/rewards) are now **in scope** for FITBOX.

| # | Non-goal | Why |
|---|----------|-----|
| NG1 | Multi-vendor marketplace beyond the designer marketplace | Designer marketplace is in scope; general third-party vendor onboarding is not |
| NG2 | Subscription / recurring orders & subscription Mystery Boxes | Future phase |
| NG3 | B2B / wholesale / bulk-print ordering | Separate platform if needed |
| NG4 | Physical retail POS / in-store integration | Online-only for v1 |
| NG5 | AR / virtual try-on | Future phase (v1 uses Studio-rendered previews instead) |
| NG6 | Live chat / support inbox | Use third-party (e.g. Intercom); must not cover CTAs on mobile |
| NG7 | Native mobile apps (iOS/Android) | Responsive web first |
| NG8 | Designer-set custom pricing / auctions | Designers earn a fixed cut; pricing is platform-controlled in v1 |
| NG9 | Multi-currency beyond INR + USD | INR primary, USD international — no arbitrary currency switching |
| NG10 | User-to-user social feed / following | Influencer Picks are curated, not a social graph |

> **Now IN scope (previously deferred):** Product reviews & ratings, Wishlist, Saved Designs, Gift cards, Loyalty/Rewards points, Coupons/campaigns, Revenue analytics, Customer management, Designer marketplace, AI design generation.

---

### 6. Constraints

**Technical:**
- All pages must pass **Lighthouse 95+** on mobile and desktop
- **LCP under 2.5s** on 4G mobile
- No client-side data fetching on first page load for catalog pages — use Next.js `generateStaticParams` or server components
- Cart state in localStorage only — no server-side cart session; custom designs persisted server-side
- Heavy compute (AI generation, front/back/360° preview compositing) runs on the **FITBOX Studio API** (Express on Railway), not on Vercel serverless
- Prices stored and computed as **integer paise** (never floats)

**Business:**
- **Primary currency INR** (paise); **USD** for international checkout (cents)
- **Free shipping threshold: ₹1,499** (`NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD=149900`); standard shipping **₹79** below threshold
- **Return window: 7 days** from delivery for catalog items
- **Custom/personalized items and Mystery Box items are non-returnable** — stated explicitly at builder, box purchase, and checkout
- **Guest checkout must be available** — do not force account creation
- Legitimate limited-drop scarcity allowed (real countdowns); fake urgency on evergreen items banned

**Legal:**
- Privacy policy and terms of service pages required (static, placeholder content is fine)
- Cookie consent banner required — minimal, non-blocking
- Never log PII, card data, UPI handles, payment signatures, or client secrets

---

### 7. Acceptance Criteria (Top Level)

Before launch, all of the following must pass:

- [ ] Guest user can complete a purchase without creating an account
- [ ] A shopper can build a custom tee and check out via **UPI** in **under ~4 minutes** on mobile
- [ ] Custom T-Shirt Builder renders a live Front/Back/360° preview that matches the ordered design
- [ ] AI Design Generator returns a usable design from a prompt (anime/typography/streetwear/minimal) and logs the generation
- [ ] Logged-in user can reorder a Saved Design / wishlist item with pre-filled address in under 60 seconds
- [ ] Out-of-stock variant shows as disabled in the size selector — cannot be added to cart
- [ ] Cart persists across page refresh and browser close/reopen
- [ ] Coupon and gift-card discounts are validated and recalculated **server-side** (client total never trusted)
- [ ] Admin can update stock for any variant — change reflects on PDP within 30 seconds
- [ ] **Razorpay** webhook processes `payment.captured` (and **Stripe** `payment_intent.succeeded`) and creates the order in the database, idempotently
- [ ] Mystery Box purchase records as `sealed`, then transitions to `revealed` on unboxing
- [ ] Designer's earnings are recorded per sale and visible in the designer dashboard
- [ ] Order tracking timeline updates from `order_events`; delivery notification email sent
- [ ] Order confirmation email sent within 2 minutes of successful payment
- [ ] Custom and Mystery Box items are clearly marked non-returnable before purchase
- [ ] All pages WCAG AA compliant — tested with axe-core; mystery-box/builder animations respect `prefers-reduced-motion`
- [ ] No PII, card data, UPI handles, or secrets logged to console in production

---

### 8. Appendix A — Data Model (high level)

```
Category
  → may have parent Category (self-reference)
  → has many Products

Collection (Anime, Streetwear, Gym, College, Startup, Creator)
  → many-to-many with Products (via product_collections)

Product
  → has many ProductVariants (size × color combinations)
  → has many ProductImages (ordered, tagged by color)
  → belongs to Category; many-to-many Collections
  → optional designer_id (null = FITBOX house product)
  → drop fields (is_limited_drop, drop_starts_at/ends_at, badge)
  → has many Reviews

ProductVariant
  → has SKU (unique, FB-{CAT}-{COLOR}-{SIZE})
  → has stock_count, size, color_name/hex
  → optional price override (else product base_price, in paise)

CustomDesign (output of the builder)
  → base_style, base_color, size, computed price (paise), status (draft/saved/ordered)
  → preview_front/back/360 URLs
  → has many DesignLayers (text / image / logo / ai, per side, with transform)
DesignAsset → upload / logo / ai (with source_prompt, ai_style)
AIGeneration → prompt, style, result_url, status

MysteryBox (category × tier, unique) → price, item_count
MysteryBoxPurchase → references order + box; status sealed/revealed/fulfilled

Order
  → has many OrderItems (snapshot; item_type product/custom/mystery_box)
  → belongs to User (nullable — guest orders have email only)
  → payment_provider razorpay|stripe with provider IDs; currency INR|USD
  → coupon/gift-card amounts, subtotal, shipping, total (paise)
  → has many OrderEvents (tracking timeline)

OrderItem
  → snapshot: product_name, variant_description, sku, price_at_purchase, quantity
  → references variant_id / custom_design_id / mystery_box_id as applicable

Profile (extends auth.users)
  → role: customer | designer | admin | super_admin
  → reward_points; has many Addresses, WishlistItems, CustomDesigns, Reviews

DesignerEarning → per order_item, designer's cut (paise), status pending/paid
Coupon / GiftCard / EmailSubscriber → supporting commerce + marketing
```

---

### 9. Appendix B — Page Map

| Route | Page | Auth required |
|-------|------|--------------|
| `/` | Homepage | No |
| `/shop` | Shop (all products) | No |
| `/shop/[category]` | Category listing (PLP) | No |
| `/products/[slug]` | Product detail (PDP) | No |
| `/customize` | Custom T-Shirt Builder | No (save needs login) |
| `/collections` | Collections index | No |
| `/collections/[slug]` | Collection detail | No |
| `/mystery-box` | Mystery Box landing | No |
| `/mystery-box/[category]` | Box picker + unbox | No (purchase needs auth) |
| `/cart` | Cart page (fallback if drawer blocked) | No |
| `/checkout` | Checkout | No (guest allowed) |
| `/checkout/success` | Order confirmation | No |
| `/track` | Order tracking (public via order# + email) | No |
| `/account/orders/[id]/track` | Order tracking (account view) | Yes |
| `/account` | Account dashboard (→ orders) | Yes |
| `/account/orders` | Order history | Yes |
| `/account/orders/[id]` | Order detail | Yes |
| `/account/wishlist` | Wishlist | Yes |
| `/account/saved-designs` | Saved custom designs | Yes |
| `/account/addresses` | Saved addresses | Yes |
| `/account/rewards` | Rewards / points | Yes |
| `/account/profile` | Profile | Yes |
| `/designer` | Designer dashboard | Yes (designer) |
| `/designer/designs` | Manage designs | Yes (designer) |
| `/designer/designs/new` | Upload design | Yes (designer) |
| `/designer/earnings` | Payouts | Yes (designer) |
| `/admin` | Admin dashboard | Yes (admin/super_admin) |
| `/admin/products` | Product management | Yes (admin) |
| `/admin/products/new` | Add product | Yes (admin) |
| `/admin/products/[id]/edit` | Edit product | Yes (admin) |
| `/admin/inventory` | Inventory quick-update | Yes (admin) |
| `/admin/orders` | Order management + refunds | Yes (admin) |
| `/admin/orders/[id]` | Order detail | Yes (admin) |
| `/admin/collections` | Collections management | Yes (admin) |
| `/admin/custom-designs` | User-uploaded design moderation | Yes (admin) |
| `/admin/customers` | Customers + analytics | Yes (admin) |
| `/admin/coupons` | Coupon engine | Yes (admin) |
| `/admin/campaigns` | Marketing campaigns | Yes (admin) |
| `/admin/mystery-boxes` | Mystery box config | Yes (admin) |
| `/admin/users` | Role management | Yes (super_admin) |
| `/auth/login` | Login | No |
| `/auth/signup` | Sign up | No |
| `/auth/callback` | OAuth callback | No |
| `/privacy` | Privacy policy | No |
| `/terms` | Terms of service | No |
