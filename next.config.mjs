/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static/SSG app. On Vercel we use the native Next.js build (no `output: 'export'`)
  // so Vercel auto-detects and serves it with zero config. To produce a portable static
  // `out/` for other hosts, build with STATIC_EXPORT=1 (e.g. `STATIC_EXPORT=1 next build`).
  ...(process.env.STATIC_EXPORT ? { output: 'export' } : {}),
  images: {
    unoptimized: true,
  },
}

export default nextConfig
