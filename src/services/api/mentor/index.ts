import axiosClient from '@/services/api/client.ts';
import { User } from '@/types';

export const getAllMentors = async () => {
  return await axiosClient.get<User[]>('/mentors');
};

export const getMentorById = async (id: number) => {
  return await axiosClient.get<User>(`/mentors/${id}`);
};
