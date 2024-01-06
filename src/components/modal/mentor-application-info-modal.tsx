import { FC, PropsWithChildren, useState } from 'react';
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';

import { Button } from '@/components/ui/button.tsx';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import { usePatchMentorApplication } from '@/services/queries/mentor-application.ts';
import { MentorApplication, MentorApplicationStatus } from '@/types';

const MentorApplicationInfoModal: FC<
  PropsWithChildren<{ mentorApplication: MentorApplication }>
> = ({ children, mentorApplication }) => {
  const [open, setOpen] = useState(false);

  const { mutate, isPending, error } = usePatchMentorApplication(
    mentorApplication.id,
  );

  const handleAccept = () => {
    mutate(
      { status: MentorApplicationStatus.Accepted },
      {
        onSuccess: () => {
          toast.success('Chấp nhận thành công');
          setOpen(false);
        },
      },
    );
  };

  const handleReject = () => {
    mutate(
      { status: MentorApplicationStatus.Rejected },
      {
        onSuccess: () => {
          toast.success('Từ chối thành công');
          setOpen(false);
        },
        onError: () => {
          toast.error('Từ chối thất bại');
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thông tin đơn đăng ký</DialogTitle>
        </DialogHeader>
        <div className="mt-2 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>{mentorApplication.user.name} </Label>
            <Label>{mentorApplication.user.email} </Label>
            <a
              href={`/profile/${mentorApplication.id}`}
              className={'text-sm text-blue-700 hover:underline'}
              target={'_blank'}
            >
              Xem hồ sơ
            </a>
            {mentorApplication.cv && (
              <a
                href={mentorApplication.cv}
                className={'text-sm text-blue-700 hover:underline'}
                target={'_blank'}
              >
                Xem CV
              </a>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <Label>Giới thiệu</Label>
            <Textarea
              value={mentorApplication.introduction}
              onChange={() => {}}
              className={'min-h-[200px] w-full resize-none'}
            />
          </div>
        </div>
        <DialogFooter>
          {isPending && <ClipLoader color={'#094849'} size={10} />}
          {error && <span className={'text-red-500'}>{error.message}</span>}
          <Button
            variant={'outline'}
            disabled={isPending}
            onClick={handleReject}
          >
            Từ chối
          </Button>
          <Button disabled={isPending} onClick={handleAccept}>
            Chấp nhận
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MentorApplicationInfoModal;
