import { NavLink } from '@/components/ui/navlink'
import { NavProps } from '../header'

export function DesktopNav({ navItems }: NavProps) {
  return (
    <nav>
      <ul className="hidden md:flex gap-6">
        {navItems?.map(item => (
          <li key={item.href}>
            <NavLink href={item.href} title={item.title} />
          </li>
        ))}
      </ul>
    </nav>
  )
}
