import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Topbar from "../Components/Topbar";
import FolderSidebar from "../Components/FolderSidebar";
import Background from "../Icons/BackgroundLong.png";
import { useParams } from "react-router-dom";
import BookmarkIcon from "../Icons/BookmarkEmpty.png";
import BookmarkFillIcon from "../Icons/BookmarkFill.png";
import CopyIcon from "../Icons/Copy.svg";
import Questionmark from "../Icons/QuestionMark.png";
import BookmarkModal from "../Components/BookmarkModal";
import { getFolders, type Folder, getPromptDetail, type PromptDetail } from "../services/folderService";
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
    margin-bottom: 2.5rem;
`

const CenterWrapper = styled.div`
    width: 56.25rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`
const FixedWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 1rem;
`

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`

const Modal = styled.div`
    width: 25rem;
    height: 20rem;
    background-color: #fff;
    border-radius: 20px;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    z-index: 1001;
`

const ModalTitle = styled.h2`
    font-size: 20px;
    font-weight: 600;
    color: #000;
    margin: 2rem 0 0 0;
    text-align: center;
`

const ModalContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 2rem;
    color: #494949;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
`

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0;
`

const InputText = styled.input`
    padding: 0.75rem 1rem;
    border: 1px solid #e9ecef;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 400;
    color: #494949;
    background-color: #ffffff;
    transition: all 0.2s ease;
    margin: 0 2rem;
    border-color: #CECECE;
    
    &:focus {
        outline: none;
        border-color: #CECECE;
        box-shadow: 0 0 0 2px rgba(206, 206, 206, 0.1);
    }
    
    &::placeholder {
        color: #CECECE;
        font-weight: 400;
    }
`

const InputLabel = styled.label`
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: #495057;
    margin-left: 2rem;
    margin-right: 2rem;
    margin-bottom: 0.5rem;
`

const ModalButtons = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 4rem;
`

const ModalButton = styled.button`
    flex: 1;
    border-radius: 0px;
    padding: 0.75rem 1.5rem;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:focus {
        outline: none;
    }

    &.exit {
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        border: none;
        background-color: rgba(239, 239, 239, 1);
        color: #000;

        &:hover {
            background-color:rgb(220, 220, 220);
            outline: none;
        }
    }

    &.secondary {
        border-bottom-right-radius: 20px;
        border: none;
        background-color: #3B5AF7;
        color: #ffffff;

        &:hover {
            background-color: #2E4BD8;
            outline: none;
        }
    }
`

const ContentArea = styled.div`
    width: 44rem;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 2rem;
    height: auto;
    max-height: 10rem;
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

const IconContainer = styled.div`
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    display: flex;
    gap: 0.75rem;
`

const IconButton = styled.button`
    width: 1.5rem;
    height: 1.5rem;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }

    img.copy {
        width: 1.25rem;
        height: 1.25rem;
        filter: brightness(0) invert(1);
    }

    img.bookmark {
        width: 1.5rem;
        height: 1.5rem;
        filter: brightness(0) invert(1);
    }

    &:focus {
        outline : none;
    }

    img.questionmark {
        width: 1.25rem;
        height: 1.25rem;
        filter: brightness(0) invert(1);
    }
`

const Title = styled.div`
    color: #fff;
    font-size: 20px;
    font-weight: 600;
`

const TitleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
`

const MyWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

const Tooltip = styled.div`
    position: absolute;
    background-color: #fff;
    color: #494949;
    padding: 0.3rem;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.5;
    max-width: 30rem;
    width: 30rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 1002;
    white-space: pre-line;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 0.5rem;
    
    /* 말풍선 화살표 */
    &::after {
        content: '';
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 8px solid #fff;
    }
`

const TooltipContainer = styled.div`
    position: relative;
    display: inline-block;
`


const MyFolderPD = () => {
    const [showModal, setShowModal] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isPromptBookmarked, setIsPromptBookmarked] = useState(false);
    const [isModifiedPromptBookmarked, setIsModifiedPromptBookmarked] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [showBookmarkModal, setShowBookmarkModal] = useState(false);
    const [bookmarkType, setBookmarkType] = useState<'prompt' | 'modifiedPrompt' | null>(null);
    const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
    const [folders, setFolders] = useState<Folder[]>([]);
    const [refreshKey, setRefreshKey] = useState(0);
    const [promptDetail, setPromptDetail] = useState<PromptDetail | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { id } = useParams<{ id: string }>();
    const { promptId } = usePrompt();
    
    // 프롬프트 상세 정보 가져오기
    useEffect(() => {
        const fetchPromptDetail = async () => {
            if (!promptId) {
                console.log('promptId가 없습니다.');
                return;
            }
            
            try {
                setLoading(true);
                setError(null);
                const data = await getPromptDetail(promptId);
                setPromptDetail(data);
                console.log('프롬프트 상세 정보:', data);
            } catch (err) {
                console.error('프롬프트 상세 정보 조회 실패:', err);
                setError('프롬프트 상세 정보를 불러올 수 없습니다.');
            } finally {
                setLoading(false);
            }
        };
        
        fetchPromptDetail();
    }, [promptId]);
    
    // 폴더 목록 새로고침 함수
    const refreshFolderSidebar = () => {
        setRefreshKey(prev => prev + 1);
    };
    
    // 폴더 데이터 가져오기
    useEffect(() => {
        const fetchFolders = async () => {
            try {
                const folderData = await getFolders();
                setFolders(folderData);
            } catch (error) {
                console.error('폴더 목록 조회 실패:', error);
            }
        };
        
        fetchFolders();
    }, [refreshKey]);
    
    
    // optimizedPrompt에서 ```prompt와 끝의 ``` 제거하는 함수
    const parseOptimizedPrompt = (prompt: string) => {
        // ```prompt로 시작하는 경우 제거
        let parsed = prompt;
        if (prompt.startsWith('```prompt')) {
            parsed = prompt.substring(9); // ```prompt (9글자) 제거
        } else if (prompt.startsWith('```')) {
            parsed = prompt.substring(3); // ``` (3글자) 제거
        }
        
        // 끝에 ```가 있는 경우 제거
        if (parsed.endsWith('```')) {
            parsed = parsed.substring(0, parsed.length - 3);
        }
        
        return parsed.trim();
    };

    // 현재 ID에 해당하는 데이터 가져오기 - 이제 API에서 받아온 데이터 사용
    const currentData = promptDetail ? {
        title: promptDetail.summary,
        modifiedPrompt: parseOptimizedPrompt(promptDetail.optimizedPrompt),
        name: promptDetail.originalPrompt
    } : null;
    
    useEffect(() => {
        console.log("showDropdown: ", showDropdown);
    }, [showDropdown]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element;
            if (showDropdown && !target.closest('.dropdown-container')) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showDropdown]);

    const handleModalCancel = () => {
        setShowModal(false);
    }

    const handleModalConfirm = () => {
        setShowModal(false);
        alert("폴더 생성됨");
    }

    const handleCopyClick = async (content: string) => {
        if (content && content !== '생성된 결과가 없습니다.') {
            try {
                await navigator.clipboard.writeText(content);
                console.log('텍스트가 클립보드에 복사되었습니다.');
            } catch (err) {
                console.error('복사 실패:', err);
            }
        }
    };

    const handleBookmarkClick = (type: 'prompt' | 'modifiedPrompt') => {
        if (type === 'prompt') {
            setIsPromptBookmarked(prev => !prev);
        } else {
            setIsModifiedPromptBookmarked(prev => !prev);
        }
        setBookmarkType(type);
        setShowBookmarkModal(true);
    };

    const handleQuestionmarkMouseEnter = () => {
        setShowTooltip(true);
    }

    const handleQuestionmarkMouseLeave = () => {
        setShowTooltip(false);
    }

    // ID가 유효하지 않거나 데이터가 없는 경우
    if (!id || !currentData) {
        return (
            <Wrapper>
                <Topbar />
                <CrossCheckWrapper>
                    <FolderSidebar />
                    <MainWrapper>
                        <CenterWrapper>
                            {loading ? (
                                <MainText>프롬프트 정보를 불러오는 중...</MainText>
                            ) : error ? (
                                <MainText style={{ color: '#ff6b6b' }}>{error}</MainText>
                            ) : !promptId ? (
                                <MainText>프롬프트 ID가 없습니다</MainText>
                            ) : (
                                <MainText>프롬프트를 찾을 수 없습니다</MainText>
                            )}
                        </CenterWrapper>
                    </MainWrapper>
                </CrossCheckWrapper>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <Topbar />
            <CrossCheckWrapper>
                <FolderSidebar />
                <MainWrapper>
                    <CenterWrapper>
                            <MainText>{currentData.title}</MainText>
                            <FixedWrapper>
                                <Title>수정된 프롬프트</Title>
                                <ContentArea>
                                    <ContentText>
                                        {currentData.modifiedPrompt}
                                    </ContentText>
                                        <IconContainer>
                                            <IconButton onClick={() => handleCopyClick(currentData.modifiedPrompt)}>
                                                <img src={CopyIcon} alt="Copy" className="copy" />
                                            </IconButton>
                                        </IconContainer>
                                </ContentArea>
                            </FixedWrapper>
                            <MyWrapper>
                                <TitleWrapper>
                                    <Title>내가 입력한 프롬프트</Title>
                                    <TooltipContainer className="tooltip-container">
                                        <IconButton 
                                            onMouseEnter={handleQuestionmarkMouseEnter}
                                            onMouseLeave={handleQuestionmarkMouseLeave}
                                        >
                                            <img src={Questionmark} alt="questionmark" className="questionmark" />
                                        </IconButton>
                                        {showTooltip && (
                                            <Tooltip>
                                                AI가 제안한 프롬프트를 참고해 내가 입력한 프롬프트를 더 정교하게 수정할 수 있어요.{'\n'}목적에 맞게 내용을 변경하고 다듬어 자신이 원하는 방향으로 질문을 정교화해보세요!
                                            </Tooltip>
                                        )}
                                    </TooltipContainer>
                                </TitleWrapper>
                                <ContentArea>
                                    <ContentText>
                                        {currentData.name}
                                    </ContentText>
                                        <IconContainer>
                                            <IconButton onClick={() => handleCopyClick(currentData.name)}>
                                                <img src={CopyIcon} alt="Copy" className="copy" />
                                            </IconButton>
                                        </IconContainer>
                                </ContentArea>
                            </MyWrapper>
                    </CenterWrapper>
                </MainWrapper>
            </CrossCheckWrapper>

            {showModal && (
                <ModalOverlay>
                    <Modal>
                        <ModalTitle>
                            새로운 폴더 생성하기
                        </ModalTitle>
                        <ModalContent>
                            폴더 이름을 작성해주세요.
                        </ModalContent>
                        <InputWrapper>
                            <InputLabel>폴더명</InputLabel>
                            <InputText width="80%" placeholder="입력해주세요." />
                        </InputWrapper>
                        <ModalButtons>
                            <ModalButton className="exit" onClick={handleModalCancel}>
                                뒤로가기
                            </ModalButton>
                            <ModalButton className="secondary" onClick={handleModalConfirm}>
                                폴더 생성하기
                            </ModalButton>
                        </ModalButtons>
                    </Modal>
                </ModalOverlay>
            )}
        </Wrapper>
    );
}

export default MyFolderPD;