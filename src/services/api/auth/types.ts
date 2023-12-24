import { TokenObject, User } from '@/types';

export type SignUpBody = {
  name: string;
  email: string;
  password: string;
};

export type SignInBody = {
  email: string;
  password: string;
};

export type SignInWithGoogleBody = {
  token: string;
};

export type SignUpResponse = User & TokenObject;
export type SignInResponse = User & TokenObject;