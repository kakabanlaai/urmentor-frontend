import { Edit3, MessageCircleMore, Plus } from 'lucide-react';
import { matchSorter } from 'match-sorter';
import { useParams } from 'react-router-dom';

import AddEditExperienceModal from '@/components/modal/add-edit-experience-modal.tsx';
import AskLoginModal from '@/components/modal/ask-login-modal.tsx';
import EditIntroductionModal from '@/components/modal/edit-introduction-modal.tsx';
import RegisterSessionModal from '@/components/modal/register-session-modal.tsx';
import ProgramList from '@/components/program-list.tsx';
import RatingList from '@/components/rating-list.tsx';
import AvatarWithFallback from '@/components/ui/avatar-with-fallback.tsx';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import EducationMoreOption from '@/components/ui/education-more-option.tsx';
import ExperienceMoreOption from '@/components/ui/experience-more-option.tsx';
import FullPageLoading from '@/components/ui/full-page-loading.tsx';
import { Label } from '@/components/ui/label.tsx';
import Rating from '@/components/ui/rating';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getCardTitle, getMonthYear, getRatingInfo } from '@/lib/utils.ts';
import NotFoundPage from '@/pages/404.tsx';
import { useMe } from '@/services/queries/auth.ts';
import { useGetProfileById } from '@/services/queries/mentor.ts';
import { User } from '@/types';

const ProfilePage = () => {
  const { data: me, isLoading: meLoading } = useMe();
  const { mentorId } = useParams();
  const { data: profile, isLoading } = useGetProfileById(+mentorId!);

  if (isNaN(+mentorId!)) return <NotFoundPage />;

  if (isLoading || meLoading)
    return <FullPageLoading className={'h-full w-full'} />;

  if (!profile) return <NotFoundPage />;

  const isMe = me?.id === profile?.id;

  const ratingInfo = getRatingInfo(profile);

  const sortedExperiences = matchSorter(profile?.experiences || [], '', {
    baseSort: (a, b) => (b.item.startDate < a.item.startDate ? -1 : 1),
  });

  const sortedEducations = matchSorter(profile?.educations || [], '', {
    baseSort: (a, b) => (b.item.startDate < a.item.startDate ? -1 : 1),
  });

  const sortedAchievements = matchSorter(profile?.achievements || [], '', {
    baseSort: (a, b) => (b.item.date < a.item.date ? -1 : 1),
  });

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
          <AvatarWithFallback
            user={profile as User}
            className={'h-40 w-40 border-4 border-white'}
          />

          <div className="mt-2 flex items-center space-x-2">
            <p className="text-2xl text-primary">{profile!.name}</p>
          </div>
          <span className="text-gray-700">{getCardTitle(profile!)}</span>
          <span className="text-gray-500">{profile!.email}</span>
          <Rating className="mt-2" rating={ratingInfo.average} />
          <span className="text-sm text-gray-500">
            {ratingInfo.count} đánh giá
            {ratingInfo.count > 0 && ` • ${ratingInfo.average} / 5`}
          </span>
        </div>
        <div className="mt-2 flex flex-1 flex-col items-center justify-end px-8 lg:items-end">
          {!me && (
            <div className="mt-2 flex items-center space-x-4">
              <AskLoginModal>
                <Button size={'icon'}>
                  <MessageCircleMore />
                </Button>
              </AskLoginModal>
              <AskLoginModal>
                <Button>Đăng ký cố vấn</Button>
              </AskLoginModal>
            </div>
          )}
          {!isMe && me && profile?.role === 'mentor' && (
            <div className="mt-2 flex items-center space-x-4">
              <Button size={'icon'}>
                <MessageCircleMore />
              </Button>
              <RegisterSessionModal>
                <Button>Đăng ký cố vấn</Button>
              </RegisterSessionModal>
            </div>
          )}
        </div>
      </div>
      <Tabs defaultValue="profile" className="my-8">
        <TabsList>
          <TabsTrigger value="profile">Thông tin</TabsTrigger>
          {profile?.role === 'mentor' && (
            <>
              <TabsTrigger value="program">Chương trình cố vấn</TabsTrigger>
              <TabsTrigger value="rating">Đánh giá</TabsTrigger>
            </>
          )}
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
                    {isMe && (
                      <EditIntroductionModal
                        introduction={profile!.introduction}
                      >
                        <Button size={'sm'} variant={'ghost'}>
                          <Edit3 />
                        </Button>
                      </EditIntroductionModal>
                    )}
                  </div>
                </div>

                <span>{profile!.introduction || 'Chưa có'}</span>
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
                  {isMe && (
                    <div>
                      <AddEditExperienceModal>
                        <Button size={'sm'} variant={'ghost'}>
                          <Plus />
                        </Button>
                      </AddEditExperienceModal>
                    </div>
                  )}
                </div>

                {sortedExperiences.map((experience) => (
                  <div className={'flex items-center justify-between'}>
                    <div className={'flex gap-5 '} key={experience.id}>
                      <Avatar className={'h-12 w-12'}>
                        <AvatarImage src={experience.icon} />
                        <AvatarFallback>
                          <img src={'/images/logo.svg'} alt={'fallback'} />
                        </AvatarFallback>
                      </Avatar>
                      <div className={'flex flex-col text-gray-700'}>
                        <span className={'font-medium'}>
                          {experience.title}
                        </span>
                        <span>
                          {experience.company} •{' '}
                          {getMonthYear(new Date(experience.startDate))} -
                          {experience.isCurrent
                            ? ' cur'
                            : ' ' + getMonthYear(new Date(experience.endDate))}
                        </span>
                        <span className={'mt-3 text-gray-500'}>
                          {experience.description}
                        </span>
                      </div>
                    </div>
                    {isMe && <ExperienceMoreOption experience={experience} />}
                  </div>
                ))}
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
                  {isMe && (
                    <div>
                      <Button size={'sm'} variant={'ghost'}>
                        <Plus />
                      </Button>
                    </div>
                  )}
                </div>

                {sortedEducations?.map((education) => (
                  <div className={'flex items-center justify-between'}>
                    <div className={'flex gap-5'}>
                      <Avatar className={'h-12 w-12'}>
                        <AvatarImage src={education.icon} />
                        <AvatarFallback>
                          <img src={'/images/logo.svg'} alt={'fallback'} />
                        </AvatarFallback>
                      </Avatar>
                      <div className={'flex flex-col text-gray-700'}>
                        <span className={'font-medium capitalize'}>
                          {education.school}
                        </span>
                        <span>
                          {education.major} •{' '}
                          {getMonthYear(new Date(education.startDate))} -
                          {education.isCurrent
                            ? ' cur'
                            : ' ' + getMonthYear(new Date(education.endDate))}
                        </span>
                        <span className={'mt-3 text-gray-500'}>
                          {education.description}
                        </span>
                      </div>
                    </div>
                    {isMe && <EducationMoreOption />}
                  </div>
                ))}
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
                  {isMe && (
                    <div>
                      <Button size={'sm'} variant={'ghost'}>
                        <Plus />
                      </Button>
                    </div>
                  )}
                </div>

                {sortedAchievements?.map((achievement) => (
                  <div className={'flex items-center justify-between'}>
                    <div className={'flex flex-col'}>
                      <div>
                        <span className={'font-medium'}>
                          {achievement.title}
                        </span>
                        <span>
                          {' '}
                          • {new Date(achievement.date).getFullYear()}
                        </span>
                      </div>
                      <span className={'mt-3 text-gray-500'}>
                        {achievement.description}
                      </span>
                    </div>
                    {isMe && <EducationMoreOption />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className={'pt-6'}>
              <div className={'flex flex-col gap-8'}>
                <div className={'flex items-center justify-between'}>
                  <Label className={'text-xl text-primary md:text-2xl'}>
                    Kỹ năng
                  </Label>
                </div>

                <div className={'flex gap-2'}>
                  {profile?.skills?.map((skill) => (
                    <Badge className={'text-md'}>{skill.name}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {profile?.role === 'mentor' && (
          <>
            <TabsContent value="program">
              <ProgramList programs={profile?.programs || []} />
            </TabsContent>

            <TabsContent value="rating">
              <RatingList ratings={profile.ratings || []} />
            </TabsContent>
          </>
        )}
      </Tabs>
    </>
  );
};

export default ProfilePage;
