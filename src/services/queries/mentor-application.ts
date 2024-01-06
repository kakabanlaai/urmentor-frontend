import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEY } from '@/constants/query.ts';
import {
  createMentorApplication,
  getMentorApplications,
  patchMentorApplication,
} from '@/services/api/mentor-applications';
import {
  CreateMentorApplicationBody,
  PatchMentorApplicationBody,
} from '@/services/api/mentor-applications/type.ts';
import { MentorApplication, User } from '@/types';

export const useMentorApplications = () => {
  return useQuery({
    queryKey: ['mentorApplications'],
    queryFn: () => getMentorApplications().then((res) => res.data),
  });
};

export const usePatchMentorApplication = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: PatchMentorApplicationBody) =>
      patchMentorApplication(id, body).then((res) => res.data),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['mentorApplications'],
        (old: MentorApplication[]) => {
          console.log(data);
          return old.filter((mentorApplication) => mentorApplication.id !== id);
        },
      );
    },
  });
};

export const useCreateMentorApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: CreateMentorApplicationBody) =>
      createMentorApplication(body).then((res) => res.data),
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEY.me], (old: User) => {
        return { ...old, mentorApplication: data };
      });
    },
  });
};
