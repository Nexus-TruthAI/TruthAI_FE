import { useState, useEffect } from "react";
import styled from "styled-components";
import Background from "../Icons/BackgroundBasic.png"
import Topbar from "../Components/Topbar";
import Sidebar from "../Components/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { getLLMAnswers, getOptimizedPromptResponse } from "../services/llmService";
import { usePrompt } from "../Context/PromptContext";

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
    max-width: 800px;
`

const WaitText = styled.div`
    font-size: 20px;
    font-weight: 600;
    color: #fff;
    margin-bottom: 3.75rem;
`

const LoadingBarContainer = styled.div`
    width: 100%;
    max-width: 400px;
    height: 0.75rem;
    background-color: #ffffff;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
`

const LoadingBar = styled.div<{ $progress: number }>`
    height: 100%;
    background-color: #C2CCFD;
    border-radius: 4px;
    width: ${props => props.$progress}%;
    transition: width 0.3s ease;
`


const CrossCheckL = () => {
    const [loadingProgress, setLoadingProgress] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();
    const { setPromptId } = usePrompt();

    useEffect(() => {
        const fetchAnswers = async () => {
            try {
                const { request, isLoading, promptId, persona, selectedAIs, promptText } = location.state || {};
                
                // 최적화된 프롬프트가 있는 경우 (PromptOptimize에서 넘어온 경우)
                if (isLoading && promptId && promptText) {
                    console.log('🔄 최적화된 프롬프트로 LLM 응답 요청:', {
                        promptId, models: selectedAIs, question: promptText, persona
                    });
                    
                    // 데이터 유효성 검사
                    if (!selectedAIs || selectedAIs.length === 0) {
                        console.error('❌ 선택된 AI가 없습니다');
                        throw new Error('AI를 선택해주세요');
                    }
                    
                    if (!promptId || typeof promptId !== 'number') {
                        console.error('❌ 유효하지 않은 promptId:', promptId);
                        throw new Error('유효하지 않은 프롬프트 ID입니다');
                    }
                    
                    if (!promptText || promptText.trim() === '') {
                        console.error('❌ 유효하지 않은 프롬프트 텍스트:', promptText);
                        throw new Error('프롬프트 텍스트가 비어있습니다');
                    }
                    
                    console.log('✅ 데이터 유효성 검사 통과');
                    
                    // 모델명 매핑
                    const modelMapping: { [key: string]: string } = {
                        'chatgpt': 'gpt',
                        'claude': 'claude',
                        'gemini': 'gemini',
                        'perplexity': 'perplexity'
                    };
                    
                    const mappedModels = selectedAIs.map((ai: string) => modelMapping[ai] || ai);
                    console.log('🔧 매핑된 모델명:', mappedModels);
                    
                    // API 요청 데이터 로깅
                    const apiRequestData = {
                        promptId,
                        models: mappedModels,
                        question: promptText,
                        persona: persona || '',
                        promptDomain: 'POLITICS',
                        templateKey: 'optimized'
                    };
                    console.log('📤 API 요청 데이터:', JSON.stringify(apiRequestData, null, 2));
                    
                    // 최적화된 프롬프트 API 호출
                    const apiResponse = await getOptimizedPromptResponse(
                        promptId,
                        mappedModels,
                        promptText,
                        persona
                    );
                    
                    console.log('✅ 최적화된 프롬프트 API 응답 완료:', apiResponse);
                    
                    // 응답 데이터를 CrossCheckA 형식에 맞게 변환
                    const responseData = Array.isArray(apiResponse) ? apiResponse[0] : apiResponse;
                    const responses = Object.values(responseData).map((data: any) => ({
                        llmModel: data.answer.model,
                        answer: data.answer.content
                    }));
                    
                    console.log('📝 변환된 응답 데이터:', responses);
                    
                    // 로딩 완료 후 CrossCheckA로 이동
                    setLoadingProgress(100);
                    setPromptId(promptId);
                    setTimeout(() => {
                        navigate('/crosschecka', { 
                            state: { 
                                selectedAIs: mappedModels,
                                promptText: promptText,
                                responses,
                                promptId: promptId
                            } 
                        });
                    }, 800);
                    
                } else if (request) {
                    // 기존 로직 (일반 프롬프트)
                    console.log('🔄 API 호출 시작 - 선택된 AI:', request.models);
                    
                    // API 호출 시작
                    const apiResponse = await getLLMAnswers(request);
                    
                    console.log('✅ API 응답 완료:', apiResponse);
                    
                    // llmAnswerDto 배열 추출
                    const responses = apiResponse.llmAnswerDto || [];
                    console.log('📝 추출된 답변 데이터:', responses);
                    
                    // 로딩 완료 후 CrossCheckA로 이동
                    setLoadingProgress(100); // 100%로 완료
                    setPromptId(apiResponse.promptId); // promptId를 컨텍스트에 저장
                    setTimeout(() => {
                        navigate('/crosschecka', { 
                            state: { 
                                selectedAIs: location.state?.selectedAIs || [],
                                promptText: location.state?.promptText || '',
                                responses,
                                promptId: apiResponse.promptId // promptId도 함께 전달
                            } 
                        });
                    }, 800); // 로딩 바가 100%까지 완료되는 것을 보여주기 위해 약간 더 지연
                    
                } else {
                    console.error('No valid request data found');
                    navigate('/crosscheckq');
                    return;
                }
                
            } catch (error) {
                console.error('Error fetching LLM answers:', error);
                // 에러 발생 시 에러 페이지로 이동하거나 모달 표시
                // 여기서는 간단히 CrossCheckQ로 돌아가도록 처리
                setTimeout(() => {
                    navigate('/crosscheckq');
                }, 1000);
            }
        };

        // 로딩 애니메이션 시작
        const interval = setInterval(() => {
            setLoadingProgress(prev => {
                if (prev >= 90) { // 90%까지만 진행
                    clearInterval(interval);
                    return 90;
                }
                return prev + 2;
            });
        }, 100);

        // API 호출 실행
        fetchAnswers();

        return () => clearInterval(interval);
    }, [navigate, location.state, setPromptId]);

    return (
        <Wrapper>
            <Topbar/>
            <CrossCheckWrapper>
                <Sidebar/>
                <MainWrapper>
                    <MainText>선택한 AI 모델로 <Highlight>답변을 </Highlight>생성하고 있어요.</MainText>
                    <ContentWrapper>
                        <WaitText>조금만 기다려 주세요.</WaitText>
                        <LoadingBarContainer>
                            <LoadingBar $progress={loadingProgress} />
                        </LoadingBarContainer>
                    </ContentWrapper>
                </MainWrapper>
            </CrossCheckWrapper>
        </Wrapper>  
    );
}

export default CrossCheckL;