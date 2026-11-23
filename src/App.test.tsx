import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('apresenta o ponto de partida diário em português', () => {
    render(<App />)

    expect(screen.getByRole('heading', { level: 1, name: 'Feito Hoje' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'Por onde você quer começar?' })).toBeInTheDocument()
    expect(screen.getByText('Seus registros ficam neste navegador.')).toBeInTheDocument()
  })
})
