import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  createProgram,
  deleteProgram,
  updateProgram,
} from '@/services/api/program';
import {
  CreateProgramBody,
  UpdateProgramBody,
} from '@/services/api/program/type.ts';
import { User } from '@/types';

export const useCreateProgram = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateProgramBody) =>
      createProgram(body).then((res) => res.data),
    onSuccess: (data) => {
      queryClient.setQueryData(['me'], (old: User) => {
        return {
          ...old,
          programs: [...old.programs, data],
        };
      });
    },
  });
};

export const useUpdateProgram = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: UpdateProgramBody }) =>
      updateProgram(id, body).then((res) => res.data),
    onSuccess: (data) => {
      queryClient.setQueryData(['me'], (old: User) => {
        return {
          ...old,
          programs: [
            ...old.programs.filter((program) => program.id !== data.id),
            data,
          ],
        };
      });
    },
  });
};

export const useDeleteProgram = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteProgram(id).then((res) => res.data),
    onSuccess: (data) => {
      queryClient.setQueryData(['me'], (old: User) => {
        return {
          ...old,
          programs: [
            ...old.programs.filter((program) => program.id !== data.id),
          ],
        };
      });
    },
  });
};
