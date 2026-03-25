'use client'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'

export function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section || typeof window === 'undefined') return
    if (window.matchMedia('(hover: none)').matches) return // skip on touch

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

  const bioText =
    "I build interactive digital experiences that live at the intersection of engineering and design. I care deeply about the craft — the timing of an animation, the rhythm of a layout, the moment a user feels genuine delight."

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
      <p style={{ fontSize: 'var(--text-body)', lineHeight: 1.6, maxWidth: '700px' }}>
        {bioText.split(' ').map((word, i) => (
          <span key={i} className="about-word" style={{ display: 'inline-block', marginRight: '0.3em' }}>
            {word}
          </span>
        ))}
      </p>
    </section>
  )
}
