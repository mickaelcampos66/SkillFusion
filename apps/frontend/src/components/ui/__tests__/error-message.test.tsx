import { render } from '@testing-library/react'
import { ErrorMessage } from '../error-message'

describe('ErrorMessage', () => {
  it('should matches snapshot without children', () => {
    const { asFragment } = render(<ErrorMessage />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should matches snapshot with children', () => {
    const { asFragment } = render(<ErrorMessage>Test Error</ErrorMessage>)
    expect(asFragment()).toMatchSnapshot()
  })
})
