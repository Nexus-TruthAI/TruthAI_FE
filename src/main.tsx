import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FeatChoice from './Pages/FeatChoice.tsx'
import CrossCheckQ from './Pages/CrossCheckQ.tsx'
import CrossCheckL from './Pages/CrossCheckL.tsx'
import CrossCheckA from './Pages/CrossCheckA.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/featchoice' element={<FeatChoice/>}/>
        <Route path='/crosscheckq' element={<CrossCheckQ/>}/>
        <Route path='/crosscheckl' element={<CrossCheckL/>}/>
        <Route path='/crosschecka' element={<CrossCheckA/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
