import { useQuery } from '@tanstack/react-query';

import { getAllMentors, getMentorById } from '@/services/api/mentor';

export const useGetAllMentors = () => {
  return useQuery({
    queryKey: ['mentors'],
    queryFn: () => getAllMentors().then((res) => res.data),
  });
};

export const useGetProfileById = (id: number) => {
  return useQuery({
    queryKey: ['mentors', id],
    queryFn: () => getMentorById(id).then((res) => res.data),
  });
};
