import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Size Guide | FITBOX',
  description: 'Chest and length measurements (cm) for FITBOX tees and hoodies, XS to XXXL.',
}

type Row = { size: string; chest: string; length: string }

const TEES: Row[] = [
  { size: 'XS', chest: '96', length: '66' },
  { size: 'S', chest: '102', length: '69' },
  { size: 'M', chest: '108', length: '72' },
  { size: 'L', chest: '114', length: '74' },
  { size: 'XL', chest: '120', length: '76' },
  { size: 'XXL', chest: '126', length: '78' },
  { size: 'XXXL', chest: '132', length: '80' },
]

const HOODIES: Row[] = [
  { size: 'XS', chest: '104', length: '66' },
  { size: 'S', chest: '110', length: '68' },
  { size: 'M', chest: '116', length: '71' },
  { size: 'L', chest: '122', length: '73' },
  { size: 'XL', chest: '128', length: '75' },
  { size: 'XXL', chest: '134', length: '77' },
  { size: 'XXXL', chest: '140', length: '79' },
]

function SizeTable({ title, rows }: { title: string; rows: Row[] }) {
  return (
    <section style={{ marginBottom: '48px' }}>
      <h2 className="font-heading" style={{ fontSize: '22px', fontWeight: 700, marginBottom: '16px' }}>
        {title}
      </h2>
      <div style={{ overflowX: 'auto', border: '1px solid var(--border)', borderRadius: '12px', background: 'var(--bg-surface)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '420px' }}>
          <thead>
            <tr style={{ background: 'var(--bg-dark)', color: '#fff' }}>
              <th style={{ textAlign: 'left', padding: '12px 18px', fontSize: '13px', fontWeight: 700 }}>Size</th>
              <th style={{ textAlign: 'left', padding: '12px 18px', fontSize: '13px', fontWeight: 700 }}>Chest (cm)</th>
              <th style={{ textAlign: 'left', padding: '12px 18px', fontSize: '13px', fontWeight: 700 }}>Length (cm)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.size} style={{ borderTop: i === 0 ? 'none' : '1px solid var(--border)' }}>
                <td style={{ padding: '12px 18px', fontSize: '14px', fontWeight: 600 }}>{r.size}</td>
                <td style={{ padding: '12px 18px', fontSize: '14px', color: 'var(--text-secondary)' }}>{r.chest}</td>
                <td style={{ padding: '12px 18px', fontSize: '14px', color: 'var(--text-secondary)' }}>{r.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default function SizeGuidePage() {
  return (
    <main style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      <div
        style={{
          background: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border)',
          padding: '64px 24px 48px',
          textAlign: 'center',
        }}
      >
        <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px' }}>
          Get the fit right
        </p>
        <h1 className="font-heading" style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
          Size Guide
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', maxWidth: '520px', margin: '16px auto 0' }}>
          Measurements are flat garment dimensions in centimetres. Allow ±2 cm for natural variation.
        </p>
      </div>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '56px 24px 96px' }}>
        <SizeTable title="T-Shirts" rows={TEES} />
        <SizeTable title="Hoodies" rows={HOODIES} />

        <section style={{ background: 'var(--accent-light)', borderRadius: '12px', padding: '24px' }}>
          <h2 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '10px' }}>How to measure</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '14px' }}>
            Lay a tee you already love flat and measure pit-to-pit (then double it for chest) and top-of-shoulder to
            hem for length. Match those numbers to the table above. Our oversized fits run roomy — size down for a
            regular fit, or stay true to size for the drop look.
          </p>
        </section>
      </div>
    </main>
  )
}
