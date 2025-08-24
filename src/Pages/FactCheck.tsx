import { useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import api from "../api";
import { usePrompt } from "../Context/PromptContext";

import Background from '../Icons/BackgroundLong.png';
import Topbar from "../Components/Topbar";
import Sidebar from "../Components/Sidebar";
import ExternalReference from "../Components/ExternalReference";

import CopyIcon from "../Icons/Copy.png";
import QuestionIcon from "../Icons/QuestionMark.png"


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
    margin-bottom: 1rem;
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
`
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
    margin-bottom: 2rem;
`

const HallucinationWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 2.3rem;
`
const ScoreTitleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 150px;
    gap: 0.5rem;
    align-items: center;
`
const ScoreTitle = styled.div`
    display: flex;
    font-size: 15px;
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
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    padding: 0.68rem 2rem;
    width: 2rem;
    height: 1.5rem;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    background: #3B5AF7; // 점수에 따라 바꿀 것
    color: #FFFFFF;
`
const QuestionMark = styled.img`
    width: 1rem;
    height: 1rem;
    cursor: pointer;
`
const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;

  &:hover > div {
    opacity: 1;
    visibility: visible;
  }
`
const TooltipBox = styled.div`
  position: absolute;
  top: 100%; /* 아이콘 아래에 배치 */
  left: 20%;
  transform: translateX(-5%);
  background: #ffffff;
  color: #000;
  padding: 0.5rem 0.75rem;
  border-radius: 0.4em;
  font-size: 12px;

  white-space: normal;       /* 줄바꿈 허용 */
  text-align: left;
  line-height: 1.5;
  min-width: 300px; 
  max-width: 400px;

  box-shadow: 0px 2px 8px rgba(0,0,0,0.15);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease;
  margin-top: 8px; /* 아이콘과 간격 */

  &::before {
    content: '';
    position: absolute;
    left: 5%;
    transform: translateX(-5%);
    bottom: 100%; /* 박스 위쪽에 꼬리 배치 */
    border-width: 6px;
    border-style: solid;
    border-color: transparent transparent #ffffff transparent;
  }
`;

const TabContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
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
const ScoreEmpty = styled.div`
    display: flex;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    padding: 0.68rem 2rem;
    width: 2rem;
    height: 1.5rem;
    justify-content: center;
    align-items: center;
    color: #FFFFFF; // ScoreDisplay와 글자 색 동일
`;
const ContentArea = styled.div`
    display: flex;
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

interface Reference {
  title: string;
  summary: string;
  link: string;
}

interface AIResult {
  hallucinationLevel: number;
  similarity: number;
  references: Reference[];
}

interface CrossCheckResponse {
  coreTitle: string;
  coreStatement: string;
  gpt: AIResult;
  claude: AIResult;
  gemini: AIResult;
  perplexity: AIResult;
}

// AI key 타입
type AIKey = "gpt" | "claude" | "gemini" | "perplexity";

const FactCheck = () => {
  const location = useLocation();
  const { promptId, setPromptId } = usePrompt();

  // 공통주장 상태 (백엔드에서 받아올 것)
  const [coreTitle, setCoreTitle] = useState("");
  const [coreStatement, setCoreStatement] = useState("");
  //const [results, setResults] = useState<any>({}); // gpt, claude, gemini ...

  const [results, setResults] = useState<Partial<Record<AIKey, AIResult>>>({});
  const selectedAIs: AIKey[] = location.state?.selectedAIs || [];
  const [activeTab, setActiveTab] = useState<AIKey>(selectedAIs[0]);
  
  // 선택된 AI들 (없으면 기본 전부)
  //const selectedAIs = location.state?.selectedAIs || ["chatgpt", "claude", "gemini", "perplexity"];
  //const [activeTab, setActiveTab] = useState(selectedAIs[0] || "chatgpt");

  //const selectedAIs = location.state?.selectedAIs || [];
  //const [activeTab, setActiveTab] = useState('chatgpt');


  const tabs: { id: AIKey; name: string }[] = [
    { id: "gpt", name: "ChatGPT" },
    { id: "claude", name: "Claude" },
    { id: "gemini", name: "Gemini" },
    { id: "perplexity", name: "Perplexity" }
  ];

  const hallucinationText = ["낮음", "보통", "높음"];

  useEffect(() => {
    const fetchCrossCheck = async () => {
      try {
        if (!promptId) return;
        const res = await api.post<CrossCheckResponse>(`/crosscheck/${promptId}`);
        const data = res.data;

        setCoreTitle(data.coreTitle);
        setCoreStatement(data.coreStatement);
        setResults({
          gpt: data.gpt,
          claude: data.claude,
          gemini: data.gemini,
          perplexity: data.perplexity,
        });
      } catch (err) {
        console.error("교차검증 API 호출 실패", err);
      }
    };

    fetchCrossCheck();
  }, [promptId]);

  /*const mockAiReferences = {
  "chatgpt": [
    {
      title: "AI 윤리 가이드라인 발표",
      summary: "국제기구에서 AI 윤리에 대한 새 가이드라인을 발표했습니다.",
      link: "https://example.com/article1"
    },
    {
      title: "자율주행 기술 최신 동향",
      summary: "최근 연구 결과를 통해 자율주행차의 인식 능력이 향상되었습니다.",
      link: "https://example.com/article2"
    },
    {
      title: "기후 변화와 AI",
      summary: "AI 기술이 기후 변화 대응에 어떻게 활용되는지 분석합니다.",
      link: "https://example.com/article3"
    }
  ],
  "claude": [
    {
      title: "AI 의료 영상 분석",
      summary: "AI가 의료 영상에서 암을 조기 진단하는 연구가 발표되었습니다.",
      link: "https://example.com/article4"
    }
  ],
  "gemini": [],
};*/

  // location.state가 변경될 때 activeTab 업데이트
  useEffect(() => {
    if (selectedAIs.length > 0) {
      setActiveTab(selectedAIs[0]);
    }
  }, [selectedAIs]);

  const tooltipText1 =
  "AI가 생성한 답변이 사실과 얼마나 다를 가능성이 있는지를 수치로 나타낸 지표예요. 숫자가 높을수록 사실과 다른 내용을 포함했을 가능성이 크다는 뜻이에요."
    .replace(/\./g, ".\u200B");

  const tooltipText2 =
  "여러 AI의 답변간 유사도를 비교해 수치로 표시합니다. 높을수록 AI가 다른 AI들과 비슷한 내용을 생성했다는 뜻이에요."
    .replace(/\./g, ".\u200B");

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
          <SubText>{coreTitle}</SubText>
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
              <ScoreTitleWrapper>
                <ScoreTitle>환각의심도</ScoreTitle>
                <TooltipWrapper>
                  <QuestionMark src={QuestionIcon} />
                  <TooltipBox>{tooltipText1}</TooltipBox>
                </TooltipWrapper>
              </ScoreTitleWrapper>
              <ScoreWrapper>
                {tabs.map(tab => {
                  const level = results[tab.id]?.hallucinationLevel;
                  return level !== undefined && level !== null ? (
                    <ScoreDisplay key={tab.id}>{hallucinationText[level]}</ScoreDisplay>
                  ) : (
                    <ScoreEmpty key={tab.id}>-</ScoreEmpty>
                  );
                })}
              </ScoreWrapper>
            </HallucinationWrapper>
            <Line/>
            <HallucinationWrapper>
              <ScoreTitleWrapper>
                <ScoreTitle>유사도</ScoreTitle>
                <TooltipWrapper>
                  <QuestionMark src={QuestionIcon} />
                  <TooltipBox>{tooltipText2}</TooltipBox>
                </TooltipWrapper>
              </ScoreTitleWrapper>
              <ScoreWrapper>
                {tabs.map(tab => {
                  const similarity = results[tab.id]?.similarity;
                  return similarity !== undefined && similarity !== null ? (
                    <ScoreDisplay key={tab.id}>{`${similarity}%`}</ScoreDisplay>
                  ) : (
                    <ScoreEmpty key={tab.id}>-</ScoreEmpty>
                  );
                })}
              </ScoreWrapper>
            </HallucinationWrapper>
          </SimilarityScoreWrapper>
          <CoreTitle>확인된 외부 자료</CoreTitle>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%' }}>
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
            <ExternalReference
              activeTab={activeTab}
              aiReferences={{
                gpt: results.gpt?.references || [],
                claude: results.claude?.references || [],
                gemini: results.gemini?.references || [],
                perplexity: results.perplexity?.references || [],
              }}
            />
          </div>
        </MainWrapper>

      </FactCheckWrapper>
    </Wrapper>
  );
}
export default FactCheck;