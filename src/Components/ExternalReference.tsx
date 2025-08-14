// ExternalReference.tsx
import React from "react";
import styled from "styled-components";

import ExRefoIcon from "../Icons/ExternalRefer.png";

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
`;

const ContentText = styled.div`
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.6;
  white-space: pre-line;
`;

const IconWrapper = styled.img`
  width: 3rem;
  height: 3rem;
  margin-right: 1rem;
`;

interface ExternalReferenceProps {
  activeTab: string;
  aiReferences: Record<string, string>;
}

const ExternalReference: React.FC<ExternalReferenceProps> = ({ activeTab, aiReferences }) => {
  return (
    <ContentArea>
      <IconWrapper src={ExRefoIcon} alt="External Reference Icon" />
      <ContentText>
        {aiReferences[activeTab as keyof typeof aiReferences]}
      </ContentText>
    </ContentArea>
  );
};

export default ExternalReference;