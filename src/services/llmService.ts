export interface LLMRequest {
  models: string[];
  question: string;
}

export interface LLMResponse {
  llmModel: string;
  answer: string;
}

import axios from 'axios';

export const getLLMAnswers = async (request: LLMRequest): Promise<LLMResponse[]> => {
  try {
    // TODO: 인증 로직 완성 후 주석 해제
    // const accessToken = sessionStorage.getItem('accessToken');
    // if (!accessToken) {
    //   throw new Error('Access token not found. Please login again.');
    // }

    // API 요청 형식 console에 출력
    console.log('🚀 LLM API 요청 시작');
    console.log('📤 요청 URL:', '/llm-answer/models');
    console.log('📋 요청 데이터:', request);
    console.log('🔧 요청 헤더:', {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${accessToken}`, // TODO: 인증 로직 완성 후 주석 해제
    });

    // Proxy를 통한 요청 (vite.config.ts의 proxy 설정 사용)
    const response = await axios.post('/llm-answer/models', request, {
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${accessToken}`, // TODO: 인증 로직 완성 후 주석 해제
      },
    });

    console.log('✅ API 응답 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ API 요청 실패:', error);
    throw error;
  }
};
