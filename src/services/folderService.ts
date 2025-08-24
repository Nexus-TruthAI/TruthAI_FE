import api from '../api';

export interface Folder {
  id: number;
  name: string;
  createdAt: string;
}

export const getFolders = async (folderType: 'prompt' | 'crosscheck'): Promise<Folder[]> => {
  try {
    console.log('폴더 목록 조회 API 요청 시작');
    console.log('요청 URL:', `/folder/${folderType}`);
    
    const response = await api.get(`/folder/${folderType}`);
    
    console.log('폴더 목록 조회 성공:', response.data);
    
    // 응답 데이터가 배열인지 확인
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      console.error('API 응답이 배열이 아닙니다:', response.data);
      throw new Error('폴더 데이터 형식이 올바르지 않습니다.');
    }
  } catch (error) {
    console.error('폴더 목록 조회 실패:', error);
    
    //API 에러인지 확인
    if (error && typeof error === 'object') {
      const errorObj = error as Record<string, unknown>;
      if (errorObj.response) {
        console.error('API 응답 에러:', errorObj.response);
      }
    }
    
    throw error;
  }
};

export interface CreateFolderRequest {
  folderName: string;
  folderType: 'prompt' | 'crosscheck';
}

export interface CreateFolderResponse {
  folderId: number;
}

export const createFolder = async (folderName: string, folderType: 'prompt' | 'crosscheck'): Promise<CreateFolderResponse> => {
  try {
    console.log('폴더 생성 API 요청 시작');
    console.log('요청 URL:', '/folder');
    console.log('폴더명:', folderName);
    console.log('폴더 타입:', folderType);
    
    const requestData: CreateFolderRequest = { folderName, folderType };
    const response = await api.post('/folder', requestData);
    
    console.log('폴더 생성 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('폴더 생성 실패:', error);
    
    //API 에러인지 확인
    if (error && typeof error === 'object') {
      const errorObj = error as Record<string, unknown>;
      if (errorObj.response) {
        console.error('API 응답 에러:', errorObj.response);
      }
    }
    
    throw error;
  }
};

// 프롬프트 최적화 결과 리스트 관련 인터페이스
export interface OptimizedPrompt {
  id: number;
  summary: string;
  createdAt: string;
}

// 폴더 내 프롬프트 타입 (GET /folder/{folderId} 응답용)
export interface FolderPrompt {
  id: number;
  summary: string;
  createdAt: string;
}

export interface PromptDetail {
  id: number;
  originalPrompt: string;
  optimizedPrompt: string;
  summary: string;
}

// 프롬프트 최적화 결과 리스트 조회
export const getOptimizedPromptList = async (): Promise<OptimizedPrompt[]> => {
  try {
    console.log('프롬프트 최적화 결과 리스트 조회 API 요청 시작');
    
    const response = await api.get('/prompt/optimized-prompt-list');
    
    console.log('성공:', response.data);
    
    // 응답 데이터가 배열인지 확인
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      console.error('API 응답이 배열이 아닙니다:', response.data);
      throw new Error('프롬프트 데이터 형식이 올바르지 않습니다.');
    }
  } catch (error) {
    console.error('프롬프트 최적화 결과 리스트 조회 실패:', error);
    
    //API 에러인지 확인
    if (error && typeof error === 'object') {
      const errorObj = error as Record<string, unknown>;
      if (errorObj.response) {
        console.error('API 응답 에러:', errorObj.response);
      }
    }
    
    throw error;
  }
};

export const getCrossCheckList = async (): Promise<OptimizedPrompt[]> => {
  try {
    console.log('crosscheck 결과 리스트 조회 API 요청 시작');
    
    const response = await api.get('/prompt/crosscheck-list');
    
    console.log('성공:', response.data);
    
    // 응답 데이터가 배열인지 확인
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      console.error('API 응답이 배열이 아닙니다:', response.data);
      throw new Error('프롬프트 데이터 형식이 올바르지 않습니다.');
    }
  } catch (error) {
    console.error('프롬프트 최적화 결과 리스트 조회 실패:', error);
    
    //API 에러인지 확인
    if (error && typeof error === 'object') {
      const errorObj = error as Record<string, unknown>;
      if (errorObj.response) {
        console.error('API 응답 에러:', errorObj.response);
      }
    }
    
    throw error;
  }
};

export const getPromptDetail = async (promptId: number): Promise<PromptDetail> => {
  try {
    console.log('프롬프트 상세 정보 조회 API 요청 시작');
    const response = await api.get(`/prompt/${promptId}`);
    console.log('성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('프롬프트 상세 정보 조회 실패:', error);
    if (error && typeof error === 'object') {
      const errorObj = error as Record<string, unknown>;
      if (errorObj.response) {
        console.error('API 응답 에러:', errorObj.response);
      }
    }
    throw error;
  }
};

// 폴더 내 프롬프트 목록 조회
export const getFolderPrompts = async (folderId: number, type: 'prompt' | 'crosscheck'): Promise<FolderPrompt[]> => {
  try {
    console.log('폴더 내 프롬프트 목록 조회 API 요청 시작');
    const response = await api.get(`/folder/${folderId}/${type}`);
    console.log('성공:', response.data);
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      console.error('API 응답이 배열이 아닙니다:', response.data);
      throw new Error('폴더 프롬프트 데이터 형식이 올바르지 않습니다.');
    }
  } catch (error) {
    console.error('폴더 내 프롬프트 목록 조회 실패:', error);
    if (error && typeof error === 'object') {
      const errorObj = error as Record<string, unknown>;
      if (errorObj.response) {
        console.error('API 응답 에러:', errorObj.response);
      }
    }
    throw error;
  }
};

// 폴더에 프롬프트 저장
export const savePromptToFolder = async (folderId: number, promptId: number, type: 'prompt' | 'crosscheck'): Promise<void> => {
  try {
    console.log('폴더에 프롬프트 저장 API 요청 시작');
    const response = await api.put(`/folder/${folderId}/prompts/${promptId}`, { type });
    console.log('성공:', response.data);
  } catch (error) {
    console.error('폴더에 프롬프트 저장 실패:', error);
    if (error && typeof error === 'object') {
      const errorObj = error as Record<string, unknown>;
      if (errorObj.response) {
        console.error('API 응답 에러:', errorObj.response);
      }
    }
    throw error;
  }
};

// 프롬프트 상세 정보 조회 (사이드바용)
export interface PromptSidebarDetail {
  promptId: number;
  originalPrompt: string;
  optimizedPrompt: string;
  summary: string;
  answerDto: Array<{
    id: number;
    model: string;
    content: string;
  }>;
}

export const getPromptSidebarDetail = async (promptId: number): Promise<PromptSidebarDetail> => {
  try {
    console.log('사이드바 프롬프트 상세 정보 조회 API 요청 시작');
    const response = await api.get(`/prompt/side-bar/details?promptId=${promptId}`);
    console.log('사이드바 프롬프트 상세 정보 조회 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('사이드바 프롬프트 상세 정보 조회 실패:', error);
    if (error && typeof error === 'object') {
      const errorObj = error as Record<string, unknown>;
      if (errorObj.response) {
        console.error('API 응답 에러:', errorObj.response);
      }
    }
    throw error;
  }
};