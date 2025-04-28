'use client'

import * as React from 'react'

import * as VisuallyHidden from '@radix-ui/react-visually-hidden'

import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Icons } from '@/components/ui/icons'
import { NavLink } from '@/components/ui/navlink'
import { NavProps } from '../header'

export function MobileNav({ navItems, isLoggedIn }: NavProps) {
  const [open, setOpen] = React.useState(false)

  const onOpenChange = React.useCallback(
    (open: boolean) => {
      setOpen(open)
    },
    [],
  )

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <button className="text-secondary-foreground md:hidden">
          <Icons.menu />
        </button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[80svh] p-0">
        <VisuallyHidden.Root>
          <DrawerTitle className="flex items-center justify-between p-4">
            Menu Mobile
          </DrawerTitle>
        </VisuallyHidden.Root>
        <nav className="overflow-auto p-6">
          <ul className="flex flex-col space-y-3">
            {navItems?.map(item => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  onClick={() => onOpenChange(false)}
                  variant="mobile"
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
            {isLoggedIn && (
              <>
                <li>
                  <NavLink
                    href="/profile"
                    onClick={() => onOpenChange(false)}
                    variant="mobile"
                  >
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    href="/dashboard"
                    onClick={() => onOpenChange(false)}
                    variant="mobile"
                  >
                    Dashboard
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </DrawerContent>
    </Drawer>
  )
}
