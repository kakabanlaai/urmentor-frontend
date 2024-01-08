import axiosClient from '@/services/api/client.ts';
import { CreateSessionRegisterBody } from '@/services/api/session-register/types.ts';
import { SessionRegister } from '@/types';

export const acceptSessionRegister = (id: number) => {
  return axiosClient.post(`/session-register/${id}/accept`);
};

export const createSessionRegister = (body: CreateSessionRegisterBody) => {
  return axiosClient.post<SessionRegister>('/session-register', body);
};

export const getSessionRegister = (id: number) => {
  return axiosClient.get<SessionRegister>(`/session-register/${id}`);
};
