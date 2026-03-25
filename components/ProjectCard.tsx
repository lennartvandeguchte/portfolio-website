'use client'
import { useRef, useEffect } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSplitType, useFontLoaded } from '@/lib/animations'
import type { Project } from '@/lib/projects'

gsap.registerPlugin(ScrollTrigger)

export function ProjectCard({ project }: { project: Project }) {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const { loaded } = useFontLoaded()
  const split = useSplitType(titleRef, 'chars')

  useEffect(() => {
    if (!split?.chars || !cardRef.current) return
    const chars = split.chars
    gsap.set(chars, { opacity: 0, y: (i: number) => (i % 2 === 0 ? 40 : -40) })

    const trigger = ScrollTrigger.create({
      trigger: cardRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(chars, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.035,
          ease: 'power3.out',
        })
        if (descRef.current) {
          gsap.fromTo(
            descRef.current,
            { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
            { clipPath: 'inset(0 0 0% 0)', opacity: 1, duration: 0.5, delay: 0.3, ease: 'power2.out' }
          )
        }
        if (imgRef.current) {
          gsap.fromTo(
            imgRef.current,
            { opacity: 0, x: 20 },
            { opacity: 0.12, x: 0, duration: 0.6, delay: 0.2, ease: 'power2.out' }
          )
        }
      },
      once: true,
    })

    return () => trigger.kill()
  }, [split])

  const handleMouseEnter = () => {
    if (!split?.chars) return
    split.chars.forEach((char, i) => {
      gsap.to(char, {
        fontVariationSettings: `'wght' 800`,
        duration: 0.3,
        delay: i * 0.04,
        ease: 'power2.out',
        overwrite: true,
      })
    })
    if (imgRef.current) gsap.to(imgRef.current, { opacity: 0.25, scale: 1.05, duration: 0.4, ease: 'power2.out' })
  }

  const handleMouseLeave = () => {
    if (!split?.chars) return
    split.chars.forEach((char, i) => {
      gsap.to(char, {
        fontVariationSettings: `'wght' 400`,
        duration: 0.3,
        delay: i * 0.02,
        ease: 'power2.out',
        overwrite: true,
      })
    })
    if (imgRef.current) gsap.to(imgRef.current, { opacity: 0.12, scale: 1, duration: 0.4, ease: 'power2.out' })
  }

  return (
    <div
      ref={cardRef}
      style={{
        position: 'relative',
        borderBottom: '1px solid var(--color-border)',
        padding: 'var(--space-lg) 0',
        overflow: 'hidden',
      }}
    >
      {project.image && (
        <div
          ref={imgRef}
          style={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'clamp(200px, 28vw, 400px)',
            height: 'clamp(120px, 15vw, 200px)',
            backgroundImage: `url(${project.image})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            opacity: 0,
            pointerEvents: 'none',
            maskImage: 'linear-gradient(to right, transparent 0%, black 30%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 30%)',
          }}
        />
      )}
      <Link
        href={`/projects/${project.slug}`}
        style={{
          display: 'block',
          textDecoration: 'none',
          color: 'inherit',
          position: 'relative',
          zIndex: 1,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <h2
          ref={titleRef}
          style={{
            fontSize: 'var(--text-h1)',
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {project.title}
        </h2>
        {project.description && (
          <p
            ref={descRef}
            style={{
              marginTop: 'var(--space-sm)',
              fontSize: 'var(--text-body)',
              color: 'var(--color-text-muted)',
              maxWidth: '600px',
              opacity: 0,
            }}
          >
            {project.description}
          </p>
        )}
        {project.tags && project.tags.length > 0 && (
          <p
            style={{
              marginTop: 'var(--space-xs)',
              fontSize: 'var(--text-small)',
              color: 'var(--color-text-muted)',
              letterSpacing: '0.05em',
            }}
          >
            {project.tags.join(' / ')}
          </p>
        )}
      </Link>
    </div>
  )
}
