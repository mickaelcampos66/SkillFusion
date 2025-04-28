import { IconComponentName } from '@/lib/dynamic-icon'

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
    // TODO: add verification for user role
    // Student
    {
      title: 'Cours suivis',
      url: '/dashboard/courses',
      icon: 'BookOpen',
    },
    // Teacher
    {
      title: 'Mes cours',
      url: '/dashboard/courses',
      icon: 'BookOpen',
    },
    {
      title: 'Créer un cours',
      url: '/dashboard/courses/create',
      icon: 'FilePlus2',
    },
  ],
}
