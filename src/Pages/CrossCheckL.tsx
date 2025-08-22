import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Background from "../Icons/BackgroundBasic.png"
import Topbar from "../Components/Topbar";
import Sidebar from "../Components/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { getLLMAnswers } from "../services/llmService";
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
                const { request } = location.state || {};
                
                if (!request) {
                    console.error('No request data found');
                    navigate('/crosscheckq');
                    return;
                }

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