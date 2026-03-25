'use client'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'

// TODO: Replace bioText with your own words — recruiters read this section to decide
// whether to reach out. Keep it honest and specific (100–150 words works well).
// Include: what you do, what you care about, what you're looking for.
const bioText =
  "Replace this with your own bio. Write about what you build, what drives you, and what kind of work you're looking for. This should be in your own voice — not a job description."

// TODO: Fill in your details below
const details = [
  { label: 'Role', value: 'Creative Developer' },
  { label: 'Based', value: '[Location]' },
  { label: 'Available', value: '[Yes / No — timeframe]' },
]

export function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section || typeof window === 'undefined') return
    if (window.matchMedia('(hover: none)').matches) return

    const words = section.querySelectorAll('.about-word')

    const handleMouseMove = (e: MouseEvent) => {
      words.forEach((word) => {
        const rect = (word as HTMLElement).getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = e.clientX - cx
        const dy = e.clientY - cy
        const dist = Math.sqrt(dx * dx + dy * dy)
        const maxDist = 150
        if (dist < maxDist) {
          const force = (1 - dist / maxDist) * 8
          gsap.to(word, {
            x: (dx / dist) * force,
            y: (dy / dist) * force,
            rotation: (dx / dist) * force * 0.5,
            duration: 0.3,
            ease: 'power2.out',
          })
        } else {
          gsap.to(word, { x: 0, y: 0, rotation: 0, duration: 0.5, ease: 'power2.out' })
        }
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ padding: 'var(--space-section) var(--space-md)' }}
      aria-label="About"
    >
      <h2
        style={{
          fontSize: 'var(--text-h2)',
          fontWeight: 700,
          marginBottom: 'var(--space-md)',
          letterSpacing: '-0.02em',
        }}
      >
        About
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)',
          gap: 'var(--space-lg)',
          maxWidth: '960px',
          alignItems: 'start',
        }}
        className="about-grid"
      >
        <p style={{ fontSize: 'var(--text-body)', lineHeight: 1.6 }}>
          {bioText.split(' ').map((word, i) => (
            <span
              key={i}
              className="about-word"
              style={{ display: 'inline-block', marginRight: '0.3em' }}
            >
              {word}
            </span>
          ))}
        </p>

        <dl
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-sm)',
            paddingTop: '0.2em',
          }}
        >
          {details.map(({ label, value }) => (
            <div key={label}>
              <dt
                style={{
                  fontSize: 'var(--text-small)',
                  color: 'var(--color-text-muted)',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  marginBottom: '2px',
                }}
              >
                {label}
              </dt>
              <dd
                style={{
                  fontSize: 'var(--text-body)',
                  color: 'var(--color-text)',
                }}
              >
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
