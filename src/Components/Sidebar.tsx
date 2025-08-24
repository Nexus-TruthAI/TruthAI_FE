import React, { useState}from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { usePrompt } from "../Context/PromptContext";

import api from "../api";

const Wrapper = styled.div`
    margin: 0 2rem 2rem 2rem;
    padding: 0;
    height: calc(100vh - 6rem);
    width: 11.5rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-right: solid 1px rgba(255, 255, 255, 0.1);
`;

const PromptWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 50%;
    width: 90%;
    border-bottom: solid 1px rgba(255, 255, 255, 0.1);
`;

const TitleText = styled.div`
    color: #EFEFEF;
    font-size: 12px;
    font-weight: 500;
    margin: 2rem 0;
    text-align: left;
`;

const PromptListContainer = styled.div`
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const PromptList = styled.div`
    width: 100%;
`;

const PromptItem = styled.div`
    color: #fff;
    font-size: 14px;
    margin-bottom: 0.6rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
    width: 100%;
    cursor: pointer;
`;

const NewBtn = styled.div`
    color: #C2CCFD;
    font-size: 12px;
    font-weight: 500;
    align-self: flex-end;
    padding: 0.5rem 0;
    cursor: pointer;
`;

const CrossChecktWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 50%;
    width: 90%;
`;


const Sidebar = () => {
    const prompt_text = "새로운 프롬프트 생성하기 >";
    const cross_text = "새로 AI 교차검증하기 >";
    const navigate = useNavigate();
    //const [prompts, setPrompts] = useState<{promptId: number, summary: string}[]>([]);
    const { setPromptId } = usePrompt();
    const [promptList, setPromptList] = useState<{promptId: number, summary: string}[]>([]);
    //const [crossCheckList, setCrossCheckList] = useState<{promptId: number, summary: string}[]>([]);


    // Todo:
    // 프롬프트 리스트 조회에서 교차검증은 빠지고 있는지 체크
    // 교차검증 리스트 조회 연동 필요

    React.useEffect(() => {
        const fetchSidebarPrompts = async () => {
        try {
            const res = await api.get("/prompt/side-bar/list");
            setPromptList(res.data || []);
        } catch (err) {
            console.error("사이드바 조회 실패", err);
        }
        };

        fetchSidebarPrompts();
    }, [setPromptList]);

    // 상세 조회 후 페이지 이동
    const handlePromptClick = async (promptId: number) => {
        try {
        const res = await api.get("/prompt/side-bar/details", {
            params: { promptId },
        });

        const detail = res.data; 
        // detail: { promptId, originalPrompt, optimizedPrompt, summary, answerDto }

        setPromptId(promptId);

        navigate(`/promptopt/${promptId}`, {
            state: {
            originalPrompt: detail.originalPrompt,
            optimizedPrompt: detail.optimizedPrompt,
            isOptimized: !!detail.optimizedPrompt,
            answerDto: detail.answerDto,
            },
        });
        } catch (err) {
        console.error("프롬프트 상세 조회 실패", err);
        }
    };


    return (
        <Wrapper>
            <PromptWrapper>
                <TitleText>내 프롬프트</TitleText>
                <PromptListContainer>
                    <PromptList>
                        {promptList.map((item) => (
                            <PromptItem
                                key={item.promptId}
                                onClick={() => handlePromptClick(item.promptId)}
                            >
                                {item.summary}
                            </PromptItem>
                        ))}
                    </PromptList>
                </PromptListContainer>
                <NewBtn 
                onClick={() => navigate('/promptopt', { state: { reset: true } })}
                >
                {prompt_text}
                </NewBtn>
            </PromptWrapper>
            <CrossChecktWrapper>
                <TitleText>교차검증</TitleText>
                <PromptListContainer>
                    <PromptList>
                        {promptList.map((item) => (
                            <PromptItem key={item.promptId}>{item.summary}</PromptItem>
                        ))}
                    </PromptList>
                </PromptListContainer>
                <NewBtn onClick={() => navigate('/crosscheckq')}>{cross_text}</NewBtn>
            </CrossChecktWrapper>
        </Wrapper>
    );
};

export default Sidebar;