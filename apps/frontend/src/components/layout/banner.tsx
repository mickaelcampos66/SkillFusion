import Image from 'next/image'

export default function Banner() {
  return (
    <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96">
      <Image
        src="/images/image_atelier.webp"
        alt="Cours de bricolage"
        fill
        className="object-cover"
        priority
      />
    </div>
  )
}
