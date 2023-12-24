import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants/token';
import { setItem } from '@/lib/local-storage';

import {
  forgotPassword,
  resetPassword,
  signIn,
  signInWithGoogle,
  signUp,
  verifyEmail,
  verifyEmailWithCode,
} from '../api/auth';
import {
  ForgotPasswordBody,
  ResetPasswordBody,
  SignInBody,
  SignInWithGoogleBody,
  SignUpBody,
  VerifyEmailBody,
} from '../api/auth/types';

export const useSignIn = () =>
  useMutation({
    mutationFn: (body: SignInBody) => signIn(body),
    onSuccess: (res) => {
      setItem(ACCESS_TOKEN_KEY, res.data.accessToken);
      setItem(REFRESH_TOKEN_KEY, res.data.refreshToken);
      toast.success('Đăng nhập thành công');
    },
  });

export const useSignUp = () =>
  useMutation({
    mutationFn: (body: SignUpBody) => signUp(body),
    onSuccess: (res) => {
      setItem(ACCESS_TOKEN_KEY, res.data.accessToken);
      setItem(REFRESH_TOKEN_KEY, res.data.refreshToken);
      toast.success('Đăng ký thành công');
    },
  });

export const useSignInWithGoogle = () =>
  useMutation({
    mutationFn: (body: SignInWithGoogleBody) => signInWithGoogle(body),
    onSuccess: (res) => {
      setItem(ACCESS_TOKEN_KEY, res.data.accessToken);
      setItem(REFRESH_TOKEN_KEY, res.data.refreshToken);
      toast.success('Đăng nhập thành công');
    },
  });

export const useForgotPassword = () =>
  useMutation({
    mutationFn: (body: ForgotPasswordBody) => forgotPassword(body),
  });

export const useResetPassword = () =>
  useMutation({
    mutationFn: (body: ResetPasswordBody) => resetPassword(body),
  });

export const useVerifyEmail = () =>
  useQuery({
    queryKey: ['verify-email'],
    queryFn: () => verifyEmail(),
  });

export const useVerifyEmailWithCode = () =>
  useMutation({
    mutationFn: (body: VerifyEmailBody) => verifyEmailWithCode(body),
  });
