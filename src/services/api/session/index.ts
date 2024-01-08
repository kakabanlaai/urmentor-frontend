import axiosClient from '@/services/api/client.ts';
import { CreateSessionBody } from '@/services/api/session/type.ts';

export const createSession = (body: CreateSessionBody) =>
  axiosClient.post('/session', body);

export const deleteSession = (id: number) =>
  axiosClient.delete(`/session/${id}`);

export const getSession = (id: number) => axiosClient.get(`/session/${id}`);
