'use client'

import { linkVariants, NavLink } from '@/components/ui/navlink'
import { NavProps } from '../header'
import { UserCircle2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import Link from 'next/link'

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
          <DropdownMenu>
            <DropdownMenuTrigger className={cn(linkVariants({ variant: 'default', className: 'cursor-pointer' }))}>
              <UserCircle2 strokeWidth={1.25} />
              <span className="sr-only">Mon compte</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/profile" className="w-full">
                  Mon profil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/dashboard" className="w-full">
                  Dashboard
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </ul>
    </nav>
  )
}
