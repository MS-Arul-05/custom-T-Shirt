# 07 — Engineering Guide
## FITBOX — Custom T-Shirt & Apparel Platform · ecomm_platform_01

---

### 1. Golden Rules

1. **Design tokens first.** Never hardcode a color, spacing, or radius value in a component. Use CSS variables (orange accent `#FF6B00`, white surface, dark blocks).
2. **Server components for data, client components for interaction.** PDP and the builder shell fetch data server-side. Add to Cart, the live preview controls, and the Mystery Box unbox are Client Components. Never mix.
3. **Price is always in INR paise.** Store integer paise in the database (₹1 = 100 paise). Display with `formatPrice()`. Never do float arithmetic on money.
4. **Never trust the client for price or stock.** Recompute the total server-side in paise (from variants + persisted custom designs) before creating a Razorpay/Stripe order. Validate stock before fulfilment.
5. **Payment webhooks are the source of truth for order creation.** Razorpay `payment.captured` and Stripe `payment_intent.succeeded` create orders — not the checkout redirect. A user could close the browser before the redirect.
6. **Custom-builder state lives in a dedicated Zustand store** (`store/builder.ts`), separate from the cart. Custom designs are persisted server-side (custom_designs + design_layers) **before** they enter the cart or checkout.

---

### 2. Project Folder Structure

```
src/
├── app/                    # All routes (Next.js App Router)
├── components/
│   ├── layout/             # Navbar, Footer, Providers
│   ├── cart/               # CartDrawer, CartItem, ShippingProgress
│   ├── product/            # ProductCard, ProductGrid, PDP components
│   ├── builder/            # StyleStep, ColorStep, DesignStep, TextStep, LivePreview
│   ├── mystery/            # BoxPicker, UnboxReveal, WearTheFit
│   ├── checkout/           # CheckoutForm, AddressForm, OrderSummary
│   ├── account/            # AccountSidebar, OrderList, AddressList, SavedDesigns
│   ├── designer/           # DesignUploadForm, EarningsTable
│   ├── admin/              # AdminSidebar, ProductForm, OrderTable
│   └── ui/                 # Primitive: Button, Input, Badge, Modal, Toast
├── store/
│   ├── cart.ts             # Zustand cart store only
│   └── builder.ts          # Zustand custom-builder store (style/color/size + layers)
├── lib/
│   ├── supabase/           # client.ts, server.ts, admin.ts
│   ├── razorpay.ts         # Razorpay server instance + order creation
│   ├── stripe.ts           # Stripe server instance (international)
│   ├── studio.ts           # FITBOX Studio API client (AI generate + preview compositing)
│   ├── resend.ts           # Resend client
│   ├── motion.ts           # Framer Motion reusable variants
│   └── utils.ts            # formatPrice, cn, slugify
├── emails/                 # React Email templates
├── types/
│   └── index.ts            # All shared TypeScript interfaces
└── middleware.ts           # Auth middleware
```

---

### 3. TypeScript Conventions

```typescript
// Always use interfaces for object shapes
interface Product {
  id: string
  name: string
  slug: string
  base_price: number  // always paise (INR)
  fit: 'oversized' | 'regular' | 'hoodie' | 'polo'
  gsm: number | null
  is_limited_drop: boolean
  designer_id: string | null  // null = FITBOX house product
}

interface CartItem {
  productId: string
  customDesignId?: string      // set for custom items
  name: string
  price: number                // paise — variant override or product base
  size: string
  color: string
  quantity: number
  image: string
}

interface CustomDesign {
  id: string
  base_style: 'oversized' | 'regular' | 'hoodie' | 'polo'
  base_color_name: string
  base_color_hex: string
  size: string | null
  status: 'draft' | 'saved' | 'ordered'
  preview_front_url: string | null
  preview_back_url: string | null
  preview_360_url: string | null
  price: number                // computed price in paise
  layers: DesignLayer[]
}

interface DesignLayer {
  id: string
  side: 'front' | 'back'
  type: 'image' | 'logo' | 'text' | 'ai'
  asset_url?: string
  text_content?: string
  font?: string
  text_color?: string
  alignment?: 'left' | 'center' | 'right'
  pos_x: number; pos_y: number
  scale: number; rotation: number
  z_index: number
}

interface MysteryBox {
  id: string
  category: 'anime' | 'streetwear' | 'gym' | 'creator'
  tier: 'bronze' | 'silver' | 'gold'
  price: number                // paise
  item_count: number
}

interface Review {
  id: string
  product_id: string
  rating: number               // 1–5
  title: string | null
  body: string | null
  is_verified_purchase: boolean
}

interface Coupon {
  code: string
  type: 'percent' | 'fixed'
  value: number                // percent (e.g. 10) or paise
  min_subtotal: number         // paise
}

// Never use 'any' — if you need an escape hatch, use 'unknown' and narrow it
// Bad:
const data: any = await fetchSomething()
// Good:
const data: unknown = await fetchSomething()
if (typeof data === 'object' && data !== null && 'id' in data) { ... }

// Use discriminated unions for state
type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string }

// Server actions: always return typed results
interface ActionResult<T> {
  data?: T
  error?: string
}

// Prefer const assertions for static data
const ORDER_STATUSES = [
  'pending', 'processing', 'printing', 'shipped', 'out_for_delivery',
  'delivered', 'cancelled', 'return_requested', 'returned', 'refunded',
] as const
type OrderStatus = typeof ORDER_STATUSES[number]

const ROLES = ['customer', 'designer', 'admin', 'super_admin'] as const
type Role = typeof ROLES[number]
```

---

### 4. React Conventions

```typescript
// Server Component (default — no 'use client')
// Fetch data directly, no hooks
async function ProductPage({ params }: { params: { slug: string } }) {
  const supabase = createClient()  // server client
  const { data: product } = await supabase
    .from('products')
    .select('*, product_variants(*), product_images(*), reviews(*)')
    .eq('slug', params.slug)
    .eq('is_published', true)
    .single()
  if (!product) notFound()
  return <ProductDetail product={product} />
}

// Custom builder: fetch a saved design server-side, hydrate the builder store client-side
async function CustomizePage({ searchParams }: { searchParams: { design?: string } }) {
  const supabase = createClient()
  const { data: design } = searchParams.design
    ? await supabase
        .from('custom_designs')
        .select('*, design_layers(*)')
        .eq('id', searchParams.design)
        .single()
    : { data: null }
  return <Builder initialDesign={design} />
}

// Client Component — only when needed (state, events, browser APIs)
'use client'
function AddToCartButton({ product, variant }: Props) {
  const { addItem, toggleCart } = useCartStore()
  // ...
}

// Never fetch data in a Client Component's useEffect for initial render
// If a Client Component needs data, pass it as props from Server Component

// Component naming: PascalCase always
// File naming: PascalCase for components, camelCase for utilities

// Props interface always above component
interface ProductCardProps {
  product: Product
  priority?: boolean  // for next/image priority
}
export function ProductCard({ product, priority = false }: ProductCardProps) { ... }
```

---

### 5. Styling Conventions

```typescript
// Always use CSS variables for brand colors
// Bad:
className="bg-[#FF6B00] text-[#1A1A1A]"
// Good:
className="bg-[var(--accent)] text-[var(--text-primary)]"

// Use cn() for conditional classes
import { cn } from '@/lib/utils'
className={cn(
  'base-classes',
  isSelected && 'selected-classes',
  isDisabled && 'disabled-classes'
)}

// Button pattern — always rounded-[8px]:
// Primary:
'bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--text-on-dark)] rounded-[8px] h-11 px-6 text-sm font-semibold transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed'

// Ghost:
'border border-[var(--border-focus)] text-[var(--text-primary)] hover:border-[var(--text-secondary)] rounded-[8px] h-11 px-6 text-sm font-medium transition-colors duration-150'

// Product image card — rounding IS allowed now (modern premium):
'aspect-[3/4] overflow-hidden rounded-[12px]'  // correct
'aspect-[3/4] overflow-hidden'                 // also fine, but 12px is the brand default

// Surfaces (cards/panels) use the white surface token, NOT a hardcoded hex:
'bg-[var(--bg-surface)]'   // #FFFFFF — allowed
// page background is --bg-primary (#F8F8F8)

// Section padding
'py-24 md:py-12'  // desktop 96px / mobile 48px
```

---

### 6. Money and Price Conventions

```typescript
// utils.ts
export function formatPrice(paise: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(paise / 100)
}
// Usage: formatPrice(129900) → "₹1,299"

// NEVER do this:
const price = product.base_price / 100  // float arithmetic loses precision
const total = items.reduce((sum, item) => sum + item.price * item.quantity / 100, 0)

// DO this — integer paise everywhere:
const totalPaise = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
const displayTotal = formatPrice(totalPaise)

// Free shipping threshold from env (also in paise):
const FREE_SHIPPING_THRESHOLD = parseInt(process.env.NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD || '149900')  // ₹1499
const shippingCost = subtotalPaise >= FREE_SHIPPING_THRESHOLD ? 0 : 7900  // ₹79

// Server-side price validation before creating a Razorpay/Stripe order:
// Re-fetch variant prices from Supabase — never use prices from the request body
const variantIds = cartItems.map(item => item.variantId)
const { data: variants } = await supabase
  .from('product_variants')
  .select('id, price, products(base_price)')
  .in('id', variantIds)
// Re-fetch persisted custom designs (price is computed server-side on save):
const { data: designs } = await supabase
  .from('custom_designs')
  .select('id, price')
  .in('id', customDesignIds)
// Calculate total from database prices (paise), not client-submitted prices,
// then create the Razorpay order with that amount.
```

---

### 7. Supabase Conventions

```typescript
// Three clients: client.ts (browser, RLS), server.ts (RSC/session via cookies),
// admin.ts (service-role — webhooks/admin tasks ONLY, never imported in client code).

// Always handle errors explicitly
const { data, error } = await supabase.from('products').select('id, name')
if (error) throw new Error(`Failed to fetch products: ${error.message}`)

// Use explicit select() — never select('*') in production
const { data: product } = await supabase
  .from('products')
  .select(`
    id, name, slug, base_price, fabric, fabric_detail, gsm, fit, care_instructions, badge,
    product_variants (id, size, color_name, color_hex, sku, stock_count, price),
    product_images (id, url, position, color_name, is_primary, alt),
    reviews (id, rating, title, body, is_verified_purchase)
  `)
  .eq('slug', slug)
  .eq('is_published', true)
  .single()

// Custom design with its layers:
const { data: design } = await supabase
  .from('custom_designs')
  .select('*, design_layers(*)')
  .eq('id', id)
  .single()

// Ordering images and variants — always explicit
.order('position', { ascending: true })  // images

// Size sort: sizes are NOT alphabetically sortable. Sort in application code
// against the canonical apparel size order:
const SIZE_ORDER = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
variants.sort((a, b) => SIZE_ORDER.indexOf(a.size) - SIZE_ORDER.indexOf(b.size))

// RLS notes: public read on published products/variants/images/categories/
// collections/reviews; users manage own profile/addresses/wishlist/saved-designs/
// orders; designers manage own designs + read own earnings; admin/super_admin full
// access; super_admin ONLY for role changes on profiles. Webhooks use the
// service-role client (admin.ts), which bypasses RLS — keep it server-only.

// Server component pattern:
import { createClient } from '@/lib/supabase/server'
const supabase = createClient()  // uses cookies for session

// Client component pattern — only for mutations (add to wishlist, save design, etc.):
import { createClient } from '@/lib/supabase/client'
const supabase = createClient()
```

---

### 8. Payments Conventions — Razorpay (primary) + Stripe (international)

**Razorpay — INR / India (UPI, cards, net banking, wallets).**

```typescript
// lib/razorpay.ts — server instance
import Razorpay from 'razorpay'
export const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

// 1) Create order SERVER-SIDE — amount recomputed in paise from DB, never from client.
//    POST /api/payments/razorpay/create-order
const order = await razorpay.orders.create({
  amount: serverComputedTotalPaise,  // integer paise
  currency: 'INR',
  receipt: orderNumber,
})
// Return order.id to the client.

// 2) Client opens Razorpay Checkout with the returned order_id (key_id is public).
//    On success the client receives razorpay_order_id, razorpay_payment_id, razorpay_signature.

// 3) Webhook (source of truth) — POST /api/payments/razorpay/webhook
//    Verify HMAC over `order_id|payment_id`:
import crypto from 'crypto'
const expected = crypto
  .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
  .update(`${razorpayOrderId}|${razorpayPaymentId}`)
  .digest('hex')
if (expected !== razorpaySignature) {
  return Response.json({ error: 'Invalid signature' }, { status: 400 })
}

// 4) Idempotency on razorpay_payment_id:
const existing = await admin.from('orders')
  .select('id').eq('razorpay_payment_id', razorpayPaymentId).maybeSingle()
if (existing.data) return new Response('OK', { status: 200 })  // already processed

// Then create orders + order_items, decrement stock, send confirmation email.
```

**Stripe — USD / international cards.**

```typescript
// lib/stripe.ts — single Stripe instance
import Stripe from 'stripe'
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
  typescript: true,
})

// PaymentIntent — server action / API route only, amount in cents recomputed server-side
const paymentIntent = await stripe.paymentIntents.create({
  amount: totalCents,
  currency: 'usd',
  metadata: { orderNumber, guestEmail: guestEmail || '' },
  automatic_payment_methods: { enabled: true },
})

// Webhook — POST /api/payments/stripe/webhook — always verify signature
const event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
// payment_intent.succeeded → same idempotency (stripe_payment_intent_id) + order creation path.
```

```typescript
// NEVER log any of these:
console.log(razorpaySignature)            // payment signature
console.log(paymentIntent.client_secret)  // security risk
console.log('upi: user@bank')             // UPI handle = PII
console.log(card.number)                  // card data — PCI violation, never store either
console.log(process.env.RAZORPAY_KEY_SECRET)  // secret
```

---

### 9. Cart Store Conventions

```typescript
// Reading cart — always use the hook, never import the store directly in Server Components
// In Client Components:
const { items, addItem, toggleCart, subtotal, itemCount } = useCartStore()

// Adding a catalog item — always provide all required fields
addItem({
  productId: variant.product_id,
  name: product.name,
  price: variant.price ?? product.base_price,  // variant override or product base (paise)
  size: selectedSize,
  color: selectedColor,
  quantity: 1,
  image: primaryImage.url,
})

// Adding a CUSTOM item — design must already be persisted server-side first:
addItem({
  productId: 'custom',
  customDesignId: design.id,   // server-persisted custom_designs.id
  name: design.name ?? 'Custom Tee',
  price: design.price,         // computed server-side, in paise
  size: design.size,
  color: design.base_color_name,
  quantity: 1,
  image: design.preview_front_url,
})

// Uniqueness key:
//   catalog items → productId + size + color
//   custom items  → custom_design_id (each saved design is its own line item)
// Same product + size + color = increment quantity ✓

// Minimum quantity is 1 — never allow 0 in the stepper.
// Use the remove button (×) to delete a line item entirely.
```

---

### 10. Custom Builder Conventions

```typescript
// store/builder.ts — dedicated Zustand store, SEPARATE from the cart.
// Holds base style/color/size + the working layer list across the 6 builder steps.
interface BuilderState {
  baseStyle: 'oversized' | 'regular' | 'hoodie' | 'polo'
  baseColorName: string
  baseColorHex: string
  size: string | null
  layers: DesignLayer[]        // text / image / logo / ai, per side
  // actions: setStyle, setColor, setSize, addLayer, updateLayer, removeLayer, reset
}

// Preview compositing goes through the Studio API — NEVER composite the final
// mockup on the client. The client may show a rough live drag preview, but the
// authoritative front/back/360 mockups come from lib/studio.ts.
import { renderPreview } from '@/lib/studio'
const previews = await renderPreview({ baseStyle, baseColorHex, layers })

// Persist BEFORE add-to-cart: write custom_designs + design_layers server-side,
// store the returned preview_*_url, and only then push the item into the cart.

// AI generation is SERVER-INITIATED ONLY. The client calls our API route, which
// calls the Studio API; the AI provider key is never exposed to the browser.

// Validate uploaded images before upload to the design-uploads bucket:
const ALLOWED = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']
const MAX_BYTES = 8 * 1024 * 1024  // 8MB
if (!ALLOWED.includes(file.type)) return { error: 'Unsupported image type' }
if (file.size > MAX_BYTES) return { error: 'Image must be 8MB or smaller' }
```

---

### 11. Studio API Conventions

```typescript
// lib/studio.ts — client for the FITBOX Studio API (Express on Railway).
// Next.js server → Studio API over HTTPS, authenticated with STUDIO_API_KEY.
// The Studio API owns: AI design generation + server-side mockup/preview compositing
// (front / back / 360). These workloads exceed Vercel serverless limits.

const res = await fetch(`${process.env.STUDIO_API_URL}/preview`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.STUDIO_API_KEY}`,  // server-only secret
  },
  body: JSON.stringify({ baseStyle, baseColorHex, layers }),
  signal: AbortSignal.timeout(20_000),
})

// Graceful fallback: if AI generation or compositing is down or times out, the
// builder must still work via Upload Image / Upload Logo / Choose Template. Surface
// a friendly message ("AI is busy — try a template or upload") rather than blocking
// the whole flow. Never block add-to-cart on AI availability.

// STUDIO_API_KEY and AI_IMAGE_PROVIDER_KEY are server-only — never ship to the client.
```

---

### 12. Animation Conventions

```typescript
// lib/motion.ts — all variants here, imported where needed
export const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
}

export const cartDrawer = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { x: '100%', transition: { duration: 0.25, ease: 'easeIn' } }
}

export const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } }
}

// Signature motions: the Mystery Box unbox reveal and the builder preview
// transitions (front ↔ back ↔ 360) are brand-defining — but they MUST respect
// prefers-reduced-motion. Always gate with useReducedMotion.
'use client'
import { useReducedMotion } from 'framer-motion'
function AnimatedSection({ children }: { children: React.ReactNode }) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={prefersReduced ? { duration: 0 } : undefined}
    >
      {children}
    </motion.div>
  )
}
// When reduced motion is on, the Mystery Box reveal should snap to the final
// state (no spin/scale flourish) and the preview should cross-fade or hard-cut.
```

---

### 13. Image Conventions

```typescript
// Always use next/image — never <img>
import Image from 'next/image'

// Buckets: product-images, design-uploads, ai-designs, design-previews.
// Ratios: 3:4 product (1200×1600), 16:9 lifestyle/drop.

// Product card — fixed aspect ratio, rounded-[12px] container
<div className="aspect-[3/4] overflow-hidden relative rounded-[12px]">
  <Image
    src={product.primaryImage}
    alt={`${product.name} in ${selectedColor}`}  // descriptive alt
    fill
    className="object-cover"
    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
  />
</div>

// Hero / drop lifestyle image — 16:9, always priority
<Image
  src={heroImage}
  alt="FITBOX drop campaign — [specific description]"
  fill
  priority  // LCP image — always priority
  className="object-cover"
/>

// Builder preview — server-composited mockup from the design-previews bucket
<Image
  src={design.preview_front_url}
  alt={`Custom ${design.base_style} tee in ${design.base_color_name}, front`}
  width={600}
  height={800}
  className="object-cover"
/>

// Never skip alt text — axe-core will catch it.
// Alt text must be descriptive, not "image" or "product-1".
// If image is purely decorative: alt=""
```

---

### 14. Error Handling Conventions

```typescript
// Server actions — always return typed result
async function addAddress(formData: FormData): Promise<ActionResult<Address>> {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return { error: 'Not authenticated' }

  const { data, error } = await supabase
    .from('addresses')
    .insert({ user_id: session.user.id, ...parsedData })
    .select().single()

  if (error) return { error: 'Failed to save address. Please try again.' }
  return { data }
}

// Client — handle action results
const result = await addAddress(formData)
if (result.error) {
  toast.error(result.error)
  return
}
toast.success('Address saved')

// API routes — always return structured errors
return Response.json({ error: 'Webhook signature verification failed' }, { status: 400 })

// Never throw raw Supabase / Razorpay / Stripe / Studio API errors to the client.
// Log the full error server-side, return a generic message to the client.
console.error('Supabase error:', error)  // server log
return { error: 'Something went wrong. Please try again.' }  // client message
```

---

### 15. Admin Conventions

```typescript
// Always verify staff role in server components and API routes.
// Middleware checks the route, but verify again inside for defense in depth.
async function AdminProductsPage() {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles').select('role').eq('id', session.user.id).single()
  if (!['admin', 'super_admin'].includes(profile?.role ?? '')) redirect('/')

  // ...admin content
}

// Role changes are SUPER_ADMIN ONLY (the /admin/users page). A plain admin must
// never be able to elevate roles — enforce in the server action AND via RLS.
if (profile?.role !== 'super_admin') return { error: 'Not authorized' }

// ISR revalidation after any admin data change:
import { revalidatePath } from 'next/cache'
revalidatePath('/products/[slug]', 'page')
revalidatePath('/shop/[category]', 'page')
revalidatePath('/collections/[slug]', 'page')
revalidatePath('/', 'page')

// Image upload to Supabase Storage (product-images bucket):
const filePath = `products/${productId}/${colorName.replace(/\s+/g, '-').toLowerCase()}/${position}.webp`
const { error } = await supabase.storage
  .from('product-images')
  .upload(filePath, file, { upsert: true, contentType: 'image/webp' })
const { data: { publicUrl } } = supabase.storage
  .from('product-images')
  .getPublicUrl(filePath)
```

---

### 16. Common Mistakes and How to Avoid Them

| Mistake | Correct approach |
|---------|-----------------|
| Hardcoding `bg-[#FF6B00]` or any hex in a component | Use `bg-[var(--accent)]` / the right token — never `bg-[hex]` |
| `text-gray-600` Tailwind class | Use `text-[var(--text-secondary)]` — never `text-gray-*` |
| Avoiding `bg-white` entirely | `bg-[var(--bg-surface)]` (#FFFFFF) IS allowed for surfaces; page bg is `--bg-primary` (#F8F8F8) |
| `rounded-lg` / `rounded-full` on buttons | Always `rounded-[8px]` on buttons |
| No radius on product image cards | Product image cards DO get `rounded-[12px]` now (modern premium) |
| Infinite scroll on PLP | Load more button only |
| Hiding out-of-stock sizes | Show disabled with `opacity-40 line-through` |
| Float arithmetic on prices (`base_price / 100 * qty`) | Integer arithmetic in paise |
| Trusting client cart/total | Re-fetch variant + custom-design prices from DB and recompute in paise server-side |
| Creating order on checkout redirect | Create order in the Razorpay/Stripe webhook only |
| Logging signatures / UPI handles / card data / secrets / client_secret | Never log these — remove immediately if added; never store card data |
| Compositing the final preview on the client | Use the Studio API (`lib/studio.ts`) for front/back/360 mockups |
| Exposing the AI provider key to the browser | AI generation is server-initiated only |
| `useEffect` for initial data fetch in RSC | Fetch in Server Component directly |
| `any` type | Use `unknown` + type narrowing |
| Showing exact stock count ("12 remaining") | Only show "Low stock" when count < 5 |
| Fake urgency on evergreen catalog items ("Only 3 left!") | Only real limited-drop scarcity (`is_limited_drop` + real `drop_ends_at`) |
| Carousel with auto-advance | Static display or tab-switch only |
| Chat widget visible on mobile | Hide below 768px — covers Add to Cart |

---

### 17. Naming Conventions

| Thing | Convention | Example |
|-------|-----------|---------|
| Components | PascalCase | `ProductCard.tsx`, `UnboxReveal.tsx` |
| Utility functions | camelCase | `formatPrice()`, `slugify()` |
| Constants | SCREAMING_SNAKE | `FREE_SHIPPING_THRESHOLD`, `SIZE_ORDER` |
| Database tables | snake_case | `product_variants`, `custom_designs`, `design_layers` |
| CSS variables | kebab-case | `--bg-primary`, `--accent-hover` |
| Supabase buckets | kebab-case | `product-images`, `design-uploads`, `ai-designs`, `design-previews` |
| Route params | kebab-case | `/collections/anime`, `/mystery-box/streetwear` |
| Environment variables | SCREAMING_SNAKE | `RAZORPAY_WEBHOOK_SECRET`, `STUDIO_API_KEY` |
| TypeScript interfaces | PascalCase | `Product`, `CustomDesign`, `DesignLayer`, `OrderStatus` |
| Zustand stores | camelCase hook | `useCartStore`, `useBuilderStore` |
| SKU | `FB-{CAT}-{COLOR}-{SIZE}` | `FB-OVR-BLK-L`, `FB-HOOD-WHT-XL` |

---

### 18. Performance Checklist

Before shipping any page, verify:

- [ ] All images use `next/image` with explicit `width`/`height` or `fill`
- [ ] Hero / drop image has `priority` prop
- [ ] `sizes` prop on `fill` images describes actual rendered size
- [ ] No `useEffect` fetching data that could be fetched in a Server Component
- [ ] `generateStaticParams` on PDP for all published slugs
- [ ] Cabinet Grotesk loaded via `next/font/local` (self-hosted), Inter via `next/font/google` — never a `<link>` tag
- [ ] No unnecessary Client Components — check `'use client'` is justified (the builder/Mystery Box are justified)
- [ ] Studio API preview calls are debounced and time-bounded — don't block the UI
- [ ] Bundle size: check for large client-side imports (moment.js, lodash)

---

### 19. When to Stop and Ask

Do not proceed autonomously if:

- The database schema needs to change after data exists — ask first
- A Razorpay or Stripe webhook handler needs modification — confirm before changing
- Adding a new third-party library — is it in the approved stack in `02_Architecture.md`?
- An RLS policy change is needed — changing policies can expose data
- A role or permission change is involved (e.g. who can elevate roles, designer access) — confirm
- Anything touching designer payouts (`designer_earnings`) — money owed to people, confirm first
- A non-goal from `01_PRD.md` is being requested — confirm it's intentional scope change
- Any action on live (production) Razorpay or Stripe keys — confirm explicitly
- A feature would require storing payment card data anywhere — this is always wrong, stop immediately
