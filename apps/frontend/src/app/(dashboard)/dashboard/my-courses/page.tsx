import { CourseCard } from '@/components/courses/course-card'
import { Header } from '@/components/dashboard/header'
import {
  SidebarInset,
} from '@/components/ui/sidebar'
import { getSession } from '@/lib/session'
import { Course } from '@/types/course'
import { env } from '~/env.config'

async function getMyCoursesData(): Promise<Course[]> {
  const user = await getSession()
  if (!user) return []

  const courses = await fetch(`${env.SERVER_API_URL}/api/courses/user/${user.id}`)
  return courses.json()
}

export default async function Page() {
  const user = await getSession()
  const courses = await getMyCoursesData()

  if (user?.role !== 'TEACHER' && user?.role !== 'ADMIN') {
    return <div className="text-center w-full mt-4">Vous n&apos;avez pas l&apos;autorisation d&apos;accéder à cette page.</div>
  }

  return (
    <SidebarInset>
      <Header pages={['Mes cours']} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center p-4">
        {courses.map(course => (
          <CourseCard key={course.id} {...course} link={`/dashboard/my-courses/${course.id}`} />
        ))}
      </div>
    </SidebarInset>
  )
}
