import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { cleanup, render } from '@testing-library/react'
import { JSX } from 'react'

afterEach(() => {
  jest.clearAllMocks()
  cleanup()
})

// setup function
function customRender(jsx: JSX.Element) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  }
}

export { customRender as render }
export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
