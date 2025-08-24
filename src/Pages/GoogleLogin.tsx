import styled from "styled-components";

import Background from '../Icons/BackgroundBasic.png';
import GoogleLogo from '../Icons/GoogleIcon.png';
import Logo from '../Icons/Logo.svg';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  background-image: url(${Background});
  background-size: cover;
  background-position: center;
  display: flex; 
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MainLogo = styled.img`
  width: 84px;
  height: auto;
  margin-bottom: 1.5rem;
`;

const MainText = styled.div`
  color: #FFF;
  font-size: 54px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  margin-bottom: 1rem;
`;

const SubText = styled.div`
  color: #FFF;
  text-align: center;
  font-family: "SUIT Variable";
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 3rem;
`;

const GoogleLoginButton = styled.button`
  display: inline-flex;
  padding: 20px 100px;
  align-items: flex-end;
  gap: 12px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 100px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  color: #444;

  &:hover {
    background-color: #f5f5f5;
  }

  img {
    width: 24px;
    height: 24px;
  }
`;


const GoogleLoginPage = () => {

  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const REDIRECT_URI = 'https://truth-ai-two.vercel.app/oauth/callback';

  const handleLogin = () => {
    console.log("구글 로그인 시도");
    const url = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=openid%20email%20profile`;
    window.location.href = url;
  };


  return (
    <Wrapper>
      <MainLogo src={Logo} alt="메인로고이미지" />
      <MainText>TruthAI</MainText>
      <SubText>로그인 후 AI 검증을 경험해보세요!</SubText>
      <GoogleLoginButton onClick={handleLogin}>
          <img src={GoogleLogo} alt="Google Logo" />
          구글로 로그인하기
      </GoogleLoginButton>
    </Wrapper>
  );
};

export default GoogleLoginPage;