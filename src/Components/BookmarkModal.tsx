import React from "react";
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
  height: 442px;
  max-height: 80vh;
  background: #fff;
  color: #000000;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  margin: 2rem 2rem 1rem 1rem;
`;

const FolderGrid = styled.div`
  flex: 1;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
`;

const FolderCard = styled.div<{ selected: boolean }>`
  padding: 1rem;
  border-radius: 12px;
  border: 2px solid ${({ selected }) => (selected ? "#6D8BFF" : "#ccc")};
  background: #f9f9f9;
  width: 85%;
  cursor: pointer;
  font-weight: 600;
  box-sizing: border-box;
`;

const ButtonGrid = styled.div`
  display: flex;
  width: 100%;
  height: 4.6rem;
`;


const SaveButton = styled.button`
  flex: 1;
  background: #3B5AF7;
  color: white;
  border: none;
  border-radius: 0 0 20px 0;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

const CancelButton = styled.button`
  flex: 1;
  background: #EFEFEF;
  color: #333;
  border: none;
  border-radius: 0 0 0 20px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

const BookmarkModal = ({
  folders, // 폴더 목록
  onClose, // 모달창 닫기 함수
  onSave,  // 저장 함수
  selectedFolder,  // 선택된 폴더
  setSelectedFolder  // 선택된 폴더 설정 함수
}: {
  folders: string[];
  onClose: () => void;
  onSave: () => void;
  selectedFolder: string | null;
  setSelectedFolder: (folder: string) => void;
}) => {


  return (
    <ModalBackdrop>
      <ModalBox>
        <ModalTitle>저장할 폴더 선택하기</ModalTitle>
        <FolderGrid>
          {folders.map((folder) => (
            <FolderCard
              key={folder}
              selected={folder === selectedFolder}
              onClick={() => setSelectedFolder(folder)}
            >
              {folder}
            </FolderCard>
          ))}
        </FolderGrid>
        <ButtonGrid>
          <CancelButton onClick={onClose}>취소하기</CancelButton>
          <SaveButton onClick={onSave} >저장하기</SaveButton>
        </ButtonGrid>
      </ModalBox>
    </ModalBackdrop>
  );
};

export default BookmarkModal;