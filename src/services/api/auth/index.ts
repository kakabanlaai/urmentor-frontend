import axiosClient from '../client';
import {
  SignInBody,
  SignInResponse,
  SignInWithGoogleBody,
  SignUpBody,
  SignUpResponse,
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
