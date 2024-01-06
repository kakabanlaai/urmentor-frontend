import { Info } from 'lucide-react';
import { matchSorter } from 'match-sorter';
import { useState } from 'react';

import MentorApplicationInfoModal from '@/components/modal/mentor-application-info-modal.tsx';
import AvatarWithFallback from '@/components/ui/avatar-with-fallback.tsx';
import { Button } from '@/components/ui/button.tsx';
import FullPageLoading from '@/components/ui/full-page-loading.tsx';
import { Input } from '@/components/ui/input.tsx';
import { useDebounce } from '@/hooks/useDebounce.ts';
import { useMentorApplications } from '@/services/queries/mentor-application.ts';

const MentorApplicationPage = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(searchValue, 300);

  const { data: mentorApplications, isLoading } = useMentorApplications();

  if (isLoading) return <FullPageLoading />;
  const filteredMentorApplications = matchSorter(
    mentorApplications ?? [],
    debouncedValue,
    { keys: ['user.name'] },
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <span className="text-md font-bold">Tìm kiếm</span>
        <Input
          className="ml-2 max-w-xl"
          placeholder="Nhập tên người nộp đơn"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
      </div>

      <div className="flex flex-wrap justify-center ">
        {filteredMentorApplications?.map((mentorApplication) => (
          <div key={mentorApplication.id} className="w-full p-2 lg:w-1/2">
            <div className="rounded-lg bg-white shadow-lg hover:shadow-xl">
              <div className="p-4">
                <div className={'mt-2 flex'}>
                  <div className="flex flex-1 text-xl font-bold text-gray-800">
                    <AvatarWithFallback user={mentorApplication.user} />
                    <div className={'ml-3 flex flex-col'}>
                      <h2>{mentorApplication.user.name}</h2>
                    </div>
                  </div>
                  <MentorApplicationInfoModal
                    mentorApplication={mentorApplication}
                  >
                    <Button>
                      <Info className={'mr-2 h-4 w-4'} />
                      <span>Chi tiết</span>
                    </Button>
                  </MentorApplicationInfoModal>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  {mentorApplication.introduction.length < 200
                    ? mentorApplication.introduction
                    : mentorApplication.introduction.substring(0, 200) + '...'}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div className="w-full p-2 hover:cursor-pointer md:w-1/2"></div>
      </div>
    </div>
  );
};

export default MentorApplicationPage;
