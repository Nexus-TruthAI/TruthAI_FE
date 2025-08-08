import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Background from "../Icons/BackgroundBasic.png"
import Topbar from "../Components/Topbar";
import Sidebar from "../Components/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";

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

const LoadingBar = styled.div<{ progress: number }>`
    height: 100%;
    background-color: #C2CCFD;
    border-radius: 4px;
    width: ${props => props.progress}%;
    transition: width 0.3s ease;
`


const CrossCheckL = () => {
    const [loadingProgress, setLoadingProgress] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    // 로딩 완료 후 CrossCheckA로 이동
                    setTimeout(() => {
                        navigate('/crosschecka', { 
                            state: location.state 
                        });
                    }, 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [navigate, location.state]);

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
                            <LoadingBar progress={loadingProgress} />
                        </LoadingBarContainer>
                    </ContentWrapper>
                </MainWrapper>
            </CrossCheckWrapper>
        </Wrapper>  
    );
}

export default CrossCheckL;