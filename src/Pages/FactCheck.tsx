import React from "react";
import { useState } from "react";
import styled from "styled-components";

import Background from '../Icons/BackgroundLong.png';
import Topbar from "../Components/Topbar";
import Sidebar from "../Components/Sidebar";

import CopyIcon from "../Icons/Copy.png";
import Logo from '../Icons/Logo.svg';


const Wrapper = styled.div`
    flex: 1;
    margin: 0;
    padding: 0;
    width: 100vw;
    min-height: 100vh;
    background-image: url(${Background});
    background-size: cover;
    background-position: center;
`
const FactCheckWrapper = styled.div`
    display: flex;
    flex-direction: row;
`
const MainWrapper = styled.div`
    flex: 1;
    padding: 6.25rem 4.7rem 8.75rem 4.7rem;
    margin: 0;
    width: calc(100vw - 15.5rem);
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: left;
`
const MainText = styled.div`
    color: #FFFFFF;
    font-size: 54px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
`
const SubText = styled.div`
    color: #C2CCFD;
    font-size: 32px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
`
const CoreStatementWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    padding: 3.4rem 0 1.5rem 0;
    margin-top: 8.9rem;
`
const CoreTitle = styled.div`
    color: #FFFFFF;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-top: 
    margin-bottom: 1.5rem;
`
const CoreStatement = styled.div`
    color: #FFFFFF;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    flex-shrink: 0;
    margin-bottom: 3.3rem;
`
const IconBtn = styled.img`
    width: 1rem;
    height: 1rem;
    cursor: pointer;
`;

const SimilarityScoreWrapper = styled.div`
    margin-top: 5.68rem;
    margin-bottom: 6.8rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`
const AICategoryWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8.75rem;
    margin-left: 13.5rem;
    margin-bottom: 2.5rem;
    justify-content: flex-start;
`
const AIElement = styled.div`
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    color: #EFEFEF;
`
const Line = styled.div`
    width: 57.43rem;
    height: 1px;
    background: #EFEFEF;
    margin-left: 9.18rem;
    margin-bottom: 2.5rem;
`

const HallucinationWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 2.7rem;
`
const ScoreTitleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 150px;
`
const ScoreTitle = styled.div`
    display: flex;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    color: #EFEFEF;
`

const ScoreWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 8.75rem;
    margin-left: 4.5rem;
`

const ScoreDisplay = styled.div`
    display: flex;
    padding: 0.68rem 2rem;
    width: 2rem;
    height: 1.5rem;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    background: #3B5AF7; // 점수에 따라 바꿀 것
    color: #FFFFFF;
`


const FactCheck = () => {
  const [coreStatement, setCoreStatement] = useState("2025년에는 인공지능이 모든 산업에 걸쳐 혁신을 이끌며, 특히 헬스케어, 금융, 교육 분야에서 큰 변화를 가져올 것입니다. 또한, 지속 가능한 기술과 친환경 에너지 솔루션이 주목받으며, 사회 전반에 걸쳐 디지털 트랜스포메이션이 가속화될 것입니다.");

  // 1. 복사 기능
  const handleCopy = () => {
    if (coreStatement) {
      navigator.clipboard.writeText(coreStatement);
      alert("복사되었습니다!!");
    }
  };

  return (
    <Wrapper>
      <Topbar />
      <FactCheckWrapper>
        <Sidebar/>
        <MainWrapper>
          <SubText>2025년 트렌드 분석</SubText>
          <MainText>환각 여부를 확인해보세요.</MainText>
          <CoreStatementWrapper>
            <CoreTitle>공통된 종합 주장</CoreTitle>
            <IconBtn src={CopyIcon} onClick={handleCopy}/>
          </CoreStatementWrapper>
          <CoreStatement>
            {coreStatement}
          </CoreStatement>
          <SimilarityScoreWrapper>
            <CoreTitle>AI별 유사도 점수</CoreTitle>
            <AICategoryWrapper>
              <AIElement>Chat GPT</AIElement>
              <AIElement>Claude</AIElement>
              <AIElement>Gemini</AIElement>
              <AIElement>Perplexity</AIElement>
            </AICategoryWrapper>
            <Line/>
            <HallucinationWrapper>
              <ScoreTitleWrapper><ScoreTitle>환각의심도</ScoreTitle></ScoreTitleWrapper>
              <ScoreWrapper>
                <ScoreDisplay>낮음</ScoreDisplay>
                <ScoreDisplay>낮음</ScoreDisplay>
                <ScoreDisplay>낮음</ScoreDisplay>
                <ScoreDisplay>낮음</ScoreDisplay>
              </ScoreWrapper>
            </HallucinationWrapper>
            <Line/>
            <HallucinationWrapper>
              <ScoreTitleWrapper><ScoreTitle>유사도</ScoreTitle></ScoreTitleWrapper>
              <ScoreWrapper>
                <ScoreDisplay>낮음</ScoreDisplay>
                <ScoreDisplay>낮음</ScoreDisplay>
                <ScoreDisplay>낮음</ScoreDisplay>
                <ScoreDisplay>낮음</ScoreDisplay>
              </ScoreWrapper>
            </HallucinationWrapper>
          </SimilarityScoreWrapper>
        </MainWrapper>

      </FactCheckWrapper>
    </Wrapper>
  );
}
export default FactCheck;