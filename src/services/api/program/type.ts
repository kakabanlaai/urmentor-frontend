export type CreateProgramBody = {
  title: string;
  description: string;
  price: number;
  topicId: number;
};

export type UpdateProgramBody = {
  title?: string;
  description?: string;
  price?: number;
  topicId?: number;
};
