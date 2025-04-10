import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

type Course = {
  title: string
  description: string
  image: string
}

export function CourseCard({ title, description, image }: Course) {
  return (
    <Card className="h-full w-full sm:w-[300px] rounded-2xl overflow-hidden shadow-md flex flex-col">
      <Image
        src={image}
        alt={title}
        width={500}
        height={300}
        className="w-full h-[180px] object-cover"
      />
      <CardContent className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold mb-2">{title}</h2>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <Button className="mt-4 w-full" variant="outline">
          Voir le cours
        </Button>
      </CardContent>
    </Card>
  )
}
