import { useQuery } from '@tanstack/react-query';

import { getAllTopics } from '@/services/api/topic';

export const useGetAllTopics = () => {
  return useQuery({
    queryKey: ['topics'],
    queryFn: () => getAllTopics().then((res) => res.data),
  });
};
