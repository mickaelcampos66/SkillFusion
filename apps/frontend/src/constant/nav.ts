export type NavItem = {
  title: string
  href: string
}

export const navItems: NavItem[] = [
  { title: 'Accueil', href: '/' },
  { title: 'Catégories', href: '/categories' },
  { title: 'Forum', href: '/forum' },
  { title: 'Contact', href: '/contact' },
  { title: 'Connexion', href: '/login' },
  { title: 'Inscription', href: '/register' },
]
