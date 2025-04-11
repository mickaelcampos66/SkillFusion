import { render, screen } from '@testing-library/react'
import { Header } from '../header'
import * as sessionModule from '@/lib/session'

jest.mock('@/lib/session', () => ({
  getSession: jest.fn(),
}))

describe('Header', () => {
  it('affiche les liens Connexion et Inscription si l\'utilisateur n\'est pas connecté', async () => {
    jest.spyOn(sessionModule, 'getSession').mockResolvedValueOnce(null)

    render(await Header())

    expect(screen.getByRole('link', { name: 'Connexion' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Inscription' })).toBeInTheDocument()
  })

  it('n\'affiche pas les liens Connexion et Inscription si l\'utilisateur est connecté', async () => {
    jest.spyOn(sessionModule, 'getSession').mockResolvedValueOnce({
      id: 1,
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
    })

    render(await Header())

    expect(screen.queryByRole('link', { name: 'Connexion' })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Inscription' })).not.toBeInTheDocument()
  })

  it('affiche les autres liens de navigation', async () => {
    jest.spyOn(sessionModule, 'getSession').mockResolvedValueOnce(null)

    render(await Header())

    expect(screen.getByRole('link', { name: 'Accueil' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Catégories' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Forum' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument()
  })
})
