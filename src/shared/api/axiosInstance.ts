import axios, { AxiosError } from "axios";

const axiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

let accessToken = '';

// Request interceptor для добавления токена авторизации
axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization ??= `Bearer ${accessToken}`;
  return config;
});

// Response interceptor для обработки ошибок авторизации
axiosInstance.interceptors.response.use(
  (response) => response,
  async (err: AxiosError & { config?: { sent: boolean } }) => {
    const prev = err.config;

    if (prev && err.status === 403 && !prev.sent) {
      prev.sent = true;
      const response = await axios.get<{ accessToken: string }>('/api/auth/refresh');
      accessToken = response.data.accessToken;
      prev.headers.Authorization = `Bearer ${accessToken}`;
      return axiosInstance(prev);
    }

    return Promise.reject(err);
  },
);

export default axiosInstance;
