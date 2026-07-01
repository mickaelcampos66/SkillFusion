import { CourseCard } from '@/components/courses/course-card'
import Banner from '@/components/layout/banner'
import { Course } from '@/types/course'

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
      <Banner />
      <div className="max-w-6xl mx-auto pb-4 mt-8 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {courses.map((course: Course, index: number) => (
            <CourseCard key={index} {...course} link={`/courses/${course.id}`} />
          ))}
        </div>
      </div>
    </main>
  )
}
