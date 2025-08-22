import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getFolders, type Folder } from "../services/folderService";

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
    font-size: 12px;
    font-style: italic;
    padding: 0.5rem;
`;

const EmptyText = styled.div`
    color: rgba(255, 255, 255, 0.4);
    font-size: 12px;
    font-style: italic;
    padding: 0.5rem;
    text-align: center;
`;

interface FolderSidebarProps {
    onRefresh?: () => void; // 새로고침 콜백 함수
}

const FolderSidebar = ({ onRefresh }: FolderSidebarProps) => {
    const [folders, setFolders] = useState<Folder[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const fetchFolders = async () => {
        try {
            setLoading(true);
            setError(null);
            const folderData = await getFolders();
            if (Array.isArray(folderData)) {
                setFolders(folderData);
            } else {
                console.error('API 응답이 배열이 아닙니다:', folderData);
                setError('폴더 데이터 형식이 올바르지 않습니다.');
                setFolders([]);
            }
        } catch (err) {
            console.error('폴더 목록 조회 실패:', err);
            setError('폴더 목록을 불러올 수 없습니다.');
            setFolders([]);
        } finally {
            setLoading(false);
        }
    };

    // 외부에서 새로고침 요청이 오면 실행
    useEffect(() => {
        if (onRefresh) {
            fetchFolders();
        }
    }, [onRefresh]);

    // 초기 로딩
    useEffect(() => {
        fetchFolders();
    }, []);

    const handleFolderClick = (folderId: number) => {
        navigate(`/myfolder/${folderId}`);
    };

    return (
        <Wrapper>
            <PromptWrapper>
                <TitleText>모든 프롬프트</TitleText>
                <SubTitleText>내 폴더</SubTitleText>
                <PromptListContainer>
                    <PromptList>
                        {loading ? (
                            <LoadingText>폴더 목록을 불러오는 중...</LoadingText>
                        ) : error ? (
                            <ErrorText>{error}</ErrorText>
                        ) : folders.length === 0 ? (
                            <EmptyText>폴더가 없습니다.</EmptyText>
                        ) : (
                            folders.map((folder) => (
                                <PromptItem
                                    key={folder.id}
                                    onClick={() => handleFolderClick(folder.id)}
                                    title={`${folder.name} (${new Date(folder.createdAt).toLocaleDateString()})`}
                                >
                                    {folder.name}
                                </PromptItem>
                            ))
                        )}
                    </PromptList>
                </PromptListContainer>
            </PromptWrapper>
        </Wrapper>
    );
};

export default FolderSidebar;
