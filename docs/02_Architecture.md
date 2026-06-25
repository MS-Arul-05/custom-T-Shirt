# 02 — Architecture
## FITBOX — Custom T-Shirt & Apparel Platform · ecomm_platform_01

---

### 1. Architecture Decision

**Monolith on Vercel + Supabase + one Express (Node.js) Studio API microservice on Railway.** The storefront, custom builder UI, checkout, account area, and admin dashboard are a single Next.js App Router application on Vercel. Supabase handles database, auth, storage, RLS, and realtime. **Exactly one** microservice exists — the **FITBOX Studio API**, an Express (Node.js) service on Railway.

**Why the Studio API exists.** FITBOX's core USP is the real-time custom T-shirt builder, which depends on two heavy workloads that do not fit Vercel's serverless model:

1. **AI design generation** — text-prompt → image via a pluggable AI provider (Replicate / Stability / OpenAI Images). These calls are long-running (often 10–60s) and can exceed Vercel serverless execution limits and memory ceilings.
2. **Server-side mockup / preview compositing** — taking a `custom_design` plus its `design_layers` (uploaded art, logos, AI assets, text) and compositing high-resolution **front / back / 360°** mockups as WebP. This is CPU- and memory-bound image processing (sharp/canvas) unsuited to short-lived serverless functions.

Isolating these on a long-lived Railway container keeps the Vercel app fast and within limits, lets the render/AI service scale independently, and keeps the AI provider key off the serverless edge. Everything else — storefront, PLP/PDP, collections, mystery box, cart, checkout, account, designer dashboard, admin — stays on **Next.js App Router + Supabase**.

The only external services are: **Razorpay + Stripe** (payments), **Resend** (email), and the **AI image provider** (reached *only* through the Studio API, never from the browser or from Vercel directly). Payment, email, and Studio calls are made from Next.js server actions / API routes or from the Studio service — never from the client.

---

### 2. Tech Stack

| Layer | Choice | NOT using | Reason |
|-------|--------|-----------|--------|
| Framework | Next.js 14 App Router | Pages Router, Remix, Astro | App Router RSC reduces client JS on catalog/builder pages |
| Language | TypeScript strict | JavaScript | Type safety catches variant/price/paise bugs before runtime |
| UI lib | React 18 | Vue, Svelte | Ecosystem fit with Next.js + Radix + Framer Motion |
| Styling | Tailwind CSS v3 + CSS variable tokens | CSS Modules, styled-components | Utility-first; design tokens via CSS variables in globals.css |
| Animation | Framer Motion | GSAP, CSS-only | Builder previews, mystery-box unboxing, cart drawer, page transitions |
| Studio backend | Node.js + Express.js ("FITBOX Studio API" on Railway) | Vercel serverless for AI/render, Lambda | AI generation + mockup compositing are long-running/heavy — exceed Vercel serverless limits |
| Database | Supabase PostgreSQL | Prisma, PlanetScale, raw self-host | Supabase gives DB + Auth + Storage + RLS + Realtime in one |
| Auth | Supabase Auth | NextAuth, Clerk | Bundled with DB; email/password + Google OAuth, no extra service |
| File storage | Supabase Storage | Cloudinary, S3 | Product images, user uploads, AI assets, design previews in buckets |
| Payments | Razorpay (UPI/cards/net banking/wallets — India) + Stripe (international cards) | Stripe-only, Paddle, PayU | India-first needs UPI via Razorpay; Stripe covers international USD |
| Email | Resend | SendGrid, Mailchimp | Developer-first, React Email templates, transactional only |
| Cart state | Zustand + localStorage | Server-side sessions, Redux | Cart works without login, no round-trips; custom designs persisted server-side |
| UI primitives | Radix UI | shadcn/ui lock-in, MUI | Headless, accessible — dialog, accordion, select, tabs, slider |
| Icons | Lucide | Heroicons, FontAwesome | Consistent weight/size API (size 18–20, strokeWidth 1.5) |
| Fonts | Cabinet Grotesk (headings, `next/font/local`) + Inter (body, `next/font/google`) | DM Sans, Typekit | Cabinet Grotesk is Fontshare — self-hosted local; Inter via next/font, zero CLS |
| AI image gen | Pluggable provider (Replicate / Stability / OpenAI Images) via Studio API | Direct client/Vercel calls | Long-running, keeps provider key off edge — called only from Studio API |
| Deployment | Vercel (Next.js app) + Railway (Studio API) | AWS, single-host | Vercel zero-config + image opt; Railway long-lived container for compute |

---

### 3. Folder Structure

**Next.js app (Vercel):**

```
src/
├── app/
│   ├── layout.tsx                  # Root layout — Navbar, CartDrawer, Providers, fonts
│   ├── page.tsx                    # Homepage (hero, new arrivals, drops, custom CTA)
│   ├── globals.css                 # CSS variable tokens + base styles
│   ├── shop/
│   │   ├── page.tsx                # Shop — all products (grid, search, filters, sort)
│   │   └── [category]/
│   │       └── page.tsx            # Category listing (PLP)
│   ├── products/
│   │   └── [slug]/
│   │       └── page.tsx            # Product detail (PDP)
│   ├── customize/
│   │   └── page.tsx                # Custom T-Shirt Builder (6-step USP)
│   ├── collections/
│   │   ├── page.tsx                # Collections index
│   │   └── [slug]/
│   │       └── page.tsx            # Collection detail
│   ├── mystery-box/
│   │   ├── page.tsx                # Mystery Box landing
│   │   └── [category]/
│   │       └── page.tsx            # Box picker + unbox reveal
│   ├── cart/
│   │   └── page.tsx                # Cart page (drawer fallback)
│   ├── checkout/
│   │   ├── page.tsx                # Checkout (guest allowed)
│   │   └── success/
│   │       └── page.tsx            # Order confirmation
│   ├── track/
│   │   └── page.tsx                # Public order tracking (order# + email)
│   ├── account/
│   │   ├── layout.tsx              # Account layout with sidebar
│   │   ├── page.tsx                # Dashboard (→ orders)
│   │   ├── orders/
│   │   │   ├── page.tsx            # Order history
│   │   │   └── [id]/
│   │   │       ├── page.tsx        # Order detail
│   │   │       └── track/
│   │   │           └── page.tsx    # Account order tracking view
│   │   ├── wishlist/page.tsx       # Wishlist
│   │   ├── saved-designs/page.tsx  # Saved custom designs
│   │   ├── addresses/page.tsx      # Address management
│   │   ├── rewards/page.tsx        # Rewards / points
│   │   └── profile/page.tsx        # Profile
│   ├── designer/
│   │   ├── layout.tsx              # Designer layout — role check (designer)
│   │   ├── page.tsx                # Designer dashboard
│   │   ├── designs/
│   │   │   ├── page.tsx            # Manage designs
│   │   │   └── new/page.tsx        # Upload a design
│   │   └── earnings/page.tsx       # Payouts
│   ├── admin/
│   │   ├── layout.tsx              # Admin layout — role check (admin/super_admin)
│   │   ├── page.tsx                # Admin dashboard
│   │   ├── products/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/edit/page.tsx
│   │   ├── inventory/page.tsx      # Inventory quick-update
│   │   ├── orders/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx       # Order mgmt + refunds
│   │   ├── collections/page.tsx
│   │   ├── custom-designs/page.tsx # User-uploaded design moderation
│   │   ├── customers/page.tsx      # Customers + analytics
│   │   ├── coupons/page.tsx        # Coupon engine
│   │   ├── campaigns/page.tsx      # Marketing campaigns
│   │   ├── mystery-boxes/page.tsx  # Mystery box config
│   │   └── users/page.tsx          # Role mgmt (super_admin only)
│   ├── api/
│   │   ├── payments/
│   │   │   ├── razorpay/
│   │   │   │   ├── create-order/route.ts
│   │   │   │   └── webhook/route.ts   # Razorpay payment.captured (HMAC verify)
│   │   │   └── stripe/
│   │   │       ├── create-payment-intent/route.ts
│   │   │       └── webhook/route.ts   # Stripe payment_intent.succeeded
│   │   ├── studio/
│   │   │   ├── ai-generate/route.ts   # Proxy → Studio API /ai/generate
│   │   │   └── render-preview/route.ts# Proxy → Studio API /render/preview
│   │   └── revalidate/route.ts        # On-demand ISR revalidation
│   ├── auth/
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── callback/route.ts          # Supabase OAuth callback
│   ├── privacy/page.tsx
│   └── terms/page.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── Providers.tsx              # Zustand + query providers
│   ├── cart/
│   │   ├── CartDrawer.tsx
│   │   ├── CartItem.tsx
│   │   └── ShippingProgress.tsx       # free-shipping threshold (₹1499)
│   ├── product/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ImageGallery.tsx
│   │   ├── SizeSelector.tsx
│   │   ├── ColorSelector.tsx
│   │   ├── AddToCartButton.tsx
│   │   ├── FabricAccordion.tsx
│   │   └── SizeGuideModal.tsx         # chest/length in cm
│   ├── builder/
│   │   ├── StyleStep.tsx              # Step 1 — Oversized/Regular/Hoodie/Polo
│   │   ├── ColorStep.tsx              # Step 2 — base color
│   │   ├── DesignStep.tsx             # Step 3 — upload / logo / AI / template
│   │   ├── TextStep.tsx               # Step 4 — text, font, color, alignment
│   │   ├── PreviewCanvas.tsx          # Step 5 — Front / Back / 360° live preview
│   │   ├── AIDesignPanel.tsx          # AI Design Generator panel
│   │   └── TemplatePicker.tsx         # choose from template library
│   ├── mystery-box/
│   │   ├── BoxPicker.tsx              # category + tier (Bronze/Silver/Gold)
│   │   └── UnboxReveal.tsx            # animated reveal (reduced-motion gated)
│   ├── collections/
│   │   ├── CollectionCard.tsx
│   │   └── CollectionGrid.tsx
│   ├── reviews/
│   │   ├── ReviewList.tsx
│   │   ├── ReviewForm.tsx
│   │   └── RatingStars.tsx
│   ├── checkout/
│   │   ├── CheckoutForm.tsx
│   │   ├── AddressForm.tsx
│   │   ├── OrderSummary.tsx
│   │   ├── RazorpayCheckout.tsx       # Razorpay (primary, INR)
│   │   ├── StripePaymentElement.tsx   # Stripe (international, USD)
│   │   ├── CouponInput.tsx
│   │   └── GiftCardInput.tsx
│   ├── account/
│   │   ├── AccountSidebar.tsx
│   │   ├── OrderList.tsx
│   │   ├── WishlistGrid.tsx
│   │   ├── SavedDesignsGrid.tsx
│   │   ├── AddressList.tsx
│   │   └── RewardsPanel.tsx
│   ├── designer/
│   │   ├── DesignerSidebar.tsx
│   │   ├── DesignUploadForm.tsx
│   │   └── EarningsTable.tsx
│   ├── admin/
│   │   ├── AdminSidebar.tsx
│   │   ├── ProductForm.tsx
│   │   ├── VariantManager.tsx
│   │   ├── OrderTable.tsx
│   │   ├── InventoryEditor.tsx
│   │   ├── CollectionForm.tsx
│   │   ├── CustomDesignModeration.tsx
│   │   ├── CouponForm.tsx
│   │   ├── CampaignForm.tsx
│   │   └── MysteryBoxConfig.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Badge.tsx
│       ├── Accordion.tsx
│       ├── Modal.tsx
│       └── Toast.tsx
├── store/
│   ├── cart.ts                       # Zustand cart store (localStorage)
│   └── builder.ts                    # Zustand builder state (style/color/layers/text)
├── lib/
│   ├── supabase/
│   │   ├── client.ts                 # Browser Supabase client
│   │   ├── server.ts                 # Server Supabase client (cookies)
│   │   └── admin.ts                  # Service-role client (webhooks only)
│   ├── razorpay.ts                   # Razorpay server instance + order/verify helpers
│   ├── stripe.ts                     # Stripe server instance
│   ├── resend.ts                     # Resend client + email templates
│   ├── studio.ts                     # Studio API client (ai-generate, render-preview)
│   ├── motion.ts                     # Framer Motion variants
│   └── utils.ts                      # formatPrice (paise→₹), cn(), slugify
├── types/
│   └── index.ts                      # All shared TypeScript types
└── middleware.ts                     # Supabase auth — protect /account, /admin, /designer
```

**FITBOX Studio API (Express on Railway) — separate service:**

```
studio-api/
├── src/
│   ├── index.ts                      # Express app bootstrap, JSON limits, CORS
│   ├── middleware/
│   │   └── auth.ts                   # verify x-studio-api-key (STUDIO_API_KEY)
│   ├── routes/
│   │   ├── ai.ts                     # POST /ai/generate (prompt+style → AI image)
│   │   └── render.ts                 # POST /render/preview (design+layers → previews)
│   ├── services/
│   │   ├── aiProvider.ts             # pluggable Replicate/Stability/OpenAI Images
│   │   ├── compositor.ts             # sharp/canvas front/back/360 WebP compositing
│   │   └── storage.ts                # upload to Supabase Storage buckets
│   └── lib/
│       └── supabaseAdmin.ts          # service-role client (ai_generations log, uploads)
├── package.json
├── tsconfig.json
└── railway.json                      # Railway service config
```

---

### 4. Database Schema

```sql
create extension if not exists "uuid-ossp";

-- Categories
create table categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  parent_id uuid references categories(id),
  position int default 0,
  created_at timestamptz default now()
);

-- Collections (curated: Anime, Streetwear, Gym, College, Startup, Creator)
create table collections (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  description text,
  hero_image_url text,
  is_featured boolean default false,
  position int default 0,
  created_at timestamptz default now()
);

-- Products
create table products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  description text,
  category_id uuid not null references categories(id),
  base_price int not null,           -- paise (INR)
  fabric text,                       -- e.g. "240 GSM combed cotton"
  fabric_detail text,
  fit text,                          -- 'oversized' | 'regular' | 'hoodie' | 'polo' | etc.
  gsm int,                           -- fabric weight
  care_instructions text,
  is_published boolean default false,
  is_limited_drop boolean default false,
  drop_starts_at timestamptz,        -- null = always available
  drop_ends_at timestamptz,
  badge text check (badge in ('new','bestseller','drop','restock',null)),
  designer_id uuid references profiles(id),  -- null = FITBOX house product
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Product ↔ Collection (many-to-many)
create table product_collections (
  product_id uuid not null references products(id) on delete cascade,
  collection_id uuid not null references collections(id) on delete cascade,
  primary key (product_id, collection_id)
);

-- Product variants (size × color)
create table product_variants (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references products(id) on delete cascade,
  size text not null,                -- 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL'
  color_name text not null,          -- e.g. "Jet Black"
  color_hex text not null,           -- e.g. "#1A1A1A"
  sku text not null unique,          -- e.g. "FB-OVR-BLK-L"
  stock_count int not null default 0 check (stock_count >= 0),
  price int,                         -- null = use product base_price (paise)
  created_at timestamptz default now()
);

-- Product images (tagged by color)
create table product_images (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references products(id) on delete cascade,
  color_name text,                   -- null = all colors
  url text not null,
  position int not null default 0,
  is_primary boolean default false,
  alt text,
  created_at timestamptz default now()
);

-- Profiles (extends auth.users)
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  role text not null default 'customer'
    check (role in ('customer','designer','admin','super_admin')),
  reward_points int not null default 0,
  created_at timestamptz default now()
);

-- Addresses (India-format)
create table addresses (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  full_name text not null,
  phone text not null,
  line1 text not null,
  line2 text,
  city text not null,
  state text not null,
  postal_code text not null,         -- PIN code
  country text not null default 'IN',
  is_default boolean default false,
  created_at timestamptz default now()
);

-- Custom designs (output of the builder)
create table custom_designs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id),     -- null for guest until saved
  name text,
  base_style text not null,                 -- 'oversized'|'regular'|'hoodie'|'polo'
  base_color_name text not null,
  base_color_hex text not null,
  size text,
  status text not null default 'draft' check (status in ('draft','saved','ordered')),
  preview_front_url text,
  preview_back_url text,
  preview_360_url text,
  price int not null,                       -- computed price in paise
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Design layers (text / uploaded image / logo / AI asset placed on a custom design)
create table design_layers (
  id uuid primary key default uuid_generate_v4(),
  custom_design_id uuid not null references custom_designs(id) on delete cascade,
  side text not null check (side in ('front','back')),
  type text not null check (type in ('image','logo','text','ai')),
  asset_url text,                            -- for image/logo/ai
  text_content text,                         -- for text
  font text,                                 -- for text
  text_color text,
  alignment text check (alignment in ('left','center','right',null)),
  pos_x real default 0, pos_y real default 0,
  scale real default 1, rotation real default 0,
  z_index int default 0,
  created_at timestamptz default now()
);

-- Uploaded + AI-generated design assets library
create table design_assets (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id),
  type text not null check (type in ('upload','logo','ai')),
  url text not null,
  source_prompt text,                        -- for ai assets
  ai_style text,                             -- 'anime'|'typography'|'streetwear'|'minimal'
  created_at timestamptz default now()
);

-- AI generation log
create table ai_generations (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id),
  prompt text not null,
  style text not null check (style in ('anime','typography','streetwear','minimal')),
  result_url text,
  status text not null default 'pending' check (status in ('pending','succeeded','failed')),
  created_at timestamptz default now()
);

-- Wishlist
create table wishlist_items (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  product_id uuid not null references products(id) on delete cascade,
  created_at timestamptz default now(),
  unique (user_id, product_id)
);

-- Reviews & ratings
create table reviews (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references products(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  rating int not null check (rating between 1 and 5),
  title text,
  body text,
  is_verified_purchase boolean default false,
  created_at timestamptz default now(),
  unique (product_id, user_id)
);

-- Coupons
create table coupons (
  id uuid primary key default uuid_generate_v4(),
  code text not null unique,
  type text not null check (type in ('percent','fixed')),
  value int not null,                        -- percent (e.g. 10) or paise
  min_subtotal int default 0,                -- paise
  max_redemptions int,
  times_redeemed int default 0,
  starts_at timestamptz,
  expires_at timestamptz,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Gift cards
create table gift_cards (
  id uuid primary key default uuid_generate_v4(),
  code text not null unique,
  initial_balance int not null,              -- paise
  balance int not null,                      -- paise
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Mystery boxes (config) + purchases
create table mystery_boxes (
  id uuid primary key default uuid_generate_v4(),
  category text not null check (category in ('anime','streetwear','gym','creator')),
  tier text not null check (tier in ('bronze','silver','gold')),
  price int not null,                        -- paise
  item_count int not null default 1,         -- pieces revealed
  is_active boolean default true,
  created_at timestamptz default now(),
  unique (category, tier)
);

create table mystery_box_purchases (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references orders(id),
  user_id uuid references profiles(id),
  mystery_box_id uuid not null references mystery_boxes(id),
  status text not null default 'sealed' check (status in ('sealed','revealed','fulfilled')),
  revealed_at timestamptz,
  created_at timestamptz default now()
);

-- Orders
create table orders (
  id uuid primary key default uuid_generate_v4(),
  order_number text not null unique,         -- e.g. "FB-25-000123"
  user_id uuid references profiles(id),      -- null for guest
  guest_email text,
  status text not null default 'pending'
    check (status in ('pending','processing','printing','shipped','out_for_delivery',
                      'delivered','cancelled','return_requested','returned','refunded')),
  payment_provider text check (payment_provider in ('razorpay','stripe')),
  razorpay_order_id text,
  razorpay_payment_id text unique,
  stripe_payment_intent_id text unique,
  payment_status text,
  currency text not null default 'INR',
  shipping_name text not null,
  shipping_phone text,
  shipping_line1 text not null,
  shipping_line2 text,
  shipping_city text not null,
  shipping_state text not null,
  shipping_postal_code text not null,
  shipping_country text not null default 'IN',
  coupon_code text,
  discount_amount int not null default 0,    -- paise
  gift_card_code text,
  gift_card_amount int not null default 0,   -- paise
  subtotal int not null,                     -- paise
  shipping_amount int not null default 0,    -- paise
  total int not null,                        -- paise
  tracking_carrier text,
  tracking_number text,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Order items (snapshot; supports catalog products, custom designs, mystery boxes)
create table order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid not null references orders(id) on delete cascade,
  item_type text not null default 'product'
    check (item_type in ('product','custom','mystery_box')),
  variant_id uuid references product_variants(id),
  custom_design_id uuid references custom_designs(id),
  mystery_box_id uuid references mystery_boxes(id),
  product_name text not null,                -- snapshot
  variant_description text,                   -- e.g. "Jet Black / L"
  sku text,
  image_url text,
  price_at_purchase int not null,            -- paise
  quantity int not null check (quantity > 0),
  created_at timestamptz default now()
);

-- Order tracking events (live tracking timeline)
create table order_events (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid not null references orders(id) on delete cascade,
  status text not null,
  message text,
  location text,
  created_at timestamptz default now()
);

-- Designer payouts (marketplace)
create table designer_earnings (
  id uuid primary key default uuid_generate_v4(),
  designer_id uuid not null references profiles(id) on delete cascade,
  order_item_id uuid references order_items(id),
  amount int not null,                       -- paise (designer's cut)
  status text not null default 'pending' check (status in ('pending','paid')),
  created_at timestamptz default now()
);

-- Newsletter
create table email_subscribers (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  created_at timestamptz default now()
);

-- updated_at trigger
create or replace function update_updated_at()
returns trigger as $$ begin new.updated_at = now(); return new; end; $$ language plpgsql;
create trigger products_updated_at before update on products
  for each row execute function update_updated_at();
create trigger orders_updated_at before update on orders
  for each row execute function update_updated_at();
create trigger custom_designs_updated_at before update on custom_designs
  for each row execute function update_updated_at();

-- auto-create profile on signup
create or replace function handle_new_user()
returns trigger as $$ begin
  insert into profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end; $$ language plpgsql security definer;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function handle_new_user();
```

---

### 5. Row Level Security (RLS)

```sql
-- Helper functions (security definer so they can read profiles under RLS)
create or replace function is_admin()
returns boolean as $$
  select exists (
    select 1 from profiles
    where id = auth.uid() and role in ('admin','super_admin')
  );
$$ language sql stable security definer;

create or replace function is_staff()
returns boolean as $$
  select exists (
    select 1 from profiles
    where id = auth.uid() and role in ('admin','super_admin')
  );
$$ language sql stable security definer;

create or replace function is_super_admin()
returns boolean as $$
  select exists (
    select 1 from profiles
    where id = auth.uid() and role = 'super_admin'
  );
$$ language sql stable security definer;

-- Enable RLS on all tables
alter table categories enable row level security;
alter table collections enable row level security;
alter table products enable row level security;
alter table product_collections enable row level security;
alter table product_variants enable row level security;
alter table product_images enable row level security;
alter table profiles enable row level security;
alter table addresses enable row level security;
alter table custom_designs enable row level security;
alter table design_layers enable row level security;
alter table design_assets enable row level security;
alter table ai_generations enable row level security;
alter table wishlist_items enable row level security;
alter table reviews enable row level security;
alter table coupons enable row level security;
alter table gift_cards enable row level security;
alter table mystery_boxes enable row level security;
alter table mystery_box_purchases enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table order_events enable row level security;
alter table designer_earnings enable row level security;
alter table email_subscribers enable row level security;

-- Categories: public read, admin write
create policy "categories_public_read" on categories for select using (true);
create policy "categories_admin_write" on categories for all
  using (is_admin()) with check (is_admin());

-- Collections: public read, admin write
create policy "collections_public_read" on collections for select using (true);
create policy "collections_admin_write" on collections for all
  using (is_admin()) with check (is_admin());

-- Products: public read (published only), designer reads/writes own, admin full
create policy "products_public_read" on products
  for select using (is_published = true);
create policy "products_designer_read_own" on products
  for select using (designer_id = auth.uid());
create policy "products_designer_write_own" on products
  for all using (designer_id = auth.uid()) with check (designer_id = auth.uid());
create policy "products_admin_all" on products
  for all using (is_admin()) with check (is_admin());

-- Product ↔ Collection: public read, admin write
create policy "product_collections_public_read" on product_collections
  for select using (true);
create policy "product_collections_admin_write" on product_collections
  for all using (is_admin()) with check (is_admin());

-- Product variants: public read, designer manages own product's, admin write
create policy "variants_public_read" on product_variants for select using (true);
create policy "variants_designer_write" on product_variants for all
  using (exists (select 1 from products p
                 where p.id = product_id and p.designer_id = auth.uid()))
  with check (exists (select 1 from products p
                 where p.id = product_id and p.designer_id = auth.uid()));
create policy "variants_admin_write" on product_variants for all
  using (is_admin()) with check (is_admin());

-- Product images: public read, designer manages own product's, admin write
create policy "images_public_read" on product_images for select using (true);
create policy "images_designer_write" on product_images for all
  using (exists (select 1 from products p
                 where p.id = product_id and p.designer_id = auth.uid()))
  with check (exists (select 1 from products p
                 where p.id = product_id and p.designer_id = auth.uid()));
create policy "images_admin_write" on product_images for all
  using (is_admin()) with check (is_admin());

-- Profiles: users read/update own; admin reads all; super_admin changes roles
create policy "profiles_own_read" on profiles for select using (auth.uid() = id);
create policy "profiles_own_update" on profiles for update
  using (auth.uid() = id)
  with check (
    auth.uid() = id
    -- role may only be changed by a super_admin (enforced below); customers can't escalate
    and (role = (select role from profiles where id = auth.uid()))
  );
create policy "profiles_admin_read" on profiles for select using (is_admin());
create policy "profiles_super_admin_all" on profiles for all
  using (is_super_admin()) with check (is_super_admin());

-- Addresses: users manage own
create policy "addresses_own" on addresses for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Custom designs: users manage own; guests handled server-side (service role)
create policy "custom_designs_own" on custom_designs for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "custom_designs_admin_read" on custom_designs for select
  using (is_admin());

-- Design layers: managed via owning custom_design
create policy "design_layers_own" on design_layers for all
  using (exists (select 1 from custom_designs d
                 where d.id = custom_design_id and d.user_id = auth.uid()))
  with check (exists (select 1 from custom_designs d
                 where d.id = custom_design_id and d.user_id = auth.uid()));
create policy "design_layers_admin_read" on design_layers for select
  using (is_admin());

-- Design assets: users manage own library
create policy "design_assets_own" on design_assets for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "design_assets_admin_read" on design_assets for select
  using (is_admin());

-- AI generations: users read own (inserts/updates via service role from Studio API)
create policy "ai_generations_own_read" on ai_generations for select
  using (auth.uid() = user_id);
create policy "ai_generations_admin_read" on ai_generations for select
  using (is_admin());

-- Wishlist: users manage own
create policy "wishlist_own" on wishlist_items for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Reviews: public read; users manage own; admin moderates
create policy "reviews_public_read" on reviews for select using (true);
create policy "reviews_own_write" on reviews for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "reviews_admin_all" on reviews for all
  using (is_admin()) with check (is_admin());

-- Coupons: admin manage; validity checked server-side at checkout (no public select)
create policy "coupons_admin_all" on coupons for all
  using (is_admin()) with check (is_admin());

-- Gift cards: admin manage; balance checked server-side (no public select)
create policy "gift_cards_admin_all" on gift_cards for all
  using (is_admin()) with check (is_admin());

-- Mystery boxes: public read active config, admin write
create policy "mystery_boxes_public_read" on mystery_boxes
  for select using (is_active = true);
create policy "mystery_boxes_admin_all" on mystery_boxes for all
  using (is_admin()) with check (is_admin());

-- Mystery box purchases: users read own (created via service role on order), admin all
create policy "mbox_purchases_own_read" on mystery_box_purchases for select
  using (auth.uid() = user_id);
create policy "mbox_purchases_admin_all" on mystery_box_purchases for all
  using (is_admin()) with check (is_admin());

-- Orders: users/guests read own; webhook (service role) inserts; admin full
create policy "orders_own_read" on orders for select
  using (
    auth.uid() = user_id
    or guest_email = (select email from auth.users where id = auth.uid())
  );
create policy "orders_admin_all" on orders for all
  using (is_admin()) with check (is_admin());
-- NOTE: order creation is performed by the payment webhook using the SERVICE-ROLE
-- client, which bypasses RLS. No public/anon INSERT policy is granted on orders.

-- Order items: read if you can read the parent order; admin full
create policy "order_items_read" on order_items for select
  using (exists (
    select 1 from orders o
    where o.id = order_id
      and (o.user_id = auth.uid()
           or o.guest_email = (select email from auth.users where id = auth.uid()))
  ));
create policy "order_items_admin_all" on order_items for all
  using (is_admin()) with check (is_admin());

-- Order events: read if you can read the parent order; admin full
create policy "order_events_read" on order_events for select
  using (exists (
    select 1 from orders o
    where o.id = order_id
      and (o.user_id = auth.uid()
           or o.guest_email = (select email from auth.users where id = auth.uid()))
  ));
create policy "order_events_admin_all" on order_events for all
  using (is_admin()) with check (is_admin());

-- Designer earnings: designers read own; admin full (payouts written via service role)
create policy "designer_earnings_own_read" on designer_earnings for select
  using (auth.uid() = designer_id);
create policy "designer_earnings_admin_all" on designer_earnings for all
  using (is_admin()) with check (is_admin());

-- Newsletter: anyone may subscribe (insert); admin reads
create policy "email_subscribers_insert" on email_subscribers
  for insert with check (true);
create policy "email_subscribers_admin_read" on email_subscribers
  for select using (is_admin());
```

> Order creation, stock decrement, gift-card debit, mystery-box purchase rows, and
> designer-earning rows are all written by the **payment webhooks** using the
> **service-role** client (bypasses RLS). The AI generation log and asset uploads are
> written by the **Studio API** service-role client. No anon/authenticated INSERT
> policy is granted on `orders`, `coupons`, or `gift_cards`.

---

### 6. Payments Integration Architecture (Razorpay primary + Stripe international)

FITBOX runs **dual gateways**. Razorpay is primary for India (UPI, cards, net banking, wallets — INR, paise). Stripe covers international cards (USD, cents). Both share one rule: **the server recalculates the total** from the cart / custom designs / mystery boxes; the client total is never trusted. **Webhooks are the source of truth** for order creation, and each is idempotent on its payment id.

#### 6.1 Razorpay (primary — INR / India)

**Payment flow:**
1. Client → `POST /api/payments/razorpay/create-order`. Server recomputes the amount in **paise** from cart/custom designs, creates a Razorpay Order, returns `razorpay_order_id` + amount.
2. Client opens **Razorpay Checkout** (UPI / cards / net banking / wallets) with the `order_id`.
3. On success the client receives `razorpay_payment_id`, `razorpay_order_id`, `razorpay_signature`.
4. Razorpay sends the `payment.captured` webhook → `POST /api/payments/razorpay/webhook`. The handler **verifies the HMAC signature**, then (idempotently) creates `orders` + `order_items`, decrements stock, and sends the confirmation email via Resend.

**Webhook handler (critical path):**
```typescript
// app/api/payments/razorpay/webhook/route.ts
import crypto from 'crypto'

export async function POST(req: Request) {
  const body = await req.text()                       // raw body for HMAC
  const sig = req.headers.get('x-razorpay-signature') ?? ''

  // Verify webhook authenticity: HMAC_SHA256(rawBody, RAZORPAY_WEBHOOK_SECRET)
  const expected = crypto
    .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(body)
    .digest('hex')
  if (
    sig.length !== expected.length ||
    !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
  ) {
    return new Response('Invalid signature', { status: 400 })
  }

  const event = JSON.parse(body)
  if (event.event === 'payment.captured') {
    const payment = event.payload.payment.entity        // { id, order_id, amount, ... }
    const supabase = createAdminClient()                // service role — bypasses RLS

    // Idempotency — never create a duplicate order for the same payment id
    const { data: existing } = await supabase
      .from('orders')
      .select('id')
      .eq('razorpay_payment_id', payment.id)
      .maybeSingle()
    if (existing) return new Response('OK', { status: 200 })

    // Recompute totals server-side (paise), then create orders + order_items,
    // decrement variant stock, debit gift card / increment coupon redemption,
    // insert mystery_box_purchases + designer_earnings, send Resend email.
  }
  return new Response('OK', { status: 200 })
}
```

> The payment-confirmation handshake also verifies `razorpay_signature` =
> `HMAC_SHA256(razorpay_order_id + "|" + razorpay_payment_id, RAZORPAY_KEY_SECRET)`
> when the client returns from Checkout; the webhook above is the authoritative
> order-creation path.

#### 6.2 Stripe (international — USD)

**Payment flow:**
1. Client → `POST /api/payments/stripe/create-payment-intent`. Server recomputes amount in **cents**, creates a PaymentIntent with metadata, returns `client_secret`.
2. Client mounts the Stripe **Payment Element** with `client_secret`.
3. On success Stripe sends `payment_intent.succeeded` → `POST /api/payments/stripe/webhook`.
4. Handler verifies the Stripe signature, then runs the **same idempotent order-creation path** (keyed on `stripe_payment_intent_id`).

```typescript
// app/api/payments/stripe/webhook/route.ts
export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return new Response('Webhook signature verification failed', { status: 400 })
  }

  if (event.type === 'payment_intent.succeeded') {
    const pi = event.data.object as Stripe.PaymentIntent
    const supabase = createAdminClient()
    const { data: existing } = await supabase
      .from('orders').select('id')
      .eq('stripe_payment_intent_id', pi.id).maybeSingle()
    if (existing) return new Response('OK', { status: 200 })
    // Same order-creation path, currency = 'USD', amounts in cents.
  }
  return new Response('OK', { status: 200 })
}
```

**Never do:**
- Create Razorpay Orders or Stripe PaymentIntents with a **client-supplied total** — always recompute server-side in **paise** (Razorpay) / cents (Stripe).
- Skip HMAC / signature verification on either webhook.
- Create an order without checking idempotency on `razorpay_payment_id` / `stripe_payment_intent_id`.
- Log **card data, UPI handles/VPAs, webhook signatures, `client_secret`, or any key/secret** to console or storage.
- Trust client-claimed coupon/gift-card discounts — revalidate and apply server-side.

---

### 7. Supabase Client Pattern

Three separate clients — never mix them:

```typescript
// lib/supabase/client.ts — browser only
import { createBrowserClient } from '@supabase/ssr'
export const createClient = () =>
  createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

// lib/supabase/server.ts — server components + server actions
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
export const createClient = () =>
  createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: { get: (name) => cookies().get(name)?.value }
  })

// lib/supabase/admin.ts — payment webhooks + Studio API only, never expose to client
import { createClient } from '@supabase/supabase-js'
export const createAdminClient = () =>
  createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
```

The service-role (`admin`) client is used by the Razorpay/Stripe webhooks (order creation, stock, payouts) and by the **Studio API** (logging `ai_generations`, uploading to storage buckets). It is never imported into client components.

---

### 7a. FITBOX Studio API (Express on Railway)

A separate Express (Node.js) service on Railway handles the two heavy/long-running builder workloads. It is **called only from the Next.js server** (server actions / API routes in `app/api/studio/*`) — never from the browser. Auth is a shared secret: every request must carry `x-studio-api-key: STUDIO_API_KEY`.

**`lib/studio.ts`** (Next.js side) wraps these calls and injects the API key from the server environment.

**Endpoints:**

```
POST /ai/generate
  Auth:  x-studio-api-key: STUDIO_API_KEY
  Body:  { userId?: uuid, prompt: string,
           style: 'anime'|'typography'|'streetwear'|'minimal' }
  Does:  insert ai_generations(status='pending') → call AI image provider
         (AI_IMAGE_PROVIDER_KEY) → upload result to `ai-designs` bucket
         → update ai_generations(status='succeeded', result_url) (or 'failed')
  Returns: { generationId, resultUrl }

POST /render/preview
  Auth:  x-studio-api-key: STUDIO_API_KEY
  Body:  { customDesign: {...}, layers: DesignLayer[] }
  Does:  composite base garment (style+color) with layers per side →
         render front / back / 360° as WebP (sharp/canvas) →
         upload to `design-previews` bucket →
         return signed/public preview URLs (caller persists onto custom_designs)
  Returns: { previewFrontUrl, previewBackUrl, preview360Url }
```

The AI image provider key (`AI_IMAGE_PROVIDER_KEY`) lives **only** on Railway — it is never present in the Vercel app or the browser. The Studio service uses its own Supabase **service-role** client for the `ai_generations` log and bucket uploads.

---

### 8. Image Storage

Supabase Storage buckets:

| Bucket | Access | Path structure |
|--------|--------|----------------|
| `product-images` | public | `products/{product_id}/{color}/{position}.webp` |
| `design-uploads` | auth | `uploads/{user_id}/{asset_id}.{ext}` (user images / logos) |
| `ai-designs` | public-read (via signed flow) | `ai/{user_id}/{generation_id}.png` |
| `design-previews` | public | `previews/{custom_design_id}/{side}.webp` |

- Product image ratio **3:4 (1200×1600)**. Lifestyle / drop ratio **16:9**.
- Max upload size **8MB**.
- Catalog/lifestyle images converted to WebP on upload (admin panel handles this).
- Builder previews (front/back/360) are written to `design-previews` by the **Studio API** render endpoint.
- Next.js `<Image>` configured with `remotePatterns` for the Supabase Storage host.

---

### 9. Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=
# Stripe (international)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
# Resend
RESEND_API_KEY=
RESEND_FROM_EMAIL=orders@fitbox.in
# Studio API (Railway, Express)
STUDIO_API_URL=
STUDIO_API_KEY=
AI_IMAGE_PROVIDER_KEY=
# Config
NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD=149900   # paise (₹1499)
NEXT_PUBLIC_SITE_URL=https://fitbox.in
```

> `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`, `STRIPE_SECRET_KEY`,
> `STRIPE_WEBHOOK_SECRET`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`,
> `STUDIO_API_KEY` are server-only. `AI_IMAGE_PROVIDER_KEY` lives only on the
> Railway Studio service.

---

### 10. Middleware (Auth Protection)

```typescript
// middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (n) => req.cookies.get(n)?.value, set: (n, v, o) => res.cookies.set(n, v, o) } }
  )
  const { data: { session } } = await supabase.auth.getSession()
  const path = req.nextUrl.pathname

  // /account — any authenticated user
  if (path.startsWith('/account') && !session) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  // Role-gated areas — fetch role once
  const needsRole =
    path.startsWith('/admin') || path.startsWith('/designer')

  if (needsRole) {
    if (!session) return NextResponse.redirect(new URL('/auth/login', req.url))
    const { data: profile } = await supabase
      .from('profiles').select('role').eq('id', session.user.id).single()
    const role = profile?.role

    // /admin — admin or super_admin
    if (path.startsWith('/admin') && role !== 'admin' && role !== 'super_admin') {
      return NextResponse.redirect(new URL('/', req.url))
    }
    // /designer — designer
    if (path.startsWith('/designer') && role !== 'designer') {
      return NextResponse.redirect(new URL('/', req.url))
    }
    // /admin/users — super_admin only (also enforced in the page + RLS)
    if (path.startsWith('/admin/users') && role !== 'super_admin') {
      return NextResponse.redirect(new URL('/admin', req.url))
    }
  }

  return res
}

export const config = {
  matcher: ['/account/:path*', '/admin/:path*', '/designer/:path*']
}
```

---

### 11. Architecture Decision Records (ADRs)

**ADR-001: Supabase over self-hosted PostgreSQL**
We use Supabase managed PostgreSQL rather than self-hosting. Reason: RLS, Auth (email/password + Google OAuth), Storage, and Realtime come bundled — no additional services to operate for the storefront. Trade-off: vendor dependency, but for an India-first D2C platform the operational simplicity outweighs it.

**ADR-002: Zustand cart over server-side sessions**
Cart state is client-side in Zustand, persisted to localStorage; the builder uses a parallel `store/builder.ts`. Reason: cart works for guests without login, no round-trips on every add-to-cart. Custom designs are the exception — they are persisted **server-side** (`custom_designs` + `design_layers`) so previews and orders are authoritative. Trade-off: the cart itself is device-specific, acceptable at this scale.

**ADR-003: Razorpay primary + Stripe international over a single gateway**
We run two gateways instead of one. Reason: FITBOX is India-first and India's dominant payment rail is **UPI**, which Stripe does not serve well — Razorpay is required for UPI / net banking / Indian wallets / INR. Stripe is retained for **international cards / USD**. Trade-off: two webhook paths and two reconciliation flows, mitigated by funnelling both into one idempotent, server-recomputed order-creation path.

**ADR-004: Separate Express Studio API on Railway over Vercel serverless for AI/render**
AI design generation (10–60s provider calls) and server-side mockup compositing (CPU/memory-heavy front/back/360 WebP rendering) are pushed to a long-lived Express service on Railway rather than crammed into Vercel serverless functions. Reason: these workloads exceed Vercel's serverless execution-time and memory limits, would cause cold-start/timeout failures in the builder, and the AI provider key stays off the edge. Trade-off: one extra service to deploy and monitor, plus a network hop — justified by keeping the storefront fast and within limits and letting compute scale independently.

**ADR-005: No ORM**
We use the Supabase client directly, not Prisma or Drizzle. Reason: the Supabase client is type-safe with generated types, RLS handles access control, and an ORM layer would duplicate the schema. Trade-off: raw SQL in some complex queries (e.g. stock decrement, payout computation).

**ADR-006: Custom-design persistence model (normalized layers, not a JSON blob)**
A custom design is stored as a `custom_designs` row plus N `design_layers` rows (one per placed image / logo / AI asset / text, with side, position, scale, rotation, z-index) rather than as a single opaque JSON blob on the order. Reason: layers can be re-rendered server-side by the Studio API into fresh previews, re-priced, moderated by admins (`/admin/custom-designs`), and re-ordered from `/account/saved-designs`; guest designs start with `user_id = null` and are claimed on save/login. Trade-off: more rows and joins than a blob, but it makes the design queryable, editable, and auditable.
