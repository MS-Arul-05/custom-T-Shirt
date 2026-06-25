# 06 — Tasks
## FITBOX — Custom T-Shirt & Apparel Platform · ecomm_platform_01

Tasks are ordered by dependency. Complete each task fully before starting the next. Each task should result in working, committed code. Prices are integers in **paise** (₹1 = 100 paise) throughout. Apparel sizes are XS–XXXL.

---

## Phase 0 — Foundation

---

- [ ] **TASK-001** | STORY-001-01 | Est: 2h
  **Initialise project**
  Create Next.js 14 App Router project with TypeScript strict, Tailwind CSS, and all dependencies.

  ```bash
  npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"
  npm install zustand @supabase/ssr @supabase/supabase-js razorpay stripe @stripe/stripe-js @stripe/react-stripe-js resend framer-motion lucide-react @radix-ui/react-dialog @radix-ui/react-accordion @radix-ui/react-select @radix-ui/react-tabs @radix-ui/react-slider clsx tailwind-merge
  ```

  Acceptance: `npm run dev` starts, `npm run build` succeeds with zero errors. Razorpay + Stripe SDKs installed.
  Files: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `.env.example`

---

- [ ] **TASK-002** | STORY-001-06 | Est: 1.5h
  **Set up FITBOX design tokens**
  Add all CSS variables from the master spec to `globals.css` and map them in Tailwind.

  Acceptance: Page background is `#F8F8F8` (not white) at `localhost:3000`, cards use `--bg-surface: #FFFFFF`, accent `--accent: #FF6B00` resolves. All tokens inspectable in devtools.
  Files: `src/app/globals.css`, `tailwind.config.ts`

---

- [ ] **TASK-003** | STORY-001-06 | Est: 1h
  **Load Cabinet Grotesk + Inter fonts**
  Self-host Cabinet Grotesk (Fontshare) via `next/font/local` for headings/display; load Inter via `next/font/google` for body/UI.

  Acceptance: Headings render in Cabinet Grotesk, body in Inter (verified in devtools computed styles). No FOUT. Font CSS variables `--font-display` / `--font-body` wired into Tailwind.
  Files: `src/app/layout.tsx`, `src/app/fonts/cabinet-grotesk.ts`, `public/fonts/CabinetGrotesk-*.woff2`

---

- [ ] **TASK-004** | STORY-001-02 | Est: 4h
  **Run database migrations**
  Execute the full SQL schema from `02_Architecture.md` in the Supabase SQL editor and apply all RLS policies and triggers.

  Acceptance: All tables (categories, collections, products, product_variants, product_images, profiles, addresses, custom_designs, design_layers, design_assets, ai_generations, wishlist_items, reviews, coupons, gift_cards, mystery_boxes, mystery_box_purchases, orders, order_items, order_events, designer_earnings, email_subscribers) visible with RLS enabled. `handle_new_user` and `update_updated_at` triggers active. Anon can SELECT published products, cannot INSERT.
  Files: `supabase/migrations/001_initial_schema.sql`, `supabase/migrations/002_rls_policies.sql`

---

- [ ] **TASK-005** | STORY-001-03 | Est: 3h
  **Set up Supabase client utilities**
  Create browser, server (SSR cookies), and admin (service-role) Supabase clients plus `is_staff()` / `is_admin()` helpers.

  Acceptance: `createClient()` importable from `@/lib/supabase/client`, `@/lib/supabase/server`, `@/lib/supabase/admin`. Service-role client never imported into client components. No TypeScript errors.
  Files: `src/lib/supabase/client.ts`, `src/lib/supabase/server.ts`, `src/lib/supabase/admin.ts`

---

- [ ] **TASK-006** | STORY-001-03 | Est: 4h
  **Build auth pages**
  Create signup, login, and OAuth callback routes with email/password + Google OAuth.

  Acceptance: User can sign up with email/password, log in, log out. Google OAuth button present. `profiles` row auto-created on signup with `role='customer'`. Redirects honour `?next=`.
  Files: `src/app/auth/login/page.tsx`, `src/app/auth/signup/page.tsx`, `src/app/auth/callback/route.ts`

---

- [ ] **TASK-007** | STORY-001-04 | Est: 2.5h
  **Configure middleware for route protection**
  Protect `/account/*`, `/designer/*`, and `/admin/*` by role.

  Acceptance: Visiting `/account` without login redirects to `/auth/login?next=/account`. Login returns to the original route. Non-designer hitting `/designer` redirected to `/`. Non-admin hitting `/admin` redirected to `/`. `/admin/users` requires `super_admin`.
  Files: `src/middleware.ts`

---

- [ ] **TASK-008** | STORY-001-05 | Est: 2.5h
  **Build Zustand cart store**
  Implement cart store with localStorage persistence supporting product, custom, and mystery_box line types.

  Acceptance: Add item → count increments. Refresh → cart persists. Same variant added twice → quantity 2 (not two lines). Custom-design lines keyed by `custom_design_id`. `subtotal` (paise) correct across mixed quantities and item types.
  Files: `src/store/cart.ts`

---

- [ ] **TASK-009** | STORY-001-01 | Est: 1.5h
  **Define shared TypeScript types + price helper**
  Create `types/index.ts` mirroring the schema and `formatPrice(paise)`.

  Acceptance: All domain types (Product, Variant, CustomDesign, DesignLayer, Order, MysteryBox, Coupon, etc.) importable from `@/types`. `formatPrice(129900)` returns `"₹1,299"` via `Intl.NumberFormat('en-IN', { style:'currency', currency:'INR', maximumFractionDigits:0 })`. No `any`.
  Files: `src/types/index.ts`, `src/lib/format.ts`

---

- [ ] **TASK-010** | STORY-002-01 | Est: 4h
  **Build Navbar + global layout chrome**
  Sticky navbar with logo, category links, search trigger, account, wishlist, and cart icons.

  Acceptance: Navbar renders on all pages. Cart badge reflects Zustand count. Mobile hamburger opens an overlay menu. Links to /shop, /customize, /collections, /mystery-box navigate correctly. Account icon routes to /account or /auth/login by session.
  Files: `src/components/layout/Navbar.tsx`, `src/components/layout/MobileMenu.tsx`, `src/app/layout.tsx`

---

- [ ] **TASK-011** | STORY-002-01 | Est: 1.5h
  **Build Footer component**
  Four-column footer with shop, customize, support, and legal links plus newsletter teaser.

  Acceptance: 4 columns with working links (incl. /privacy, /terms). Copyright row. 1px top border using `--border`. Dark surface (`--bg-dark`).
  Files: `src/components/layout/Footer.tsx`

---

## Phase 1 — Catalog (Home / Shop / PDP)

---

- [ ] **TASK-012** | STORY-002-08 | Est: 4h
  **Seed catalog data**
  Insert realistic FITBOX data into Supabase.

  Minimum: 11 categories (Oversized T-Shirts, Regular Fit T-Shirts, Graphic Tees, Anime, Streetwear, Hoodies, Sweatshirts, Polo Shirts, Crop Tops, Jackets, Accessories), 6 collections (Anime, Streetwear, Gym, College, Startup, Creator), 16 products (e.g. "Akatsuki Oversized Tee", "Tokyo Drift Graphic Tee", "Midnight Streetwear Hoodie"), each with 6 colors × 7 sizes variants, SKUs `FB-{CAT}-{COLOR}-{SIZE}`, prices ₹699–₹2,499 (paise), varied stock (some 0, some 3, some 45+), placeholder 3:4 images.

  Acceptance: `products` ≥16 rows, `product_variants` populated with unique SKUs, `collections` 6 rows, several variants `stock_count = 0`, some products `is_limited_drop = true` with future `drop_starts_at`.
  Files: `supabase/seeds/catalog.sql`

---

- [ ] **TASK-013** | STORY-002-04 | Est: 3h
  **Build ProductCard component**
  Card with image swap, color dots, badge, quick-add, and `--radius-card: 12px` rounding.

  Acceptance: Hover cross-fades to second image. Color-dot click swaps displayed images. Quick-add appears on hover. Badge (`new`/`bestseller`/`drop`/`restock`) renders when present. Price via `formatPrice`. Drop badge shown for limited drops.
  Files: `src/components/product/ProductCard.tsx`, `src/components/product/ColorDots.tsx`

---

- [ ] **TASK-014** | STORY-002-07 | Est: 4h
  **Build CartDrawer component**
  Slide-in cart with Framer Motion, gated by `prefers-reduced-motion`.

  Acceptance: Opens on cart icon click. Product, custom, and mystery_box line items render. Quantity stepper + remove work. Free-shipping progress bar fills toward ₹1,499 (149900 paise). Focus trapped, Escape closes, `role="dialog"`.
  Files: `src/components/cart/CartDrawer.tsx`, `src/components/cart/CartItem.tsx`, `src/components/cart/ShippingProgress.tsx`

---

- [ ] **TASK-015** | STORY-002-02 | Est: 6h
  **Build Homepage**
  Hero drop banner, New Arrivals, Trending Collections, Featured Categories, Limited Edition Drops, Custom Design CTA, Influencer Picks, Reviews, Newsletter.

  Acceptance: Data fetched server-side (Server Components). Hero renders image + CTA into /customize and /shop (no auto-advancing carousel). New Arrivals shows latest products. Trending Collections links to /collections/[slug]. Limited Edition Drops section shows drops with real countdown only when `drop_starts_at` is in the future. Newsletter form inserts into `email_subscribers` and shows success.
  Files: `src/app/page.tsx`, `src/components/home/HeroDrop.tsx`, `src/components/home/NewArrivals.tsx`, `src/components/home/TrendingCollections.tsx`, `src/components/home/FeaturedCategories.tsx`, `src/components/home/LimitedDrops.tsx`, `src/components/home/CustomDesignCTA.tsx`, `src/components/home/InfluencerPicks.tsx`, `src/components/home/NewsletterSignup.tsx`

---

- [ ] **TASK-016** | STORY-002-03 | Est: 4h
  **Build Shop (all products) page**
  `/shop` grid with search and the shared filter/sort bar.

  Acceptance: `/shop` renders all published products from Supabase in a grid. Search input filters by name. Filter bar (category, price, color, size, collection) and sort dropdown update URL params and reorder/reduce the grid. Load-more fetches next page.
  Files: `src/app/shop/page.tsx`, `src/components/product/ProductGrid.tsx`, `src/components/product/FilterBar.tsx`, `src/components/product/SortDropdown.tsx`

---

- [ ] **TASK-017** | STORY-002-03 | Est: 4h
  **Build Category listing page (PLP)**
  `/shop/[category]` filtered to one category.

  Acceptance: `/shop/oversized-t-shirts` renders products in that category from Supabase. Reuses FilterBar/ProductGrid. Color filter reduces grid to matching variants. Sort reorders. 404 (`not-found`) if category slug invalid.
  Files: `src/app/shop/[category]/page.tsx`

---

- [ ] **TASK-018** | STORY-002-05 | Est: 6h
  **Build Product Detail Page (PDP)**
  Gallery, color/size selectors, fabric details, description, reviews, related products.

  Acceptance: All product data renders from Supabase. Color selector swaps gallery images tagged by color. Out-of-stock sizes disabled with strikethrough and `aria-disabled`. Fabric/GSM/care accordions open/close. Size guide modal opens (cm chest/length chart). Related products row shows 4 items. Reviews summary with average rating.
  Files: `src/app/products/[slug]/page.tsx`, `src/components/product/ImageGallery.tsx`, `src/components/product/ColorSelector.tsx`, `src/components/product/SizeSelector.tsx`, `src/components/product/FabricAccordion.tsx`, `src/components/product/SizeGuideModal.tsx`, `src/components/product/RelatedProducts.tsx`

---

- [ ] **TASK-019** | STORY-002-06 | Est: 2h
  **Build AddToCartButton + Buy Now**
  CTAs that validate size/color and push to Zustand.

  Acceptance: Clicking Add to Cart without a size shows "Please select a size". With size+color, adds the matching variant and opens the cart drawer. Same variant → increments quantity. Buy Now adds then routes to /checkout. 300ms loading state.
  Files: `src/components/product/AddToCartButton.tsx`, `src/components/product/BuyNowButton.tsx`

---

- [ ] **TASK-020** | STORY-002-09 | Est: 3h
  **Build reviews & ratings**
  Review list, star summary, and write-review form (verified-purchase aware).

  Acceptance: Reviews for a product render with rating, title, body, and verified-purchase badge. Logged-in users who purchased can submit one review per product (unique constraint respected). Average rating and count shown on PDP. RLS: public read, owner write.
  Files: `src/components/reviews/ReviewList.tsx`, `src/components/reviews/ReviewSummary.tsx`, `src/components/reviews/ReviewForm.tsx`, `src/app/api/reviews/route.ts`

---

- [ ] **TASK-021** | STORY-006-04 | Est: 2h
  **Add loading / error / not-found states for catalog**

  Acceptance: `loading.tsx` skeletons match layout for `/`, `/shop`, `/shop/[category]`, `/products/[slug]`. `error.tsx` offers recovery. `not-found.tsx` present and branded.
  Files: `src/app/loading.tsx`, `src/app/error.tsx`, `src/app/not-found.tsx`, `src/app/shop/loading.tsx`, `src/app/shop/[category]/loading.tsx`, `src/app/products/[slug]/loading.tsx`

---

## Phase 2 — Custom Builder + Studio API

---

- [ ] **TASK-022** | STORY-007-01 | Est: 4h
  **Scaffold FITBOX Studio API (Express on Railway)**
  Stand up the Express microservice with health check, API-key auth, CORS, and Supabase service client.

  Acceptance: `studio-api` runs locally and deploys to Railway. `GET /health` returns 200. All routes require `STUDIO_API_KEY` header. CORS allows the Vercel origin. Reads Supabase via service role.
  Files: `studio-api/src/index.ts`, `studio-api/src/middleware/auth.ts`, `studio-api/src/lib/supabase.ts`, `studio-api/package.json`, `studio-api/railway.json`

---

- [ ] **TASK-023** | STORY-007-02 | Est: 3h
  **Build Studio API client wrapper**
  Next.js-side wrapper for calling the Studio API (render + AI) with the server key.

  Acceptance: `renderPreview()` and `generateAIDesign()` importable from `@/lib/studio`. Calls use `STUDIO_API_URL` + `STUDIO_API_KEY` from server env only. Typed request/response. Errors surfaced as typed results.
  Files: `src/lib/studio.ts`

---

- [ ] **TASK-024** | STORY-007-03 | Est: 3h
  **Build builder Zustand store**
  Client state for the 6-step builder (style, color, layers, side, size).

  Acceptance: `useBuilder` tracks base_style, base_color (name+hex), size, per-side design layers (image/logo/text/ai with pos/scale/rotation/z), active side (front/back), and computed price (paise). Add/update/remove layer actions immutable. Reset clears state.
  Files: `src/store/builder.ts`

---

- [ ] **TASK-025** | STORY-007-04 | Est: 5h
  **Build server-side preview compositing (Studio API)**
  `render-preview` route composites base mockup + layers into front/back/360 webp and uploads to `design-previews`.

  Acceptance: `POST /render-preview` accepts style/color/layers, composites images server-side, uploads `previews/{custom_design_id}/{side}.webp`, returns front/back/360 URLs. Completes in <2s for a typical design.
  Files: `studio-api/src/routes/render-preview.ts`, `studio-api/src/lib/compositor.ts`

---

- [ ] **TASK-026** | STORY-007-05 | Est: 4h
  **Build builder page + step shell**
  `/customize` orchestrates the 6 steps with progress and validation.

  Acceptance: `/customize` renders Step 1→6 (Style → Color → Design → Text → Preview → Add to cart) with a step indicator and back/next gating. State persists across steps via `useBuilder`. Works for guests (save prompts login).
  Files: `src/app/customize/page.tsx`, `src/components/builder/BuilderShell.tsx`, `src/components/builder/StepIndicator.tsx`

---

- [ ] **TASK-027** | STORY-007-05 | Est: 2.5h
  **Build StyleStep + ColorStep**
  Step 1 choose style (Oversized/Regular/Hoodie/Polo); Step 2 choose color (White/Black/Beige/Blue/Green/Red).

  Acceptance: StyleStep selects one of four fits and updates `base_style`. ColorStep shows the six base colors as `--radius-pill` dots, updates `base_color_name`/`base_color_hex`, and previews the blank garment in that color.
  Files: `src/components/builder/StyleStep.tsx`, `src/components/builder/ColorStep.tsx`

---

- [ ] **TASK-028** | STORY-007-06 | Est: 4h
  **Build DesignStep (upload / logo / template)**
  Step 3 add design via image upload, logo upload, or template picker.

  Acceptance: Image/logo upload posts to `design-uploads` (`uploads/{user_id}/{asset_id}.{ext}`, max 8MB, JPEG/PNG/WebP) and adds an image/logo layer. TemplatePicker lists curated templates and adds a layer. Layers appear on the active side and are draggable/scalable on the canvas.
  Files: `src/components/builder/DesignStep.tsx`, `src/components/builder/TemplatePicker.tsx`, `src/app/api/uploads/route.ts`

---

- [ ] **TASK-029** | STORY-007-07 | Est: 4h
  **Build AI Design Generator (Studio API + panel)**
  Step 3 AI Generate: prompt + style (anime/typography/streetwear/minimal) → generated image layer.

  Acceptance: `POST /ai-generate` on the Studio API posts prompt+style to the pluggable image provider, stores result in `ai-designs` (`ai/{user_id}/{generation_id}.png`), inserts an `ai_generations` row (pending→succeeded/failed) and a `design_assets` row, and returns the URL. AIDesignPanel shows the four styles, submits the prompt, displays the result, and adds it as an `ai` layer.
  Files: `src/components/builder/AIDesignPanel.tsx`, `studio-api/src/routes/ai-generate.ts`, `studio-api/src/lib/ai-provider.ts`

---

- [ ] **TASK-030** | STORY-007-08 | Est: 3h
  **Build TextStep**
  Step 4 add custom text with font, text color, and alignment.

  Acceptance: User adds a text layer with `text_content`, `font`, `text_color`, and `alignment` (left/center/right). Text renders live on the active side and is movable/scalable. Multiple text layers supported with z-index ordering.
  Files: `src/components/builder/TextStep.tsx`

---

- [ ] **TASK-031** | STORY-007-09 | Est: 4h
  **Build PreviewCanvas (Front / Back / 360°)**
  Step 5 live preview rendered via the Studio API.

  Acceptance: PreviewCanvas renders front/back/360 from the Studio API in <2s, with a tab/toggle for the three views and a loading state. Reflects the current style, color, and all layers. Respects `prefers-reduced-motion` for the 360 spin.
  Files: `src/components/builder/PreviewCanvas.tsx`

---

- [ ] **TASK-032** | STORY-007-10 | Est: 4h
  **Save custom design + add to cart**
  Step 6 persists the design and adds a custom line to the cart.

  Acceptance: Saving inserts a `custom_designs` row (style/color/size/price in paise, preview URLs, status `saved`) plus `design_layers` rows for every layer. Guests are prompted to log in to save; on add-to-cart a `custom` cart line is created referencing `custom_design_id` with the computed price. Custom items flagged non-returnable.
  Files: `src/components/builder/AddDesignToCart.tsx`, `src/app/api/custom-designs/route.ts`

---

## Phase 3 — Cart & Checkout (Razorpay + Stripe, coupons, gift cards)

---

- [ ] **TASK-033** | STORY-003-01 | Est: 3h
  **Build Cart page**
  `/cart` full-page fallback to the drawer.

  Acceptance: `/cart` lists all line items (product/custom/mystery_box) with quantity steppers and remove. Shows subtotal, shipping estimate vs ₹1,499 threshold, and a checkout CTA. Empty-cart state links to /shop and /customize.
  Files: `src/app/cart/page.tsx`

---

- [ ] **TASK-034** | STORY-003-01 | Est: 4h
  **Build Checkout page — address + summary**
  India-format shipping address form and order summary sidebar.

  Acceptance: Line items from Zustand render in the summary. Subtotal, shipping (₹79 below ₹1,499 else free), discount, and total computed in paise. Address form validates name, phone, line1, city, state, PIN code. Logged-in users see pre-filled email; guests see an email input (guest checkout allowed).
  Files: `src/app/checkout/page.tsx`, `src/components/checkout/AddressForm.tsx`, `src/components/checkout/OrderSummary.tsx`

---

- [ ] **TASK-035** | STORY-003-01 | Est: 2h
  **Pre-fill checkout for logged-in users**
  Load saved addresses and pre-select the default.

  Acceptance: Default address pre-selected via radio list. "Use a new address" reveals the form. Selecting an address fills shipping fields. Max 5 saved addresses respected.
  Files: `src/app/checkout/page.tsx`, `src/components/checkout/AddressForm.tsx`

---

- [ ] **TASK-036** | STORY-003-05 | Est: 3h
  **Build coupon + gift card inputs**
  Apply coupon codes and gift cards against the cart.

  Acceptance: CouponInput validates code via `/api/coupons/validate` (active, within window, `min_subtotal` met, redemptions left) and applies percent/fixed discount in paise. GiftCardInput validates balance and applies up to remaining total. Both recompute the summary; invalid codes show inline errors. Server is source of truth.
  Files: `src/components/checkout/CouponInput.tsx`, `src/components/checkout/GiftCardInput.tsx`, `src/app/api/coupons/validate/route.ts`, `src/app/api/gift-cards/validate/route.ts`

---

- [ ] **TASK-037** | STORY-003-02 | Est: 3h
  **Razorpay create-order route + lib**
  Server creates a Razorpay Order with the server-recalculated amount.

  Acceptance: `POST /api/payments/razorpay/create-order` re-fetches variant/custom/mystery prices from Supabase, recomputes subtotal − discount − gift card + shipping in paise, applies coupon/gift-card server-side, and returns `razorpay_order_id` + amount. Never trusts the client total.
  Files: `src/app/api/payments/razorpay/create-order/route.ts`, `src/lib/razorpay.ts`

---

- [ ] **TASK-038** | STORY-003-02 | Est: 4h
  **Mount Razorpay Checkout (UPI/cards/net banking/wallets)**
  Embed Razorpay Checkout in the checkout page.

  Acceptance: RazorpayCheckout opens the hosted modal with `order_id`, key id, and prefill (name/email/phone). Supports UPI, cards, net banking, wallets. On success returns `razorpay_payment_id`/`order_id`/`signature` and routes to a pending confirmation. "Place order" disabled until address valid. No signatures or handles logged.
  Files: `src/components/checkout/RazorpayCheckout.tsx`, `src/app/checkout/page.tsx`

---

- [ ] **TASK-039** | STORY-003-03 | Est: 5h
  **Build Razorpay webhook handler**
  Process `payment.captured` as the order source of truth.

  Acceptance: `POST /api/payments/razorpay/webhook` verifies HMAC signature = `HMAC_SHA256(order_id|payment_id, secret)`, is idempotent on `razorpay_payment_id`, creates `orders` + `order_items` (snapshots), generates `order_number` (`FB-25-000123`), decrements `product_variants.stock_count`, seeds an initial `order_events` row, and sends the confirmation email. Duplicate webhook does not duplicate the order. Returns 200 in <3s.
  Files: `src/app/api/payments/razorpay/webhook/route.ts`

---

- [ ] **TASK-040** | STORY-003-06 | Est: 3h
  **Stripe PaymentIntent + Payment Element (international)**
  Server-side PaymentIntent and embedded Payment Element for USD.

  Acceptance: `POST /api/payments/stripe/create-intent` returns `client_secret` with the amount recalculated server-side in cents. StripePaymentElement renders card + wallets, disables "Place order" until valid, surfaces readable errors, and stores `stripe_payment_intent_id` for idempotency.
  Files: `src/components/checkout/StripePaymentElement.tsx`, `src/app/api/payments/stripe/create-intent/route.ts`, `src/lib/stripe.ts`

---

- [ ] **TASK-041** | STORY-003-03 | Est: 4h
  **Build Stripe webhook handler**
  Process `payment_intent.succeeded` on the same order-creation path.

  Acceptance: `POST /api/payments/stripe/webhook` verifies the signing secret, is idempotent on `stripe_payment_intent_id`, creates `orders` + `order_items`, decrements stock, seeds `order_events`, and sends the confirmation email. Currency stored as `USD`. Duplicate event is a no-op.
  Files: `src/app/api/payments/stripe/webhook/route.ts`

---

- [ ] **TASK-042** | STORY-003-04 | Est: 3h
  **Order confirmation page + email**
  `/checkout/success` and the Resend order email.

  Acceptance: After a captured payment the user lands on `/checkout/success` (looked up by order number/payment id), the cart is cleared, and the order summary + non-returnable notice for custom/mystery items shows. `OrderConfirmation` email arrives within 2 minutes with order number, items, address, and total via `formatPrice`.
  Files: `src/app/checkout/success/page.tsx`, `src/lib/resend.ts`, `src/emails/OrderConfirmation.tsx`

---

## Phase 4 — Accounts & Order Tracking

---

- [ ] **TASK-043** | STORY-004-01 | Est: 2.5h
  **Build account layout + dashboard**
  Account shell with sidebar and mobile tab bar.

  Acceptance: `/account` redirects to `/account/orders`. Sidebar links to Orders, Wishlist, Saved Designs, Addresses, Rewards, Profile. Mobile bottom tab bar present. User name/email shown. Reward points summary visible.
  Files: `src/app/account/layout.tsx`, `src/app/account/page.tsx`, `src/components/account/AccountSidebar.tsx`

---

- [ ] **TASK-044** | STORY-004-02 | Est: 2.5h
  **Build order history page**
  List of past orders with status chips.

  Acceptance: All of the logged-in user's orders render newest-first with correctly coloured status chips (pending→delivered/refunded). Empty state present. RLS ensures only the owner's orders are visible.
  Files: `src/app/account/orders/page.tsx`, `src/components/account/OrderList.tsx`

---

- [ ] **TASK-045** | STORY-004-03 | Est: 3.5h
  **Build order detail page**
  Full order with line items, tracking link, return request, reorder.

  Acceptance: All order data renders (items incl. custom previews, totals in paise, address). "Track order" links to the tracking view. "Request return" only shows for delivered catalog items within 7 days — hidden for custom/mystery items (non-returnable). Reorder adds in-stock items and toasts skipped ones.
  Files: `src/app/account/orders/[id]/page.tsx`

---

- [ ] **TASK-046** | STORY-009-01 | Est: 4h
  **Build order tracking timeline**
  Public + account live tracking from `order_events`.

  Acceptance: `/account/orders/[id]/track` (auth) and `/track` (public via order number + email) render a status timeline from `order_events` (pending → processing → printing → shipped → out_for_delivery → delivered) with carrier/tracking number when present. Updates reflect new events. No PII leaked on the public lookup beyond order status.
  Files: `src/app/account/orders/[id]/track/page.tsx`, `src/app/track/page.tsx`, `src/components/account/TrackingTimeline.tsx`

---

- [ ] **TASK-047** | STORY-004-06 | Est: 2.5h
  **Build wishlist page**
  Saved products with add-to-cart.

  Acceptance: `/account/wishlist` lists `wishlist_items` for the user with product card, price, and add-to-cart. Heart toggle on PDP/ProductCard adds/removes (unique per user+product). Empty state links to /shop.
  Files: `src/app/account/wishlist/page.tsx`, `src/components/account/WishlistButton.tsx`, `src/app/api/wishlist/route.ts`

---

- [ ] **TASK-048** | STORY-004-07 | Est: 3h
  **Build saved designs page**
  Custom designs the user saved from the builder.

  Acceptance: `/account/saved-designs` lists `custom_designs` (status `saved`) with front preview, name, style/color, and price. Actions: open in builder (re-hydrates `useBuilder`), add to cart, delete. RLS: owner only.
  Files: `src/app/account/saved-designs/page.tsx`, `src/components/account/SavedDesignCard.tsx`

---

- [ ] **TASK-049** | STORY-004-04 | Est: 2.5h
  **Build addresses page**
  Address management with add/edit/delete/set-default.

  Acceptance: All addresses listed. Add/edit forms validate India fields (PIN, state, phone). Delete confirms. "Set as default" clears the previous default. Max 5 enforced.
  Files: `src/app/account/addresses/page.tsx`, `src/components/account/AddressList.tsx`

---

- [ ] **TASK-050** | STORY-004-08 | Est: 2h
  **Build rewards page**
  Reward points balance and history.

  Acceptance: `/account/rewards` shows `profiles.reward_points` balance and how points are earned/redeemed. Points accrue on delivered orders (rule documented). Display only; redemption hooks into checkout discount where applicable.
  Files: `src/app/account/rewards/page.tsx`

---

- [ ] **TASK-051** | STORY-004-05 | Est: 2h
  **Build profile + password page**
  Edit profile and change password.

  Acceptance: `/account/profile` edits full name and phone (updates `profiles`). Password change validates current password via Supabase, requires ≥8 chars, shows a success toast, and resets the form.
  Files: `src/app/account/profile/page.tsx`, `src/components/account/PasswordForm.tsx`

---

- [ ] **TASK-052** | STORY-009-02 | Est: 2.5h
  **Build shipping update email**
  Resend email when an order ships / status changes.

  Acceptance: When admin sets tracking and moves status to `shipped`, a `ShippingUpdate` email is sent with order number, carrier, tracking number, and a track link. Triggered server-side; no PII/secret logging.
  Files: `src/emails/ShippingUpdate.tsx`, `src/lib/resend.ts`, `src/app/api/orders/[id]/ship/route.ts`

---

## Phase 5 — Collections & Mystery Box

---

- [ ] **TASK-053** | STORY-008-01 | Est: 3h
  **Build Collections index + detail**
  Curated collections (Anime, Streetwear, Gym, College, Startup, Creator).

  Acceptance: `/collections` lists all collections with hero image and featured ordering. `/collections/[slug]` renders the collection hero plus its products via `product_collections` using ProductGrid. 404 on invalid slug.
  Files: `src/app/collections/page.tsx`, `src/app/collections/[slug]/page.tsx`, `src/components/collections/CollectionHero.tsx`

---

- [ ] **TASK-054** | STORY-010-01 | Est: 2.5h
  **Seed + build Mystery Box landing**
  Mystery box config and the `/mystery-box` landing.

  Acceptance: `mystery_boxes` seeded for categories (anime/streetwear/gym/creator) × tiers (bronze/silver/gold) with prices in paise and item counts. `/mystery-box` explains the flow and links into each category. Custom/mystery non-returnable notice shown.
  Files: `supabase/seeds/mystery_boxes.sql`, `src/app/mystery-box/page.tsx`

---

- [ ] **TASK-055** | STORY-010-02 | Est: 3.5h
  **Build Mystery Box picker + buy flow**
  `/mystery-box/[category]` — pick tier and add to cart.

  Acceptance: BoxPicker shows Bronze/Silver/Gold tiers for the chosen category with price and item count. Selecting a tier adds a `mystery_box` cart line (purchase requires auth at checkout). On paid order a `mystery_box_purchases` row is created (status `sealed`).
  Files: `src/app/mystery-box/[category]/page.tsx`, `src/components/mystery-box/BoxPicker.tsx`

---

- [ ] **TASK-056** | STORY-010-03 | Est: 4h
  **Build Unbox reveal + Wear the fit**
  Animated unboxing and outfit preview after purchase.

  Acceptance: For a delivered/fulfilled `mystery_box_purchases`, UnboxReveal plays the signature unboxing animation (gated by `prefers-reduced-motion`) and reveals the items, then sets `status='revealed'` with `revealed_at`. WearTheFit shows a character wearing the revealed outfit. Re-opening shows the already-revealed result without re-randomising.
  Files: `src/components/mystery-box/UnboxReveal.tsx`, `src/components/mystery-box/WearTheFit.tsx`, `src/app/api/mystery-box/reveal/route.ts`

---

## Phase 6 — Designer Marketplace & AI

---

- [ ] **TASK-057** | STORY-011-01 | Est: 3h
  **Build Designer dashboard**
  `/designer` overview for the designer role.

  Acceptance: `/designer` accessible only to `role='designer'`. Shows the designer's published designs, total sales, and pending earnings. Links to manage designs and earnings. Layout distinct from customer account.
  Files: `src/app/designer/page.tsx`, `src/components/designer/DesignerSidebar.tsx`

---

- [ ] **TASK-058** | STORY-011-02 | Est: 4h
  **Build designer upload + manage designs**
  `/designer/designs` and `/designer/designs/new`.

  Acceptance: Upload flow accepts a design asset (to `design-uploads`/`ai-designs`), creates a `products` row with `designer_id` set (status unpublished pending moderation), and lists the designer's designs with status. Edit/unpublish supported. RLS: designer manages only their own.
  Files: `src/app/designer/designs/page.tsx`, `src/app/designer/designs/new/page.tsx`, `src/components/designer/DesignUploadForm.tsx`, `src/app/api/designer/designs/route.ts`

---

- [ ] **TASK-059** | STORY-011-03 | Est: 3h
  **Build designer earnings + payouts**
  `/designer/earnings` showing per-sale cut and payout status.

  Acceptance: Lists `designer_earnings` rows (amount in paise, status pending/paid) joined to the originating `order_items`. Totals pending vs paid. On a paid order containing a designer product, an earnings row is created with the designer's cut. RLS: designer reads only their own.
  Files: `src/app/designer/earnings/page.tsx`, `src/components/designer/EarningsTable.tsx`

---

- [ ] **TASK-060** | STORY-012-01 | Est: 4h
  **Build AI outfit / style recommendations**
  Personalised colour/collection/style picks from browsing + purchase history.

  Acceptance: A recommendation module on the homepage/PDP suggests collections/styles/colours derived from the user's recent views and orders. Falls back to trending for guests. Recommendations are read-only and cached. No PII logged.
  Files: `src/components/home/RecommendedForYou.tsx`, `src/app/api/recommendations/route.ts`, `src/lib/recommendations.ts`

---

## Phase 7 — Admin Dashboard

---

- [ ] **TASK-061** | STORY-005-01 | Est: 2.5h
  **Build admin layout + dashboard**
  Admin shell with sidebar and KPI overview.

  Acceptance: `/admin` accessible only to `admin`/`super_admin`. Sidebar: Products, Inventory, Orders, Collections, Custom Designs, Customers, Coupons, Campaigns, Mystery Boxes, Users (super_admin only). Dashboard shows KPIs (revenue in ₹, orders, conversion, AOV). Visually distinct from storefront.
  Files: `src/app/admin/layout.tsx`, `src/app/admin/page.tsx`, `src/components/admin/AdminSidebar.tsx`

---

- [ ] **TASK-062** | STORY-005-02 | Est: 4h
  **Build product management table + form**
  List, create, and edit products.

  Acceptance: Products table shows published + unpublished. Create/edit form covers name, slug (auto from name, editable), category, base_price (paise), fabric/GSM/fit/care, badge, and drop window. Delete confirms. Edit pre-fills.
  Files: `src/app/admin/products/page.tsx`, `src/app/admin/products/new/page.tsx`, `src/app/admin/products/[id]/edit/page.tsx`, `src/components/admin/ProductForm.tsx`

---

- [ ] **TASK-063** | STORY-005-03 | Est: 3.5h
  **Build variant manager + image uploader**
  Inline size×color variants and drag-drop images.

  Acceptance: Variant table on the edit page; add/edit/delete variants with unique SKU (`FB-{CAT}-{COLOR}-{SIZE}`) and stock. Delete blocked if stock > 0 (warning). ImageUploader drag-drops to `product-images` (3:4, max 8MB, JPEG/PNG/WebP), tags by color, supports reorder + primary toggle, and saves to `product_images`. Saving triggers ISR revalidation.
  Files: `src/components/admin/VariantManager.tsx`, `src/components/admin/ImageUploader.tsx`, `src/app/api/revalidate/route.ts`

---

- [ ] **TASK-064** | STORY-005-06 | Est: 3h
  **Build inventory quick-update**
  Fast stock editing by SKU.

  Acceptance: Search by SKU or product name. Inline stock input saves to `product_variants`, toasts success, and fires ISR revalidation so the PDP reflects the change within 30s.
  Files: `src/app/admin/inventory/page.tsx`, `src/components/admin/InventoryEditor.tsx`

---

- [ ] **TASK-065** | STORY-005-05 | Est: 4h
  **Build order management + refunds**
  Admin order list, status updates, and refunds.

  Acceptance: Orders table filters by status. Detail shows all info incl. custom previews. Status dropdown updates the order and appends an `order_events` row. Setting tracking + `shipped` triggers the shipping email. Refund action calls the provider (Razorpay/Stripe) and sets status `refunded`.
  Files: `src/app/admin/orders/page.tsx`, `src/app/admin/orders/[id]/page.tsx`, `src/components/admin/OrderTable.tsx`, `src/app/api/admin/orders/[id]/refund/route.ts`

---

- [ ] **TASK-066** | STORY-005-07 | Est: 2.5h
  **Build collections management**
  Create/edit curated collections and assign products.

  Acceptance: Admin lists collections, creates/edits name/slug/description/hero/featured/position, and assigns products via `product_collections`. Changes reflect on `/collections`. ISR revalidation on save.
  Files: `src/app/admin/collections/page.tsx`, `src/components/admin/CollectionForm.tsx`

---

- [ ] **TASK-067** | STORY-005-08 | Est: 2.5h
  **Build custom designs moderation**
  Review user-uploaded designs / designer submissions.

  Acceptance: `/admin/custom-designs` lists submitted designs/assets with preview, owner, and status. Admin can approve (publish) or reject with a reason. Rejected designer products stay unpublished. Audit fields recorded.
  Files: `src/app/admin/custom-designs/page.tsx`, `src/components/admin/DesignModerationTable.tsx`

---

- [ ] **TASK-068** | STORY-005-09 | Est: 2.5h
  **Build customers + analytics**
  Customer list and store analytics.

  Acceptance: `/admin/customers` lists profiles with order count and lifetime value (₹). Detail shows orders and addresses. Analytics widgets cover Conversion Rate, Cart Completion, AOV, Custom Design Usage, and Monthly Revenue.
  Files: `src/app/admin/customers/page.tsx`, `src/components/admin/CustomerTable.tsx`, `src/components/admin/AnalyticsCards.tsx`

---

- [ ] **TASK-069** | STORY-005-10 | Est: 3h
  **Build coupon engine admin**
  Create/manage coupons and gift cards.

  Acceptance: `/admin/coupons` creates coupons (percent/fixed value, min_subtotal, max_redemptions, window, active) and manages gift cards (initial/remaining balance in paise). Edit/deactivate supported. Codes unique. These power the checkout validators.
  Files: `src/app/admin/coupons/page.tsx`, `src/components/admin/CouponForm.tsx`, `src/components/admin/GiftCardForm.tsx`

---

- [ ] **TASK-070** | STORY-005-11 | Est: 2.5h
  **Build campaigns + mystery box config + role management**
  Marketing campaigns, mystery box tiers, and super-admin role control.

  Acceptance: `/admin/campaigns` manages drop/marketing campaigns. `/admin/mystery-boxes` edits `mystery_boxes` tiers/prices/item counts/active. `/admin/users` (super_admin only) changes `profiles.role` among customer/designer/admin/super_admin — RLS restricts role changes to super_admin.
  Files: `src/app/admin/campaigns/page.tsx`, `src/app/admin/mystery-boxes/page.tsx`, `src/app/admin/users/page.tsx`, `src/components/admin/RoleManager.tsx`

---

## Phase 8 — Polish & Launch

---

- [ ] **TASK-071** | STORY-006-01 | Est: 3h
  **Add SEO metadata + sitemap**
  Metadata, OG images, sitemap, and robots.

  Acceptance: `generateMetadata` on home, shop, PLP, PDP, collections. PDP title `{product name} | FITBOX`; OG image = primary product image. Keywords target "Custom T Shirts India", "Oversized T Shirts", "Anime T Shirts", "Streetwear Clothing". Sitemap at `/sitemap.xml`; `robots.txt` blocks `/admin`, `/account`, `/designer`, `/api`.
  Files: `src/app/sitemap.ts`, `src/app/robots.ts`, updated `generateMetadata` across pages

---

- [ ] **TASK-072** | STORY-006-02 | Est: 3h
  **Performance optimisation pass**
  Core Web Vitals tuning incl. the builder.

  Acceptance: Lighthouse Performance 95+ on PDP mobile. LCP < 2.5s, CLS < 0.1. Hero image uses `priority`; all `<Image>` have explicit width/height. Builder preview loads in <2s. Studio API responses cached where safe.
  Files: Multiple — wherever `<Image>` lacks `priority`/dimensions; builder + Studio client

---

- [ ] **TASK-073** | STORY-006-03 | Est: 3h
  **Accessibility audit + fixes**
  axe-core pass and reduced-motion handling.

  Acceptance: Zero critical axe violations on home, PDP, customize, checkout. Cart drawer + modals focus-trapped. All form fields labelled. Color dots have `aria-label`; size selector uses `aria-pressed`/`aria-disabled`. Mystery-box and 360 animations respect `prefers-reduced-motion`. WCAG AA contrast met.
  Files: Multiple

---

- [ ] **TASK-074** | All stories | Est: 4h
  **End-to-end launch checklist**
  Final verification before switching to production keys.

  Acceptance: All Phase 8 ship-gate items in `04_Plan.md` checked. Live Razorpay + Stripe keys set in Vercel; webhooks registered in both dashboards (production). Studio API deployed on Railway with prod env. Custom domain `fitbox.in` configured. Guest UPI purchase completed end-to-end with live keys; a custom-design order and a mystery-box order complete and track; admin product edit reflects on storefront via ISR.
  Files: Vercel + Railway environment variables, Razorpay/Stripe webhook configuration (no code changes expected)
