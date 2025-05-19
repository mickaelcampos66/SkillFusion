import { render, screen } from '@/lib/jest.setup'
import { DesktopNav } from '../desktop-nav'
import '@testing-library/jest-dom'

const mockNavItems = [
  { href: '/home', title: 'Home' },
  { href: '/about', title: 'About' },
  { href: '/contact', title: 'Contact' },
]

describe('DesktopNav', () => {
  it('renders navigation items correctly', () => {
    render(<DesktopNav navItems={mockNavItems} isLoggedIn={false} />)

    mockNavItems.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument()
    })
  })

  it('does not render user dropdown when not logged in', () => {
    render(<DesktopNav navItems={mockNavItems} isLoggedIn={false} />)

    expect(screen.queryByText('Mon compte')).not.toBeInTheDocument()
  })

  it('renders user dropdown when logged in', async () => {
    const { user } = render(<DesktopNav navItems={mockNavItems} isLoggedIn={true} />)

    const menuButton = screen.getByRole('button', { name: /mon compte/i })

    await user.click(menuButton)

    const dropdownLabel = screen.getByText('Mon compte', {
      selector: '[data-slot="dropdown-menu-label"]',
    })

    expect(dropdownLabel).toBeInTheDocument()
    expect(screen.getByText('Mon profil')).toBeInTheDocument()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Se déconnecter')).toBeInTheDocument()
  })
})
