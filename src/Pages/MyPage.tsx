import React from "react";
import styled from "styled-components";
import Background from "../Icons/BackgroundBasic.png";
import Topbar from "../Components/Topbar";
import RoundArrowBtn from "../Components/RoundArrowBtn";
import { useNavigate } from "react-router-dom";

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

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`

const Modal = styled.div`
    width: 25rem;
    height: 18rem;
    background-color: #fff;
    border-radius: 20px;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
`

const ModalTitle = styled.h2`
    font-size: 20px;
    font-weight: 600;
    color: #000;
    margin: 2rem 0 0 0;
    text-align: center;
`

const ModalContent = styled.p`
    font-size: 14px;
    font-weight: 600;
    color: #494949;
    line-height: 1.5;
    text-align: center;
    margin: 0 2rem;
    white-space: pre-line;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ModalButtons = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 4rem;
`

const ModalButton = styled.button`
    flex: 1;
    border-radius: 0px;
    padding: 0.75rem 1.5rem;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:focus {
        outline: none;
    }

    &.primary {
        border-bottom-left-radius: 20px;
        border: none;
        background-color: #EFEFEF;
        color: #494949;

        &:hover {
            background-color: #E8E8E8;
            outline: none;
        }
    }

    &.secondary {
        border-bottom-right-radius: 20px;
        border: none;
        background-color: #3B5AF7;
        color: #ffffff;

        &:hover {
            background-color: #2E4BD8;
            outline: none;
        }
    }
`

const Persona = styled.div`
    width: 100%;
    font-size: 14px;
    font-weight: 600;
    color: #CECECE;
`


const MyPage = () => {
    const [profileImage, setProfileImage] = React.useState<string | null>(null);
    const [showModal, setShowModal] = React.useState(false);
    const [showProfileEditModal, setShowProfileEditModal] = React.useState(false);
    const [userInfo, setUserInfo] = React.useState('');
    const [persona, setPersona] = React.useState('AI가 필요한 사람');
    
    const navigate = useNavigate();

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

    const handleProfileEdit = () => {
        setUserInfo(persona === 'AI가 필요한 사람' ? '' : persona);
        setShowProfileEditModal(true);
    };

    const handleProfileEditConfirm = () => {
        localStorage.setItem('userInfo', userInfo);
        setPersona(userInfo || 'AI가 필요한 사람');
        setShowProfileEditModal(false);
        setUserInfo('');
        
        // TODO: Send to backend
        // sendToBackend({ userInfo, persona: userInfo || 'AI가 필요한 사람' });
    };

    const handleProfileEditCancel = () => {
        setShowProfileEditModal(false);
        setUserInfo('');
    };

    const handleModalConfirm = () => {
        setShowModal(false);
    };

    const handleModalCancel = () => {
        setShowModal(false);
    };

    React.useEffect(() => {
        const savedImage = localStorage.getItem('profileImage');
        if (savedImage) {
            setProfileImage(savedImage);
        }
        
        const savedUserInfo = localStorage.getItem('userInfo');
        if (savedUserInfo) {
            setUserInfo(savedUserInfo);
            setPersona(savedUserInfo);
        }
    }, []);

    return (
        <Wrapper>
            <Topbar/>
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
                            <Persona>{persona}</Persona>
                            <Profile>사용자</Profile>
                            <UserName>user@gmail.com</UserName>
                        </div>
                    <RoundArrowBtn fontSize="12px" showArrow={false} height="2.5rem" onClick={handleProfileEdit}>내 정보 수정하기 &nbsp; {`>`}</RoundArrowBtn>
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
                        <LinkItem onClick={() => {navigate('/question')}}>문의하기</LinkItem>
                        <LinkItem onClick={() => {}}>로그아웃</LinkItem>
                        <LinkItem onClick={() => {}} $isRed>탈퇴하기</LinkItem>
                    </LinkSection>
                </SubWrapper>

            </MainWrapper>

            {showModal && (
                <ModalOverlay>
                    <Modal>
                        <ModalTitle>환각여부 검증기능 사용불가</ModalTitle>
                        <ModalContent> {`하나의 AI를 사용하였기 때문에 환각 여부를
                        검증할 수 없습니다.
                        여러 AI를 사용하여 다시 답변을 생성하시겠습니까?`}
                        </ModalContent>
                        <ModalButtons>
                            <ModalButton className="primary" onClick={handleModalConfirm}>
                                돌아가기
                            </ModalButton>
                            <ModalButton className="secondary" onClick={handleModalCancel}>
                                다시 생성하기
                            </ModalButton>
                        </ModalButtons>
                    </Modal>
                </ModalOverlay>
            )}

            {showProfileEditModal && (
                <ModalOverlay>
                    <Modal>
                        <ModalTitle>내 정보 수정하기</ModalTitle>
                        <ModalContent>
                            <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
                                {`AI는 사용자가 누구인지에 따라 답변 방식을 달리합니다.
                                자세히 작성할수록 더욱 나에게 맞는 응답을 얻을 수 있어요`}
                            </div>
                            <div style={{ width: '100%', textAlign: 'left', marginBottom: '0.25rem' }}>
                                <label style={{ fontSize: '14px', fontWeight: '600', color: '#494949' }}>내 정보</label>
                            </div>
                            <input
                                type="text"
                                placeholder="예) 마케팅 직군 직장인"
                                value={userInfo}
                                onChange={(e) => setUserInfo(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '1rem 0.5rem',
                                    border: '1px solid #CECECE',
                                    borderRadius: '4px',
                                    fontSize: '14px',
                                    marginBottom: '1rem',
                                    outline: 'none'
                                }}
                            />
                        </ModalContent>
                        <ModalButtons>
                            <ModalButton className="primary" onClick={handleProfileEditCancel}>
                                뒤로가기
                            </ModalButton>
                            <ModalButton className="secondary" onClick={handleProfileEditConfirm}>
                                저장하기
                            </ModalButton>
                        </ModalButtons>
                    </Modal>
                </ModalOverlay>
            )}

        </Wrapper>
    )
}

export default MyPage;