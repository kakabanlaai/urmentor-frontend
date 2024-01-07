import { matchSorter } from 'match-sorter';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FullPageLoading from '@/components/ui/full-page-loading.tsx';
import { getCardTitle, getRatingInfo } from '@/lib/utils.ts';
import { useGetAllMentors } from '@/services/queries/mentor.ts';
import { useGetAllSkills } from '@/services/queries/skill.ts';
import { useGetAllTopics } from '@/services/queries/topic.ts';

import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import MultipleCombobox from './components/ui/multiple-combobox';
import Rating from './components/ui/rating';

function App() {
  const [searchString, setSearchString] = useState('');

  const [topicFilters, setTopicFilters] = useState<string[]>([]);
  const [skillFilters, setSkillFilters] = useState<string[]>([]);
  const navigate = useNavigate();

  const { data: mentors, isLoading } = useGetAllMentors();
  const topics = useGetAllTopics();
  const skills = useGetAllSkills();

  if (isLoading) {
    return <FullPageLoading className={'h-full w-full'} />;
  }

  let filteredMentors = matchSorter(mentors!, searchString, {
    keys: ['name'],
  });

  if (topicFilters.length > 0) {
    filteredMentors = filteredMentors.filter((mentor) =>
      mentor.programs.some((programs) =>
        topicFilters.includes(programs.topic.id.toString()),
      ),
    );
  }

  if (skillFilters.length > 0) {
    filteredMentors = filteredMentors.filter((mentor) =>
      mentor.skills.some((skill) => skillFilters.includes(skill.id.toString())),
    );
  }

  return (
    <>
      {/* Hero section */}
      <div className="container mx-auto flex flex-col flex-wrap items-center px-3 md:flex-row">
        {/* Left column */}
        <div className="flex w-full flex-col items-start justify-center text-center md:w-2/5 md:text-left">
          <h1 className="my-4 text-5xl font-bold leading-tight">
            Kết nối, phát triển
          </h1>
          <p className="mb-8 text-xl leading-normal">
            urMentor sẽ là cầu nối cho sinh viên, nơi mà việc kết nối và chia sẻ
            kiến thức không chỉ là một trải nghiệm, mà còn là chìa khóa mở cánh
            cửa cho sự phát triển không ngừng.
          </p>
        </div>

        {/* Right column */}
        <div className="w-full py-6 text-center md:w-3/5">
          <img className="z-50 mx-auto md:w-4/5" src="images/hero.svg" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tìm kiếm mentor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="align-center flex gap-3">
            <Input
              placeholder="Nhập tên mentor"
              type="name"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
            <Button>Tìm kiếm</Button>
          </div>
          <div className="align-center mt-3 flex justify-center gap-3">
            <MultipleCombobox
              value={topicFilters}
              onSelectChange={(value) =>
                setTopicFilters((prev) =>
                  prev.includes(value)
                    ? prev.filter((v) => v !== value)
                    : [...prev, value],
                )
              }
              options={
                topics.data?.map((topic) => ({
                  value: topic.id.toString(),
                  label: topic.title,
                })) || []
              }
              placeholder="Chọn chủ đề"
              isLoading={topics.isLoading}
            />
            <MultipleCombobox
              value={skillFilters}
              onSelectChange={(value) =>
                setSkillFilters((prev) =>
                  prev.includes(value)
                    ? prev.filter((v) => v !== value)
                    : [...prev, value],
                )
              }
              options={
                skills.data?.map((skill) => ({
                  value: skill.id.toString(),
                  label: skill.name,
                })) || []
              }
              placeholder="Chọn kỹ năng"
              isLoading={skills.isLoading}
            />
          </div>
        </CardContent>
      </Card>

      {/* Mentor list section */}
      <div className="container mx-auto mt-14 flex flex-col flex-wrap items-center gap-2 px-3">
        <Label className="text-3xl font-bold uppercase">Danh sách cố vấn</Label>
        <div className="h-2 w-[100px] bg-primary" />
      </div>

      <div className="-mx-4 my-10 flex flex-wrap">
        {filteredMentors?.map((mentor) => {
          const ratingInfo = getRatingInfo(mentor);

          return (
            <div
              key={mentor.id}
              onClick={() => navigate(`/profile/${mentor.id}`)}
              className="w-full px-4 md:w-1/2 lg:w-1/3 xl:w-1/4"
            >
              <div className="mb-8 w-full rounded-lg bg-white text-gray-900 shadow-lg hover:cursor-pointer hover:shadow-xl">
                <div className="h-32 overflow-hidden rounded-t-lg">
                  <img
                    className="w-full object-cover object-top"
                    src="images/profile-bg.webp"
                    alt="Mountain"
                  />
                </div>
                <div className="relative mx-auto -mt-16 h-32 w-32 overflow-hidden rounded-full border-4 border-white">
                  <img
                    className="h-32 object-cover object-center"
                    src={mentor.avatar}
                    alt="Woman looking front"
                  />
                </div>
                <div className="mt-2 px-4 text-center">
                  <h2 className="font-semibold">{mentor.name}</h2>
                  <p className="text-gray-500">{getCardTitle(mentor)}</p>
                </div>

                <div className=" my-4 flex scroll-py-2 flex-col items-center justify-center gap-2">
                  <Rating rating={ratingInfo.average} />
                  <span className="text-sm text-gray-500">
                    {ratingInfo.count} đánh giá
                    {ratingInfo.count > 0 && ` • ${ratingInfo.average} / 5`}
                  </span>
                </div>

                <div className="mt-2 flex w-full justify-center border-t p-4">
                  <Button>Xem chi tiết</Button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredMentors?.length === 0 && (
          <div className="flex w-full justify-center">
            <p className="text-gray-500">Không tìm thấy mentor nào.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
