import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { PromptProvider } from "./Context/PromptContext";

import FeatChoice from './Pages/FeatChoice.tsx'
import CrossCheckQ from './Pages/CrossCheckQ.tsx'
import GoogleLoginPage from './Pages/GoogleLogin.tsx'
import OAuthCallbackPage from './Pages/OauthCallback.tsx'
import PromptOptimize from './Pages/PromptOptimize.tsx'
import PromptOptimizeDetails from './Pages/PromptOptimizeDetails.tsx'
import CrossCheckL from './Pages/CrossCheckL.tsx'
import CrossCheckA from './Pages/CrossCheckA.tsx'
import Question from './Pages/Question.tsx'
import FactCheck from './Pages/FactCheck.tsx'
import MyPage from './Pages/MyPage.tsx'
import MainPage from './Pages/MainPage.tsx'
import MyFolderPL from './Pages/MyFolderPL.tsx'
import MyFolderCL from './Pages/MyFolderCL.tsx'
import MyFolderPD from './Pages/MyFolderPD.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PromptProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/featchoice' element={<FeatChoice/>}/>
        <Route path='/crosscheckq' element={<CrossCheckQ/>}/>
        <Route path='/login' element={<GoogleLoginPage/>}/>
        <Route path="/oauth/callback" element={<OAuthCallbackPage />}/>
        <Route path='/promptopt' element={<PromptOptimize/>}/>
        <Route path='/promptoptdetail' element={<PromptOptimizeDetails/>}/>
        <Route path='/crosscheckl' element={<CrossCheckL/>}/>
        <Route path='/crosschecka' element={<CrossCheckA/>}/>
        <Route path='/question' element={<Question/>}/>
        <Route path='/factcheck' element={<FactCheck/>}/>
        <Route path='/mypage' element={<MyPage/>}/>
        <Route path='/mainpage' element={<MainPage/>}/>
        <Route path='/myfolderpl' element={<MyFolderPL/>}/>
        <Route path='/myfoldercl' element={<MyFolderCL/>}/>
        <Route path='/myfolder/:id' element={<MyFolderPD/>}/>
      </Routes>
    </BrowserRouter>
    </PromptProvider>
  </StrictMode>,
)
