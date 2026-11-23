import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Não foi possível iniciar o Feito Hoje.')
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
