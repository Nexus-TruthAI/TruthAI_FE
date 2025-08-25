import styled from "styled-components";
import RoundArrowBtn from "../Components/RoundArrowBtn";
import Topbar from "../Components/Topbar";
import Background from '../Icons/BackgroundBasic.png';
import ABCDIcon from "../Icons/ABCDIcon.png";
import RobotIcon from "../Icons/RobotIcon.png";
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
    margin: 0;
    padding: 0;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const MainText = styled.div`
    font-size: 54px;
    font-weight: 800;
    color: #fff;
    margin-bottom: 4.25rem;
`

const Highlight = styled.span`
    color: #C2CCFD;
`

const ChoiceWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 2.5rem;
`

const ChoiceBox = styled.div`
    width: 32.5rem;
    height: 26rem;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
`

const TitleImg = styled.div`
    font-size: 54px;
    margin-bottom: 0.75rem;
`

const TitleText = styled.div`
    font-size: 32px;
    font-weight: 800;
    color: #000;
    background-color: #EBEFFE;
    width: fit-content;
    padding: 0 0.6rem;
    margin-bottom: 1.5rem;
`

const ChoiceText = styled.div`
    display: flex;
    flex-direction: column;
    color: #494949;
    font-size: 14px;
    font-weight: 600;
    white-space: pre-line;
    margin-bottom: 3.75rem;
    text-align: center;
`

const FeatChoice = () => {
    const text1 = `프롬프트를 개선하여 더 나은 AI 응답을 얻으세요.
이 기능은 사용자가 입력한 내용을 분석하고, 
AI 모델로부터 가장 정확하고 관련성 높은 결과를 얻을 수 있도록 
개선 방안을 제안합니다.`

    const text2 = `여러 AI 모델의 답변을 비교·분석해 
가장 신뢰할 수 있는 정보를 확인하세요. 
다양한 플랫폼의 응답을 직관적으로 평가하고, 모델 간 차이를 한눈에 파악해 
더 정확한 의사결정을 내릴 수 있습니다.`

    const navigate = useNavigate();

    return (
        <Wrapper>
            <Topbar/>
            <MainWrapper>
                <MainText>사용할 <Highlight>기능</Highlight>을 선택해주세요.</MainText>
                <ChoiceWrapper>
                    <ChoiceBox>
                        <TitleImg><img src={ABCDIcon}/></TitleImg>
                        <TitleText>프롬프트 수정 및 최적화</TitleText>
                        <ChoiceText>
                            {text1}
                        </ChoiceText>
                        <RoundArrowBtn onClick={() => navigate('/promptopt', { state: { reset: true }, replace: true })}>사용하기</RoundArrowBtn>
                    </ChoiceBox>
                    <ChoiceBox>
                        <TitleImg><img src={RobotIcon}/></TitleImg>
                        <TitleText>AI 교차검증</TitleText>
                        <ChoiceText>
                            {text2}
                        </ChoiceText>
                        <RoundArrowBtn onClick={() => navigate('/crosscheckq')}>사용하기</RoundArrowBtn>
                    </ChoiceBox>
                </ChoiceWrapper>
            </MainWrapper>
        </Wrapper>
    );
}

export default FeatChoice;