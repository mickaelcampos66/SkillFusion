import { render, screen } from '@testing-library/react'
import { NavLink } from '../navlink'
import { usePathname } from 'next/navigation'

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

describe('NavLink', () => {
  it('renders the link with the correct title and href, with default variant', () => {
    (usePathname as jest.Mock).mockReturnValue('/active-path')

    const { asFragment } = render(<NavLink href="/test-path" title="Test Link" variant="default" />)

    const linkElement = screen.getByRole('link', { name: 'Test Link' })
    expect(linkElement).toBeInTheDocument()
    expect(linkElement).toHaveAttribute('href', '/test-path')
    expect(asFragment()).toMatchSnapshot()
  })

  it('does apply mobile variant', () => {
    (usePathname as jest.Mock).mockReturnValue('/active-path')

    const { asFragment } = render(<NavLink href="/test-path" title="Test Link" variant="mobile" />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('applies active styles when the current path matches the href', () => {
    (usePathname as jest.Mock).mockReturnValue('/active-path')

    render(<NavLink href="/active-path" title="Active Link" variant="default" />)

    const linkElement = screen.getByRole('link', { name: 'Active Link' })
    expect(linkElement).toHaveClass('text-primary font-bold')
  })

  it('does not apply active styles when the current path does not match the href', () => {
    (usePathname as jest.Mock).mockReturnValue('/different-path')

    render(<NavLink href="/test-path" title="Inactive Link" variant="default" />)

    const linkElement = screen.getByRole('link', { name: 'Inactive Link' })
    expect(linkElement).not.toHaveClass('text-primary font-bold')
  })
})
