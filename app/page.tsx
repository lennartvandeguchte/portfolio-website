import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { ProjectCard } from '@/components/ProjectCard'
import { About } from '@/components/About'
import { Contact } from '@/components/Contact'
import { getAllProjects } from '@/lib/projects'

export default function HomePage() {
  const projects = getAllProjects()

  return (
    <>
      <Nav />
      <main id="main-content" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Hero />
        <section
          id="work"
          aria-label="Work"
          style={{ padding: '0 var(--space-md)' }}
        >
          {projects.length > 0 ? (
            projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))
          ) : (
            <div
              style={{
                padding: 'var(--space-lg) 0',
                fontSize: 'var(--text-h2)',
                color: 'var(--color-text-muted)',
              }}
            >
              Projects coming soon.
            </div>
          )}
        </section>
        <About />
        <Contact />
      </main>
    </>
  )
}
