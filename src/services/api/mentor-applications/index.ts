import axiosClient from '@/services/api/client.ts';
import { PatchMentorApplicationBody } from '@/services/api/mentor-applications/type.ts';
import { MentorApplication } from '@/types';

export const getMentorApplications = async () => {
  return await axiosClient.get<MentorApplication[]>('/mentor-applications');
};

export const patchMentorApplication = async (
  id: number,
  body: PatchMentorApplicationBody,
) => {
  return await axiosClient.patch<MentorApplication>(
    `/mentor-applications/${id}`,
    body,
  );
};

export const createMentorApplication = async (body: {
  introduction: string;
  cv?: string;
}) => {
  return await axiosClient.post<MentorApplication>(
    `/mentor-applications`,
    body,
  );
};
