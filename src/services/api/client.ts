import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

import {
  errorInterceptor,
  requestInterceptor,
  successInterceptor,
} from './interceptors';

const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
};

const axiosClient: AxiosInstance = axios.create(axiosRequestConfig);

axiosClient.interceptors.request.use(requestInterceptor);
axiosClient.interceptors.response.use(successInterceptor, errorInterceptor);

export default axiosClient;
