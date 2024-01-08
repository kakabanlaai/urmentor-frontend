import axiosClient from '@/services/api/client.ts';
import {
  CreateProgramBody,
  UpdateProgramBody,
} from '@/services/api/program/type.ts';
import { Program } from '@/types';

export const createProgram = async (body: CreateProgramBody) => {
  return await axiosClient.post<Program[]>('/programs', body);
};

export const updateProgram = async (id: number, body: UpdateProgramBody) => {
  return await axiosClient.patch<Program>(`/programs/${id}`, body);
};

export const deleteProgram = async (id: number) => {
  return await axiosClient.delete(`/programs/${id}`);
};
