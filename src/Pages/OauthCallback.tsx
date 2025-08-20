import axios from "axios";
import { useSearchParams, useNavigate, redirect } from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components";


const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const OAuthCallback = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const code = params.get("code"); // OAuth 콜백에서 받은 authorization code
  console.log("OAuth 콜백에서 받은 code:", code);

  useEffect(() => {
    if (!code) return;

    const fetchLogin = async () => {
      try {
        console.log("로그인 요청 중...");

        // 인가 코드 POST로 요청
        const res = await axios.post('/auth/login', {
          token: code,
          redirectUri: 'http://localhost:5173/oauth/callback', // 필요하면
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
          responseType: 'text',
        })

        console.log("✅ 백엔드 응답 (JWT):", res.data);

        const jwt = res.data;
        if (jwt) {
          localStorage.setItem("token", jwt); // 인가코드 저장
          navigate("/FeatChoice"); // 기능 선택 페이지로 이동
        } else {
          console.warn("토큰 없음", res.data);
        }
      } catch (error) {
        console.error("❌ 로그인 실패", error);
      }
    };

    fetchLogin();
  }, [code, navigate]);

  return (
    <Wrapper>
      <p>로그인 처리 중... API 수정 필요!!</p>
    </Wrapper>
  );
};

export default OAuthCallback;