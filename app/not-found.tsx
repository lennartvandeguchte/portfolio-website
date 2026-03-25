import Link from 'next/link'

export default function NotFound() {
  return (
    <main
      id="main-content"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'var(--space-md)',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <h1
        style={{
          fontSize: 'var(--text-hero)',
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: '-0.02em',
        }}
      >
        404
      </h1>
      <p
        style={{
          fontSize: 'var(--text-role)',
          color: 'var(--color-text-muted)',
          marginTop: 'var(--space-sm)',
        }}
      >
        This project wandered off.
      </p>
      <Link
        href="/"
        style={{
          marginTop: 'var(--space-md)',
          fontSize: 'var(--text-body)',
          color: 'var(--color-accent)',
          textDecoration: 'none',
        }}
      >
        ← Back home
      </Link>
    </main>
  )
}
