export enum Role {
  Admin = 'admin',
  Mentee = 'mentee',
  Mentor = 'mentor',
}

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  phoneNumber: string;
  coin: number;
  avatar: string;
  isActive: boolean;
  hasSetPass: boolean;
};

export type TokenObject = {
  accessToken: string;
  refreshToken: string;
};
