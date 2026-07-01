'use client'

import { useEffect, useState } from 'react'
import { Course } from '@/types/course'
import { CourseCard } from '@/components/courses/course-card'
import { Category } from '@/types/category'

export default function CoursesByCategoriesClient() {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | 'all'>('all')
  const [courses, setCourses] = useState<Course[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)

    const fetchCategories = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API}/api/categories`)
      const data = await res.json()
      setCategories(data)
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchCourses = async () => {
      let url = `${process.env.NEXT_PUBLIC_SERVER_API}/api/courses`

      if (selectedCategoryId !== 'all') {
        url += `/category/${selectedCategoryId}`
      }

      const res = await fetch(url)
      const data = await res.json()
      setCourses(data)
    }

    fetchCourses()
  }, [selectedCategoryId])

  if (!hydrated) return null

  const baseButtonClass = 'cursor-pointer px-4 py-2 rounded-full border'

  const selectedStyle = {
    backgroundColor: '#f3a160',
    color: '#ffffff',
  }

  return (
    <div className="w-full max-w-screen overflow-hidden">
      <div className="w-full overflow-x-auto mb-8">
        <div className="flex justify-center px-4">
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedCategoryId('all')}
              className={`${baseButtonClass} ${selectedCategoryId !== 'all' ? 'bg-gray-100 text-gray-800' : ''}`}
              style={selectedCategoryId === 'all' ? selectedStyle : {}}
            >
              Toutes
            </button>

            {categories.map((cat: Category) => {
              const isSelected = selectedCategoryId === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategoryId(cat.id)}
                  className={`${baseButtonClass} whitespace-nowrap ${!isSelected ? 'bg-gray-100 text-gray-800' : ''}`}
                  style={isSelected ? selectedStyle : {}}
                >
                  {cat.name}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {courses.length > 0
          ? (
              courses.map((course, index) => (
                <CourseCard key={index} {...course} link={`/courses/${course.id}`} />
              ))
            )
          : (
              <p className="text-center col-span-full">Aucun cours trouvé.</p>
            )}
      </div>
    </div>
  )
}
