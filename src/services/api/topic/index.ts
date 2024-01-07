import axiosClient from '@/services/api/client.ts';
import { Topic } from '@/types';

export const getAllTopics = async () => {
  return await axiosClient.get<Topic[]>('/topics');
};
