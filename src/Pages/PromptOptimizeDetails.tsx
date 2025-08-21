import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { usePrompt } from "../Context/PromptContext";

import Topbar from "../Components/Topbar";
import Sidebar from "../Components/Sidebar";
import DomainButton from "../Components/DomainBox";
import LoadingBar from "../Components/LoadingOverlay";

import Background from "../Icons/BackgroundBasic.png";
import DeleteIcon from "../Icons/Delete.png";
import ArrowRight from "../Icons/ArrowRight.svg";


const Wrapper = styled.div`
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    background-image: url(${Background});
    background-size: cover;
    background-position: center;
`
const PromptDetailsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    padding-top: 4rem;
`
const MainWrapper = styled.div`
    flex: 1;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 4.5rem;
    margin-top: 6.875rem;
    margin-right: 13rem;
    margin-bottom: 8rem;
`
const LMainWrapper = styled.div`
    flex: 1;
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
    font-size: 2rem;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    margin-bottom: 0.3rem;
`
const LMainText = styled.div`
    color: #fff;
    font-size: 54px;
    font-weight: 800;
`
const LSubText = styled.div`
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    margin-top: 1.1rem;
    margin-bottom: 3.7rem;
    text-align: center;
`
const SubText = styled.div`
    color: #fff;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`
const DomainWrapper = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 2.125rem;
    margin-bottom: 5rem;
`
const PersonaBox = styled.div`
  position: relative;   // 삭제 버튼 위치 조정용
  display: flex;
  flex-direction: column;
  justify-content: center; // Description + InputRow 전체 가운데
  width: 52.325rem;
  height: 3rem;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  border: 1px solid #CECECE;
  margin-top: 1.75rem; 
`
const Description = styled.span`
  font-size: 0.625rem;
  color: #FFF;
`
const InputRow = styled.div`
  display: flex;
  align-items: center; // 버튼 세로 중앙
  width: 100%;
  gap: 0.5rem;
`
const PersonaInput = styled.input`
  width: 100%;
  height: 100%;
  font-size: 1rem;
  font-weight: 600;
  color: #FFF;
  border: none;
  padding: 0;
  background-color: transparent;

  &::placeholder {
    color: #CECECE;
    font-size: 1rem;
  }
  &:focus {
    outline: none;
  }
`
const DeleteBtn = styled.img`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
`
const PersonaActions = styled.div`
  width: 53rem;   // PersonaBox와 동일한 width
  display: flex;
  justify-content: flex-end; 
  margin-top: 0.5rem;
`
const LoadingPersona = styled.button`
  background: none;
  border: none;
  color: #FFFFFF;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 500;
  text-decoration: underline;
`
const PrimaryButton = styled.button`
  display: inline-flex;
  padding: 0.68rem 1rem;
  align-items: center;
  gap: 10px;
  border-radius: 100px;
  background: #3B5AF7;
  margin-top: 2rem;
  align-self: flex-end;
  border: none;
  color: #FFF;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background-color: '#3551DE;';
  }
`;


const domains = [
  { name: "정치", icon: "🏛️", value: "POLITICS" },
  { name: "경제", icon: "💵", value: "ECONOMICS" },
  { name: "사회", icon: "👬", value: "SOCIAL" },
  { name: "문화", icon: "🎨", value: "CULTURE" },
  { name: "IT/과학", icon: "💻", value: "SCIENCE" },
  { name: "국제", icon: "🌍", value: "INTERNATIONAL" },
  { name: "기후/환경/재난", icon: "🌱", value: "CLIMATE" },
  { name: "생활/건강", icon: "🏡", value: "LIFE" },
  { name: "스포츠", icon: "🤼‍♀️", value: "SPORTS" },
  { name: "연예", icon: "🎤", value: "ENTERTAINMENT" },
  { name: "날씨", icon: "☀️", value: "WEATHER" },
];

const PromptOptimizeDetails = () => {
  const navigate = useNavigate();

  const { prompt, setPrompt, domain, setDomain, persona, setPersona, isOptimized, setIsOptimized } = usePrompt(); // Context 사용
  const [selectedDomain, setSelectedDomain] = useState<string>(domain || "");
  const [isLoading, setIsLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleDomainClick = (name: string) => {
    setSelectedDomain(name); // 클릭하면 바로 선택됨, 이전 선택은 자동 해제
    setDomain(name);         // Context에도 저장
  };

  { /* 최적화 버튼 클릭 */ }
  const handleOptimize = async () => {
    if (!persona.trim() || !selectedDomain) {
      alert("프롬프트, 도메인, 페르소나를 모두 입력해주세요.");
      return;
    }

    setIsLoading(true); // 🔹 로딩 시작
    setDone(false);

    try {
      // 선택된 도메인의 value 가져오기
      const domainValue = domains.find(d => d.name === selectedDomain)?.value;

      if (!domainValue) {
        alert("도메인을 올바르게 선택해주세요.");
        setIsLoading(false);
        return;
      }

      const response = await axios.post(
        "/prompt/create-best-prompt",
        {
          question: prompt,
          persona: persona,
          promptDomain: domainValue, // 단일 선택
          templateKey: "editable",
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = response.data;
      setPrompt(data.optimizedPrompt || "최적화된 프롬프트 예시");
      setIsOptimized(true);
      setDone(true); // 완료 표시

      navigate("/promptopt");
    } catch (err) {
      console.error(err);
      alert("프롬프트 최적화 중 오류가 발생했습니다.");
    }finally {
      setIsLoading(false); // 🔹 로딩 종료
    }
  };

  return (
    <Wrapper>
      <Topbar />
      <PromptDetailsWrapper>
        <Sidebar />
        {isLoading ? (
              <LMainWrapper>
                  <LMainText>
                    최적화된 프롬프트를 생성하고 있어요
                  </LMainText>
                  <LSubText>조금만 기다려주세요!</LSubText>
                  <LoadingBar done={done} />
              </LMainWrapper>
        ) : (
          <MainWrapper>
            <MainText>어떤 분야에 관련된 프롬프트인가요?</MainText>
            <SubText>프롬프트가 다루는 주제나 영역을 선택해주세요! 중복선택도 가능해요.</SubText>
            <DomainWrapper>
              {domains.map((d) => (
                <DomainButton
                  key={d.name}
                  icon={d.icon}
                  name={d.name}
                  selected={selectedDomain === d.name} // ⚠️ 단일 선택으로 변경!!
                  onClick={() => handleDomainClick(d.name)}
                />
              ))}
            </DomainWrapper>
            <MainText>이 프롬프트를 사용할 사람은 누구인가요?</MainText>
            <SubText>대상을 설정하면 AI가 내 상황과 필요에 꼭 맞춘 응답을 제공합니다.</SubText>
            <PersonaBox>
              <Description>대상 소개</Description>
              <InputRow>
                <PersonaInput
                  placeholder="예) 경영학부 1학년 대학생"
                  value={persona || ""}
                  onChange={(e) => setPersona(e.target.value)}
                />
                <DeleteBtn src={DeleteIcon} onClick={() => setPersona("")} />
              </InputRow>
            </PersonaBox>
            {/* PersonaBox와 끝나는 위치 맞추기 */}
            <PersonaActions>
              <LoadingPersona onClick={() => console.log("내 정보 불러오기 클릭됨")}>
                내 정보 불러오기
              </LoadingPersona>
            </PersonaActions>

            {/* 메인 버튼 */}
            <PrimaryButton onClick={() => handleOptimize()}>
              프롬프트 최적화하기
              <img src={ArrowRight} alt="arrow" style={{ width: "1rem", height: "1rem" }} />
            </PrimaryButton>
        </MainWrapper>
      )}
      </PromptDetailsWrapper>
    </Wrapper>
  );
}

export default PromptOptimizeDetails;