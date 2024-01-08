import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createSession,
  deleteSession,
  getSession,
} from '@/services/api/session';
import { CreateSessionBody } from '@/services/api/session/type.ts';
import { User } from '@/types';

export const useCreateSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateSessionBody) =>
      createSession(body).then((res) => res.data),
    onSuccess: (data) => {
      queryClient.setQueryData(['me'], (old: User) => {
        data.sessionRegisters = [];
        return {
          ...old,
          sessions: [...old.sessions, data],
        };
      });
    },
  });
};

export const useDeleteSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteSession(id).then((res) => res.data),
    onSuccess: (data) => {
      queryClient.setQueryData(['me'], (old: User) => {
        return {
          ...old,
          sessions: [
            ...old.sessions.filter((session) => session.id !== data.id),
          ],
        };
      });
    },
  });
};

export const useGetSession = (id: number) => {
  return useQuery({
    queryKey: ['sessions', id],
    queryFn: () => getSession(id).then((res) => res.data),
    staleTime: 3600 * 1000,
  });
};
