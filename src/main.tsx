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
import CrossCheckL from './Pages/CrossCheckL.tsx'
import CrossCheckA from './Pages/CrossCheckA.tsx'
import Question from './Pages/Question.tsx'
import MyPage from './Pages/MyPage.tsx'
import MainPage from './Pages/MainPage.tsx'


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
        <Route path='/crosscheckl' element={<CrossCheckL/>}/>
        <Route path='/crosschecka' element={<CrossCheckA/>}/>
        <Route path='/question' element={<Question/>}/>
        <Route path='/mypage' element={<MyPage/>}/>
        <Route path='/mainpage' element={<MainPage/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
