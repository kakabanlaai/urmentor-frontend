import axiosClient from '@/services/api/client.ts';
import { CreateSessionBody } from '@/services/api/session/type.ts';
import { Session } from '@/types';

export const createSession = (body: CreateSessionBody) =>
  axiosClient.post<Session>('/session', body);

export const deleteSession = (id: number) =>
  axiosClient.delete(`/session/${id}`);

export const getSession = (id: number) =>
  axiosClient.get<Session>(`/session/${id}`);
