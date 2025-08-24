// src/api.ts
import axios from "axios";

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,  // 개발용일땐 / 로 접근
});

// 요청 인터셉터: 액세스 토큰 자동 첨부
api.interceptors.request.use(config => {
  const token = sessionStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 응답 인터셉터: 401 감지 시 리프레시 토큰으로 재발급
api.interceptors.response.use(
  res => res,
  async error => {
    if (error.response?.status === 401) {
      const refreshToken = sessionStorage.getItem("refreshToken");
      if (!refreshToken) {
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const refreshRes = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/token/refresh`, { token: refreshToken });
        const newAccessToken = refreshRes.data.accessToken;

        // 새 액세스 토큰 저장
        sessionStorage.setItem("accessToken", newAccessToken);

        // 실패한 요청 재시도
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(error.config);
      } catch {
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default api;