import axiosClient from '../client';
import {
  SignInBody,
  SignInResponse,
  SignUpBody,
  SignUpResponse,
} from './types';

export const signUp = async (body: SignUpBody) => {
  return await axiosClient.post<SignUpResponse>('/auth/sign-up', body);
};

export const signIn = async (body: SignInBody) => {
  return await axiosClient.post<SignInResponse>(
    '/auth/sign-in',
    JSON.stringify(body),
  );
};
