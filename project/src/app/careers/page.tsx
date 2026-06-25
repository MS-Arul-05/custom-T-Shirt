import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Careers | FITBOX',
  description: 'Join FITBOX — help build India’s custom streetwear platform. See our open roles.',
}

type Role = { title: string; team: string; location: string; type: string }

const ROLES: Role[] = [
  { title: 'Senior Frontend Engineer', team: 'Engineering', location: 'Bengaluru / Remote', type: 'Full-time' },
  { title: 'Print Production Lead', team: 'Operations', location: 'Bengaluru', type: 'Full-time' },
  { title: 'Social & Community Manager', team: 'Marketing', location: 'Remote (India)', type: 'Full-time' },
  { title: 'Apparel Graphic Designer', team: 'Design', location: 'Bengaluru / Remote', type: 'Contract' },
]

export default function CareersPage() {
  return (
    <main style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--bg-dark)', color: '#fff', padding: '72px 24px 56px', textAlign: 'center' }}>
        <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px' }}>
          Join the crew
        </p>
        <h1 className="font-heading" style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.05 }}>
          Build FITBOX with us
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '15px', maxWidth: '560px', margin: '16px auto 0', lineHeight: 1.65 }}>
          We&apos;re a small Bengaluru team making custom apparel, drops and mystery boxes for the bold. If that
          sounds like your thing, come build with us.
        </p>
      </div>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '56px 24px 96px' }}>
        <h2 className="font-heading" style={{ fontSize: '22px', fontWeight: 700, marginBottom: '20px' }}>
          Open roles
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {ROLES.map((role) => (
            <div
              key={role.title}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '20px 22px',
              }}
            >
              <div>
                <p style={{ fontSize: '16px', fontWeight: 700 }}>{role.title}</p>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '3px' }}>
                  {role.team} · {role.location} · {role.type}
                </p>
              </div>
              <a
                href="mailto:careers@fitbox.in"
                className="inline-flex items-center justify-center text-white rounded-[8px] h-10 px-5 text-sm font-semibold transition-colors"
                style={{ background: 'var(--accent)' }}
              >
                Apply
              </a>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '40px', background: 'var(--accent-light)', borderRadius: '12px', padding: '24px' }}>
          <h2 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '8px' }}>Don&apos;t see your role?</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.7 }}>
            We&apos;re always keen to meet talented people. Send your portfolio or CV to{' '}
            <a href="mailto:careers@fitbox.in" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
              careers@fitbox.in
            </a>{' '}
            and tell us how you&apos;d make FITBOX better.
          </p>
        </div>
      </div>
    </main>
  )
}
