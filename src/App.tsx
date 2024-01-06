import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FullPageLoading from '@/components/ui/full-page-loading.tsx';
import { useMe } from '@/services/queries/auth.ts';

import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import MultipleCombobox from './components/ui/multiple-combobox';
import Rating from './components/ui/rating';

const mentors: {
  id: string;
  name: string;
  avatar: string;
  job: string;
  introduction: string;
  rating: number;
}[] = [
  {
    id: 'mentor-1',
    name: 'Alice Johnson',
    avatar: 'https://i.pravatar.cc/300?u=1',
    job: 'Software Engineer',
    introduction: 'Passionate about coding and teaching others.',
    rating: 4.8,
  },
  {
    id: 'mentor-2',
    name: 'Bob Smith',
    avatar: 'https://i.pravatar.cc/300?u=2',
    job: 'Data Scientist',
    introduction: 'Loves data and enjoys sharing knowledge.',
    rating: 4.6,
  },
  {
    id: 'mentor-3',
    name: 'Charlie Day',
    avatar: 'https://i.pravatar.cc/300?u=3',
    job: 'UI/UX Designer',
    introduction: 'Design enthusiast and creative thinker.',
    rating: 4.7,
  },
  {
    id: 'mentor-4',
    name: 'Danielle Reed',
    avatar: 'https://i.pravatar.cc/300?u=4',
    job: 'Full Stack Developer',
    introduction: 'Full stack developer with a passion for teaching.',
    rating: 4.9,
  },
  {
    id: 'mentor-5',
    name: 'Ethan Woods',
    avatar: 'https://i.pravatar.cc/300?u=5',
    job: 'DevOps Engineer',
    introduction: 'DevOps guru and automation specialist.',
    rating: 4.5,
  },
  {
    id: 'mentor-6',
    name: 'Fiona Lane',
    avatar: 'https://i.pravatar.cc/300?u=6',
    job: 'Project Manager',
    introduction: 'Agile and PMP certified with a talent for leadership.',
    rating: 4.4,
  },
  {
    id: 'mentor-7',
    name: 'George Frank',
    avatar: 'https://i.pravatar.cc/300?u=7',
    job: 'Cybersecurity Expert',
    introduction: 'Cybersecurity expert, helping teams stay secure.',
    rating: 4.8,
  },
  {
    id: 'mentor-8',
    name: 'Hannah Klein',
    avatar: 'https://i.pravatar.cc/300?u=8',
    job: 'Blockchain Developer',
    introduction:
      'Blockchain enthusiast with a knack for explaining complex concepts.',
    rating: 4.7,
  },
  {
    id: 'mentor-9',
    name: 'Ian Douglas',
    avatar: 'https://i.pravatar.cc/300?u=9',
    job: 'Cloud Architect',
    introduction:
      'Cloud solutions architect with a love for teaching cloud computing.',
    rating: 4.6,
  },
  {
    id: 'mentor-10',
    name: 'Jasmine Patel',
    avatar: 'https://i.pravatar.cc/300?u=10',
    job: 'AI Researcher',
    introduction: 'AI researcher focused on machine learning and AI ethics.',
    rating: 4.9,
  },
];

function App() {
  const [comboboxValues, setComboboxValues] = useState<string[]>([]);
  // const { data: user, isLoading } = useMe();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (isLoading) return;
  //   if (!user) {
  //     navigate('/sign-in');
  //   }

  //   if (user && !user.isActive) {
  //     navigate('/verify-email');
  //     return;
  //   }
  // }, [user, isLoading]);

  // if (isLoading) return <FullPageLoading />;

  const navigate = useNavigate();

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
            <Input placeholder="Nhập tên mentor" type="name" />
            <Button>Tìm kiếm</Button>
          </div>
          <div className="align-center mt-3 flex justify-center gap-3">
            <MultipleCombobox
              value={comboboxValues}
              onSelectChange={(value) =>
                setComboboxValues((prev) =>
                  prev.includes(value)
                    ? prev.filter((v) => v !== value)
                    : [...prev, value],
                )
              }
              options={[]}
              placeholder="Chọn chủ đề"
            />
            <MultipleCombobox
              value={comboboxValues}
              onSelectChange={(value) =>
                setComboboxValues((prev) =>
                  prev.includes(value)
                    ? prev.filter((v) => v !== value)
                    : [...prev, value],
                )
              }
              options={[]}
              placeholder="Chọn kỹ năng"
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
        {mentors.map((mentor) => (
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
              <div className="mt-2 text-center">
                <h2 className="font-semibold">{mentor.name}</h2>
                <p className="text-gray-500">{mentor.job}</p>
              </div>

              <div className=" my-4 flex justify-center">
                <Rating rating={mentor.rating} />
              </div>

              <div className="mt-2 flex w-full justify-center border-t p-4">
                <Button>Xem chi tiết</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
