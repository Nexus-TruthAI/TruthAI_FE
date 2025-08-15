// ExternalReference.tsx
import React from "react";
import styled from "styled-components";

import ExRefoIcon from "../Icons/ExternalRefer.png";
import ArrowRightIcon from "../Icons/ArrowRight.svg";

const ContentArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 63rem;
  height: 3.5rem;
  flex-shrink: 0;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.20);
  padding: 1rem 2rem 1rem 0.9rem;
  margin-bottom: 1.5rem;
  cursor: pointer;
`;

const ContentText = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
`;

const Title = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 0.25rem; // 타이틀과 서머리 사이 간격
`;

const Summary = styled.div`
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const ExternalIcon = styled.img`
  width: 3rem;
  height: 3rem;
  margin-right: 1rem;
`;

const ArrowIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  margin-left: auto;
  margin-top: 1.68rem;
  margin-bottom: 1.68rem;
  cursor: pointer;
`
const ExceptionMessage = styled.div`
  color: #fff;
  margin: 4rem auto;
  font-size: 1rem;
  font-weight: 500;
  line-height: normal;
  padding: 1rem 2rem;
`;


interface AiReferenceItem {
  title: string;
  summary: string;
  link: string;
}

interface ExternalReferenceProps {
  activeTab: string;
  aiReferences: Record<string, AiReferenceItem[]>;
}

const ExternalReference = ({ activeTab, aiReferences }: ExternalReferenceProps) => {
  const references = aiReferences[activeTab] || [];

  if (!references || references.length === 0) {
    // 메시지 설정
    const message =
      aiReferences[activeTab] === undefined
        ? "선택하지 않은 AI입니다."
        : "확인된 외부 자료가 없습니다.";

    return (
        <ExceptionMessage>{message}</ExceptionMessage>
    );
  }

  return (
    <>
      {references.map((ref, idx) => (
        <ContentArea key={idx} onClick={() => window.open(ref.link, "_blank")}>
          <ExternalIcon src={ExRefoIcon} alt="External Reference Icon" />
          <ContentText>
            <Title>{`Source ${idx + 1}: ${ref.title}`}</Title>
            <Summary>{`Summary: ${ref.summary}`}</Summary>
          </ContentText>
          <ArrowIcon src={ArrowRightIcon} alt="Arrow Right Icon" />
        </ContentArea>
      ))}
    </>
  );
};

export default ExternalReference;