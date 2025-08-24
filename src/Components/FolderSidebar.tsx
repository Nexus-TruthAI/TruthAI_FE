import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getFolders, type Folder } from "../services/folderService";
import { usePrompt } from "../Context/PromptContext";

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
    color: #C2CCFD;
    font-size: 14px;
    font-weight: 500;
    margin: 1.5rem 0 0.5rem 0;
    text-align: left;
    cursor: pointer;
`;

const SubTitleText = styled.div`
    color: #fff;
    font-size: 12px;
    font-weight: 500;
    margin: 1rem 0 1rem 0;
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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
    width: 100%;
    gap: 0.5rem;
    cursor: pointer;
    transition: color 0.2s;
    padding: 0.5rem;
    border-radius: 4px;
    
    &:hover {
        color: #C2CCFD;
        background-color: rgba(194, 204, 253, 0.1);
    }
`;

const LoadingText = styled.div`
    color: rgba(255, 255, 255, 0.6);
    font-size: 12px;
    font-style: italic;
    padding: 0.5rem;
`;

const ErrorText = styled.div`
    color: #ff6b6b;
    font-size: 15px;
    font-style: italic;
    padding: 0.5rem;
`;

const EmptyText = styled.div`
    color: rgba(255, 255, 255, 0.4);
    font-size: 15px;
    font-style: italic;
    padding: 0.5rem;
    text-align: center;
`;

const CrossChecktWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 50%;
    width: 90%;
`;

const FolderSidebar = () => {
    const [promptFolders, setPromptFolders] = useState<Folder[]>([]);
    const [crosscheckFolders, setCrosscheckFolders] = useState<Folder[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { setFolderId } = usePrompt();

    const fetchFolders = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Fetch both types of folders
            const [promptData, crosscheckData] = await Promise.all([
                getFolders('prompt'),
                getFolders('crosscheck')
            ]);
            
            setPromptFolders(promptData);
            setCrosscheckFolders(crosscheckData);
        } catch (err) {
            console.error('폴더 목록 조회 실패:', err);
            setError('폴더 목록을 불러올 수 없습니다.');
            setPromptFolders([]);
            setCrosscheckFolders([]);
        } finally {
            setLoading(false);
        }
    };

    // 초기 로딩만 한 번 실행
    useEffect(() => {
        fetchFolders();
    }, []);

    const handleCrossFolderClick = (folderId: number) => {
        // 폴더 클릭 시 Context에 folderId 저장
        setFolderId(folderId);
        console.log('선택된 폴더 ID:', folderId);
        navigate(`/myfoldercross/${folderId}`);
    };

    const handlePromptFolderClick = (folderId: number) => {
        setFolderId(folderId);
        console.log('선택된 폴더 ID:', folderId);
        navigate(`/myfolderprompt/${folderId}`);
    };

    return (
        <Wrapper>
            <PromptWrapper>
                <TitleText onClick={() => navigate('/myfolderpl')}>모든 프롬프트</TitleText>
                <SubTitleText>내 폴더</SubTitleText>
                <PromptListContainer>
                    <PromptList>
                        {loading ? (
                            <LoadingText>폴더 목록을 불러오는 중...</LoadingText>
                        ) : error ? (
                            <ErrorText>{error}</ErrorText>
                        ) : promptFolders.length === 0 ? (
                            <EmptyText>폴더가 없습니다.</EmptyText>
                        ) : (
                            promptFolders.map((folder) => (
                                <PromptItem
                                    key={folder.id}
                                    onClick={() => handlePromptFolderClick(folder.id)}
                                    title={`${folder.name} (${new Date(folder.createdAt).toLocaleDateString()})`}
                                >
                                    {folder.name}
                                </PromptItem>
                            ))
                        )}
                    </PromptList>
                </PromptListContainer>
            </PromptWrapper>
            <CrossChecktWrapper>
                <TitleText onClick={() => navigate('/myfoldercl')}>모든 교차검증</TitleText>
                <SubTitleText>내 폴더</SubTitleText>
                <PromptListContainer>
                    <PromptList>
                    {loading ? (
                            <LoadingText>폴더 목록을 불러오는 중...</LoadingText>
                        ) : error ? (
                            <ErrorText>{error}</ErrorText>
                        ) : crosscheckFolders.length === 0 ? (
                            <EmptyText>폴더가 없습니다.</EmptyText>
                        ) : (
                            crosscheckFolders.map((folder) => (
                                <PromptItem
                                    key={folder.id}
                                    onClick={() => handleCrossFolderClick(folder.id)}
                                    title={`${folder.name} (${new Date(folder.createdAt).toLocaleDateString()})`}
                                >
                                    {folder.name}
                                </PromptItem>
                            ))
                        )}
                    </PromptList>
                </PromptListContainer>
            </CrossChecktWrapper>
        </Wrapper>
    );
};

export default FolderSidebar;
