import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { usePrompt } from "../Context/PromptContext";

import Topbar from "../Components/Topbar";
import Sidebar from "../Components/Sidebar";
import BookmarkModal from "../Components/BookmarkModal";
import AlertModal from "../Components/AlertModal";

import Background from "../Icons/BackgroundBasic.png";
import CircleArrowBtn from "../Icons/CircleArrowBtn.svg";
import BookmarkEmpIcon from "../Icons/BookmarkEmpty.png";
import BookmarkFillIcon from "../Icons/BookmarkFill.png"
import RefreshIcon from "../Icons/Refresh.png";
import CopyIcon from "../Icons/Copy.png";
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
const PromptOptWrapper = styled.div`
    display: flex;
    flex-direction: row;
    padding-top: 4rem;

`
const MainWrapper = styled.div`
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
    font-size: 54px;
    font-weight: 800;
`
const SubText = styled.div`
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    margin-top: 1.1rem;
    margin-bottom: 3.7rem;
    text-align: center;
`
const Highlight = styled.span`
    color: #C2CCFD;
`
const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 800px;
    width: 100%;
    padding: 0 12.5rem;
    margin-top: 2.6rem;
    margin-bottom: 3.5rem;
`
const PromptWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
`
const OptPrompt = styled.div`
  width: 100%;
  height: 10rem;
  padding: 1rem 1rem 2rem 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 20px;
  resize: none;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  box-shadow: 
      0 1px 1px rgba(0, 0, 0, 0.15),
      0 2px 2px rgba(0, 0, 0, 0.15),
      0 4px 4px rgba(0, 0, 0, 0.15),
      0 8px 8px rgba(0, 0, 0, 0.15);

  &::placeholder {
      font-family: 'SUIT';
      color: #EFEFEF;
      font-size: 16px;
      font-weight: 400;
  }

  &:focus {
      outline: none;
  }
`
const ScrollArea = styled.div`
  width: 100%;
  height: 9rem;
  overflow-y: auto;
  margin-bottom: 0.5rem; // 버튼과 간격
`
const PromptInput = styled.textarea`
  font-family: 'SUIT';
  width: 100%;
  height: 7.25rem;
  padding: 1rem 1rem 3rem 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 20px;
  resize: none;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  box-shadow: 
      0 1px 1px rgba(0, 0, 0, 0.15),
      0 2px 2px rgba(0, 0, 0, 0.15),
      0 4px 4px rgba(0, 0, 0, 0.15),
      0 8px 8px rgba(0, 0, 0, 0.15);

  &::placeholder {
      font-family: 'SUIT';
      color: #EFEFEF;
      font-size: 16px;
      font-weight: 400;
  }

  &:focus {
      outline: none;
  }
`
const OptimizedBtnGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`
const SendBtn = styled.img`
    position: absolute;
    bottom: 2rem;
    right: 0.1rem;
    width: 2.2rem;
    height: 2.2rem;
    cursor: pointer;
    &:hover {
        transform: scale(1.1);
    }

    &:active {
        transform: scale(0.95);
    }
`
const IconBtn = styled.img`
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
`
const ExampleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    color: #fff;
    gap: 1rem;
    margin-left: 7.75rem;
    margin-right: 7.75rem;
    max-width: 1000px;
    width: 100%;
`
const ExampleBox = styled.div`
  padding: 1.2rem 2.1rem;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.20);
  color: white; /* 내부 텍스트 흰색 */
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`
const CrossValidationBtn = styled.div`
  display: inline-flex;
  padding: 20px 32px;
  align-items: flex-start;
  gap: 12px;
  border-radius: 100px;
  background: #fff;
  color: #000;        // 흰색 배경이면 글자는 검정색
  font-weight: 600;

  &:hover {
    background: #f0f0f0; // 호버 시 살짝 밝게
  }
  cursor: pointer;
`
const ArrowIcon = styled.img`
  width: 1.4rem;
  height: 1.4rem;
  filter: invert(1) brightness(0); // 완전 검정으로
`;



const PromptOptimize = () => {
  const navigate = useNavigate();

  const { prompt, setPrompt, isOptimized, setIsOptimized } = usePrompt(); // 프롬프트 입력 / 결과 공용
  const [originalPrompt, setOriginalPrompt] = useState(""); // 재생성용 원본 프롬프트
  const [isLoading, setIsLoading] = useState(false);  // 로딩 상태 여부

  const [showBookmarkModal, setShowBookmarkModal] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);


  { /* 🛠️ 프롬프트 예시 클릭 */ }
  const handleExampleClick = (text: string) => {
    setPrompt(text);
  };

  { /* 🛠️ -> 버튼 클릭 */ }
  const handleSend = async () => {
    if (!prompt.trim()) {
      setShowAlertModal(true);
      return;
    }
    navigate("/promptoptdetail");
  };

  { /*  교차검증 페이지로 이동   */ }
  const handleCrossValidation = () => {
    navigate("/crosscheckq", { state: { usePrompt: true } });
  };

  /*   🛠️ 최적화된 프롬프트 관련 함수   */
  // 1. 복사 기능
  const handleCopy = () => {
    if (isOptimized && prompt) {
      navigator.clipboard.writeText(prompt);
      alert("최적화된 프롬프트가 복사되었어요!");
    }
  };

  // 2. 프롬프트 재생성 기능.. 일단 보류
  const handleRetryOptimization = async () => {
    if (!originalPrompt) return;
    setIsLoading(true);

    try {
      await new Promise((res) => setTimeout(res, 2000));
      const result = `최적화된 프롬프트 예시입니다 (버전 ${Math.floor(Math.random() * 1000)})`;
      setPrompt(result); // ✅ promptText에 덮어쓰기
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Wrapper>
      {showAlertModal && <AlertModal onClose={() => setShowAlertModal(false)} />}
      <Topbar />
        <PromptOptWrapper>
            <Sidebar />
              <MainWrapper>
                <MainText>
                  {isOptimized ? <>프롬프트가<Highlight> 최적화</Highlight>되었어요</> : <>프롬프트<Highlight> 최적화</Highlight>하기</>}
                </MainText>
                <ContentWrapper>
                    <PromptWrapper>
                      {isOptimized ? (
                        <>
                          <OptPrompt>
                            <ScrollArea>
                              <ReactMarkdown children={prompt} />
                            </ScrollArea>
                            <OptimizedBtnGroup>
                              <IconBtn
                                src={isBookmarked ? BookmarkFillIcon : BookmarkEmpIcon}
                                onClick={() => {
                                  if (isBookmarked) {
                                    setIsBookmarked(false);
                                    alert("북마크에서 삭제했습니다.");
                                  } else {
                                    setShowBookmarkModal(true);
                                  }
                                }}
                              />
                              {showBookmarkModal && (
                                <BookmarkModal
                                  folders={["기본 폴더", "기획", "디자인", "마케팅", "배고파", "개발"]}
                                  onClose={() => setShowBookmarkModal(false)}
                                  onSave={() => {
                                    setIsBookmarked(true);
                                    setShowBookmarkModal(false);
                                  }}
                                  selectedFolder={selectedFolder}
                                  setSelectedFolder={setSelectedFolder}
                                />
                              )}
                              <IconBtn src={RefreshIcon} onClick={handleRetryOptimization} />
                              <IconBtn src={CopyIcon} onClick={handleCopy} />
                            </OptimizedBtnGroup>
                          </OptPrompt>
                        </>
                      ) : (
                        <>
                          <PromptInput
                            placeholder="어떤 프롬프트를 작성해야 좋을까?"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                          />
                          <SendBtn src={CircleArrowBtn} onClick={handleSend} />
                        </>
                      )}
                    </PromptWrapper>
                </ContentWrapper>
                {!isOptimized ? (
                <ExampleWrapper>
                  { /* 예시... 나중에 수정 필요 */ }
                    <ExampleBox onClick={() => handleExampleClick("2025년 인공지능 트렌드를 요약해줘")}>
                      💡 2025년 인공지능 트렌드를 요약해줘
                    </ExampleBox>
                    <ExampleBox onClick={() => handleExampleClick("기후 변화가 경제에 미치는 영향 알려줘")}>
                      💡 기후 변화가 경제에 미치는 영향 알려줘
                    </ExampleBox>
                    <ExampleBox onClick={() => handleExampleClick("빅데이터 분석의 단계 알려줘")}>
                      💡 빅데이터 분석의 단계 알려줘
                    </ExampleBox>
                </ExampleWrapper>
                ):(
                  <CrossValidationBtn onClick={handleCrossValidation}>
                    이 프롬프트로 교차검증하기
                    <ArrowIcon src={ArrowRight} alt="Arrow Right" />
                  </CrossValidationBtn>
                )}
              </MainWrapper>
          </PromptOptWrapper>
        </Wrapper>
    );
}

export default PromptOptimize;