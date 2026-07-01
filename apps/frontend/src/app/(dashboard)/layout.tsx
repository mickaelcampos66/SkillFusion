import { DashboardSidebar } from '@/components/dashboard/sidebar'
import {
  SidebarProvider,
} from '@/components/ui/sidebar'
import { getSession } from '@/lib/session'

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getSession()

  if (!user) {
    return (
      <main className="container flex flex-col items-center gap-8">
        <h1 className="text-center">Vous n&apos;êtes pas connecté !</h1>
        <p>Vous devez vous connecter pour accéder à cette page.</p>
      </main>
    )
  }

  return (
    <SidebarProvider>
      <DashboardSidebar />
      {children}
    </SidebarProvider>
  )
}
