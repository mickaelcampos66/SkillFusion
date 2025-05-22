import { Header } from '@/components/dashboard/header'
import {
  SidebarInset,
} from '@/components/ui/sidebar'

export default async function Page({ params }: Readonly<{ params: Promise<{ id: string }> }>) {
  const { id } = await params
  return (
    <SidebarInset>
      <Header pages={['Mes cours', id]} />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="bg-muted/50 min-h-dvh flex-1 rounded-xl md:min-h-min" />
      </div>
    </SidebarInset>
  )
}
