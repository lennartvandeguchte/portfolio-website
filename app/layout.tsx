import type { Metadata } from 'next'
import { Syne } from 'next/font/google'
import './globals.css'
import { PageTransition } from '@/components/PageTransition'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Menura Labs — AI and software development',
  description: 'Creative developer building interactive experiences with typography and motion.',
}

const themeInitScript = `
try {
  var stored = localStorage.getItem('theme');
  var valid = stored === 'dark' || stored === 'light' ? stored : null;
  var preferred = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', valid || preferred);
} catch(e) {}
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={syne.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  )
}
