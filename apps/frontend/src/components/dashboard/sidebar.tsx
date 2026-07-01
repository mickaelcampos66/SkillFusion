import * as React from 'react'

import { NavUser } from '@/components/dashboard/nav-user'
import { ViewSwitcher } from '@/components/dashboard/view-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { getSession } from '@/lib/session'
import { data } from '@/constant/dashboard-sidebar'
import { NavMain } from './nav-main'

export async function DashboardSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = await getSession()

  if (!user) {
    return null
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <ViewSwitcher views={data.views} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} role={user.role} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user!} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
