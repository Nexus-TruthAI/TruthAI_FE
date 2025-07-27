import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import FeatChoice from './Pages/FeatChoice.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FeatChoice />
  </StrictMode>,
)
