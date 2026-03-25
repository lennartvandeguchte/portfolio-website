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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={syne.variable}>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  )
}
