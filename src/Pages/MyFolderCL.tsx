import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Topbar from "../Components/Topbar";
import FolderSidebar from "../Components/FolderSidebar";
import Background from "../Icons/BackgroundBasic.png";
import NewBtn from "../Components/NewBtn";
import ArrowDown from "../Icons/ArrowDown.svg";
import ArrowUp from "../Icons/ArrowUp.svg";
import { useNavigate } from "react-router-dom";

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
    text-align: center;
`

const CenterWrapper = styled.div`
    width: 56.25rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const TopWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

const PromptList = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

const ListHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid rgba(239, 239, 239, 1);
    position: relative;
`

const HeaderItem = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: rgba(255, 255, 255, 0.8);
    font-size: 14px;
    font-weight: 500;
`

const SortIcon = styled.span`
    font-size: 12px;
    cursor: pointer;
    transition: color 0.2s;
    
    &:hover {
        color: #C2CCFD;
    }
`

const PromptItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    border-bottom: 1px solid rgba(239, 239, 239, 0.1);
    transition: background-color 0.2s;
    border-radius: 8px;
    padding-left: 1rem;
    padding-right: 1rem;
    
    &:hover {
        background-color: rgba(255, 255, 255, 0.05);
    }
    
    &:last-child {
        border-bottom: none;
    }
`

const PromptTitle = styled.div`
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    flex: 1;
`

const PromptDate = styled.div`
    color: rgba(255, 255, 255, 0.6);
    font-size: 14px;
    font-weight: 400;
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

const DropdownMenu = styled.div`
    background-color: #fff;
    width: 6.5rem;
    border-radius: 10px;
    position: absolute;
    margin-top: 3rem;
    padding: 0 0.3rem;
`

const DropdownItemFirst = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0.5rem;
    cursor: pointer;
    transition: background-color 0.2s;
    z-index: 1001;
    border-radius: 10px 10px 0 0;
    border-bottom: 1px solid rgba(73, 73, 73, 0.2);
    font-size: 14px;

    &:hover {
        background-color: #f0f0f0;
    }
`
const DropdownItemSecond = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0.8rem;
    cursor: pointer;
    transition: background-color 0.2s;
    z-index: 1001;
    border-radius: 10px;
    font-size: 14px;


    &:hover {
        background-color: #f0f0f0;
    }
`

const MyFolderCL = () => {
    const [showModal, setShowModal] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    
    // 임시 AI 교차검증 데이터 (백엔드에서 받아올 예정)
    const tempCrossChecks = [
        {
            id: 1,
            title: "인공지능 트렌드 요약",
            date: "3시간 전"
        },
        {
            id: 2,
            title: "빅데이터 분석 단계 설명",
            date: "2일 전"
        },
        {
            id: 3,
            title: "머신러닝과 딥러닝 설명 및 차이점",
            date: "1달 전"
        },
        {
            id: 4,
            title: "자연어 처리 기술 동향",
            date: "1주일 전"
        },
        {
            id: 5,
            title: "AI 윤리와 책임성",
            date: "2주일 전"
        }
    ];
    
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

    const handleDropdown = () => {
        console.log("클릭됨: ", showDropdown);
        setShowDropdown(prev => {
            console.log("이전값 ", prev, "현재값 ", !prev);
            return !prev;
        })
    }

    const handleNewFolder = () => {
        setShowModal(true);
        console.log("showModal: ", showModal);
    }

    const handleModalCancel = () => {
        setShowModal(false);
    }

    const handleModalConfirm = () => {
        setShowModal(false);
        alert("폴더 생성됨");
    }

    const handleCrossCheckClick = (crossCheckId: number) => {
        navigate(`/factcheck`);
    };

    return (
        <Wrapper>
            <Topbar />
            <CrossCheckWrapper>
                <FolderSidebar />
                <MainWrapper>
                    <CenterWrapper>
                        <TopWrapper>
                            <MainText>모든 AI 교차검증</MainText>
                            <NewBtn onClick={handleNewFolder}>+&nbsp;&nbsp;&nbsp;새 폴더</NewBtn>
                        </TopWrapper>
                        <PromptList>
                            <ListHeader>
                                <HeaderItem onClick={() => {handleDropdown()}} style={{ cursor: 'pointer' }}>
                                    AI 교차검증
                                    <SortIcon><img src={ArrowDown} alt="" /></SortIcon>
                                </HeaderItem>
                                <HeaderItem>
                                    생성일자
                                </HeaderItem>
                            </ListHeader>
                            {showDropdown && (
                                <DropdownMenu className="dropdown-container">
                                    <DropdownItemFirst onClick={() => {handleDropdown()}}>
                                        AI 교차검증
                                        <SortIcon><img src={ArrowUp} alt="" /></SortIcon>
                                    </DropdownItemFirst>
                                    <DropdownItemSecond onClick={() => {navigate('/myfolderpl')}}>
                                        프롬프트
                                    </DropdownItemSecond>
                                </DropdownMenu>
                            )}
                            
                            {tempCrossChecks.map((crossCheck) => (
                                <PromptItem 
                                    key={crossCheck.id} 
                                    onClick={() => handleCrossCheckClick(crossCheck.id)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <PromptTitle>{crossCheck.title}</PromptTitle>
                                    <PromptDate>{crossCheck.date}</PromptDate>
                                </PromptItem>
                            ))}
                        </PromptList>

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

export default MyFolderCL;