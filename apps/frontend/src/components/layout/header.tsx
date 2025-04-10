import Image from 'next/image'
import Link from 'next/link'
import { MobileNav } from './navbar/mobile-nav'
import { DesktopNav } from './navbar/desktop-nav'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-secondary">
      <div className="container-wrapper flex justify-between w-full h-14 px-3 items-center gap-2 md:gap-4">
        <Link
          href="/"
          rel="noreferrer"
        >
          <Image
            src="/logo.svg"
            alt="Logo SkillFusion"
            width={60}
            height={60}
            priority
          />
          <span className="sr-only">Accueil</span>
        </Link>
        <DesktopNav />
        <MobileNav />
      </div>
    </header>
  )
}
