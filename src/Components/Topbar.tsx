import React, { useState, useEffect } from "react";
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

const ProfileWrapper = styled.div<{ $profileImage?: string | null }>`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: ${props => props.$profileImage ? 'transparent' : '#888'};
    flex-shrink: 0;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const ProfileDropdown = styled.div`
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 0.5rem;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    min-width: 160px;
    z-index: 1001;
    overflow: hidden;
`;

const DropdownItem = styled.div`
    padding: 0.75rem 1rem;
    cursor: pointer;
    color: #333;
    font-size: 14px;
    font-weight: 500;
    transition: background-color 0.2s;
    
    &:hover {
        background-color: #f5f5f5;
    }
    
    &:first-child {
        border-bottom: 1px solid #eee;
        font-weight: 600;
        color: #666;
    }
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
    const isLoggedIn = () => !!sessionStorage.getItem("accessToken");
    const isMyFolderPage = location.pathname.startsWith('/myfolder');
    
    // localStorage에서 프로필 이미지와 사용자 이름 가져오기
    const profileImage = localStorage.getItem("profileImage");
    const userName = localStorage.getItem("userName");
    
    // 드롭다운 메뉴 상태
    const [showDropdown, setShowDropdown] = useState(false);
    
    // 로그아웃 처리
    const handleLogout = () => {
        // 세션 스토리지와 로컬 스토리지 클리어
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        localStorage.removeItem('profileImage');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        
        // 드롭다운 닫기
        setShowDropdown(false);
        
        // 메인 페이지로 이동
        navigate('/mainpage');
    };
    
    // 프로필 클릭 시 드롭다운 토글
    const handleProfileClick = () => {
        setShowDropdown(!showDropdown);
    };
    
    // 프로필 이미지 클릭 시 마이페이지로 이동
    const handleProfileImageClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // 이벤트 버블링 방지
        navigate('/mypage');
    };
    
    // 외부 클릭 시 드롭다운 닫기
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element;
            if (!target.closest('.profile-wrapper')) {
                setShowDropdown(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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
                <NavItem $isActive={isMyFolderPage} onClick={() => navigate('/myfolderpl')}>내 폴더</NavItem>
                <NavItem $isActive={isQuestionPage} onClick={() => navigate('/question')}>문의하기</NavItem>
            </NavigationWrapper>
        </LeftGroup>
        {isLoggedIn() ? (
                <ProfileWrapper 
                $profileImage={profileImage}
                onClick={handleProfileClick}
                title={userName ? `${userName}님의 프로필` : '프로필'}
                className="profile-wrapper"
            >
                {profileImage ? (
                    <img src={profileImage} alt="프로필" onClick={handleProfileImageClick} />
                ) : (
                    <span style={{ color: '#fff', fontSize: '16px' }} onClick={handleProfileImageClick}>👤</span>
                )}
                
                {showDropdown && (
                    <ProfileDropdown>
                        <DropdownItem>{userName || '사용자'}</DropdownItem>
                        <DropdownItem onClick={() => navigate('/mypage')}>마이페이지</DropdownItem>
                        <DropdownItem onClick={handleLogout}>로그아웃</DropdownItem>
                    </ProfileDropdown>
                )}
            </ProfileWrapper>
    ) : (
            <LoginButton onClick={() => navigate('/login')}>Log In</LoginButton>
        )}
        </Wrapper>
    );
};

    export default Topbar;
