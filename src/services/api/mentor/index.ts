import axiosClient from '@/services/api/client.ts';
import { Mentor } from '@/types';

export const getAllMentors = async () => {
  return await axiosClient.get<Mentor[]>('/mentors');
};

export const getMentorById = async (id: number) => {
  return await axiosClient.get<Mentor>(`/mentors/${id}`);
};
