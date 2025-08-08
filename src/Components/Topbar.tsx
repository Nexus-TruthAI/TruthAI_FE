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
    background-color: transparent;
    color: #fff;
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

const Topbar = () => {
    const location = useLocation();
    const isQuestionPage = location.pathname === '/question';
    const navigate = useNavigate();

    return (
        <Wrapper>
        <LeftGroup>
            <LogoWrapper>
            <img src={Logo} alt="logo" style={{ height: "24px" }} />
            TruthAI
            </LogoWrapper>
            <NavigationWrapper>
                <NavItem>서비스 소개</NavItem>
                <NavItem>AI 기능 소개</NavItem>
                <NavItem>내 폴더</NavItem>
                <NavItem $isActive={isQuestionPage} onClick={() => navigate('/question')}>문의하기</NavItem>
            </NavigationWrapper>
        </LeftGroup>
        <ProfileWrapper />
        </Wrapper>
    );
};

    export default Topbar;
