import { matchSorter } from 'match-sorter';
import { useState } from 'react';

import AddEditProgramModal from '@/components/modal/add-edit-program-modal.tsx';
import { Button } from '@/components/ui/button.tsx';
import FullPageLoading from '@/components/ui/full-page-loading.tsx';
import { Input } from '@/components/ui/input.tsx';
import { useDebounce } from '@/hooks/useDebounce.ts';
import { useMe } from '@/services/queries/auth.ts';
import { Role } from '@/types';

const ProgramPage = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(searchValue, 100);

  const { data: user, isLoading } = useMe();

  if (isLoading) return <FullPageLoading />;

  if (user?.role !== Role.Mentor) return <div>Bạn không phải là cố vấn</div>;

  const sortedPrograms = matchSorter(user?.programs ?? [], debouncedValue, {
    keys: ['title', 'topic.title'],
  });

  return (
    <>
      <div className={'flex items-center justify-between'}>
        <h1 className={'text-2xl font-semibold'}>Chương trình cố vấn</h1>
        <AddEditProgramModal>
          <Button>Tạo chương trình</Button>
        </AddEditProgramModal>
      </div>

      <div className="mt-2 flex items-center">
        <span className="text-md font-bold">Tìm kiếm</span>
        <Input
          className="ml-2 max-w-xl"
          placeholder="Nhập tên chương trình/ chủ đề"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
      </div>

      <div className="mt-4 flex flex-wrap justify-center">
        {sortedPrograms.map((program) => (
          <AddEditProgramModal program={program}>
            <div className="w-full p-2 hover:cursor-pointer ">
              <div className="rounded-lg bg-white shadow-lg hover:shadow-xl">
                <div className="p-4">
                  <p className="mt-2 text-sm italic text-gray-600">
                    {program.topic.title}
                  </p>
                  <div className={'mt-2 flex'}>
                    <h2 className="flex-1 text-2xl font-bold text-gray-800">
                      {program.title}
                    </h2>
                    {program.price === 0 ? (
                      <span className="text-md font-bold text-green-400">
                        Free
                      </span>
                    ) : (
                      <span className="text-md font-bold text-yellow-400">
                        {program.price} coin
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    {program.description.length < 200
                      ? program.description
                      : program.description.substring(0, 200) + '...'}
                  </p>
                </div>
              </div>
            </div>
          </AddEditProgramModal>
        ))}
        {sortedPrograms.length === 0 && (
          <div className="flex w-full justify-center">
            <p className="text-gray-500">Không tìm thấy chương trình nào.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ProgramPage;
