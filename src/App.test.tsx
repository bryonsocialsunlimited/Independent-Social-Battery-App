import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App', () => {
  it('renders the starting battery level', () => {
    render(<App />)
    expect(screen.getByText('75%')).toBeInTheDocument()
  })

  it('drains the battery when a draining activity is logged', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /Big party/i }))

    // 75 - 35 = 40
    expect(screen.getByText('40%')).toBeInTheDocument()
    expect(screen.getByText(/→ 40%/)).toBeInTheDocument()
  })

  it('recharges the battery when a recharging activity is logged', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /Good sleep/i }))

    // 75 + 30 clamped to 100
    expect(screen.getByText('100%')).toBeInTheDocument()
  })

  it('resets the battery back to the starting level', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /Big party/i }))
    expect(screen.getByText('40%')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /Reset battery/i }))
    expect(screen.getByText('75%')).toBeInTheDocument()
  })
})
