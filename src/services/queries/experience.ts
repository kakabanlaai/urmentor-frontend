import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  createExperience,
  deleteExperience,
  updateExperience,
} from '@/services/api/experience';
import {
  CreateExperienceBody,
  UpdateExperienceBody,
} from '@/services/api/experience/type.ts';
import { User } from '@/types';

export const useCreateExperience = (userId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateExperienceBody) =>
      createExperience(body).then((res) => res.data),
    onSuccess: (newExperience) => {
      queryClient.setQueryData(['profiles', userId], (oldData: any) => {
        return {
          ...oldData,
          experiences: [...oldData.experiences, newExperience],
        };
      });
    },
  });
};

export const useUpdateExperience = (userId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      experienceId,
      body,
    }: {
      experienceId: number;
      body: UpdateExperienceBody;
    }) => updateExperience(experienceId, body).then((res) => res.data),
    onSuccess: (data) => {
      queryClient.setQueryData(['profiles', userId], (oldData: User) => {
        return {
          ...oldData,
          experiences: [
            ...oldData.experiences.filter(
              (experience) => experience.id !== data.id,
            ),
            data,
          ],
        };
      });
    },
  });
};

export const useDeleteExperience = (userId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (experienceId: number) =>
      deleteExperience(experienceId).then((res) => res.data),
    onSuccess: (data) => {
      queryClient.setQueryData(['profiles', userId], (oldData: User) => {
        return {
          ...oldData,
          experiences: oldData.experiences.filter(
            (experience) => experience.id !== data.id,
          ),
        };
      });
    },
  });
};
