import { CourseCard } from '@/components/course-card'
import { Course } from '@/types/course'
import Image from 'next/image'

const getCoursesData = async () => {
  const res = await fetch(`${process.env.SERVER_API_URL}/api/courses`, {
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    throw new Error('Erreur lors de la récupération des cours')
  }

  return res.json()
}

export default async function Home() {
  const courses = await getCoursesData()
  return (
    <main className="pb-4">
      <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96">
        <Image
          src="/images/image_atelier.webp"
          alt="Cours de bricolage"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="max-w-6xl mx-auto pb-4 mt-8 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {courses.map((course: Course, index: number) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      </div>
    </main>
  )
}
