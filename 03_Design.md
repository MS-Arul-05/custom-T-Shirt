# 03 — Design System
## FITBOX — Custom T-Shirt & Apparel Platform · ecomm_platform_01

---

### 1. Design Philosophy

FITBOX is **Modern Premium Streetwear**. The product and the custom-design preview do all the persuasion work — the UI stays Apple-clean, gets out of the way, and lets bold imagery breathe. Product presentation borrows Nike's confident, full-bleed energy; the catalog reads like H&M — calm grids, generous whitespace, fast scanning. The brand voice is bold, youthful, and energetic, and hype is allowed for drops.

Three principles:

1. **The product is the hero — except in the builder.** On Home, Shop and PDP, photography and design previews carry the page. In the Custom T-Shirt Builder, the *live preview canvas* becomes the hero interaction — every other control supports it.
2. **Energetic, not noisy.** Orange (`--accent` `#FF6B00`) is a precision instrument: CTAs, badges, selected states, drop countdowns. White surfaces, a near-black ink, and one charged accent. Never rainbow, never decorative gradients.
3. **Real hype, honest scarcity.** Limited-edition drops get genuine countdowns, sold-out states and "Dropping Friday 6PM" energy. Evergreen catalog items never get fake urgency or "only 1 left" lies.

Every decision still reduces friction toward "Add to Cart," "Customize," or "Open the Box."

---

### 2. CSS Custom Properties (globals.css)

Define all tokens here. Never hardcode values in components.

```css
:root {
  /* Backgrounds */
  --bg-primary: #F8F8F8;            /* main page background */
  --bg-surface: #FFFFFF;            /* cards, panels, elevated sections */
  --bg-dark: #1A1A1A;              /* dark hero blocks, footer, drop sections */
  --bg-overlay: rgba(0, 0, 0, 0.55); /* drawer/modal backdrop */

  /* Borders */
  --border: rgba(26, 26, 26, 0.08);
  --border-focus: rgba(26, 26, 26, 0.24);

  /* Text */
  --text-primary: #1A1A1A;
  --text-secondary: #6B6B6B;
  --text-tertiary: rgba(26, 26, 26, 0.35);
  --text-on-dark: #FFFFFF;         /* text on dark / accent surfaces */

  /* Accent — FITBOX orange */
  --accent: #FF6B00;
  --accent-hover: #E55F00;
  --accent-light: #FFF0E6;         /* badge bg, selected-state fill */

  /* Status */
  --success: #00C853;
  --success-light: #E6F9ED;
  --error: #E53935;
  --error-light: #FDECEA;
  --warning: #F5A623;
  --warning-light: #FEF3E0;

  /* Spacing scale (8pt base) */
  --space-1: 4px;  --space-2: 8px;  --space-3: 12px; --space-4: 16px;
  --space-5: 20px; --space-6: 24px; --space-8: 32px; --space-10: 40px;
  --space-12: 48px; --space-16: 64px; --space-24: 96px;

  /* Border radius (modern premium — softer than the old sharp brand) */
  --radius-btn: 8px;
  --radius-card: 12px;      /* product image cards DO get rounding now */
  --radius-input: 8px;
  --radius-badge: 4px;
  --radius-modal: 16px;
  --radius-pill: 999px;     /* category pills, filter chips, color dots */

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 300ms ease-out;
}
```

---

### 3. Typography

**Display/Headings:** **Cabinet Grotesk** — from **Fontshare** (NOT Google Fonts). Self-host and load via `next/font/local` (weights 600, 700). Place the `.woff2` files in `/public/fonts` (or `/app/fonts`) and reference them through a local font loader.

**Body/UI:** **Inter** — load via `next/font/google` (weights 400, 500, 600).

```ts
// Cabinet Grotesk — Fontshare, self-hosted, NOT Google
import localFont from 'next/font/local';
export const cabinet = localFont({
  src: [
    { path: './fonts/CabinetGrotesk-Medium.woff2', weight: '600', style: 'normal' },
    { path: './fonts/CabinetGrotesk-Bold.woff2',   weight: '700', style: 'normal' },
  ],
  variable: '--font-display',
});

// Inter — Google Fonts
import { Inter } from 'next/font/google';
export const inter = Inter({ subsets: ['latin'], weight: ['400','500','600'], variable: '--font-body' });
```

| Role | Size | Weight | Font | Tracking | Line height | Usage |
|------|------|--------|------|----------|-------------|-------|
| Display | `clamp(40px, 6vw, 84px)` | 700 | Cabinet Grotesk | `-0.02em` | 1.05 | Hero / drop headlines |
| H1 | `clamp(28px, 4vw, 52px)` | 700 | Cabinet Grotesk | `-0.02em` | 1.1 | Page titles |
| H2 | `clamp(22px, 3vw, 38px)` | 600 | Cabinet Grotesk | `-0.01em` | 1.15 | Section headings |
| H3 | `18px` | 600 | Cabinet Grotesk | `0` | 1.3 | Product names, card titles |
| Body | `16px` | 400 | Inter | `0` | 1.6 | Descriptions, body copy |
| Small | `14px` | 400 | Inter | `0` | 1.5 | Metadata, secondary info |
| Label | `11px` | 600 | Inter | `0.06em` | 1.4 | Badges, labels (uppercase) |

Max line length: 64 characters for body. Headings: unrestricted. Display/drop headlines may be set in uppercase for streetwear energy.

---

### 4. Spacing System

Base unit: 8pt. All spacing is a multiple of 4px.

- **Section vertical padding:** `96px` desktop / `64px` mobile
- **Product grid gap:** `24px` desktop / `16px` mobile
- **Card internal padding:** `16px` (images bleed to edge inside the rounded card — no padding on image wrapper)
- **Cart drawer width:** `420px`
- **Max content width:** `1360px` with `24px` gutters
- **Nav height:** `64px` desktop / `56px` mobile

---

### 5. Component Specifications

#### 5.1 Navigation

```
Height: 64px desktop / 56px mobile
Background: var(--bg-surface)
Border-bottom: 1px solid var(--border)
Position: sticky top-0, z-index 50

Desktop layout:
  [FITBOX]    [Shop  Collections  Customize  Mystery Box  Drops]    [🔍  👤  ♡  🛍️ (n)]

Mobile layout:
  [☰ Hamburger]    [FITBOX]    [🔍  🛍️ (n)]

Logo wordmark: "FITBOX" — Cabinet Grotesk 18px weight 700, var(--text-primary),
               uppercase, letter-spacing -0.01em
Nav links: Inter 14px weight 500, color var(--text-secondary)
           hover: var(--text-primary), transition 150ms
           active route: var(--text-primary) + 2px orange underline (var(--accent))
Icons: Lucide Search / User / Heart (wishlist) / ShoppingBag — size=20 strokeWidth=1.5
       color var(--text-primary), hover var(--accent)
Cart count badge: 16px circle, bg var(--accent), text var(--text-on-dark),
                  10px font weight-600, absolute -top-1 -right-1
"Drops" link: optional orange dot when a live drop is active
```

#### 5.2 Button System

```
Primary (Add to Cart, Customize, Checkout, Open Box):
  bg: var(--accent)
  hover: var(--accent-hover)
  text: var(--text-on-dark) (white — verified ≥3:1 UI contrast on orange)
  radius: var(--radius-btn) = 8px
  height: 44px desktop / 48px mobile (larger tap target on mobile)
  padding: 0 24px
  font: Inter 14px weight 600
  transition: background-color var(--transition-fast)
  disabled: opacity 0.4, cursor not-allowed

Ghost / Secondary:
  bg: transparent
  border: 1px solid var(--border-focus)
  text: var(--text-primary)
  hover border: var(--text-primary)
  same radius (8px), height, font as primary

Destructive (remove address, cancel order):
  bg: var(--error)
  hover: darker shade of var(--error)
  text: var(--text-on-dark)

Text link:
  no border, no bg
  text: var(--accent)
  hover: var(--accent-hover)
  underline on hover

Note: never put var(--text-primary) (dark ink) on an orange button unless it passes
3:1 — white text on orange is the default and is the verified pattern.
```

#### 5.3 Product Card

```
Container: cursor-pointer, group

  Image card:
    aspect-ratio: 3 / 4
    overflow: hidden
    border-radius: var(--radius-card) = 12px   /* modern premium — rounding now allowed */
    background: var(--bg-surface)
    position: relative

    Primary image: object-cover w-full h-full
    Secondary image: position absolute inset-0, opacity 0
                     group-hover: opacity 1, transition opacity 200ms ease

    Badge (if present): position absolute top-3 left-3  (see 5.9 Badge variants)
                        new / bestseller / drop / restock

    Wishlist heart: position absolute top-3 right-3
                    Lucide Heart size=18, bg rgba(255,255,255,0.9) 28px circle
                    var(--text-primary), active = filled var(--accent)

    Quick-add button: position absolute bottom-2 left-2 right-2
                      height 40px, radius var(--radius-btn)
                      bg rgba(255,255,255,0.92) backdrop-blur-sm
                      font 13px weight-600 var(--text-primary)
                      opacity 0 translateY(8px), group-hover: opacity 1 translateY(0)
                      transition: opacity 200ms, transform 200ms
                      (opens size picker; for drops/sold-out shows state, not add)

  Product info (below image):
    padding-top: 12px
    Name: Cabinet Grotesk 18px weight-600 var(--text-primary) (H3)
    Price: Inter 14px var(--text-primary), margin-top 4px
    Sale price: 14px var(--accent), strikethrough original in var(--text-tertiary)

    Color swatches: flex gap-6px margin-top 8px
      Each swatch: 14px × 14px circle, radius var(--radius-pill)
                   border: 1px solid rgba(0,0,0,0.12)
                   cursor pointer, title = color name
                   selected: ring-2 ring-offset-2 ring-[var(--accent)]
```

#### 5.4 Size Selector

```
Container: grid grid-cols-4 gap-2  (apparel sizes — never shoe sizes)
Sizes: XS, S, M, L, XL, XXL, XXXL

Each size button:
  height: 40px
  border: 1px solid var(--border-focus)
  radius: var(--radius-btn) = 8px
  font: Inter 13px weight-600 var(--text-primary)
  bg: transparent
  transition: var(--transition-fast)

  Selected state:
    border-color: var(--accent)
    bg: var(--accent-light)
    color: var(--accent)

  Out-of-stock state:
    opacity: 0.4
    cursor: not-allowed
    text-decoration: line-through
    — NEVER hide — always show, never clickable

  Hover (in-stock, not selected):
    border-color: var(--text-primary)

Size chart link: "Size guide (chest/length, cm)" — text link, opens modal (no shoe sizing)
```

#### 5.5 Color Selector

```
Container: flex flex-wrap gap-3
Base colors: White #FFFFFF, Black #1A1A1A, Beige #E8DCC4,
             Blue #1E3A8A, Green #166534, Red #DC2626 (+ per-product extras)

Each color option:
  outer ring wrapper: 24px × 24px, padding 2px, border-radius var(--radius-pill)
                      border 2px solid transparent
                      selected: border-color var(--accent)

  inner swatch: 18px × 18px circle
                bg: color_hex value
                border: 1px solid rgba(0,0,0,0.12)
                (White swatch keeps the border so it reads on white surface)

Color name label: shown below swatches, Inter 13px var(--text-secondary)
                  updates to selected color name on hover/select
```

#### 5.6 Cart Drawer

```
Backdrop: fixed inset-0 bg-[var(--bg-overlay)] z-40
          click to close, fade in/out 200ms

Drawer: fixed right-0 top-0 h-screen w-[420px] z-50
        bg: var(--bg-surface)
        border-left: 1px solid var(--border)
        Framer Motion: x: 100% → 0, duration 300ms ease-out

Header:
  height: 64px
  border-bottom: 1px solid var(--border)
  "Cart (n)" — Cabinet Grotesk 16px weight-600
  X close: Lucide X, size=20, right-aligned

Line items: scrollable flex-col gap-4, padding 24px
  Each item:
    flex row gap-3
    Image: 72px × 96px (3:4), object-cover, radius var(--radius-card)=12px, border var(--border)
    Info column:
      Name: Inter 14px weight-600
      Variant: 13px var(--text-secondary) "Jet Black / L"
               (custom items show "Custom · Oversized / Black"; mystery boxes "Gold Box · Anime")
      Price: 14px weight-600 — formatPrice(paise) → "₹1,299"
    Quantity stepper: flex row, − button, count, + button
                      buttons: 28px × 28px, border var(--border), radius var(--radius-btn)
                      (custom & mystery-box items: qty fixed/locked where applicable)
    Remove: Lucide X, size=14, var(--text-tertiary), hover var(--text-primary)

Free-shipping progress (below line items):
  Label: "Add ₹{remaining} for FREE shipping"   (threshold ₹1499 = 149900 paise)
         13px var(--text-secondary)
  Progress bar: height 4px, radius var(--radius-pill)
                bg: var(--accent-light)
                fill: var(--accent), width = min(subtotal / 149900, 1) * 100%
  Reached: "You've unlocked FREE shipping 🎉" in var(--success)

Footer (sticky to bottom):
  border-top: 1px solid var(--border)
  padding: 24px
  Subtotal row: "Subtotal" 14px + price 16px weight-600, space-between (formatPrice)
  Checkout button: full-width primary button, height 48px
  "Taxes calculated at checkout · Custom & Mystery Box items are non-returnable"
    — 12px var(--text-tertiary) centered
```

#### 5.7 Image Gallery (PDP)

```
Desktop: left column (sticky, 55% width)
  Main image: aspect-ratio 3/4, object-cover, radius var(--radius-card)=12px
              click to zoom (modal, radius var(--radius-modal))
  Thumbnail strip: flex column, gap 8px, 4–6 thumbnails
    Each: 72px × 96px, radius var(--radius-btn), border 1px var(--border)
    Selected: border-color var(--accent)
  Color-filtered: gallery swaps to the active color's tagged images

Mobile: horizontal scroll strip of images, snap scrolling, images radius 12px
        dots indicator below (active dot = var(--accent))
```

#### 5.8 Form Inputs

```
All inputs:
  height: 44px
  border: 1px solid var(--border-focus)
  radius: var(--radius-input) = 8px
  bg: var(--bg-surface) (white)
  font: Inter 15px var(--text-primary)
  padding: 0 14px

  Focus: outline 2px solid var(--accent), outline-offset 2px, border transparent
  Error: border-color var(--error)
  Placeholder: var(--text-tertiary)

Label: Inter 13px weight-500 var(--text-primary), margin-bottom 6px
Error message: 12px var(--error), margin-top 4px, flex with icon
```

#### 5.9 Badge

```
Sizes:
  Default: 11px font-600 uppercase tracking-[0.06em], padding 3px 8px, radius var(--radius-badge)
  Large: 13px font-600, padding 4px 10px

Variants (DB: badge in 'new','bestseller','drop','restock'):
  New:        bg var(--accent-light), text var(--accent)
  Bestseller: bg var(--bg-dark),      text var(--text-on-dark)
  Drop:       bg var(--accent),       text var(--text-on-dark) (paired with countdown, 5.13)
  Restock:    bg var(--success-light), text var(--success)
  Neutral:    bg var(--bg-primary),   text var(--text-secondary)
```

#### 5.10 Admin Table

```
Table: w-full, border-collapse
  Header row: bg var(--bg-primary), 11px uppercase tracking-[0.06em] var(--text-tertiary), padding 12px 16px
  Body rows: bg var(--bg-surface), border-bottom 1px var(--border), padding 16px, 14px var(--text-primary)
  Hover: bg rgba(26,26,26,0.02)
  Status pills: radius var(--radius-pill) — pending/printing/shipped/delivered (warning/accent/success palette)
  Actions column: Lucide icons, size=16, var(--text-secondary), hover var(--accent)
```

#### 5.11 Custom Builder — Canvas & Stepper (USP, hero interaction)

```
Layout (desktop): two-pane
  LEFT  (~58%): live preview canvas — the hero
  RIGHT (~42%): step panel (scrollable controls for the active step)
Layout (mobile): stacked — sticky preview canvas on top, controls below

Stepper (6 steps): horizontal on desktop, compact dots on mobile
  Steps: 1 Style → 2 Color → 3 Design → 4 Text → 5 Preview → 6 Add to Cart
  Active step: var(--accent) fill + var(--text-on-dark) numeral
  Completed: var(--success) check
  Upcoming: var(--border-focus) outline, var(--text-secondary)
  Connector line fills var(--accent) as you progress

Preview canvas:
  bg: var(--bg-surface), radius var(--radius-card)=12px, inner shadow subtle
  Garment mockup renders selected style + color; layers composited on top
  View toggle (pill segmented control, var(--radius-pill)):
    [ Front ] [ Back ] [ 360° ]   — active segment bg var(--accent), text white
  360° = drag-to-rotate (server-composited frames from Studio API)

Step panels:
  Step 1 Style: card grid — Oversized / Regular / Hoodie / Polo
                selected card: border var(--accent), bg var(--accent-light)
  Step 2 Color: Color Selector (5.5) — White/Black/Beige/Blue/Green/Red
  Step 3 Design: tabs — Upload Image · Upload Logo · AI Generate · Choose Template
       AI panel: prompt textarea + style chips (Anime/Typography/Streetwear/Minimal),
                 "Generate" primary button → loading shimmer → result grid (pick to place)
       Template grid: 2-col (mobile) / 3-col thumbnails, radius var(--radius-card)
  Step 4 Text: text input, font select (Radix Select), text-color swatches,
               alignment segmented control (left/center/right)
  Step 5 Preview: full Front/Back/360 review + summary (style, color, size, price)
  Step 6 Add to Cart: size selector (5.4) + computed price (formatPrice) + primary button

Layer controls (overlay on selected layer in canvas):
  Bounding box with handles:
    - drag body = move (pos_x / pos_y)
    - corner handles = scale
    - top rotate handle = rotate (rotation)
  Toolbar (floating near layer): bring-forward / send-back (z_index), duplicate, delete
  All controls keyboard-accessible: arrow keys nudge, +/- scale, [ ] rotate,
    Tab cycles layers, Delete removes — focus ring var(--accent)

State: custom design persisted server-side (custom_designs + design_layers);
       previews → design-previews bucket (front/back/360 .webp)
```

#### 5.12 Mystery Box

```
Flow: 01 Pick category → 02 Select tier → 03 Unbox (reveal) → 04 "Wear the fit"

Category picker (step 01):
  card grid — Anime / Streetwear / Gym / Creator
  each card: image, label (Cabinet Grotesk 18px), radius var(--radius-card)
  selected: border var(--accent)

Tier cards (step 02): Bronze / Silver / Gold (3-up grid)
  Card: radius var(--radius-card)=12px, bg var(--bg-surface), border var(--border)
  Tier accent strip at top:
    Bronze #B87333 · Silver #B8B8B8 · Gold #FFC83D
  Content: tier name (Cabinet Grotesk), item_count "Reveals N pieces",
           price formatPrice(paise), perks list
  Gold = "Most Hyped" → orange Badge (5.9 Drop variant)
  CTA: primary "Open the Box" button
  Copy: "Mystery Box items are non-returnable" — 12px var(--text-tertiary)

Unbox reveal (step 03) — SIGNATURE MOTION (gated by useReducedMotion):
  Sealed box (bg var(--bg-dark)) centered, subtle idle float
  Tap "Unbox" → lid lifts + glow burst in var(--accent) → revealed item(s) scale 0.9→1
  Sequence ≤ ~900ms total; ease-out; NO bounce/elastic
  Reduced-motion fallback: instant cross-fade to revealed items (duration 0), no shake/glow
  Confetti optional, var(--accent)/var(--success), single burst (no loop)

"Wear the fit" (step 04):
  Character/avatar preview wearing the revealed outfit; Front/Back toggle (pill segmented)
  Actions: "Add to cart", "Save to wishlist"
```

#### 5.13 Review / Rating

```
Star rating display:
  5 Lucide Star icons, size=16, filled var(--accent), empty var(--border-focus)
  Average shown numerically (e.g. "4.6") + count "(128 reviews)" 13px var(--text-secondary)
  Half-star via clip when needed
  "Verified Purchase" tag: 11px Badge, var(--success-light)/var(--success)

Write-review form:
  Interactive star input: hover preview fills to hovered star, click sets rating
    (rating 1–5; keyboard: arrow keys + Enter; aria-label per star)
  Title input (5.8), body textarea (min-height 96px, radius var(--radius-input))
  Submit: primary button (disabled until rating set)
  One review per product per user (DB unique product_id+user_id)
```

#### 5.14 Drop Card / Countdown

```
Drop card:
  Used for is_limited_drop products only — legitimate scarcity, never on evergreen items
  Card on var(--bg-dark) section: image (radius 12px) + "Drop" Badge (5.9)
  Headline: Cabinet Grotesk, uppercase ("DROPPING FRIDAY 6PM")
  text-on-dark color throughout

Countdown (real drops only — never fake/evergreen):
  Renders only when drop_starts_at (upcoming) or drop_ends_at (live) is set
  Format: [ DD ] [ HH ] [ MM ] [ SS ] — segmented blocks
    block bg var(--bg-surface) on dark, or var(--accent-light) for emphasis
    numerals Cabinet Grotesk weight-700, labels 11px uppercase var(--text-secondary)
  Ticks once per second; on expiry → swaps to "LIVE NOW" (var(--accent)) or "SOLD OUT" (disabled)
  Sold-out: card desaturated, "SOLD OUT" badge, CTA disabled (opacity 0.4)
  No countdowns on regular catalog items — DB drop_starts_at/ends_at null = no timer
```

---

### 6. Motion Rules

**Allowed animations:**
- Cart drawer slide: `x: 100% → 0`, `300ms ease-out`
- Cart backdrop fade: `opacity: 0 → 0.55`, `200ms ease`
- Product card image swap: `opacity` transition `200ms ease`
- Quick-add button reveal: `opacity 0 → 1`, `translateY(8px → 0)`, `200ms ease`
- Page section fade-in on scroll: `opacity 0 → 1`, `y: 16px → 0`, `400ms ease-out`
- Toast notification: slide in from bottom-right, `300ms ease-out`
- Modal open: scale `0.97 → 1`, opacity `0 → 1`, `200ms ease`
- **Signature: Mystery Box unboxing reveal** — lid-lift + glow burst + item scale-in, ≤ ~900ms ease-out (5.12)
- **Signature: Builder preview transitions** — Front/Back/360 view swaps and layer placement, ≤ 300ms ease-out (5.11)
- **Real limited-drop countdowns** — once-per-second tick on genuine drops only (5.14)

**Forbidden:**
- Parallax scrolling
- Autoplay video on any page
- Hero image carousel / auto-advance
- Bounce or elastic easing (including in the unboxing reveal)
- Continuous loops (spinners only for loading states, not decoration)
- Any animation above 500ms unless user-triggered (the unboxing & countdowns are user-triggered/event-driven and exempt)
- Fake countdowns or fabricated urgency on evergreen items

**Always:** Gate all Framer Motion with `const prefersReduced = useReducedMotion()` — if true, set `duration: 0`. The Mystery Box unboxing and builder previews MUST provide an instant, non-animated fallback when reduced motion is requested.

---

### 7. Responsive Breakpoints

| Breakpoint | Token | Min-width |
|------------|-------|-----------|
| Mobile | default | 0 |
| sm | `sm:` | 640px |
| md | `md:` | 768px |
| lg | `lg:` | 1024px |
| xl | `xl:` | 1280px |
| 2xl | `2xl:` | 1360px |

**Product grid columns:**
- Mobile: 2 columns (always — never 1)
- md: 3 columns (category pages)
- lg: 4 columns (category pages), 3 columns (related products)

**Custom Builder:**
- Desktop: two-pane (preview canvas + step panel)
- Below `1024px`: stacked — sticky preview on top, controls below

**Cart drawer:**
- Desktop: `420px` fixed width
- Mobile: full width (`100vw`), slides from bottom on screens below `640px`

---

### 8. Accessibility Standards

- WCAG AA minimum — 4.5:1 for normal text, 3:1 for large text and UI elements
- **Orange contrast:** `#FF6B00` on `#FFFFFF` ≈ 2.9:1 — therefore NEVER use orange for normal-size body text on white. Use it for: large text (≥24px / ≥19px bold), UI/graphic elements (badges, borders, focus rings, progress fills), and as a *button background* with **white** text (white-on-orange ≈ 3.5:1, passes 3:1 UI). Default button text is `var(--text-on-dark)` (white); never dark ink on orange unless re-verified.
- Focus rings: `outline: 2px solid var(--accent); outline-offset: 2px` on all interactive elements
- All product images: descriptive `alt` text (not "product-image-1")
- Size selector: `aria-pressed` for selected, `aria-disabled` for out-of-stock (always present, never hidden)
- Color swatches: `aria-label={color.name}` — color alone cannot convey selection
- Cart drawer: `role="dialog"`, `aria-label="Shopping cart"`, focus trap when open
- Price: always include currency label accessible to screen readers
- Form errors: `aria-describedby` linking input to error message
- **Custom Builder:** all canvas/layer controls keyboard-operable — Tab cycles layers, arrows nudge/scale/rotate, Delete removes; every control has an accessible name; focus visible
- **Mystery Box unboxing:** must have a `prefers-reduced-motion` fallback (instant reveal, no glow/shake); reveal result is announced to screen readers
- **Countdowns:** use `aria-live="off"` for the per-second tick (avoid SR spam); announce milestone changes ("Live now", "Sold out") politely

---

### 9. Anti-Patterns (Do Not Do)

- **Allowed now:** pure white surfaces — `var(--bg-surface)` `#FFFFFF` for cards/panels/inputs is correct. Page bg is `var(--bg-primary)` `#F8F8F8`.
- **Allowed now:** `12px` border-radius on product image cards — modern premium (`--radius-card`). Do NOT set product images back to 0.
- **Allowed now:** legitimate limited-drop scarcity — real countdowns, "Dropping Friday 6PM", genuine sold-out states (only when `is_limited_drop` + real `drop_*` timestamps).
- `text-gray-*` Tailwind classes for brand text — use CSS variables
- **Fake urgency on evergreen items:** "Only 3 left!", "Sale ends in 2 hours!" on regular catalog stock — banned. Deceptive "only 1 left" stock lies — banned.
- Exact stock-count display ("12 remaining") — only show "Low stock" when count < 5, never the exact number (except real drop sold-out states)
- Pop-ups on first page load (newsletter capture is an inline section, not a modal)
- Chat widget visible on mobile — it covers the Add to Cart / Customize CTA
- Carousel auto-advance on hero or product sections
- Parallax and bounce/elastic easing anywhere — including the unboxing reveal
- Floating-point prices — store and compute prices as **integer paise** (₹1 = 100 paise); render via `formatPrice`
- Dark ink on an orange button, or orange body text on white — fails contrast (see §8)
- No shoe/footwear sizing or references — apparel sizes XS–XXXL only
```