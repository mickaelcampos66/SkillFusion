import { Header } from '@/components/dashboard/header'
import { CreateCourseForm } from '@/components/forms/create-course-form'
import {
  SidebarInset,
} from '@/components/ui/sidebar'
import { getSession } from '@/lib/session'

export type Category = { value: number, label: string }

const categories: Category[] = [
  {
    value: 1,
    label: 'Bois',
  },
  {
    value: 2,
    label: 'Métal',
  },
  {
    value: 3,
    label: 'Plastique',
  },
  {
    value: 4,
    label: 'Verre',
  },
  {
    value: 5,
    label: 'Papier',
  },
]

export default async function Page() {
  const user = await getSession()

  if (user?.role !== 'TEACHER' && user?.role !== 'ADMIN') {
    return <div className="text-center w-full mt-4">Vous n&apos;avez pas l&apos;autorisation d&apos;accéder à cette page.</div>
  }

  return (
    <SidebarInset>
      <Header pages={['Créer un cours']} />
      <div className="grid place-items-center p-4">
        <CreateCourseForm categories={categories} />
      </div>
    </SidebarInset>
  )
}
