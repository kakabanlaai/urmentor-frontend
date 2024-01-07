import axiosClient from '@/services/api/client.ts';
import {
  CreateExperienceBody,
  UpdateExperienceBody,
} from '@/services/api/experience/type.ts';
import { Experience } from '@/types';

export const createExperience = async (body: CreateExperienceBody) => {
  return await axiosClient.post<Experience>('/experiences', body);
};

export const updateExperience = async (
  id: number,
  body: UpdateExperienceBody,
) => {
  return await axiosClient.patch<Experience>(`/experiences/${id}`, body);
};

export const deleteExperience = async (id: number) => {
  return await axiosClient.delete(`/experiences/${id}`);
};
