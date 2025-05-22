import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import { Course } from '@/types/course'

type CourseDetailProps = {
  backLink: string
} & Course

export default function CourseDetail({ backLink, ...course }: CourseDetailProps) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link href={backLink}>
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

      <div className="text-base leading-relaxed text-gray-800 whitespace-pre-line">
        {course.content}
      </div>
    </div>
  )
}
