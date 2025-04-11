import { NavLink } from '@/components/ui/navlink'
import { NavProps } from '../header'
import { UserCircle2 } from 'lucide-react'

export function DesktopNav({ navItems, isLoggedIn }: NavProps) {
  return (
    <nav>
      <ul className="hidden md:flex items-center gap-6">
        {navItems?.map(item => (
          <li key={item.href}>
            <NavLink href={item.href}>
              {item.title}
            </NavLink>
          </li>
        ))}
        {isLoggedIn && (
          <li>
            <NavLink href="/profile">
              <UserCircle2 strokeWidth={1.25} />
              <span className="sr-only">Profile</span>
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  )
}
