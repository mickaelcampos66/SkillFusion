import CoursesByCategoriesClient from '@/components/courses/coursesByCategories'
import Banner from '@/components/layout/banner'

export default function CoursesByCategories() {
  return (
    <div>
      <Banner />
      <main className="container flex flex-col items-center mt-5">
        <CoursesByCategoriesClient />
      </main>
    </div>
  )
}
