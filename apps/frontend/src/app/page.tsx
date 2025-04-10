import { CourseCard } from '@/components/course-card'
import Image from 'next/image'

const courses = [
  {
    title: 'Installer une étagère murale',
    description: 'Apprenez à percer et fixer correctement une étagère.',
    image: '/images/etagere.jpg',
  },
  {
    title: 'Changer un robinet',
    description: 'Remplacer un robinet facilement sans fuite.',
    image: '/images/robinet.jpg',
  },
  {
    title: 'Poser du parquet flottant',
    description: 'Étapes pour poser un sol stratifié soi-même.',
    image: '/images/parquet.jpg',
  },
  {
    title: 'Repeindre une pièce',
    description: 'Les bases pour bien préparer et peindre un mur.',
    image: '/images/peinture.jpg',
  },
  {
    title: 'Poser un carrelage mural',
    description: 'Conseils pour une pose propre et durable.',
    image: '/images/carrelage.jpg',
  },
  {
    title: 'Installer une applique murale',
    description: 'Branchement et fixation en toute sécurité.',
    image: '/images/applique.jpg',
  },
]

export default function Home() {
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
          {courses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      </div>
    </main>
  )
}
