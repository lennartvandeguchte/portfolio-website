'use client'
import { useRef } from 'react'
import gsap from 'gsap'

const CONTACT_LINKS = [
  { label: 'Email', href: 'mailto:lennartvandeguchte@gmail.com', display: 'lennartvandeguchte@gmail.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/lennart-van-de-guchte-888850119/', display: 'LinkedIn' },
]

function ContactLink({ href, display }: { href: string; display: string }) {
  const ref = useRef<HTMLAnchorElement>(null)

  const handleEnter = () => {
    gsap.to(ref.current, {
      scaleX: 1.05,
      scaleY: 0.95,
      color: 'var(--color-accent)',
      duration: 0.15,
      ease: 'power2.out',
    })
  }

  const handleLeave = () => {
    gsap.to(ref.current, {
      scaleX: 1,
      scaleY: 1,
      color: 'var(--color-text)',
      duration: 0.3,
      ease: 'elastic.out(1, 0.5)',
    })
  }

  return (
    <a
      ref={ref}
      href={href}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        display: 'block',
        fontSize: 'var(--text-h3)',
        fontWeight: 700,
        textDecoration: 'none',
        color: 'var(--color-text)',
        lineHeight: 1.3,
        transformOrigin: 'left center',
        minHeight: '44px',
        letterSpacing: '-0.02em',
      }}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {display}
    </a>
  )
}

export function Contact() {
  return (
    <section
      id="contact"
      style={{ padding: 'var(--space-section) var(--space-md)' }}
      aria-label="Contact"
    >
      <h2
        style={{
          fontSize: 'var(--text-h2)',
          fontWeight: 700,
          marginBottom: 'var(--space-md)',
          letterSpacing: '-0.02em',
        }}
      >
        Get in touch
      </h2>
      {CONTACT_LINKS.map((link) => (
        <ContactLink key={link.label} {...link} />
      ))}
    </section>
  )
}
