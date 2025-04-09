import type { Metadata } from 'next'
import { Geist_Mono, Montserrat } from 'next/font/google'
import { cn } from '@/lib/utils'
import './globals.css'
import { Header } from '@/components/layout/header'

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
        className={cn('bg-background font-sans antialiased', montserrat.variable, geistMono.variable)}
      >
        <div data-vaul-drawer-wrapper>
          <Header />
          <main data-wrapper className="flex flex-1 flex-col relative min-h-dvh bg-background">{children}</main>
          <footer>
            <p className="text-secondary font-mono text-center">
              © 2025 SkillFusion. Tous droits réservés.
            </p>
          </footer>
        </div>
      </body>
    </html>
  )
}
