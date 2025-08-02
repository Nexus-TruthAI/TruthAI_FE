import React, { useState } from "react";
import styled from "styled-components";
import Background from "../Icons/BackgroundLong.png"
import Topbar from "../Components/Topbar";
import Sidebar from "../Components/Sidebar";

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

const Tab = styled.button<{ isActive: boolean }>`
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 100px;
    font-size: 14px;
    font-weight: ${props => props.isActive ? '800' : '500'};
    cursor: pointer;
    transition: all 0.2s ease;
    background-color: ${props => props.isActive ? '#ffffff' : 'transparent'};
    color: ${props => props.isActive ? '#3B5AF7' : '#ffffff'};
    box-shadow: ${props => props.isActive ? '0 2px 4px rgba(0, 0, 0, 0.1)' : 'none'};

    &:hover {
        background-color: ${props => props.isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.5)'};
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
`

const ContentText = styled.div`
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.6;
    white-space: pre-line;
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


const CrossCheckA = () => {
    const [activeTab, setActiveTab] = useState('chatgpt');

    const tabs = [
        { id: 'chatgpt', name: 'ChatGPT' },
        { id: 'claude', name: 'Claude' },
        { id: 'gemini', name: 'Gemini' },
        { id: 'perplexity', name: 'Perplexity' }
    ];

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
                                    isActive={activeTab === tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    {tab.name}
                                </Tab>
                            ))}
                        </TabContainer>
                        
                        <ContentArea>
                            <ContentText>
                                {`✅ 2025년 인공지능 트렌드 분석
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
데이터 편향, 설명 가능성, 투명성 확보 위한 국제 가이드라인 제정.
사례: OECD AI 원칙, ISO AI 표준 확대.
AI 보안·프라이버시 보호 강화
생성형 AI 악용 대응, 개인정보 유출 방지 위한 기술·법제 강화.
예시: 워터마크 삽입, 데이터 로컬리제이션 규제.
🔥 한 줄 요약: 2025년 AI는 멀티모달·에이전트형 기술, 산업의 AI-First 전환, 정책의 규제·윤리 표준화가 핵심 흐름입니다.
`}
                            </ContentText>
                        </ContentArea>
                        
                        <ActionButton>
                            환각 여부 검증하기 {'>'}
                        </ActionButton>
                    </ContentWrapper>
                </MainWrapper>
            
            </CrossCheckWrapper>
        </Wrapper>  
    );
}

export default CrossCheckA;