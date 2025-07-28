import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Pages/GoogleLogin";
import FeatChoicePage from "./Pages/FeatChoice";
import OAuthCallbackPage from "./Pages/OauthCallback";

// 로그인 여부 확인 예시
const isLoggedIn = () => !!localStorage.getItem("accessToken");

function App() {
  return (
    <Router>
      <Routes>
        {/* ❓ 기본 진입 시 로그인 여부 따라 리다이렉트 해야 할 페이지가 달라진다면 수정 필요*/}
        <Route
          path="/"
          element={
            (() => {
              console.log("기본 경로 접근 -> /login 리다이렉트 실행");
              return <Navigate to="/login" />;
            })()
          }
        />

        {/* 로그인 페이지 */}
        {/* 📌 로그인 여부 따라 리다이렉트 필요  */}
        <Route
          path="/login"
          element={
            <LoginPage />
          }
        />

        {/* 기능 선택 페이지 (로그인 필요) */}
        <Route
          path="/feat-choice"
          element={
            isLoggedIn() ? <FeatChoicePage /> : <Navigate to="/login" />
          }
        />

        {/* OAuth 콜백 페이지 */}
        <Route
          path="/oauth/callback"
          element={
            <OAuthCallbackPage />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;