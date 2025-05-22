import { Header } from '@/components/dashboard/header'
import {
  SidebarInset,
} from '@/components/ui/sidebar'
import { getSession } from '@/lib/session'

export default async function Page() {
  const user = await getSession()

  if (user?.role !== 'TEACHER' && user?.role !== 'ADMIN') {
    return <div className="text-center w-full mt-4">Vous n&apos;avez pas l&apos;autorisation d&apos;accéder à cette page.</div>
  }

  return (
    <SidebarInset>
      <Header pages={['Mes cours']} />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
        </div>
        <div className="bg-muted/50 min-h-dvh flex-1 rounded-xl md:min-h-min" />
      </div>
    </SidebarInset>
  )
}
