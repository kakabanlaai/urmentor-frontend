import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { QUERY_KEY } from '@/constants/query.ts';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants/token';
import { setItem } from '@/lib/local-storage';
import { User } from '@/types';

import {
  forgotPassword,
  getMe,
  resetPassword,
  setPassword,
  signIn,
  signInWithGoogle,
  signOut,
  signUp,
  updateMe,
  updatePassword,
  verifyEmail,
  verifyEmailWithCode,
} from '../api/auth';
import {
  ForgotPasswordBody,
  ResetPasswordBody,
  SetPasswordBody,
  SignInBody,
  SignInWithGoogleBody,
  SignUpBody,
  UpdatePasswordBody,
  VerifyEmailBody,
} from '../api/auth/types';

export const useSignIn = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: SignInBody) => signIn(body).then((res) => res.data),
    onSuccess: (data) => {
      setItem(ACCESS_TOKEN_KEY, data.accessToken);
      setItem(REFRESH_TOKEN_KEY, data.refreshToken);
      toast.success('Đăng nhập thành công');
      queryClient.setQueryData([QUERY_KEY.me], data);
    },
  });
};

export const useSignUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: SignUpBody) => signUp(body).then((res) => res.data),
    onSuccess: (data) => {
      setItem(ACCESS_TOKEN_KEY, data.accessToken);
      setItem(REFRESH_TOKEN_KEY, data.refreshToken);
      toast.success('Đăng ký thành công');
      queryClient.setQueryData([QUERY_KEY.me], data);
    },
  });
};

export const useSignOut = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => signOut().then((res) => res.data),
    onSuccess: () => {
      setItem(ACCESS_TOKEN_KEY, '');
      setItem(REFRESH_TOKEN_KEY, '');
      queryClient.setQueryData([QUERY_KEY.me], null);
    },
  });
};
export const useSignInWithGoogle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: SignInWithGoogleBody) =>
      signInWithGoogle(body).then((res) => res.data),
    onSuccess: (data) => {
      setItem(ACCESS_TOKEN_KEY, data.accessToken);
      setItem(REFRESH_TOKEN_KEY, data.refreshToken);
      toast.success('Đăng nhập thành công');
      queryClient.setQueryData([QUERY_KEY.me], data);
    },
  });
};

export const useForgotPassword = () =>
  useMutation({
    mutationFn: (body: ForgotPasswordBody) =>
      forgotPassword(body).then((res) => res.data),
  });

export const useResetPassword = () =>
  useMutation({
    mutationFn: (body: ResetPasswordBody) =>
      resetPassword(body).then((res) => res.data),
  });

export const useVerifyEmail = (disabled = false) =>
  useQuery({
    queryKey: ['verify-email'],
    queryFn: () => verifyEmail().then((res) => res.data),
    enabled: !disabled,
  });

export const useVerifyEmailWithCode = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: VerifyEmailBody) =>
      verifyEmailWithCode(body).then((res) => res.data),

    onSuccess: () => {
      queryClient.setQueryData([QUERY_KEY.me], (old: User) => ({
        ...old,
        isActive: true,
      }));
    },
  });
};

export const useMe = () =>
  useQuery({
    queryKey: [QUERY_KEY.me],
    queryFn: () => getMe().then((res) => res.data),
  });

export const useUpdateMe = (userId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Partial<User>) => updateMe(body).then((res) => res.data),

    onSuccess: (data) => {
      queryClient.setQueryData(['profiles', userId], (old: User) => ({
        ...old,
        ...data,
      }));

      queryClient.setQueryData(['me'], (old: User) => ({
        ...old,
        ...data,
      }));
    },
  });
};

export const useSetPassword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: SetPasswordBody) =>
      setPassword(body).then((res) => res.data),

    onSuccess: () => {
      queryClient.setQueryData([QUERY_KEY.me], (old: User) => ({
        ...old,
        hasSetPass: true,
      }));
    },
  });
};

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: (body: UpdatePasswordBody) =>
      updatePassword(body).then((res) => res.data),
  });
};
