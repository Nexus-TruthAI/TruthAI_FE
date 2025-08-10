import React from "react";
import styled from "styled-components";
import Logo from "../Icons/Logo.svg";
import { useLocation, useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 4rem;
    background-color: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
`;

const LeftGroup = styled.div`
    display: flex;
    align-items: center;
`;

const LogoWrapper = styled.div`
    width: 7rem;
    display: flex;
    align-items: center;
    margin-right: 6rem;
    gap: 0.5rem;

    &:hover {
        cursor: pointer;
    }
`;

const NavigationWrapper = styled.ul`
    display: flex;
    list-style: none;
    gap: 5rem;
    margin: 0;
    padding: 0;
    font-size: 1rem;
    font-weight: 500;
`;

const NavItem = styled.li<{ $isActive?: boolean }>`
    cursor: pointer;
    color: ${props => props.$isActive ? '#C2CCFD' : '#fff'};
    &:hover {
        color : #C2CCFD;
    }
`;

const ProfileWrapper = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #888;
    flex-shrink: 0;
`;

const LoginButton = styled.button`
    background-color: #3B5AF7;
    color: #fff;
    border: none;
    border-radius: 20px;
    padding: 0.7rem 1rem;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
    
    &:hover {
        background-color: #3551de;
    }

    &:focus {
        outline: none;
    }
`;

const Topbar = () => {
    const location = useLocation();
    const isQuestionPage = location.pathname === '/question';
    const isFeatChoicePage = location.pathname === '/featchoice';
    const isMainPage = location.pathname === '/mainpage';
    const navigate = useNavigate();
    const isLoggedIn = () => !!localStorage.getItem("accessToken");

    return (
        <Wrapper>
        <LeftGroup>
            <LogoWrapper onClick={() => navigate('/mainpage')}>
            <img src={Logo} alt="logo" style={{ height: "24px" }} />
            TruthAI
            </LogoWrapper>
            <NavigationWrapper>
                <NavItem $isActive={isMainPage} onClick={() => navigate('/mainpage')}>서비스 소개</NavItem>
                <NavItem $isActive={isFeatChoicePage} onClick={() => navigate('/featchoice')}>AI 기능 선택</NavItem>
                <NavItem>내 폴더</NavItem>
                <NavItem $isActive={isQuestionPage} onClick={() => navigate('/question')}>문의하기</NavItem>
            </NavigationWrapper>
        </LeftGroup>
        {isLoggedIn() ? (
            <ProfileWrapper />
        ) : (
            <LoginButton onClick={() => navigate('/login')}>Log In</LoginButton>
        )}
        </Wrapper>
    );
};

    export default Topbar;
