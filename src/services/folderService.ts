import api from '../api';

export interface Folder {
  id: number;
  originalPrompt: string;
  createdAt: string;
}

export const getFolders = async (): Promise<Folder[]> => {
  try {
    console.log('🚀 폴더 목록 조회 API 요청 시작');
    console.log('📤 요청 URL:', '/folder');
    
    const response = await api.get('/folder');
    
    console.log('✅ 폴더 목록 조회 성공:', response.data);
    
    // 응답 데이터가 배열인지 확인
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      console.error('❌ API 응답이 배열이 아닙니다:', response.data);
      throw new Error('폴더 데이터 형식이 올바르지 않습니다.');
    }
  } catch (error) {
    console.error('❌ 폴더 목록 조회 실패:', error);
    
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
}

export interface CreateFolderResponse {
  folderId: number;
}

export const createFolder = async (folderName: string): Promise<CreateFolderResponse> => {
  try {
    console.log('폴더 생성 API 요청 시작');
    console.log('요청 URL:', '/folder');
    console.log('폴더명:', folderName);
    
    const requestData: CreateFolderRequest = { folderName };
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
