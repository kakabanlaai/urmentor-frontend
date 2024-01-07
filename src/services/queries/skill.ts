import { useQuery } from '@tanstack/react-query';

import { getAllSkills } from '@/services/api/skill';

export const useGetAllSkills = () => {
  return useQuery({
    queryKey: ['skills'],
    queryFn: () => getAllSkills().then((res) => res.data),
  });
};
