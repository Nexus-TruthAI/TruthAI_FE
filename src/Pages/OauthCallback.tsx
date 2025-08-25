import { useSearchParams, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Background from "../Icons/BackgroundBasic.png";

import { useAuth } from "../Context/AuthContext";
import api from "../api";

import LoadingOverlay from "../Components/LoadingOverlay";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-image: url(${Background});
`;

const MainText = styled.div`
    font-size: 36px;
    font-weight: 800;
    color: #fff;
    margin-bottom: 2rem;
`


const OAuthCallback = () => {
  const [params] = useSearchParams();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const code = params.get("code"); // OAuth 콜백에서 받은 authorization code
  console.log("OAuth 콜백에서 받은 code:", code);

  useEffect(() => {
    if (!code) return;

    const fetchLogin = async () => {
      try {
        console.log("로그인 요청 중...");
        setIsLoading(true);

        // 인가 코드 POST로 요청
        const res = await api.post('/auth/login', {
          token: code,
          redirectUri: import.meta.env.VITE_REDIRECT_URI,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        })

        console.log("✅ 백엔드 응답 (JWT):", res.data);

        const { accessToken, refreshToken, user } = res.data;

        if (accessToken && refreshToken) {
          // 세션 스토리지에 토큰 저장
          sessionStorage.setItem('accessToken', accessToken);
          sessionStorage.setItem('refreshToken', refreshToken);
          
          // 사용자 정보가 있으면 localStorage에 저장
          if (user) {
            if (user.profileImage) {
              localStorage.setItem('profileImage', user.profileImage);
            }
            if (user.name) {
              localStorage.setItem('userName', user.name);
            }
            if (user.email) {
              localStorage.setItem('userEmail', user.email);
            }
          }

          login(); // ✅ 상태 업데이트
          setIsLoading(false);
          navigate("/mainpage");
        } else {
          console.warn("토큰 없음", res.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("❌ 로그인 실패", error);
        setIsLoading(false);
      }
    };

    fetchLogin();
  }, [code, navigate]);

  return (
    <Wrapper>
      <MainText>로딩중...</MainText>
      <LoadingOverlay done={!isLoading} />
    </Wrapper>
  );
};

export default OAuthCallback;