export interface LLMRequest {
  models: string[];
  question: string;
}

export interface LLMResponse {
  llmModel: string;
  answer: string;
}

export interface LLMAPIResponse {
  promptId: number;
  llmAnswerDto: LLMResponse[];
}

import axios from 'axios';

// API base URL 설정
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getLLMAnswers = async (request: LLMRequest): Promise<LLMAPIResponse> => {
  try {
    // TODO: 인증 로직 완성 후 주석 해제
    const accessToken = sessionStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('Access token not found. Please login again.');
    }

    // API 요청 형식 console에 출력
    console.log('🚀 LLM API 요청 시작');
    console.log('📤 요청 URL:', 'https://api.truthai.shop/llm-answer/models');
    console.log('📋 요청 데이터:', JSON.stringify(request, null, 2));
    console.log('🔧 요청 헤더:', {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`, // TODO: 인증 로직 완성 후 주석 해제
    });

    // 요청 데이터 유효성 검사
    if (!request.models || !Array.isArray(request.models) || request.models.length === 0) {
      throw new Error('Invalid models array in request - models must be a non-empty array');
    }
    
    if (!request.question || typeof request.question !== 'string' || request.question.trim() === '') {
      throw new Error('Invalid question in request - question must be a non-empty string');
    }

    // 백엔드가 기대하는 모델명 형식 확인
    const validModels = ['gpt', 'claude', 'gemini', 'perplexity'];
    const invalidModels = request.models.filter(model => !validModels.includes(model.toLowerCase()));
    if (invalidModels.length > 0) {
      console.warn('⚠️ 지원되지 않는 모델명이 포함되어 있습니다:', invalidModels);
    }

    // 직접 API 서버로 요청
    const response = await api.post('/llm-answer/models', request, {
      headers: {
        'Content-Type': 'application/json',
        // Postman과 동일하게 최소한의 헤더만 전송
        'Authorization': `Bearer ${accessToken}`, // TODO: 인증 로직 완성 후 주석 해제
      },
      timeout: 30000, // 30초 타임아웃 설정
      // CORS 관련 설정 추가
      withCredentials: false, // 쿠키/세션 정보 전송 안함
    });

    console.log('✅ API 응답 성공:', response.data);
    console.log('📊 응답 상태:', response.status);
    console.log('🔧 응답 헤더:', response.headers);
    
    // 응답 데이터 유효성 검사
    if (!response.data || typeof response.data !== 'object') {
      throw new Error('Invalid response format from backend');
    }
    
    if (typeof response.data.promptId !== 'number') {
      throw new Error('Invalid promptId in response');
    }
    
    if (!Array.isArray(response.data.llmAnswerDto)) {
      throw new Error('Invalid llmAnswerDto in response');
    }
    
    return response.data;
  } catch (error) {
    console.error('❌ API 요청 실패:', error);
    
    // Axios 에러인 경우 더 자세한 정보 출력
    if (axios.isAxiosError(error)) {
      console.error('📊 HTTP 상태 코드:', error.response?.status);
      console.error('📋 응답 데이터:', error.response?.data);
      console.error('🔧 응답 헤더:', error.response?.headers);
      console.error('🌐 요청 URL:', error.config?.url);
      console.error('📤 요청 메서드:', error.config?.method);
      console.error('📋 요청 데이터:', error.config?.data);
      
      // 백엔드 에러 메시지가 있는 경우 출력
      if (error.response?.data && typeof error.response.data === 'object') {
        const errorData = error.response.data as Record<string, unknown>;
        if (errorData.message) {
          console.error('🚨 백엔드 에러 메시지:', errorData.message);
        }
        if (errorData.error) {
          console.error('🚨 백엔드 에러:', errorData.error);
        }
      }
      
      // HTTP 상태 코드별 에러 분석
      if (error.response?.status === 500) {
        console.error('🚨 백엔드 서버 내부 오류 (500)');
        console.error('💡 백엔드 서버 로그를 확인해주세요.');
        console.error('💡 요청 데이터 형식이 올바른지 확인해주세요.');
      } else if (error.response?.status === 400) {
        console.error('🚨 잘못된 요청 (400)');
        console.error('💡 요청 데이터 형식을 확인해주세요.');
      } else if (error.response?.status === 404) {
        console.error('🚨 엔드포인트를 찾을 수 없음 (404)');
        console.error('💡 백엔드 API 경로를 확인해주세요.');
      } else if (error.response?.status === 403) {
        console.error('🚨 접근 권한 없음 (403)');
        console.error('💡 인증 토큰을 확인해주세요.');
      }
    }
    
    throw error;
  }
};