import { MentorApplication } from '@/types';

export type PatchMentorApplicationBody = Partial<
  Pick<MentorApplication, 'status'>
>;

export type CreateMentorApplicationBody = {
  introduction: string;
  cv?: string;
};
