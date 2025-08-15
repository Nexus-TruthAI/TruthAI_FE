import React from "react";
import styled from "styled-components";
import Background from "../Icons/BackgroundVeryLong.png";
import Topbar from "../Components/Topbar";
import Logo from "../Icons/Logo.svg";
import Main1Ver1 from "../Icons/Main1-1.png";
import Main1Ver2 from "../Icons/Main1-2.png";
import Main2Ver1 from "../Icons/Main2-1.png";
import Main2Ver2 from "../Icons/Main2-2.png";
import { useNavigate } from "react-router-dom";



const Wrapper = styled.div`
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
    background-image: url(${Background});
    background-size: cover;
    background-position: center;
    box-sizing: border-box;
`

const MainWrapper = styled.div`
    margin: 0;
    padding: 4rem 0 0 0;
    height: calc(100vh - 4rem);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    scroll-snap-align: start;
    position: relative;
`
const MainText = styled.div`
    display: flex;
    text-align: center;
    font-size: 54px;
    font-weight: 800;
    color: #fff;
    white-space: pre-line;
`


const LogoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 1.5rem;
    gap: 0.5rem;
`

const Text1 = styled.div`
    font-size: 28px;
    font-weight: 700;
    color: #fff;
`

const Text2 = styled.div`
    font-size: 28px;
    font-weight: 700;
    color: #fff;
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

const SecondWrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    scroll-snap-align: start;
    background-color: rgba(0, 0, 0, 0.3);
    color: #fff;
`

const ThirdWrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    scroll-snap-align: start;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
`
const Section1 = styled.div`
    display: flex;
    flex-direction : row;
    justify-content: space-between;
    min-width: 1000px;
    max-width: 1200px; // 최대 너비 제한 (선택사항)
    align-items: center; // 세로 중앙 정렬 추가
    gap: 1rem;
    margin-bottom: 4rem;
`

const Section2 = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center; // 세로 중앙 정렬 추가
    min-width: 1000px;
    max-width: 1200px; // 최대 너비 제한 (선택사항)
    gap: 10rem;
    margin-bottom: 4rem;
`

const TextArea = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

const TextArea2 = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: flex-end;
    text-align: right;
`

const SubTitle = styled.div`
    font-size: 24px;
    font-weight: 600;
    color: #C2CCFD;
`


const Title = styled.div`
    font-size: 32px;
    font-weight: 800;
    white-space: pre-line;
    display: flex;

`
const BodyText = styled.div`
    font-size: 16px;
    font-weight: 500;
    color: #fff;
    margin-top: 1rem;
    white-space: pre-line;

`
const MainPage = () => {
    const navigate = useNavigate();
    return (
        <>
            <Topbar/>
            <Wrapper>
            <MainWrapper>
                <MainText>{`같은 질문,
                다른 답변.
                뭐가 더 믿을만 하지?
                `}
                </MainText>
                <SubTitle>프롬프트 수정부터, 여러 LLM의 응답 비교 및 환각 가능성 체크까지</SubTitle>
                <LogoWrapper>
                    <Text1>여기,</Text1>
                    <img src={Logo} />
                    <Text2>TruthAI에서.</Text2>
                </LogoWrapper>
                <ActionButton onClick={() => navigate('/featchoice')} >
                TruthAI 사용해보기 {'>'}
                </ActionButton>
            </MainWrapper>
            <SecondWrapper>
                <Section1>
                    <TextArea>
                        <SubTitle>프롬프트 최적화</SubTitle>
                        <Title>
                            {`원하는 답을 얻기 위한 
                        가장 똑똑한 질문을 제안해요
                        `}
                        </Title>
                        <BodyText>
                            {`AI에게 더 정확한 답을 얻도록, 입력한 프롬프트를 자동으로 분석하고 정제해드려요.`}
                        </BodyText>
                    </TextArea>
                    <img src={Main1Ver1} alt="" width="400rem"/>
                </Section1>
                <Section2>
                    <img src={Main1Ver2} alt="" width="250rem"/>
                    <TextArea2>
                        <SubTitle>여러 AI 응답 비교</SubTitle>
                        <Title>
                            {`다양한 AI의 답변을 
                        한 번에 확인해보세요
                        `}
                        </Title>
                        <BodyText>
                            {`ChatGPT, Gemini, Claude 등 
여러 LLM의 응답을 동시에 비교하고 원하는 결과를 골라보세요.`}
                        </BodyText>
                    </TextArea2>
                </Section2>
            </SecondWrapper>
            <ThirdWrapper>
                <Section1>
                    <TextArea>
                        <SubTitle>유사도 비교</SubTitle>
                        <Title>
                            {`AI 응답 간 유사도를
                            수치로 확인할 수 있어요
                        `}
                        </Title>
                        <BodyText>
                            {`각각의 답변이 서로 얼마나 닮았는지 유사도 점수로 비교할 수 있어요. 
                            다수의 AI가 비슷한 답을 했다면 신뢰도가 더 높겠죠?`}
                        </BodyText>
                    </TextArea>
                    <img src={Main2Ver1} alt="" width="250rem"/>
                </Section1>
                <Section2>
                    <img src={Main2Ver2} alt="" width="450rem"/>
                    <TextArea2>
                        <SubTitle>답변 출처 링크 제공</SubTitle>
                        <Title>
                            {`답변에 사용된 출처,
                            클릭 한 번으로 바로 확인해보세요
                        `}
                        </Title>
                        <BodyText>
                            {`AI가 참고한 외부 링크를 함께 제공해 신뢰도를 높여드려요.
                            정보의 근거가 궁금할 땐, 링크만 눌러 바로 원문으로 이동하세요.`}
                        </BodyText>
                    </TextArea2>
                </Section2>
            </ThirdWrapper>
        </Wrapper>
        </>
    )
}

export default MainPage;