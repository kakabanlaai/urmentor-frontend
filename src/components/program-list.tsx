import { FC } from 'react';

import { Label } from '@/components/ui/label.tsx';
import { Program } from '@/types';

const ProgramList: FC<{ programs: Program[] }> = ({ programs }) => {
  return (
    <>
      <div className="container mx-auto flex flex-col flex-wrap items-center gap-2 px-3">
        <Label className="text-xl font-bold uppercase text-primary">
          Danh sách chương trình
        </Label>
        <div className="h-1 w-[100px] bg-primary" />
      </div>

      <div className="flex flex-wrap justify-center ">
        {programs.map((program) => (
          <div className="w-full p-2 hover:cursor-pointer md:w-1/2">
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
        ))}
        {programs.length === 0 && (
          <div className="flex w-full justify-center">
            <p className="text-gray-500">Không tìm thấy chương trình nào.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ProgramList;
