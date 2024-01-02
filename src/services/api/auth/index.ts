import { TokenObject, User } from '@/types';

import axiosClient from '../client';
import {
  ForgotPasswordBody,
  RefreshTokenBody,
  ResetPasswordBody,
  SignInBody,
  SignInResponse,
  SignInWithGoogleBody,
  SignUpBody,
  SignUpResponse,
  VerifyEmailBody,
} from './types';

export const signUp = async (body: SignUpBody) => {
  return await axiosClient.post<SignUpResponse>('/auth/sign-up', body);
};

export const signIn = async (body: SignInBody) => {
  return await axiosClient.post<SignInResponse>('/auth/sign-in', body);
};

export const signInWithGoogle = async (body: SignInWithGoogleBody) => {
  return await axiosClient.post<SignInResponse>('/auth/google', body);
};

export const signOut = async () => {
  return await axiosClient.post('/auth/sign-out');
};

export const forgotPassword = async (body: ForgotPasswordBody) => {
  return await axiosClient.post('/users/forgot-password', body);
};

export const resetPassword = async (body: ResetPasswordBody) => {
  return await axiosClient.post('/users/reset-password', body);
};

export const verifyEmail = async () => {
  return await axiosClient.get(`/users/verification`);
};

export const verifyEmailWithCode = async (body: VerifyEmailBody) => {
  return await axiosClient.post(`/users/verification`, body);
};

export const getMe = async () => {
  return await axiosClient.get<User>('/me');
};

export const refreshToken = async (body: RefreshTokenBody) => {
  return await axiosClient.post<TokenObject>('/auth/refresh-tokens', body);
};
