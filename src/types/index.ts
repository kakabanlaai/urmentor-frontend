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
  introduction: string;
  mentorApplication: Omit<MentorApplication, 'user'> | null;
};

export type TokenObject = {
  accessToken: string;
  refreshToken: string;
};

export enum MentorApplicationStatus {
  Pending = 'pending',
  Accepted = 'accepted',
  Rejected = 'rejected',
}

export type MentorApplication = {
  id: number;
  introduction: string;
  cv: string;
  status: MentorApplicationStatus;
  user: User;
};

export type Achievement = {
  id: number;
  title: string;
  description: string;
  date: Date;
};

export type Experience = {
  id: number;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  isCurrent: boolean;
  company: string;
};

export type Education = {
  id: number;
  major: string;
  description: string;
  startDate: Date;
  endDate: Date;
  isCurrent: boolean;
  school: string;
};

export type Skill = {
  id: number;
  name: string;
};

export type Program = {
  id: number;
  title: string;
  description: string;
  price: number;
  topic: Topic;
};

export type Topic = {
  id: number;
  title: string;
};

export type Rating = {
  id: number;
  rating: number;
  comment: string;
};

export type Mentor = Pick<User, 'id' | 'name' | 'avatar' | 'introduction'> & {
  achievements: Achievement[];
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
  programs: Program[];
  ratings: Rating[];
};
