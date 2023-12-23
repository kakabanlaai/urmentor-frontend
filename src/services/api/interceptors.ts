import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { ACCESS_TOKEN_KEY } from '@/constants/token.ts';
import { getItem } from '@/lib/local-storage';

export const requestInterceptor = (
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

export const errorInterceptor = async (error: AxiosError): Promise<void> => {
  return Promise.reject(error.response?.data);
};
