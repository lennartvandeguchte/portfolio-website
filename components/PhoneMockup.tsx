export function PhoneMockup({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      style={{
        width: 220,
        flexShrink: 0,
        borderRadius: 32,
        border: '4px solid var(--color-border)',
        background: '#000',
        padding: '12px 6px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.35)',
      }}
    >
      {/* Notch */}
      <div
        style={{
          width: 60,
          height: 6,
          borderRadius: 3,
          background: 'var(--color-border)',
          margin: '0 auto 8px',
        }}
      />
      {/* Screen */}
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          borderRadius: 20,
          display: 'block',
        }}
      />
      {/* Home bar */}
      <div
        style={{
          width: 48,
          height: 4,
          borderRadius: 2,
          background: 'var(--color-border)',
          margin: '8px auto 0',
        }}
      />
    </div>
  )
}

export function PhoneShowcase({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 32,
        flexWrap: 'wrap',
        margin: 'var(--space-md) 0',
      }}
    >
      {children}
    </div>
  )
}
