import { Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "./Context/AuthContext";
import ProtectedRoute from "./Route/ProtectedRoute";

import LoginPage from "./Pages/GoogleLogin";
import FeatChoicePage from "./Pages/FeatChoice";
import OAuthCallbackPage from "./Pages/OauthCallback";
import CrossCheckQ from "./Pages/CrossCheckQ";
import CrossCheckL from "./Pages/CrossCheckL";
import CrossCheckA from "./Pages/CrossCheckA";
import PromptOptimize from "./Pages/PromptOptimize";
import PromptOptimizeDetails from "./Pages/PromptOptimizeDetails";
import FactCheck from "./Pages/FactCheck";
import Question from "./Pages/Question";
import MyPage from "./Pages/MyPage";
import MainPage from "./Pages/MainPage";
import MyFolderPL from "./Pages/MyFolderPL";
import MyFolderCL from "./Pages/MyFolderCL";
import MyFolderPD from "./Pages/MyFolderPD";
import MyFolderCross from "./Pages/MyFolderCross";
import MyFolderPrompt from "./Pages/MyFolderPrompt";


function App() {
  const { isLoggedIn } = useAuth();
  console.log("App - isLoggedIn:", isLoggedIn);

  return (
      <Routes>
        {/* ❓ 기본 진입 시 로그인 여부 따라 리다이렉트 해야 할 페이지가 달라진다면 수정 필요*/}
        <Route
          path="/"
          element={
            <MainPage />
          }
        />
        {/* 로그인 페이지 */}
        {/* 📌 로그인 여부 따라 리다이렉트 필요  */}
        <Route
          path="/login"
          element={
            isLoggedIn ? <MainPage /> : <LoginPage />
          }
        />

        {/* 기능 선택 페이지 (로그인 필요) */}
        <Route
          path="/featchoice"
          element={
            <ProtectedRoute>
              <FeatChoicePage />
            </ProtectedRoute>
          }
        />

        {/* OAuth 콜백 페이지 */}
        <Route
          path="/oauth/callback"
          element={
            <OAuthCallbackPage />
          }
        />

        <Route
          path="/crosscheckl"
          element={
            isLoggedIn ? <CrossCheckL /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/crosscheckq"
          element={
            isLoggedIn ? <CrossCheckQ /> : <Navigate to="/login" />
          }
        />        
        
        <Route
          path="/crosschecka"
          element={
            isLoggedIn ? <CrossCheckA /> : <Navigate to="/login" />
          }
        />
        
        <Route
          path="/crosschecka/:answerId"
          element={
            isLoggedIn ? <CrossCheckA /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/promptoptdetail"
          element={
            isLoggedIn ? <PromptOptimizeDetails /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/promptopt"
          element={
            isLoggedIn ? <PromptOptimize /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/promptopt/:id" 
          element={
            isLoggedIn ? <PromptOptimize /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/question"
          element={
            isLoggedIn ? <Question /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/factcheck"
          element={
            isLoggedIn ? <FactCheck /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/mypage"
          element={
            isLoggedIn ? <MyPage /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/mainpage"
          element={
            <MainPage />
          }
        />

        <Route
          path="/myfolderpl"
          element={
            isLoggedIn ? <MyFolderPL /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/myfoldercl"
          element={
            isLoggedIn ? <MyFolderCL /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/promptdetail/:id"
          element={
            isLoggedIn ? <MyFolderPD /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/myfoldercross/:id"
          element={
            isLoggedIn ? <MyFolderCross /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/myfolderprompt/:id"
          element={
            isLoggedIn ? <MyFolderPrompt /> : <Navigate to="/login" />
          }
        />

      </Routes>
  );
}

export default App;