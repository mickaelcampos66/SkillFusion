import { getCourse } from '@/app/(website)/courses/[id]/page'
import CourseDetail from '@/components/courses/course-detail'
import { Header } from '@/components/dashboard/header'
import {
  SidebarInset,
} from '@/components/ui/sidebar'

export default async function Page({ params }: Readonly<{ params: Promise<{ id: string }> }>) {
  const { id } = await params
  const course = await getCourse(id)

  return (
    <SidebarInset>
      <Header pages={['Mes cours', id]} />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {course
          ? <CourseDetail backLink="/dashboard/my-courses" {...course} />
          : <div className="text-center w-full mt-4">Ce cours n&apos;existe pas ou vous n&apos;y avez pas accès.</div>}
      </div>
    </SidebarInset>
  )
}
