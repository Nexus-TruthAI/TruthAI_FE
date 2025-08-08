import React from "react";
import styled from "styled-components";
import Background from "../Icons/BackgroundBasic.png";
import Topbar from "../Components/Topbar";

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
    margin: 0;
    margin-left: 11.25rem;
    padding: 0;
    height: calc(100vh - 4rem);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`
const MainText = styled.div`
    font-size: 54px;
    font-weight: 800;
    color: #fff;
`

const SubTitle = styled.div`
    margin-top: 2.5rem;
    font-size: 28px;
    font-weight: 600;
    color: #fff;
`

const BodyText = styled.div`
    font-size: 20px;
    font-weight: 500;
    color: #fff;
    margin-top: 1rem;
    white-space: pre-line;

`

const ActionButton = styled.button`
    margin-top: 2.7rem;
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
        outline: none;
    }
`


const Question = () => {
    return (
        <Wrapper>
            <Topbar/>
            <MainWrapper>
                <MainText>문의하기</MainText>
                <SubTitle>여러분의 소중한 의견을 들려주세요.</SubTitle>
                <BodyText>{`불편했던 점이나 바라는 기능, 개선 아이디어가 있다면 언제든지 남겨주세요.
                여러분의 피드백이 더 나은 서비스를 만듭니다.
                `}
                </BodyText>
                <ActionButton onClick={() => window.open('https://github.com/Nexus-TruthAI/TruthAI_FE')} >
                구글폼에 의견 남기기 {'>'}
                </ActionButton>

            </MainWrapper>
        </Wrapper>
    )
}

export default Question;