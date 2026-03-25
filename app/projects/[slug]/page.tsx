import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getProjectBySlug, getAllProjects } from '@/lib/projects'

export async function generateStaticParams() {
  const projects = getAllProjects()
  return projects.map((p) => ({ slug: p.slug }))
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  return (
    <main
      id="main-content"
      style={{ maxWidth: '800px', margin: '0 auto', padding: 'var(--space-xl) var(--space-md)' }}
    >
      <Link
        href="/"
        style={{
          fontSize: 'var(--text-small)',
          color: 'var(--color-text-muted)',
          textDecoration: 'none',
          letterSpacing: '0.05em',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        ← Back
      </Link>
      <h1
        style={{
          fontSize: 'var(--text-h1)',
          fontWeight: 800,
          marginTop: 'var(--space-md)',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
        }}
      >
        {project.title}
      </h1>
      {project.description && (
        <p
          style={{
            fontSize: 'var(--text-body)',
            color: 'var(--color-text-muted)',
            marginTop: 'var(--space-sm)',
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
      <div style={{ display: 'flex', gap: 'var(--space-sm)', marginTop: 'var(--space-sm)' }}>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--color-accent)', fontSize: 'var(--text-small)' }}
          >
            Live site ↗
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--color-accent)', fontSize: 'var(--text-small)' }}
          >
            GitHub ↗
          </a>
        )}
      </div>
      <article
        style={{ marginTop: 'var(--space-lg)', fontSize: 'var(--text-body)', lineHeight: 1.6 }}
      >
        <MDXRemote source={project.content} />
      </article>
    </main>
  )
}
