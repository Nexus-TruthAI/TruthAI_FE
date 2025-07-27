import React from "react";
import styled from "styled-components";
import Logo from "../Icons/Logo.svg";

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

const NavItem = styled.li`
    cursor: pointer;
    &:hover {
        text-decoration: underline;
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
                <NavItem>문의하기</NavItem>
            </NavigationWrapper>
        </LeftGroup>
        <ProfileWrapper />
        </Wrapper>
    );
};

    export default Topbar;
