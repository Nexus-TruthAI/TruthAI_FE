import axios from "axios";
import { useSearchParams, useNavigate} from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components";

import api from "../api";


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
        const res = await api.post('/auth/login', {
          token: code,
          redirectUri: 'http://localhost:5173/oauth/callback', // 필요하면
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        })

        console.log("✅ 백엔드 응답 (JWT):", res.data);

        const { accessToken, refreshToken } = res.data;

        if (accessToken && refreshToken) {
          // 세션 스토리지에 저장
          sessionStorage.setItem('accessToken', accessToken);
          sessionStorage.setItem('refreshToken', refreshToken);

          navigate("/FeatChoice");
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