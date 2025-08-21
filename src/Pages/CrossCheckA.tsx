import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Background from "../Icons/BackgroundLong.png"
import Topbar from "../Components/Topbar";
import Sidebar from "../Components/Sidebar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CopyIcon from "../Icons/Copy.svg";
import BookmarkIcon from "../Icons/BookmarkEmpty.png";
import BookmarkFillIcon from "../Icons/BookmarkFill.png";
import BookmarkModal from "../Components/BookmarkModal";
import type { LLMResponse } from "../services/llmService";

const Wrapper = styled.div`
    margin: 0;
    padding: 0;
    width: 100vw;
    min-height: 100vh;
    background-image: url(${Background});
    background-size: cover;
    background-position: center;
`

const CrossCheckWrapper = styled.div`
    display: flex;
    flex-direction: row;
    padding-top: 4rem;
`

const MainWrapper = styled.div`
    margin: 0;
    min-height: calc(100vh - 8rem);
    width: calc(100vw - 15.5rem);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 5rem;
`

const MainText = styled.div`
    color: #fff;
    font-size: 54px;
    font-weight: 800;
    margin-bottom: 1.25rem;
    text-align: center;
`

const Highlight = styled.span`
    color: #C2CCFD;
`

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 1000px;
`

const TabContainer = styled.div`
    display: flex;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 100px;
    padding: 0.25rem;
    margin-bottom: 2rem;
    width: fit-content;
`

const Tab = styled.button<{ $isActive: boolean }>`
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 100px;
    font-size: 14px;
    font-weight: ${props => props.$isActive ? '800' : '500'};
    cursor: pointer;
    transition: all 0.2s ease;
    background-color: ${props => props.$isActive ? '#ffffff' : 'transparent'};
    color: ${props => props.$isActive ? '#3B5AF7' : '#ffffff'};
    box-shadow: ${props => props.$isActive ? '0 2px 4px rgba(0, 0, 0, 0.1)' : 'none'};

    &:hover {
        background-color: ${props => props.$isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.5)'};
    }

    &:focus {
        outline: none;
    }
`

const ContentArea = styled.div`
    width: 44rem;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 2rem;
    height: auto;
    max-height: 50rem;
    margin-bottom: 2rem;
    overflow: auto;
    position: relative;
`

const ContentText = styled.div`
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.6;
    white-space: pre-line;
    padding-bottom: 3rem;
`

const IconContainer = styled.div`
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    display: flex;
    gap: 0.75rem;
`

const IconButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }

    img.copy {
        width: 1.25rem;
        height: 1.25rem;
        filter: brightness(0) invert(1);
    }

    img.bookmark {
        width: 1.5rem;
        height: 1.5rem;
    }

    &:focus {
        outline : none;
    }
`

const ActionButton = styled.button`
    padding: 1rem 2rem;
    background-color: #F5F5F5;
    color: #333;
    border: none;
    border-radius: 100px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background-color: #E8E8E8;
    }

    &:focus {
        outline : none;
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
    height: 16.625rem;
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

const CrossCheckA = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { answerId } = useParams(); // URL 파라미터에서 answerId 추출

    // 선택된 AI들 (location.state에서 가져오거나 기본값)
    const selectedAIs = location.state?.selectedAIs || [];
    
    // API 응답 데이터
    const responses: LLMResponse[] = location.state?.responses || [];
    
    // answerId가 있으면 console에 출력 (나중에 백엔드에서 해당 답변 데이터를 가져올 때 사용)
    useEffect(() => {
        if (answerId) {
            console.log('📁 저장된 답변 ID:', answerId);
            // TODO: 백엔드에서 answerId로 저장된 답변 데이터를 가져오는 로직
            // const savedAnswer = await getSavedAnswer(answerId);
        }
    }, [answerId]);
    
    // 선택된 AI 중 첫 번째를 기본 탭으로 설정
    const [activeTab, setActiveTab] = useState('chatgpt');
    const [showModal, setShowModal] = useState(false);
    const [showBookmarkModal, setShowBookmarkModal] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
    
    // 각 AI별 북마크 상태
    const [bookmarkStates, setBookmarkStates] = useState({
        chatgpt: false,
        claude: false,
        gemini: false,
        perplexity: false
    });

    // 임시 폴더 데이터 (백엔드에서 받아올 예정)
    const tempFolders = [
        "프롬프트 폴더 1",
        "AI 교차검증 폴더",
        "개인 프로젝트",
        "학습 자료",
        "아이디어 저장소"
    ];

    // location.state가 변경될 때 activeTab 업데이트
    useEffect(() => {
        if (selectedAIs.length > 0) {
            setActiveTab(selectedAIs[0]);
        }
    }, [selectedAIs]);

    // API 응답을 기반으로 AI별 답변 데이터 생성
    const aiResponses = {
        chatgpt: (() => {
            const response = responses.find(r => r.llmModel.toLowerCase() === 'gpt');
            return response ? response.answer : '생성된 결과가 없습니다.';
        })(),
        claude: (() => {
            const response = responses.find(r => r.llmModel.toLowerCase() === 'claude');
            return response ? response.answer : '생성된 결과가 없습니다.';
        })(),
        gemini: (() => {
            const response = responses.find(r => r.llmModel.toLowerCase() === 'gemini');
            return response ? response.answer : '생성된 결과가 없습니다.';
        })(),
        perplexity: (() => {
            const response = responses.find(r => r.llmModel.toLowerCase() === 'perplexity');
            return response ? response.answer : '생성된 결과가 없습니다.';
        })(),
    };

    const tabs = [
        { id: 'chatgpt', name: 'ChatGPT' },
        { id: 'claude', name: 'Claude' },
        { id: 'gemini', name: 'Gemini' },
        { id: 'perplexity', name: 'Perplexity' }
    ];

    const handleVerificationClick = () => {
        if (selectedAIs.length === 1) {
            setShowModal(true);
        } else {
            navigate('/verification');
        }
    };

    const handleModalConfirm = () => {
        setShowModal(false);
    };

    const handleModalCancel = () => {
        setShowModal(false);
        navigate('/crosscheckq');
    };

    const handleBookmarkClick = () => {
        setShowBookmarkModal(true);
    };

    const handleBookmarkSave = () => {
        if (selectedFolder) {
            // 북마크 상태 업데이트
            setBookmarkStates(prev => ({
                ...prev,
                [activeTab]: true
            }));
            setShowBookmarkModal(false);
            setSelectedFolder(null);
            alert(`${selectedFolder}에 북마크가 저장되었습니다.`);
        }
    };

    const handleBookmarkModalClose = () => {
        setShowBookmarkModal(false);
        setSelectedFolder(null);
    };

    const handleCopyClick = async () => {
        const currentResponse = aiResponses[activeTab as keyof typeof aiResponses];
        if (currentResponse && currentResponse !== '생성된 결과가 없습니다.') {
            try {
                await navigator.clipboard.writeText(currentResponse);
                // 복사 성공 시 피드백 (선택사항)
                console.log('텍스트가 클립보드에 복사되었습니다.');
            } catch (err) {
                console.error('복사 실패:', err);
            }
        }
    };

    return (
        <Wrapper>
            <Topbar/>
            <CrossCheckWrapper>
                <Sidebar/>
                <MainWrapper>
                    <MainText>각 <Highlight>AI 모델의 답변</Highlight>을 확인하세요</MainText>
                    <ContentWrapper>
                        <TabContainer>
                            {tabs.map(tab => (
                                <Tab 
                                    key={tab.id}
                                    $isActive={activeTab === tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    {tab.name}
                                </Tab>
                            ))}
                        </TabContainer>
                        
                        <ContentArea>
                            <ContentText>
                                {aiResponses[activeTab as keyof typeof aiResponses]}
                            </ContentText>
                            {aiResponses[activeTab as keyof typeof aiResponses] !== '생성된 결과가 없습니다.' && (
                                <IconContainer>
                                    <IconButton onClick={handleBookmarkClick}>
                                        {bookmarkStates[activeTab as keyof typeof bookmarkStates] ? (
                                            <img src={BookmarkFillIcon} alt="Bookmark" className="bookmark" />
                                        ) : (
                                            <img src={BookmarkIcon} alt="Bookmark" className="bookmark" />
                                        )}
                                    </IconButton>
                                    <IconButton onClick={handleCopyClick}>
                                        <img src={CopyIcon} alt="Copy" className="copy" />
                                    </IconButton>
                                </IconContainer>
                            )}
                        </ContentArea>
                        
                        <ActionButton onClick={handleVerificationClick}>
                            환각 여부 검증하기 {'>'}
                        </ActionButton>
                    </ContentWrapper>
                </MainWrapper>
            </CrossCheckWrapper>

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

            {showBookmarkModal && (
                <BookmarkModal
                    folders={tempFolders}
                    onClose={handleBookmarkModalClose}
                    onSave={handleBookmarkSave}
                    selectedFolder={selectedFolder}
                    setSelectedFolder={setSelectedFolder}
                />
            )}
        </Wrapper>  
    );
}

export default CrossCheckA;