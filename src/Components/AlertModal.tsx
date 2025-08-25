// src/Components/AlertModal.tsx

import styled from "styled-components";

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalBox = styled.div`
  width: 400px;
  height: 251px;
  background: #fff;
  padding: 2rem;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #000;
  text-align: center;
`;

const ModalDescription = styled.p`
  margin-top: 2rem;
  font-size: 14px;
  font-weight: 500;
  color: #555;
  text-align: center;
  line-height: 1.5;
`;

const ReturnButton = styled.button`
  margin: 0 -2rem -2rem -2rem;
  width: calc(100% + 4rem);
  height: 4rem;
  background: #FF2E2E;
  color: white;
  border: none;
  border-radius: 0 0 20px 20px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
`;

const AlertModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <ModalBackdrop>
      <ModalBox>
        <div>
          <ModalTitle>입력된 내용이 없습니다</ModalTitle>
          <ModalDescription>
            프롬프트를 입력해야 답변을 생성할 수 있어요.<br />
            질문이나 요청을 입력해 주세요.
          </ModalDescription>
        </div>
        <ReturnButton onClick={onClose}>돌아가기</ReturnButton>
      </ModalBox>
    </ModalBackdrop>
  );
};

export default AlertModal;