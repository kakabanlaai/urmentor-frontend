export type CreateExperienceBody = {
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  isCurrent: boolean;
  company: string;
  icon?: string;
};

export type UpdateExperienceBody = Partial<CreateExperienceBody>;
