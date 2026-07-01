import NotFound from './not-found'
import { env } from '~/env.config'
import { Course } from '@/types/course'
import CourseDetail from '@/components/courses/course-detail'

type Props = {
  params: Promise<{ id: string }>
}

export async function getCourse(id: string): Promise<Course | null> {
  try {
    const res = await fetch(`${env.SERVER_API_URL}/api/courses/${id}`, {
      cache: 'no-store',
    })

    if (!res.ok) return null

    const text = await res.text()
    if (!text) return null

    return JSON.parse(text)
  }
  catch (error) {
    console.error('Erreur lors de la récupération du cours :', error)
    return null
  }
}

export default async function CourseDetailPage({ params }: Props) {
  const { id } = await params
  const course = await getCourse(id)
  if (!course) return NotFound()

  return (
    <CourseDetail backLink="/" {...course} />
  )
}
