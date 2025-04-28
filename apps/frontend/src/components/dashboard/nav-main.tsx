'use client'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { SidebarItem } from '@/constant/dashboard-sidebar'
import { DynamicIcon } from '@/lib/dynamic-icon'
import Link from 'next/link'

export function NavMain({
  items,
}: {
  items: SidebarItem['navMain']
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Espace</SidebarGroupLabel>
      <SidebarMenu>
        {items.map(item => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild>
              <Link href={item.url}>
                {item.icon && <DynamicIcon name={item.icon} />}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
