import { useEffect, useState } from "react";
import styled from "styled-components";
import { type Folder, savePromptToFolder, getFolders } from "../services/folderService";
import { usePrompt } from "../Context/PromptContext";

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
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${({ selected }) => (selected ? "#6D8BFF" : "#999")};
    background: ${({ selected }) => (selected ? "#f0f4ff" : "#f0f0f0")};
  }
`;

const FolderName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.25rem;
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

const BookmarkModalCrossCheck = ({
    onClose, // 모달창 닫기 함수
    onSave,  // 저장 함수
    selectedFolder,  // 선택된 폴더
    setSelectedFolder  // 선택된 폴더 설정 함수
}: {
  onClose: () => void;
  onSave: () => void;
  selectedFolder: Folder | null;
  setSelectedFolder: (folder: Folder) => void;
}) => {
  const { promptId } = usePrompt();
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(true);

  // 교차검증 폴더만 조회
  useEffect(() => {
    const fetchCrosscheckFolders = async () => {
      try {
        setLoading(true);
        const folderData = await getFolders('crosscheck');
        setFolders(folderData);
      } catch (error) {
        console.error('교차검증 폴더 조회 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCrosscheckFolders();
  }, []);

  const handleSave = async () => {
    if (!selectedFolder || !promptId) {
      alert('폴더와 교차검증을 선택해주세요.');
      return;
    }

    try {
      await savePromptToFolder(selectedFolder.id, promptId, 'crosscheck');
      alert(`${selectedFolder.name}에 교차검증이 저장되었습니다.`);
      onSave();
    } catch (error) {
      console.error('교차검증 저장 실패:', error);
      alert('교차검증 저장에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <ModalBackdrop>
      <ModalBox>
        <ModalTitle>저장할 폴더 선택하기</ModalTitle>
        <FolderGrid>
          {loading ? (
            <div style={{ color: '#666', fontSize: '14px' }}>폴더 목록을 불러오는 중...</div>
          ) : folders.length === 0 ? (
            <div style={{ color: '#666', fontSize: '14px' }}>교차검증 폴더가 없습니다.</div>
          ) : (
            folders.map((folder) => (
              <FolderCard
                key={folder.id}
                selected={folder.id === selectedFolder?.id}
                onClick={() => setSelectedFolder(folder)}
              >
                <FolderName>{folder.name}</FolderName>
              </FolderCard>
            ))
          )}
        </FolderGrid>
        <ButtonGrid>
          <CancelButton onClick={onClose}>취소하기</CancelButton>
          <SaveButton onClick={handleSave}>저장하기</SaveButton>
        </ButtonGrid>
      </ModalBox>
    </ModalBackdrop>
  );
};

export default BookmarkModalCrossCheck;