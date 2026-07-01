import { render } from '@testing-library/react'
import { Spacing } from '../spacing'

describe('Spacing', () => {
  it('renders correctly with size="xs"', () => {
    const { asFragment } = render(<Spacing size="xs" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with size="sm"', () => {
    const { asFragment } = render(<Spacing size="sm" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with size="md"', () => {
    const { asFragment } = render(<Spacing size="md" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with size="lg"', () => {
    const { asFragment } = render(<Spacing size="lg" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with default size when no size is provided', () => {
    const { asFragment } = render(<Spacing />)
    expect(asFragment()).toMatchSnapshot()
  })
})
