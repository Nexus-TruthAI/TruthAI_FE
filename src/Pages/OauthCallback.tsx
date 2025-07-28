import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
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
        // token 으로 인가 코드 전달
        console.log("로그인 요청 중...");
        const res = await axios.get("http://3.36.75.39:8080/auth/auth/login", {
          params: { token: code },
          responseType: "text", // JWT가 문자열일 가능성 대비
        });

        console.log("✅ 백엔드 응답 (JWT):", res.data);

        const jwt = res.data; // JWT 문자열
        if (jwt) {
          localStorage.setItem("token", jwt); // 토큰 저장
          navigate("/feat-choice");           // 기능 선택 페이지로 이동
        } else {
          console.warn("토큰 없음", res.data);
        }
      } catch (error) {
        console.error("❌ 로그인 실패", error);
      }
    };

    fetchLogin();
  }, [code]);

  return (
    <Wrapper>
      <p>로그인 처리 중... 콘솔 확인!!</p>
    </Wrapper>
  );
};

export default OAuthCallback;