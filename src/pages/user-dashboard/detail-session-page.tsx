import { format, getHours, getMinutes } from 'date-fns';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button.tsx';
import FullPageLoading from '@/components/ui/full-page-loading.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { useAcceptSessionRegister } from '@/services/queries/session-register.ts';
import { useDeleteSession, useGetSession } from '@/services/queries/session.ts';

const DetailSessionPage = () => {
  const { sessionId } = useParams();
  const { data: session, isLoading } = useGetSession(+sessionId!);
  const navigate = useNavigate();

  const { mutate: deleteSession } = useDeleteSession();
  const { mutate: accept } = useAcceptSessionRegister(+sessionId!);

  if (isLoading) return <FullPageLoading className={'h-full w-full'} />;
  if (!session) return <div>Không tìm thấy phiên</div>;

  const getMinuteHour = (date: Date) => {
    const hour = getHours(date);
    const minute = getMinutes(date);
    return `${hour}:${minute}`;
  };

  const handleDeleteSession = () => {
    deleteSession(session.id, {
      onSuccess: () => {
        navigate('/dashboard/sessions');
        toast.success('Xóa phiên thành công');
      },
      onError: () => {
        toast.error('Xóa phiên thất bại');
      },
    });
  };

  const acceptedMentee = session.sessionRegisters.find(
    (register) => register.status === 'approved',
  );

  const handleAccept = (registerId: number) => {
    accept(registerId, {
      onSuccess: () => {
        toast.success('Duyệt thành công');
      },
      onError: () => {
        toast.error('Duyệt thất bại');
      },
    });
  };

  return (
    <>
      <div className={'flex flex-col gap-2'}>
        <div className={'flex items-center justify-between'}>
          <h1 className={'text-2xl font-semibold'}>Phiên cố vấn</h1>
          <Button variant={'destructive'} onClick={handleDeleteSession}>
            Xóa
          </Button>
        </div>
        <h1 className={'text-xl '}>{`${getMinuteHour(
          session.start,
        )} đến ${getMinuteHour(session.end)} - ${format(
          session.start,
          'dd/MM/yyyy',
        )}`}</h1>
      </div>
      <Separator />

      <div className={'mt-4 flex flex-col gap-2'}>
        <h1 className={'text-lg font-semibold'}>Danh sách đăng ký</h1>
      </div>

      <div className={'mt-4 flex flex-wrap justify-center'}>
        {session.sessionRegisters.map((register) => (
          <div className="w-full p-2 hover:cursor-pointer ">
            <div className="rounded-lg bg-white shadow-lg hover:shadow-xl">
              <div className="p-4">
                <div className={'mt-2 flex items-center justify-between'}>
                  <div>
                    <span className="text-md font-bold text-gray-600">
                      Chương trình
                    </span>
                    <h2 className="flex-1 text-2xl font-bold text-gray-800">
                      {register.program.title}
                    </h2>
                  </div>
                  <div className={' flex items-center space-x-4'}>
                    <div className={'flex flex-col items-end'}>
                      <span>
                        {register.program.price === 0 ? (
                          <span className="text-md font-bold text-green-400">
                            Free
                          </span>
                        ) : (
                          <span className="text-md font-bold text-yellow-400">
                            {register.program.price} coin
                          </span>
                        )}
                      </span>
                      <span>
                        {register.status === 'approved' ? (
                          <span className="text-md font-bold text-green-400">
                            Đã duyệt
                          </span>
                        ) : register.status === 'pending' ? (
                          <span className="text-md font-bold text-yellow-400">
                            Chờ duyệt
                          </span>
                        ) : (
                          <span className="text-md font-bold text-red-400">
                            Đã từ chối
                          </span>
                        )}
                      </span>
                    </div>

                    {acceptedMentee && acceptedMentee.id === register.id ? (
                      <Button>Cố vấn</Button>
                    ) : null}
                    {!acceptedMentee ? (
                      <Button onClick={() => handleAccept(register.id)}>
                        Duyệt
                      </Button>
                    ) : null}
                  </div>
                </div>
                <Separator className={'my-2'} />
                <div className={'mt-2 flex items-center'}>
                  <h2 className="flex-1 text-2xl font-bold text-gray-800">
                    {register.mentee.name}
                  </h2>
                  <Button
                    variant={'outline'}
                    onClick={() => {
                      navigate(`/profile/${register.mentee.id}`);
                    }}
                  >
                    Xem thông tin
                  </Button>
                </div>
                <p className="mt-2 text-sm text-gray-600">{register.detail}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DetailSessionPage;
