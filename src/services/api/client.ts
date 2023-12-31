import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants/token.ts';
import { delItem, getItem, setItem } from '@/lib/local-storage.ts';
import { refreshToken } from '@/services/api/auth';

const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
};

const axiosClient: AxiosInstance = axios.create(axiosRequestConfig);

const requestInterceptor = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const token = getItem<string>(ACCESS_TOKEN_KEY);
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
};

export const successInterceptor = (response: AxiosResponse): AxiosResponse => {
  return response;
};

axiosClient.interceptors.request.use(requestInterceptor);
axiosClient.interceptors.response.use(
  successInterceptor,
  async function (error) {
    const originalRequest = error.config;

    if (error.response.status === 401 || error.response.status === 403) {
      refreshToken({
        refreshToken: getItem<string>(REFRESH_TOKEN_KEY) || '',
      })
        .then((response) => {
          setItem(ACCESS_TOKEN_KEY, response.data.accessToken);
          setItem(REFRESH_TOKEN_KEY, response.data.refreshToken);
          originalRequest.headers['Authorization'] =
            'Bearer ' + response.data.accessToken;
          return axiosClient(originalRequest);
        })
        .catch((_error) => {
          delItem(ACCESS_TOKEN_KEY);
          delItem(REFRESH_TOKEN_KEY);
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }
          return Promise.reject(_error);
        });
    }
    return Promise.reject(error.response.data);
  },
);

export default axiosClient;
