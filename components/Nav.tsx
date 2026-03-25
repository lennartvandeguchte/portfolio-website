'use client'
import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ThemeToggle } from './ThemeToggle'

gsap.registerPlugin(ScrollTrigger)

const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export function Nav() {
  const navRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: 'body',
      start: '80vh top',
      onEnter: () => setVisible(true),
      onLeaveBack: () => setVisible(false),
    })
    return () => trigger.kill()
  }, [])

  useEffect(() => {
    if (!navRef.current) return
    gsap.to(navRef.current, {
      opacity: visible ? 1 : 0,
      y: visible ? 0 : -8,
      duration: 0.3,
      ease: 'power2.out',
    })
  }, [visible])

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: 'var(--space-sm) var(--space-md)',
        background: 'var(--color-bg-elevated)',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        opacity: 0,
      }}
      aria-label="Main navigation"
    >
      <Link
        href="/"
        style={{
          fontSize: 'var(--text-nav)',
          fontWeight: 700,
          textDecoration: 'none',
          color: 'var(--color-text)',
        }}
      >
        LVdG
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
        <ul style={{ display: 'flex', gap: 'var(--space-md)', listStyle: 'none' }}>
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <NavLink href={href} label={label} />
            </li>
          ))}
        </ul>
        <ThemeToggle />
      </div>
    </nav>
  )
}

function NavLink({ href, label }: { href: string; label: string }) {
  const ref = useRef<HTMLAnchorElement>(null)

  const handleEnter = () => {
    if (!ref.current) return
    const letters = ref.current.querySelectorAll('.nav-char')
    gsap.to(letters, {
      y: -3,
      color: 'var(--color-accent)',
      duration: 0.2,
      stagger: 0.03,
      ease: 'power2.out',
    })
  }

  const handleLeave = () => {
    if (!ref.current) return
    const letters = ref.current.querySelectorAll('.nav-char')
    gsap.to(letters, {
      y: 0,
      color: 'var(--color-text)',
      duration: 0.2,
      stagger: 0.02,
      ease: 'power2.out',
    })
  }

  return (
    <a
      ref={ref}
      href={href}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        fontSize: 'var(--text-nav)',
        textDecoration: 'none',
        color: 'var(--color-text)',
        display: 'inline-flex',
      }}
    >
      {label.split('').map((char, i) => (
        <span key={i} className="nav-char" style={{ display: 'inline-block' }}>
          {char}
        </span>
      ))}
    </a>
  )
}
