import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter} from 'react-router-dom'

import { PromptProvider } from "./Context/PromptContext";

// import FeatChoice from './Pages/FeatChoice.tsx'
// import CrossCheckQ from './Pages/CrossCheckQ.tsx'
// import GoogleLoginPage from './Pages/GoogleLogin.tsx'
// import OAuthCallbackPage from './Pages/OauthCallback.tsx'
// import PromptOptimize from './Pages/PromptOptimize.tsx'
// import PromptOptimizeDetails from './Pages/PromptOptimizeDetails.tsx'
// import CrossCheckL from './Pages/CrossCheckL.tsx'
// import CrossCheckA from './Pages/CrossCheckA.tsx'
// import Question from './Pages/Question.tsx'
// import FactCheck from './Pages/FactCheck.tsx'
// import MyPage from './Pages/MyPage.tsx'
// import MainPage from './Pages/MainPage.tsx'
// import MyFolderPL from './Pages/MyFolderPL.tsx'
// import MyFolderCL from './Pages/MyFolderCL.tsx'
// import MyFolderPD from './Pages/MyFolderPD.tsx'
// import MyFolderCross from './Pages/MyFolderCross.tsx'
// import MyFolderPrompt from './Pages/MyFolderPrompt.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PromptProvider>
    <BrowserRouter>
        <App/>
    </BrowserRouter>
    </PromptProvider>
  </StrictMode>,
)
