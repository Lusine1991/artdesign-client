// client/src/shared/api/axiosInstanceWebSocket.ts
import axios, { AxiosError } from "axios";

const axiosInstanceWebSocket = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

// Получаем токен из localStorage при инициализации
let accessToken =
  typeof window !== "undefined"
    ? localStorage.getItem("accessToken") || ""
    : "";

// Request interceptor для добавления токена авторизации
axiosInstanceWebSocket.interceptors.request.use((config) => {
  // Обновляем токен перед каждым запросом
  if (typeof window !== "undefined") {
    const currentToken = localStorage.getItem("accessToken") || "";
    if (currentToken !== accessToken) {
      accessToken = currentToken;
    }
  }

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Response interceptor для обработки ошибок авторизации
axiosInstanceWebSocket.interceptors.response.use(
  (response) => response,
  async (err: AxiosError & { config?: { sent: boolean } }) => {
    const prev = err.config;

    if (prev && err.response?.status === 403 && !prev.sent) {
      prev.sent = true;
      try {
        const response = await axios.get<{ accessToken: string }>(
          "/api/auth/refresh"
        );
        accessToken = response.data.accessToken;

        // Сохраняем новый токен в localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("accessToken", accessToken);
        }

        prev.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstanceWebSocket(prev);
      } catch (refreshError) {
        // Если refresh не удался, перенаправляем на логин
        if (typeof window !== "undefined") {
          localStorage.removeItem("accessToken");
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(err);
  }
);

export default axiosInstanceWebSocket;
