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

      <header style={{ marginTop: 'var(--space-md)', paddingBottom: 'var(--space-lg)', borderBottom: '1px solid var(--color-border)' }}>
        <h1
          style={{
            fontSize: 'var(--text-h1)',
            fontWeight: 800,
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
              maxWidth: '560px',
              lineHeight: 1.5,
            }}
          >
            {project.description}
          </p>
        )}
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-sm)', marginTop: 'var(--space-md)' }}>
          {project.tags && project.tags.length > 0 && (
            <ul
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                listStyle: 'none',
                flexGrow: 1,
              }}
            >
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  style={{
                    fontSize: 'var(--text-small)',
                    color: 'var(--color-text-muted)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '4px',
                    padding: '4px 10px',
                    letterSpacing: '0.03em',
                  }}
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
          <div style={{ display: 'flex', gap: 'var(--space-sm)', flexShrink: 0 }}>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--color-accent)', fontSize: 'var(--text-small)', textDecoration: 'none', fontWeight: 600 }}
              >
                Live site ↗
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--color-accent)', fontSize: 'var(--text-small)', textDecoration: 'none', fontWeight: 600 }}
              >
                GitHub ↗
              </a>
            )}
          </div>
        </div>
      </header>

      <article className="prose" style={{ marginTop: 'var(--space-lg)' }}>
        <MDXRemote source={project.content} />
      </article>
    </main>
  )
}
