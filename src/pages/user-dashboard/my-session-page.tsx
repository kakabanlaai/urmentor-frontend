import { TabsList } from '@radix-ui/react-tabs';
import { format } from 'date-fns';
import { matchSorter } from 'match-sorter';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar.tsx';
import { Button } from '@/components/ui/button.tsx';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import FullPageLoading from '@/components/ui/full-page-loading.tsx';
import { Label } from '@/components/ui/label.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import { Tabs, TabsContent, TabsTrigger } from '@/components/ui/tabs.tsx';
import { getMinuteHour } from '@/lib/utils.ts';
import { useMe } from '@/services/queries/auth.ts';

const MySessionPage = () => {
  const { data: user, isLoading } = useMe();
  const [dateSort, setDateSort] = useState<'none' | 'desc' | 'asc' | string>(
    'none',
  );
  const navigate = useNavigate();

  if (isLoading) return <FullPageLoading className={'h-full w-full'} />;
  if (!user) return <div>Bạn chưa đăng nhập</div>;

  const sessionRegisters = user?.sessionRegisters;
  const sortedSessionRegisters = matchSorter(sessionRegisters, '', {
    baseSort: (a, b) => {
      if (dateSort === 'desc') {
        return (
          new Date(a.item.session.start).getTime() -
          new Date(b.item.session.start).getTime()
        );
      } else if (dateSort === 'asc') {
        return (
          new Date(b.item.session.start).getTime() -
          new Date(a.item.session.start).getTime()
        );
      }
      return 0;
    },
  });

  const upcomingSessionRegisters = sortedSessionRegisters.filter(
    (register) => register.status === 'approved',
  );

  const doneSessionRegisters = sortedSessionRegisters.filter(
    (register) => register.status === 'done',
  );

  const confirmDoneSessionRegisters = sortedSessionRegisters.filter(
    (register) =>
      register.status === 'approved' && register.session.end < new Date(),
  );

  const pendingSessionRegisters = sortedSessionRegisters.filter(
    (register) => register.status === 'pending',
  );

  return (
    <div>
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className={'flex items-center justify-between'}>
          <div>
            <TabsTrigger value="upcoming">Sắp diễn ra</TabsTrigger>
            <TabsTrigger value="confirm-done">Xác nhận hoàn thành</TabsTrigger>
            <TabsTrigger value="done">Đã hoàn thành</TabsTrigger>
            <TabsTrigger value="pending">Chờ duyệt</TabsTrigger>
          </div>
          {/*<Select*/}
          {/*  onValueChange={(value) => setDateSort(value)}*/}
          {/*  value={dateSort}*/}
          {/*>*/}
          {/*  <SelectTrigger className={'w-[200px]'}>*/}
          {/*    <SelectValue placeholder={'Sắp xếp'} />*/}
          {/*  </SelectTrigger>*/}
          {/*  <SelectContent>*/}
          {/*    <SelectItem value={'none'}>Không</SelectItem>*/}
          {/*    <SelectItem value={'desc'}>Mới nhất</SelectItem>*/}
          {/*    <SelectItem value={'asc'}>Cũ nhất</SelectItem>*/}
          {/*  </SelectContent>*/}
          {/*</Select>*/}
        </TabsList>
        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Phiên sắp diễn ra</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {upcomingSessionRegisters.map((register) => (
                <div className="w-full p-2 hover:cursor-pointer">
                  <div className="rounded-lg bg-white shadow-lg hover:shadow-xl">
                    <div className="p-4">
                      <div className={'flex items-center justify-between'}>
                        <div className="flex items-center gap-2">
                          <Avatar>
                            <AvatarImage src={register.program.user.avatar} />
                            <AvatarFallback>
                              {register.program.user.name[0] || 'U'}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <Label>{register.program.user.name}</Label>
                            <span className="text-sm text-gray-600">
                              Mentor
                            </span>
                          </div>
                        </div>
                        <Button
                          onClick={() =>
                            navigate(`/session-register/${register.id}`)
                          }
                        >
                          Đến trang cố vấn
                        </Button>
                      </div>

                      <div className={'mt-2 flex flex-col gap-2'}>
                        <h1 className={'text-xl font-semibold'}>
                          {register.program.title}
                        </h1>
                        <h1 className={'text-md font-medium'}>
                          {`${getMinuteHour(
                            register.session.start,
                          )} đến ${getMinuteHour(
                            register.session.end,
                          )} - ${format(register.session.start, 'dd/MM/yyyy')}`}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {upcomingSessionRegisters.length === 0 && (
                <div className={'flex flex-col items-center justify-center'}>
                  Bạn chưa có phiên nào sắp diễn ra
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="confirm-done">
          <Card>
            <CardHeader>
              <CardTitle>Chờ xác nhận hoàn thành</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {confirmDoneSessionRegisters.map((register) => (
                <div className="w-full p-2 hover:cursor-pointer">
                  <div className="rounded-lg bg-white shadow-lg hover:shadow-xl">
                    <div className="p-4">
                      <div className={'flex items-center justify-between'}>
                        <div className="flex items-center gap-2">
                          <Avatar>
                            <AvatarImage src={register.program.user.avatar} />
                            <AvatarFallback>
                              {register.program.user.name[0] || 'U'}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <Label>{register.program.user.name}</Label>
                            <span className="text-sm text-gray-600">
                              Mentor
                            </span>
                          </div>
                        </div>
                        <Button>Xác nhận hoàn thành</Button>
                      </div>

                      <div className={'mt-2 flex flex-col gap-2'}>
                        <h1 className={'text-xl font-semibold'}>
                          {register.program.title}
                        </h1>
                        <h1 className={'text-md font-medium'}>
                          {`${getMinuteHour(
                            register.session.start,
                          )} đến ${getMinuteHour(
                            register.session.end,
                          )} - ${format(register.session.start, 'dd/MM/yyyy')}`}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {confirmDoneSessionRegisters.length === 0 && (
                <div className={'flex flex-col items-center justify-center'}>
                  Bạn chưa có phiên nào cần xác nhận hoàn thành
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="done">
          <Card>
            <CardHeader>
              <CardTitle>Phiên đã hoàn thành</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {doneSessionRegisters.map((register) => (
                <div className="w-full p-2 hover:cursor-pointer">
                  <div className="rounded-lg bg-white shadow-lg hover:shadow-xl">
                    <div className="p-4">
                      <div className={'flex items-center justify-between'}>
                        <div className="flex items-center gap-2">
                          <Avatar>
                            <AvatarImage src={register.program.user.avatar} />
                            <AvatarFallback>
                              {register.program.user.name[0] || 'U'}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <Label>{register.program.user.name}</Label>
                            <span className="text-sm text-gray-600">
                              Mentor
                            </span>
                          </div>
                        </div>
                        <Button>Đánh giá</Button>
                      </div>

                      <div className={'mt-2 flex flex-col gap-2'}>
                        <h1 className={'text-xl font-semibold'}>
                          {register.program.title}
                        </h1>
                        <h1 className={'text-md font-medium'}>
                          {`${getMinuteHour(
                            register.session.start,
                          )} đến ${getMinuteHour(
                            register.session.end,
                          )} - ${format(register.session.start, 'dd/MM/yyyy')}`}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {doneSessionRegisters.length === 0 && (
                <div className={'flex flex-col items-center justify-center'}>
                  Bạn chưa có phiên nào đã hoàn thành
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Chờ duyệt</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {pendingSessionRegisters.map((register) => (
                <div className="w-full p-2 hover:cursor-pointer">
                  <div className="rounded-lg bg-white shadow-lg hover:shadow-xl">
                    <div className="p-4">
                      <div className={'flex items-center justify-between'}>
                        <div className="flex items-center gap-2">
                          <Avatar>
                            <AvatarImage src={register.program.user.avatar} />
                            <AvatarFallback>
                              {register.program.user.name[0] || 'U'}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <Label>{register.program.user.name}</Label>
                            <span className="text-sm text-gray-600">
                              Mentor
                            </span>
                          </div>
                        </div>
                        <Button variant={'destructive'}>Hủy đặt lịch</Button>
                      </div>

                      <div className={'mt-2 flex flex-col gap-2'}>
                        <h1 className={'text-xl font-semibold'}>
                          {register.program.title}
                        </h1>
                        <h1 className={'text-md font-medium'}>
                          {`${getMinuteHour(
                            register.session.start,
                          )} đến ${getMinuteHour(
                            register.session.end,
                          )} - ${format(register.session.start, 'dd/MM/yyyy')}`}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {pendingSessionRegisters.length === 0 && (
                <div className={'flex flex-col items-center justify-center'}>
                  Bạn chưa có phiên nào chờ duyệt
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MySessionPage;
