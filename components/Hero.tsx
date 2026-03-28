'use client'
import { useRef, useEffect, useCallback, useState } from 'react'
import gsap from 'gsap'
import { useSplitType, useFontLoaded } from '@/lib/animations'

export function Hero() {
  const nameRef = useRef<HTMLDivElement>(null)
  const roleRef = useRef<HTMLDivElement>(null)
  const { loaded } = useFontLoaded()
  const splitInstance = useSplitType(nameRef, 'words,chars')
  const [hasAnimated, setHasAnimated] = useState(false)
  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches

  // Initial reveal after font loads
  useEffect(() => {
    if (!loaded || !nameRef.current || !roleRef.current) return
    gsap.fromTo(nameRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
    gsap.fromTo(
      roleRef.current.querySelectorAll('span'),
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.15, delay: 0.3, ease: 'power2.out' }
    )
  }, [loaded])

  // Mobile auto-scatter on load
  useEffect(() => {
    if (!isTouchDevice || !splitInstance?.chars || hasAnimated || !loaded) return
    const chars = splitInstance.chars
    if (!chars?.length) return
    setHasAnimated(true)

    gsap.set(chars, { opacity: 1 })
    gsap.to(chars, {
      x: () => (Math.random() - 0.5) * 120,
      y: () => (Math.random() - 0.5) * 80,
      opacity: 0,
      duration: 0.5,
      stagger: 0.02,
      ease: 'power2.out',
      delay: 0.5,
      onComplete: () => {
        gsap.to(chars, {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.015,
          ease: 'power3.out',
        })
      },
    })
  }, [splitInstance, isTouchDevice, hasAnimated, loaded])

  const handleMouseEnter = useCallback(() => {
    if (!splitInstance?.chars) return
    const chars = splitInstance.chars
    gsap.to(chars, {
      x: () => (Math.random() - 0.5) * 160,
      y: () => (Math.random() - 0.5) * 100,
      duration: 0.6,
      stagger: { each: 0.02, from: 'random' },
      ease: 'elastic.out(1, 0.5)',
      overwrite: true,
    })
  }, [splitInstance])

  const handleMouseLeave = useCallback(() => {
    if (!splitInstance?.chars) return
    gsap.to(splitInstance.chars, {
      x: 0,
      y: 0,
      duration: 0.4,
      stagger: { each: 0.015, from: 'center' },
      ease: 'power2.out',
      overwrite: true,
    })
  }, [splitInstance])

  return (
    <section
      className="hero-section"
      style={{
        minHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'var(--space-md)',
      }}
      aria-labelledby="hero-name"
    >
      <h1 id="hero-name" className="visually-hidden">
        Menura Labs — AI and software development
      </h1>
      <div
        ref={nameRef}
        aria-hidden="true"
        onMouseEnter={!isTouchDevice ? handleMouseEnter : undefined}
        onMouseLeave={!isTouchDevice ? handleMouseLeave : undefined}
        style={{
          fontSize: 'var(--text-hero)',
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          cursor: 'default',
          userSelect: 'none',
          opacity: loaded ? undefined : 0,
        }}
      >
        MENURA
        <br />
        LABS
      </div>
      <div
        ref={roleRef}
        style={{
          fontSize: 'var(--text-role)',
          fontWeight: 400,
          marginTop: 'var(--space-sm)',
          color: 'var(--color-text-muted)',
        }}
      >
        {'By Lennart van de Guchte'.split(' ').map((word, i) => (
          <span
            key={i}
            style={{ display: 'inline-block', marginRight: '0.3em', opacity: loaded ? undefined : 0 }}
          >
            {word}
          </span>
        ))}
      </div>
      <div
        style={{
          marginTop: 'var(--space-lg)',
          fontSize: 'var(--text-small)',
          color: 'var(--color-text-muted)',
          letterSpacing: '0.05em',
          animation: 'pulse 2s ease-in-out infinite',
        }}
      >
        scroll ↓
      </div>
    </section>
  )
}
