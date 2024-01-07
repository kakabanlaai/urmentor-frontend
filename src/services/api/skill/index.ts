import axiosClient from '@/services/api/client.ts';
import { Skill } from '@/types';

export const getAllSkills = async () => {
  return await axiosClient.get<Skill[]>('/skills');
};
