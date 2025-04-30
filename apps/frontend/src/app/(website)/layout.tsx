import { Header } from '@/components/layout/header'

export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div data-vaul-drawer-wrapper className="flex flex-col min-h-dvh">
      <Header />
      <main data-wrapper className="flex flex-col flex-grow relative bg-background">{children}</main>
      <footer>
        <p className="text-secondary font-mono text-center">
          © {new Date().getFullYear()} SkillFusion. Tous droits réservés.
        </p>
      </footer>
    </div>
  )
}
