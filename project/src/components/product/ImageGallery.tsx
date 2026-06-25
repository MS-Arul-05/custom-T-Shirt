'use client'
import { useState } from 'react'
import Image from 'next/image'

interface Props {
  images: string[]
  alt: string
}

export default function ImageGallery({ images, alt }: Readonly<Props>) {
  const [active, setActive] = useState(0)
  const PLACEHOLDER = '/products/placeholder.svg'
  const list = images.length > 0 ? images : [PLACEHOLDER]

  return (
    <div className="flex gap-3">
      {/* Desktop sticky thumbnails */}
      <div className="hidden sm:flex flex-col gap-2 w-[72px] flex-shrink-0 self-start sticky top-24">
        {list.map((img, i) => (
          <button
            key={img + i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1}`}
            aria-pressed={active === i}
            className="relative w-[72px] aspect-[3/4] overflow-hidden rounded-[8px] transition-all"
            style={{
              outline: active === i ? '2px solid var(--accent)' : '2px solid transparent',
              outlineOffset: '1px',
            }}
          >
            <Image src={img} alt={`${alt} thumbnail ${i + 1}`} fill className="object-contain p-1" sizes="72px" />
          </button>
        ))}
      </div>

      {/* Main image — desktop */}
      <div
        className="hidden sm:block flex-1 relative aspect-[3/4] overflow-hidden rounded-[12px]"
        style={{ background: 'var(--bg-surface)' }}
      >
        <Image
          src={list[active]}
          alt={alt}
          fill
          priority
          className="object-contain p-4"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {/* Mobile: horizontal snap-scroll + dots */}
      <div className="sm:hidden w-full">
        <div
          className="flex overflow-x-auto snap-x snap-mandatory gap-2 rounded-[12px]"
          style={{ scrollbarWidth: 'none' }}
          onScroll={(e) => {
            const el = e.currentTarget
            const idx = Math.round(el.scrollLeft / el.clientWidth)
            if (idx !== active) setActive(idx)
          }}
        >
          {list.map((img, i) => (
            <div
              key={img + i}
              className="relative flex-shrink-0 w-full aspect-[3/4] snap-center overflow-hidden rounded-[12px]"
              style={{ background: 'var(--bg-surface)' }}
            >
              <Image src={img} alt={`${alt} ${i + 1}`} fill className="object-contain p-4" sizes="100vw" priority={i === 0} />
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-1.5 mt-3">
          {list.map((img, i) => (
            <span
              key={img + i}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: active === i ? 18 : 6,
                background: active === i ? 'var(--accent)' : 'var(--border)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
