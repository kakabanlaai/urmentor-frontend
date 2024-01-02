import { Edit3, MessageCircleMore, Plus } from 'lucide-react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar.tsx';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label.tsx';
import Rating from '@/components/ui/rating';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ProfilePage = () => {
  return (
    <>
      <div className=" rounded-lg bg-white pb-4 shadow-lg">
        <div className="h-[170px] w-full">
          <img
            src="/images/profile-bg.svg"
            className="h-full w-full rounded-tl-lg rounded-tr-lg object-cover"
          />
        </div>
        <div className="-mt-20 flex flex-col items-center">
          <img
            src="https://vojislavd.com/ta-template-demo/assets/img/profile.jpg"
            className="w-40 rounded-full border-4 border-white"
          />
          <div className="mt-2 flex items-center space-x-2">
            <p className="text-2xl">Amanda Ross</p>
          </div>
          <p className="text-gray-700">
            Senior Software Engineer at Tailwind CSS
          </p>
          <Rating className="mt-2" />
        </div>
        <div className="mt-2 flex flex-1 flex-col items-center justify-end px-8 lg:items-end">
          <div className="mt-2 flex items-center space-x-4">
            <Button size={'icon'}>
              <MessageCircleMore />
            </Button>
            <Button>Đăng ký cố vấn</Button>
          </div>
        </div>
      </div>
      <Tabs defaultValue="profile" className="my-8">
        <TabsList>
          <TabsTrigger value="profile">Thông tin</TabsTrigger>
          <TabsTrigger value="program">Chương trình cố vấn</TabsTrigger>
          <TabsTrigger value="rating">Đánh giá</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className={'mt-6 flex flex-col gap-6'}>
          <Card>
            <CardContent className={'pt-6'}>
              <div className={'flex flex-col gap-4'}>
                <div className={'flex items-center justify-between'}>
                  <Label className={'text-xl text-primary md:text-2xl'}>
                    Giới thiệu bản thân
                  </Label>
                  <div>
                    {/*<Button size={'sm'} variant={'ghost'}>*/}
                    {/*  <Plus />*/}
                    {/*</Button>*/}

                    <Button size={'sm'} variant={'ghost'}>
                      <Edit3 />
                    </Button>
                  </div>
                </div>

                <span>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </span>
              </div>
            </CardContent>
          </Card>

          {/*experience*/}
          <Card>
            <CardContent className={'pt-6'}>
              <div className={'flex flex-col gap-8'}>
                <div className={'flex items-center justify-between'}>
                  <Label className={'text-xl text-primary md:text-2xl'}>
                    Kinh nghiệm làm việc
                  </Label>
                  <div>
                    <Button size={'sm'} variant={'ghost'}>
                      <Plus />
                    </Button>

                    <Button size={'sm'} variant={'ghost'}>
                      <Edit3 />
                    </Button>
                  </div>
                </div>

                <div className={'flex gap-5'}>
                  <Avatar className={'h-12 w-12'}>
                    <AvatarImage
                      src={
                        'https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBODF1SkE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--da4ae1908c127c677e6c706e25596035b231b592/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVFJc0FXa0NMQUU9IiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--15c3f2f3e11927673ae52b71712c1f66a7a1b7bd/Naver_Logo(2)-white.png'
                      }
                    />
                    <AvatarFallback>
                      <img src={'/images/logo.svg'} alt={'fallback'} />
                    </AvatarFallback>
                  </Avatar>
                  <div className={'flex flex-col text-gray-700'}>
                    <span className={'font-medium'}>Frontend Developer</span>
                    <span>Naver Vietnam • 8/2019 - cur</span>
                    <span className={'mt-3 text-gray-500'}>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book.{' '}
                    </span>
                  </div>
                </div>
                <div className={'flex gap-5'}>
                  <Avatar className={'h-12 w-12'}>
                    <AvatarImage
                      src={
                        'https://iviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBODF1SkE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--da4ae1908c127c677e6c706e25596035b231b592/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVFJc0FXa0NMQUU9IiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--15c3f2f3e11927673ae52b71712c1f66a7a1b7bd/Naver_Logo(2)-white.png'
                      }
                    />
                    <AvatarFallback>
                      <img src={'/images/logo.svg'} alt={'fallback'} />
                    </AvatarFallback>
                  </Avatar>
                  <div className={'flex flex-col text-gray-700'}>
                    <span className={'font-medium'}>Frontend Developer</span>
                    <span>Naver Vietnam • 8/2019 - cur</span>
                    <span className={'mt-3 text-gray-500'}>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book.{' '}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/*Education*/}
          <Card>
            <CardContent className={'pt-6'}>
              <div className={'flex flex-col gap-8'}>
                <div className={'flex items-center justify-between'}>
                  <Label className={'text-xl text-primary md:text-2xl'}>
                    Quá trình học tập
                  </Label>
                  <div>
                    <Button size={'sm'} variant={'ghost'}>
                      <Plus />
                    </Button>

                    <Button size={'sm'} variant={'ghost'}>
                      <Edit3 />
                    </Button>
                  </div>
                </div>

                <div className={'flex gap-5'}>
                  <Avatar className={'h-12 w-12'}>
                    <AvatarImage
                      src={
                        'https://upload.wikimedia.org/wikipedia/commons/0/00/Logo_UIT_updated.svg'
                      }
                    />
                    <AvatarFallback>
                      <img src={'/images/logo.svg'} alt={'fallback'} />
                    </AvatarFallback>
                  </Avatar>
                  <div className={'flex flex-col text-gray-700'}>
                    <span className={'font-medium capitalize'}>
                      Trường đại học công nghệ thông tin
                    </span>
                    <span>Kỹ thuật phần mềm • 8/2019 - cur</span>
                    <span className={'mt-3 text-gray-500'}>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book.
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/*achievement*/}
          <Card>
            <CardContent className={'pt-6'}>
              <div className={'flex flex-col gap-8'}>
                <div className={'flex items-center justify-between'}>
                  <Label className={'text-xl text-primary md:text-2xl'}>
                    Giải thưởng
                  </Label>
                  <div>
                    <Button size={'sm'} variant={'ghost'}>
                      <Plus />
                    </Button>

                    <Button size={'sm'} variant={'ghost'}>
                      <Edit3 />
                    </Button>
                  </div>
                </div>

                <div className={'flex flex-col'}>
                  <div>
                    <span className={'font-medium'}>Sinh viên 5 tốt</span>
                    <span> • 8/2019</span>
                  </div>
                  <span className={'mt-3 text-gray-500'}>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="program"> Program </TabsContent>

        <TabsContent value="rating"> Rating </TabsContent>
      </Tabs>
    </>
  );
};

export default ProfilePage;
