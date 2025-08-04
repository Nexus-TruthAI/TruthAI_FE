import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FeatChoice from './Pages/FeatChoice.tsx'
import CrossCheckQ from './Pages/CrossCheckQ.tsx'
import GoogleLoginPage from './Pages/GoogleLogin.tsx'
import OAuthCallbackPage from './Pages/OauthCallback.tsx'
import PromptOptimize from './Pages/PromptOptimize.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/featchoice' element={<FeatChoice/>}/>
        <Route path='/crosscheckq' element={<CrossCheckQ/>}/>
        <Route path='/login' element={<GoogleLoginPage/>}/>
        <Route path="/oauth/callback" element={<OAuthCallbackPage />}/>
        <Route path='/promptopt' element={<PromptOptimize/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
