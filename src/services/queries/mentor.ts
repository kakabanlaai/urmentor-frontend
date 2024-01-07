import { useQuery } from '@tanstack/react-query';

import { getAllMentors } from '@/services/api/mentor';

export const useGetAllMentors = () => {
  return useQuery({
    queryKey: ['mentors'],
    queryFn: () => getAllMentors().then((res) => res.data),
  });
};
