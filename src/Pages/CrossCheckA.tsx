import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Background from "../Icons/BackgroundLong.png"
import Topbar from "../Components/Topbar";
import Sidebar from "../Components/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import CopyIcon from "../Icons/Copy.svg";
import BookmarkIcon from "../Icons/Bookmark.svg";

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
`

const MainWrapper = styled.div`
    margin: 0;
    min-height: calc(100vh - 4rem);
    width: calc(100vw - 15.5rem);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 2rem;
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

    // 선택된 AI들 (location.state에서 가져오거나 기본값)
    const selectedAIs = location.state?.selectedAIs || [];
    
    // 선택된 AI 중 첫 번째를 기본 탭으로 설정
    const [activeTab, setActiveTab] = useState('chatgpt');
    const [showModal, setShowModal] = useState(false);

    // location.state가 변경될 때 activeTab 업데이트
    useEffect(() => {
        if (selectedAIs.length > 0) {
            setActiveTab(selectedAIs[0]);
        }
    }, [selectedAIs]);

    // AI별 답변 데이터 (실제로는 백엔드에서 받아올 데이터)
    const aiResponses = {
        chatgpt: selectedAIs.includes('chatgpt') ? `✅ 2025년 인공지능 트렌드 분석
(기술 · 산업 · 정책 측면별 핵심 트렌드)
1. 기술 측면
멀티모달 AI의 고도화
텍스트, 이미지, 음성, 비디오를 동시에 처리하는 모델이 표준화됨.
예시: OpenAI GPT-5, Google Gemini가 코드 작성·영상 분석·프레젠테이션 제작까지 통합 지원.
에이전트형 AI 확산
단순 챗봇을 넘어 자동으로 작업 실행, 툴 연결, 반복 업무 관리 가능.
사례: AutoGPT, Devin(코딩 AI), 기업용 AI 오토메이션 플랫폼 증가.
경량화 및 온디바이스 AI
모바일·IoT에서 실시간 AI 처리 가능, 개인정보 보호 강화.
예시: Apple Neural Engine, Qualcomm AI Engine 기반 스마트폰 내 AI 앱.
2. 산업 측면
AI-First 비즈니스 모델 확대
AI가 핵심 서비스로 자리잡는 SaaS, 콘텐츠 제작, 교육 서비스 증가.
사례: Runway(영상 생성), Perplexity AI(검색+챗봇).
AI + 로보틱스 결합 가속
물류, 제조, 헬스케어에서 자율로봇과 AI 통합.
예시: Amazon 로보틱스 센터, Tesla Optimus(휴머노이드 로봇).
초개인화 서비스 강화
소비자 데이터 기반 맞춤형 콘텐츠·쇼핑·의료 서비스.
사례: Netflix 개인화 추천, AI 기반 건강 관리 앱.
3. 정책 측면
AI 규제 및 거버넌스 강화
EU AI Act 발효, 미국·한국도 위험 기반 규제 도입.
예시: 고위험 AI(의료, 금융)는 사전 심사 및 인증 의무화.
AI 윤리·공정성 표준화
데이터 편향, 설명 가능성, 투명성 확보를 위한 국제 가이드라인 제정.
사례: OECD AI 원칙, ISO AI 표준 확대.
AI 보안·프라이버시 보호 강화
생성형 AI 악용 대응, 개인정보 유출 방지 위한 기술·법제 강화.
예시: 워터마크 삽입, 데이터 로컬리제이션 규제.
🔥 한 줄 요약: 2025년 AI는 멀티모달·에이전트형 기술, 산업의 AI-First 전환, 정책의 규제·윤리 표준화가 핵심 흐름입니다.` : '생성된 결과가 없습니다.',
        claude: selectedAIs.includes('claude') ? `안녕하세요! 2025년 AI 트렌드에 대해 분석해드리겠습니다.

주요 트렌드:
1. 멀티모달 AI 발전
2. 에이전트형 AI 확산
3. AI 규제 강화

이러한 변화는 기술과 사회의 조화를 추구하는 방향으로 진행될 것입니다.` : '생성된 결과가 없습니다.',
        gemini: selectedAIs.includes('gemini') ? `2025년 AI 트렌드 분석:

기술적 측면에서 가장 주목할 점은 멀티모달 AI의 고도화입니다. 텍스트, 이미지, 음성, 비디오를 통합적으로 처리하는 능력이 표준이 될 것입니다.

산업적 측면에서는 AI-First 비즈니스 모델이 확산될 것으로 예상됩니다.` : '생성된 결과가 없습니다.',
        perplexity: selectedAIs.includes('perplexity') ? `반갑습니다! 2025년 AI 트렌드에 대한 분석입니다.

핵심 변화:
- 멀티모달 AI 표준화
- 에이전트형 AI 확산
- AI 규제 프레임워크 구축

이러한 트렌드는 AI의 실용성과 안전성을 동시에 추구하는 방향으로 발전할 것입니다.` : '생성된 결과가 없습니다.'
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
                                    <IconButton>
                                        <img src={BookmarkIcon} alt="Bookmark" />
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
        </Wrapper>  
    );
}

export default CrossCheckA;