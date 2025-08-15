import React from "react";
import styled from "styled-components";
import Background from "../Icons/BackgroundBasic.png";
import Topbar from "../Components/Topbar";
import RoundArrowBtn from "../Components/RoundArrowBtn";

const Wrapper = styled.div`
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    background-image: url(${Background});
    background-size: cover;
    background-position: center;
`

const MainWrapper = styled.div`
    margin: 0 4rem;
    padding: 4rem 0 0 0;
    height: calc(100vh - 4rem);
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const MainText = styled.div`
    font-size: 40px;
    font-weight: 800;
    color: #fff;
`

const ProfileWrapper = styled.div`
    font-size: 28px;
    font-weight: 600;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 0.5rem;
`

const Profile = styled.div`
    font-size: 2rem;
    font-weight: 800;
`

const UserName = styled.div`
    font-size: 1rem;
    font-weight: 400;
`

const ProfileImage = styled.div`
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background-color: #888;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: #fff;
    transition: all 0.2s ease;
    
    &:hover {
        transform: scale(1.05);
    }
`

const ProfileImageInput = styled.input`
    display: none;
`

const SubWrapper = styled.div`
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const BoxWrapper = styled.div`
    width: 67.5rem;
    height: 120%;
    background-color: rgb(255, 255, 255, 0.1);
    color: #fff;
    border-radius: 10px;
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const Title = styled.div`
    font-size: 20px;
    font-weight: 800;
    margin-bottom: 1rem;
`

const SubTitle = styled.div`
    font-size: 1rem;
    font-weight: 400;
    margin-bottom: 0.5rem;
    color: #ccc;
`

const BodyText = styled.div`
    font-size: 14px;
    font-weight: 400;
    color: #ccc;
    line-height: 1.5;
`

const SubscribeButton = styled.button`
    background-color: #3B5AF7;
    color: #fff;
    border: none;
    padding: 1rem 2rem;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    align-self: center;
    margin-top: 1rem;
    width: 100%;

    &:hover {
        background-color: #3551de;
    }

    &:focus {
        outline: none;
    }
`

const LinkSection = styled.div`
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
`

const LinkItem = styled.div<{ $isRed?: boolean }>`
    font-size: 16px;
    font-weight: 500;
    color: ${props => props.$isRed ? '#ff6b6b' : '#fff'};
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
        color: ${props => props.$isRed ? '#ff5252' : '#C2CCFD'};
    }
`

const MyPage = () => {
    const [profileImage, setProfileImage] = React.useState<string | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                setProfileImage(result);
                localStorage.setItem('profileImage', result);
            };
            reader.readAsDataURL(file);
        }
    };

    React.useEffect(() => {
        const savedImage = localStorage.getItem('profileImage');
        if (savedImage) {
            setProfileImage(savedImage);
        }
    }, []);

    return (
        <Wrapper>
            <Topbar profileImage={profileImage}/>
            <MainWrapper>
                <MainText>내 프로필</MainText>
                <ProfileWrapper>
                    <ProfileImageInput
                        type="file"
                        id="profile-image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    <label htmlFor="profile-image">
                        <ProfileImage>
                            {profileImage ? (
                                <img 
                                    src={profileImage} 
                                    alt="프로필" 
                                    style={{ 
                                        width: '100%', 
                                        height: '100%', 
                                        borderRadius: '50%',
                                        objectFit: 'cover'
                                    }} 
                                />
                            ) : (
                                '프로필'
                            )}
                        </ProfileImage>
                    </label>
                    <div>
                        <Profile>사용자</Profile>
                        <UserName>user@gmail.com</UserName>
                    </div>
                    <RoundArrowBtn fontSize="16px">로그아웃</RoundArrowBtn>
                </ProfileWrapper>
                <SubWrapper>
                    <BoxWrapper>
                        <div>
                            <Title>나의 정기구독</Title>
                            <SubTitle>지금 TruthAI 정기구독을 시작하세요.</SubTitle>
                            <BodyText>정기구독으로 더 많은 프롬프트를 입력하고, AI 응답을 똑똑하게 분석할 수 있어요.</BodyText>
                        </div>
                        <SubscribeButton>구독 상품 둘러보기</SubscribeButton>
                    </BoxWrapper>
                    <LinkSection>
                        <LinkItem>구독 관리</LinkItem>
                        <LinkItem>문의하기</LinkItem>
                        <LinkItem $isRed>탈퇴하기</LinkItem>
                    </LinkSection>
                </SubWrapper>

            </MainWrapper>
        </Wrapper>
    )
}

export default MyPage;