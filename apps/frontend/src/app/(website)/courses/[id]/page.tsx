import Image from 'next/image'
import NotFound from './not-found'
import { env } from '~/env.config'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { Course } from '@/types/course'

type Props = {
  params: { id: string }
}

async function getCourse(id: string): Promise<Course | null> {
  try {
    const res = await fetch(`${env.SERVER_API_URL}/api/courses/${id}`, {
      cache: 'no-store',
    })

    if (!res.ok) return null

    const data = await res.json()
    return data
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
    <div className="max-w-4xl mx-auto p-6">
      <Link href="/">
        <Button className="mb-6 flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Retour aux cours
        </Button>
      </Link>

      <h1 className="text-3xl font-bold mb-4">{course.name}</h1>

      {course.image && (
        <Image
          src={course.image}
          alt={course.name}
          width={800}
          height={400}
          className="rounded-lg mb-4 object-cover"
        />
      )}

      <p className="text-gray-600 text-sm mb-2">Niveau : {course.level}</p>
      <p className="mb-6 text-lg">{course.description}</p>

      <div className="text-base leading-relaxed text-gray-800">
        {course.content}
      </div>
    </div>
  )
}
