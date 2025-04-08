'use client'

import * as React from 'react'
import Link from 'next/link'

import { navItems } from '@/constant/nav'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'

import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Icons } from '@/components/ui/icons'

export function MobileNav() {
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
                <Link
                  href={item.href}
                  onClick={() => onOpenChange(false)}
                  className="text-[1.15rem]"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </DrawerContent>
    </Drawer>
  )
}
