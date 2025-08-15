import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
    height: 100vh;
    width: 90%;
    // border-bottom: solid 1px rgba(255, 255, 255, 0.1);
`;

const TitleText = styled.div`
    color: #C2CCFD;
    font-size: 14px;
    font-weight: 500;
    margin: 2rem 0;
    text-align: left;
`;

const SubTitleText = styled.div`
    color: #fff;
    font-size: 12px;
    font-weight: 500;
    margin: 1rem 0 2rem 0;
    text-align: left;
`;

const PromptListContainer = styled.div`
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
`;

const PromptList = styled.div`
    width: 100%;
    gap: 0.5rem;
`;

const PromptItem = styled.div`
    color: #fff;
    font-size: 14px;
    margin-bottom: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
    width: 100%;
    gap: 0.5rem;
`;



const Sidebar = () => {
    const prompts = Array(5).fill("내 폴더").map((text, i) => `${text} ${i + 1}`);

    return (
        <Wrapper>
            <PromptWrapper>
                <TitleText>모든 프롬프트</TitleText>
                <SubTitleText>내 폴더</SubTitleText>
                <PromptListContainer>
                    <PromptList>
                        {prompts.map((item, idx) => (
                            <PromptItem key={idx}>{item}</PromptItem>
                        ))}
                    </PromptList>
                </PromptListContainer>
            </PromptWrapper>
        </Wrapper>
    );
};

export default Sidebar;
