import type { Metadata } from 'next'
import { Geist_Mono, Montserrat } from 'next/font/google'
import { cn } from '@/lib/utils'
import './globals.css'

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'SkillFusion',
  description: 'Do it yourself',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body
        className={cn('antialiased', montserrat.variable, geistMono.variable)}
      >
        {children}
        <footer>
          <p className="text-secondary font-mono">
            © 2025 SkillFusion. Tous droits réservés.
          </p>
        </footer>
      </body>
    </html>
  )
}
