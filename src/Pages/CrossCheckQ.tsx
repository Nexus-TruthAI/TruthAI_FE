import React from "react";
import styled from "styled-components";
import Topbar from "../Components/Topbar";
import Sidebar from "../Components/Sidebar";
import Background from "../Icons/BackgroundBasic.png";
import CircleArrowBtn from "../Icons/CircleArrowBtn.svg";


const Wrapper = styled.div`
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    background-image: url(${Background});
    background-size: cover;
    background-position: center;
`

const CrossCheckWrapper = styled.div`
    display: flex;
    flex-direction: row;
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
`
const Highlight = styled.span`
    color: #C2CCFD;
`
const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 80%;
    margin-top: 1rem;
`

const PromptWrapper = styled.div`
    position: relative;
    width: 100%;
    height: auto;
    margin: 2rem;
`

const PromptInput = styled.textarea`
    font-family: 'SUIT';
    width: 100%;
    height: 7.25rem;
    padding: 1rem 0 2rem 1rem; /* 오른쪽 padding 늘림 */
    background-color: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 20px;
    resize: none;
    color: #fff;
    font-size: 16px;
    font-weight: 400;
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
`;

const SendBtn = styled.img`
    position: absolute;
    bottom: 2rem;
    right: 0.5rem;
    width: 2rem;
    height: 2rem;
    cursor: pointer;
`;

const ChoiceWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-top : 1rem;
    color: #fff;
    gap: 1rem;
    margin-left: 2rem;
`

const Checkbox = styled.label`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;

    input[type="checkbox"] {
        width: 1rem;
        height: 1rem;
        accent-color: #C2CCFD;
    }
`

const CrossCheckQ = () => {
    return (
        <Wrapper>
            <Topbar />
            <CrossCheckWrapper>
                <Sidebar />
                <MainWrapper>
                    <MainText>AI<Highlight>교차검증</Highlight>하기</MainText>
                    <ContentWrapper>
                        <PromptWrapper>
                            <PromptInput
                                placeholder="프롬프트를 입력해주세요."    
                            />
                            <SendBtn src={CircleArrowBtn}></SendBtn>
                        </PromptWrapper>
                        <ChoiceWrapper>
                            <Checkbox>
                                <input type="checkbox" value="chatgpt" />
                                ChatGPT
                            </Checkbox>
                            <Checkbox>
                                <input type="checkbox" value="claude" />
                                Claude
                            </Checkbox>
                            <Checkbox>
                                <input type="checkbox" value="gemini" />
                                Gemini
                            </Checkbox>
                            <Checkbox>
                                <input type="checkbox" value="perplexity" />
                                Perplexity
                            </Checkbox>
                        </ChoiceWrapper>
                    </ContentWrapper>

                </MainWrapper>
            </CrossCheckWrapper>

        </Wrapper>
    );
}

export default CrossCheckQ;