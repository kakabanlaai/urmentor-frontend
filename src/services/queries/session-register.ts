import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  acceptSessionRegister,
  createSessionRegister,
  getSessionRegister,
} from '@/services/api/session-register';
import { CreateSessionRegisterBody } from '@/services/api/session-register/types.ts';
import { Session, SessionRegisterStatus, User } from '@/types';

export const useAcceptSessionRegister = (sessionId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      acceptSessionRegister(id).then((res) => res.data),
    onSuccess: (data) => {
      queryClient.setQueryData(['sessions', sessionId], (old: Session) => {
        return {
          ...old,
          sessionRegisters: old.sessionRegisters.map((sessionRegister) => {
            if (sessionRegister.id === data.id) {
              return {
                ...sessionRegister,
                status: SessionRegisterStatus.Approved,
              };
            }
            return {
              ...sessionRegister,
              status: SessionRegisterStatus.Rejected,
            };
          }),
        };
      });
    },
  });
};

export const useCreateSessionRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateSessionRegisterBody) =>
      createSessionRegister(body).then((res) => res.data),
    onSuccess: (data) => {
      queryClient.setQueryData(['me'], (old: User) => {
        return {
          ...old,
          sessionRegisters: [...old.sessionRegisters, data],
        };
      });
    },
  });
};

export const useGetSessionRegister = (id: number) => {
  return useQuery({
    queryKey: ['sessionRegisters', id],
    queryFn: () => getSessionRegister(id).then((res) => res.data),
    staleTime: 3600 * 1000,
  });
};
