import { renderHook, act } from '@testing-library/react'
import { useIsMobile } from '../use-mobile'

describe('useIsMobile', () => {
  const originalMatchMedia = window.matchMedia

  beforeEach(() => {
    window.matchMedia = jest.fn().mockImplementation((query) => {
      return {
        matches: query.includes('(max-width: 767px)') && window.innerWidth <= 767,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      }
    })
  })

  afterEach(() => {
    window.matchMedia = originalMatchMedia
  })

  it('should return true if window width is less than MOBILE_BREAKPOINT', () => {
    act(() => {
      window.innerWidth = 500
      window.dispatchEvent(new Event('resize'))
    })

    const { result } = renderHook(() => useIsMobile())

    expect(result.current).toBe(true)
  })

  it('should return false if window width is greater than or equal to MOBILE_BREAKPOINT', () => {
    act(() => {
      window.innerWidth = 800
      window.dispatchEvent(new Event('resize'))
    })

    const { result } = renderHook(() => useIsMobile())

    expect(result.current).toBe(false)
  })
})
