import { IconComponentName } from '@/lib/dynamic-icon'
import { type UserRole } from '@/types/user'

export type SidebarItem = {
  views: {
    name: string
    icon: IconComponentName
    link: string
  }[]
  navMain: {
    title: string
    url: string
    icon: IconComponentName
    roles: UserRole[]
  }[]
}

export const data: SidebarItem = {
  views: [
    {
      name: 'Dashboard - SkillFusion',
      icon: 'AudioWaveform',
      link: '/dashboard',
    },
    {
      name: 'Site Web - SkillFusion',
      icon: 'GalleryVerticalEnd',
      link: '/',
    },
  ],
  navMain: [
    {
      title: 'Cours suivis',
      url: '/dashboard/courses',
      icon: 'BookOpenCheck',
      roles: ['STUDENT', 'TEACHER'],
    },
    {
      title: 'Mes cours',
      url: '/dashboard/my-courses',
      icon: 'BookOpen',
      roles: ['TEACHER'],
    },
    {
      title: 'Créer un cours',
      url: '/dashboard/courses/create',
      icon: 'FilePlus2',
      roles: ['TEACHER'],
    },
  ],
}
