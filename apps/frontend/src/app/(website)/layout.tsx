import { Header } from '@/components/layout/header'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div data-vaul-drawer-wrapper>
      <Header />
      <main data-wrapper className="flex flex-1 flex-col relative min-h-dvh bg-background">{children}</main>
      <footer>
        <p className="text-secondary font-mono text-center">
          © 2025 SkillFusion. Tous droits réservés.
        </p>
      </footer>
    </div>
  )
}
