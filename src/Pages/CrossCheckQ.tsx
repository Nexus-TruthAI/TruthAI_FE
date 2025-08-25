import { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import type { LLMRequest } from "../services/llmService";

import Topbar from "../Components/Topbar";
import Sidebar from "../Components/Sidebar";
import Background from "../Icons/BackgroundBasic.png";
import CircleArrowBtn from "../Icons/CircleArrowBtn.svg";

const Wrapper = styled.div`
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
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
    height: calc(100vh - 4rem);
    width: calc(100vw - 15.5rem);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const MainText = styled.div`
    color: #fff;
    font-size: 54px;
    font-weight: 800;
    margin-bottom: 2.5rem;
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
    max-width: 800px;
`

const PromptContainer = styled.div`
    width: 100%;
    border-radius: 24px;
    padding: 0rem 2rem 2rem 2rem;
    margin-bottom: 2rem;
`

const PromptInputWrapper = styled.div`
    position: relative;
    width: 100%;
    margin-bottom: 1rem;
`
const ScrollArea = styled.div`
    width: 50rem;
    height: 10.25rem; 
    padding: 1.25rem 4rem 1.25rem 1.5rem;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    border: none;
    resize: none;
    color: #fff;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.6;
    box-sizing: border-box;
    box-shadow: 
        0 4px 6px rgba(0, 0, 0, 0.1),
        0 1px 3px rgba(0, 0, 0, 0.08);
    
    /* 가로 스크롤 없이 자동 줄바꿈 + 세로 스크롤 */
    overflow-y: auto;
    overflow-x: hidden;

    /* 줄바꿈 강제 */
    white-space: pre-wrap;
    word-break: break-word;

    /* 내부 마크다운 블록 요소에도 적용 */
    & > * {
        white-space: pre-wrap;
        word-break: break-word;
    }
`;

const PromptInput = styled.textarea`
    font-family: 'SUIT';
    width: 50rem;
    height: 10.25rem; 
    padding: 1.25rem 4rem 1.25rem 1.5rem;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    border: none;
    resize: none;
    color: #fff;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.6;
    box-sizing: border-box;
    box-shadow: 
        0 4px 6px rgba(0, 0, 0, 0.1),
        0 1px 3px rgba(0, 0, 0, 0.08);



    &::placeholder {
        font-family: 'SUIT';
        color: #ffffff;
        font-size: 16px;
        font-weight: 400;
    }

    &:focus {
        outline: none;
        background-color: rgba(255, 255, 255, 0.08);
    }
`;

const SendBtn = styled.img`
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    width: 2.5rem;
    height: 2.5rem;
    cursor: pointer;
    transition: all 0.2s ease;
    border-radius: 50%;
    padding: 0.5rem;

    &:hover {
        transform: scale(1.1);
    }

    &:active {
        transform: scale(0.95);
    }
`;

const ChoiceWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
    width: 100%;
    justify-content: flex-start;
    flex-wrap: wrap;
`

const Checkbox = styled.label`
    display: flex;
    align-items: center;
    gap: 0.45rem;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.9);
    transition: all 0.2s ease;

    &:hover {
        color: #fff;
    }

    input[type="checkbox"] {
        display: none;
    }

    .custom-checkbox {
        width: 1rem;
        height: 1rem;
        border: 2px solid #DFDFDF;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        transition: all 0.2s ease;
    }

    &:hover .custom-checkbox {
        border-color: rgba(255, 255, 255, 0.8);
    }

    input[type="checkbox"]:checked + .custom-checkbox {
        background: #3B5AF7;
        border-color: #3B5AF7;
    }

    .checkmark {
        width: 1rem;
        height: 1rem;
        color: white;
        font-size: 16px;
        display: none;
        align-items: center;
        justify-content: center;
        font-weight: 600;
    }

    input[type="checkbox"]:checked + .custom-checkbox .checkmark {
        display: flex;
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

    &.exit {
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        border: none;
        background-color: #FF2E2E;
        color: #ffffff;

        &:hover {
            background-color:rgb(225, 37, 37);
            outline: none;
        }
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

const CrossCheckQ = () => {
    const location = useLocation();
    const optimizedPrompt = location.state?.optimizedPrompt; // 있으면 최적화된 프롬프트, 없으면 빈 문자열
    const errorMessage = location.state?.error; // 에러 메시지가 있으면 표시

    const [selectedAIs, setSelectedAIs] = useState<string[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<'noInput' | 'noAI' | 'singleAI' | 'error' | null>(errorMessage ? 'error' : null);
    const [promptText, setPromptText] = useState(optimizedPrompt || ""); // 최적화된 프롬프트가 있으면 사용, 없으면 빈 문자열
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // PromptOptimize에서 넘어온 데이터
    const promptId = location.state?.promptId;
    const persona = location.state?.persona;

    const handleCheckboxChange = (value: string) => {
        setSelectedAIs(prev => 
            prev.includes(value) 
                ? prev.filter(ai => ai !== value)
                : [...prev, value]
        );
    };

    const handleSendClick = async () => {
        if (!promptText.trim()) {
            setModalType('noInput');
            setShowModal(true);
            return;
        }
        
        if (selectedAIs.length === 0) {
            setModalType('noAI');
            setShowModal(true);
            return;
        }
        
        try {
            // API 호출을 위한 요청 데이터 준비 - 백엔드 API 스펙에 맞게 모델명 매핑
            const modelMapping: { [key: string]: string } = {
                'chatgpt': 'gpt',
                'claude': 'claude',
                'gemini': 'gemini',
                'perplexity': 'perplexity'
            };
            
            const mappedModels = selectedAIs.map(ai => modelMapping[ai] || ai);
            
            // 백엔드 API 스펙에 맞는 요청 데이터 구성
            const request: LLMRequest = {
                models: mappedModels,
                question: promptText.trim()
            };

            console.log('🚀 API 요청 데이터 준비 완료:');
            console.log('  - 선택된 AI 모델들:', selectedAIs);
            console.log('  - 매핑된 모델명:', mappedModels);
            console.log('  - 질문:', promptText.trim());
            console.log('  - 최종 요청 데이터:', JSON.stringify(request, null, 2));

            if (selectedAIs.length === 1) {
                setModalType('singleAI');
                setShowModal(true);
            } else if (selectedAIs.length > 1) {
                console.log("여러 AI 선택됨 - API 호출 시작");
                navigate('/crosscheckl', { 
                    state: { 
                        selectedAIs, 
                        promptText,
                        request 
                    } 
                });
            }
        } catch (error) {
            console.error('Error preparing request:', error);
            // 에러 처리 (필요시 모달 표시)
        }
    };

    const handleModalConfirm = () => {
        setShowModal(false);
        setModalType(null);
        if (modalType === 'singleAI') {
            console.log("그대로 답변 확인하기 - API 요청 시작");
            
            // API 호출을 위한 요청 데이터 준비 - 백엔드 API 스펙에 맞게 모델명 매핑
            const modelMapping: { [key: string]: string } = {
                'chatgpt': 'gpt',
                'claude': 'claude',
                'gemini': 'gemini',
                'perplexity': 'perplexity'
            };
            
            const mappedModels = selectedAIs.map(ai => modelMapping[ai] || ai);
            
            // 백엔드 API 스펙에 맞는 요청 데이터 구성
            const request: LLMRequest = {
                models: mappedModels,
                question: promptText.trim()
            };
            
            console.log('🚀 단일 AI API 요청 데이터 준비 완료:');
            console.log('  - 선택된 AI 모델:', selectedAIs);
            console.log('  - 매핑된 모델명:', mappedModels);
            console.log('  - 질문:', promptText.trim());
            console.log('  - 최종 요청 데이터:', JSON.stringify(request, null, 2));
            
            navigate('/crosscheckl', { 
                state: { 
                    selectedAIs, 
                    promptText,
                    request 
                } 
            });
        }
    };

    const handleModalCancel = () => {
        setShowModal(false);
        setModalType(null);
    };

    // 최적화된 프롬프트로 LLM 응답 생성하는 함수
    const handleGetLLMResponse = async () => {
        if (!optimizedPrompt || !promptId) {
            console.error('최적화된 프롬프트 또는 promptId가 없습니다');
            return;
        }

        try {
            setIsLoading(true); // 로딩 상태 관리
            
            // 로딩 중일 때 CrossCheckL로 이동
            navigate('/crosscheckl', { 
                state: { 
                    selectedAIs, 
                    promptText: optimizedPrompt,
                    isLoading: true,
                    promptId: promptId,
                    persona: persona
                } 
            });
            
        } catch (error) {
            console.error('❌ LLM 응답 생성 실패:', error);
            setModalType('error');
            setShowModal(true);
        } finally {
            setIsLoading(false); // 로딩 상태 관리
        }
    };

    // SendBtn 클릭 시 handleGetLLMResponse 호출
    const handleSendBtnClick = () => {
        if (isLoading) return; // 로딩 중일 때는 클릭 무시
        
        if (optimizedPrompt) {
            // 최적화된 프롬프트가 있으면 handleGetLLMResponse 호출
            handleGetLLMResponse();
        } else {
            // 최적화된 프롬프트가 없으면 기존 handleSendClick 호출
            handleSendClick();
        }
    };

    return (
        <Wrapper>
            <Topbar />
            <CrossCheckWrapper>
                <Sidebar />
                <MainWrapper>
                    <MainText>AI <Highlight>교차검증</Highlight>하기</MainText>
                    <ContentWrapper>
                        <PromptContainer>
                            <PromptInputWrapper>
                                {optimizedPrompt ? (
                                    <ScrollArea>
                                        <ReactMarkdown children={promptText} />
                                    </ScrollArea>
                                ) : (
                                    <PromptInput
                                    placeholder="프롬프트를 입력해주세요."
                                    value={promptText}
                                    onChange={(e) => setPromptText(e.target.value)}
                                    />
                                )}
                                <SendBtn 
                                    src={CircleArrowBtn} 
                                    onClick={handleSendBtnClick}
                                    style={{
                                        opacity: isLoading ? 0.6 : 1,
                                        cursor: isLoading ? 'not-allowed' : 'pointer'
                                    }}
                                />
                            </PromptInputWrapper>
                            
                            <ChoiceWrapper>
                                <Checkbox>
                                    <input 
                                        type="checkbox" 
                                        value="chatgpt" 
                                        checked={selectedAIs.includes("chatgpt")}
                                        onChange={() => handleCheckboxChange("chatgpt")}
                                    />
                                    <div className="custom-checkbox">
                                        <div className="checkmark">✓</div>
                                    </div>
                                    ChatGPT
                                </Checkbox>
                                <Checkbox>
                                    <input 
                                        type="checkbox" 
                                        value="claude" 
                                        checked={selectedAIs.includes("claude")}
                                        onChange={() => handleCheckboxChange("claude")}
                                    />
                                    <div className="custom-checkbox">
                                        <div className="checkmark">✓</div>
                                    </div>
                                    Claude
                                </Checkbox>
                                <Checkbox>
                                    <input 
                                        type="checkbox" 
                                        value="gemini" 
                                        checked={selectedAIs.includes("gemini")}
                                        onChange={() => handleCheckboxChange("gemini")}
                                    />
                                    <div className="custom-checkbox">
                                        <div className="checkmark">✓</div>
                                    </div>
                                    Gemini
                                </Checkbox>
                                <Checkbox>
                                    <input 
                                        type="checkbox" 
                                        value="perplexity" 
                                        checked={selectedAIs.includes("perplexity")}
                                        onChange={() => handleCheckboxChange("perplexity")}
                                    />
                                    <div className="custom-checkbox">
                                        <div className="checkmark">✓</div>
                                    </div>
                                    Perplexity
                                </Checkbox>
                            </ChoiceWrapper>
                        </PromptContainer>
                        
                        {/* 프롬프트를 받았을 때와 안 받았을 때를 구분하여 버튼 처리 */}
                        {/* 버튼 제거 - SendBtn만 사용 */}
                    </ContentWrapper>
                </MainWrapper>
            </CrossCheckWrapper>

            {showModal && (
                <ModalOverlay>
                    <Modal>
                        <ModalTitle>
                            {modalType === 'noInput' ? '입력된 내용이 없습니다' : 
                                modalType === 'noAI' ? 'AI가 선택되지 않았습니다' : 
                                modalType === 'error' ? '서버 오류가 발생했습니다' :
                                '환각여부 검증기능 사용불가'}
                        </ModalTitle>
                        <ModalContent>
                            {modalType === 'noInput' 
                                ? `프롬프트를 입력해야 답변을 생성할 수 있어요.
                                질문이나 요청을 입력해 주세요.`
                                : modalType === 'noAI'
                                ? `AI를 선택해야 답변을 생성할 수 있어요.
                                하나 이상의 AI를 선택해 주세요.`
                                : modalType === 'error'
                                ? errorMessage || '서버에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.'
                                : `하나의 AI를 선택하였기 때문에 답변 확인 후 
                                환각 여부를 검증할 수 없습니다. 
                                여러 AI를 선택하여 환각 여부까지 확인하시겠습니까?`
                            }
                        </ModalContent>
                        <ModalButtons>
                            {modalType === 'noInput' || modalType === 'noAI' ? (
                                <ModalButton className="exit" onClick={handleModalCancel}>
                                    돌아가기
                                </ModalButton>
                            ) : modalType === 'error' ? (
                                <ModalButton className="exit" onClick={handleModalCancel}>
                                    다시 시도하기
                                </ModalButton>
                            ) : (
                                <>
                                    <ModalButton className="primary" onClick={handleModalConfirm}>
                                        그대로 답변 확인하기
                                    </ModalButton>
                                    <ModalButton className="secondary" onClick={handleModalCancel}>
                                        다시 선택하기
                                    </ModalButton>
                                </>
                            )}
                        </ModalButtons>
                    </Modal>
                </ModalOverlay>
            )}
        </Wrapper>
    );
}

export default CrossCheckQ;