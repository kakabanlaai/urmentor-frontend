import { zodResolver } from '@hookform/resolvers/zod';
import { format, isAfter } from 'date-fns';
import { matchSorter } from 'match-sorter';
import { FC, PropsWithChildren, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import * as z from 'zod';

import { Button } from '@/components/ui/button.tsx';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import { getMinuteHour } from '@/lib/utils.ts';
import { useMe } from '@/services/queries/auth.ts';
import { useGetProfileById } from '@/services/queries/mentor.ts';
import { useCreateSessionRegister } from '@/services/queries/session-register.ts';
import { Session } from '@/types';

const schema = z.object({
  detail: z.string().min(1, { message: 'Nội dung không được để trống' }),
  programId: z.string().min(1, { message: 'Chương trình không được để trống' }),
  sessionId: z.string().min(1, { message: 'Vui lòng chọn phiên' }),
});

const RegisterSessionModal: FC<PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { data: me } = useMe();
  const { mentorId } = useParams();
  const { data: profile } = useGetProfileById(+mentorId!);

  const { mutate: create } = useCreateSessionRegister();

  const form = useForm({
    defaultValues: {
      detail: '',
      programId: '',
      sessionId: '',
    },
    resolver: zodResolver(schema),
  });

  const { reset } = form;

  if (!me) return null;
  if (!profile) return null;

  const onSubmit = (data: z.infer<typeof schema>) => {
    create(
      {
        detail: data.detail,
        sessionId: +data.sessionId,
        programId: +data.programId,
        menteeId: +me.id,
      },
      {
        onSuccess: () => {
          toast.success('Đăng ký thành công');
          reset();
          setOpen(false);
        },
        onError: () => {
          toast.error('Đăng ký thất bại');
        },
      },
    );
  };

  const isSessionAvailable = (session: Session) => {
    return !session.sessionRegisters.some(
      (register) => register.status === 'approved',
    );
  };

  const sortedSessions = matchSorter(
    profile.sessions.filter((session) => isAfter(session.start, new Date())),
    '',
    {
      baseSort: (a, b) => {
        return a.item.start < b.item.start ? -1 : 1;
      },
    },
  );

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Đăng ký phiên cố vấn</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-3'}>
            <FormField
              control={form.control}
              name="programId"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormItem>
                    <FormLabel>Chọn chương trình</FormLabel>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {profile.programs.map((program) => (
                        <SelectItem
                          key={program.id}
                          value={program.id.toString()}
                        >
                          {program.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </FormItem>
                </Select>
              )}
            />

            <FormField
              control={form.control}
              name="sessionId"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormItem>
                    <FormLabel>Chọn phiên</FormLabel>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sortedSessions.map((session) => (
                        <SelectItem
                          key={session.id}
                          value={session.id.toString()}
                          disabled={!isSessionAvailable(session)}
                        >
                          {`${getMinuteHour(session.start)} đến ${getMinuteHour(
                            session.end,
                          )} - ${format(session.start, 'dd/MM/yyyy')}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </FormItem>
                </Select>
              )}
            />

            <FormItem>
              <FormLabel>Thông tin thêm</FormLabel>
              <Textarea
                name={'detail'}
                placeholder={'Bạn mong muốn điều gì, phương thức liên lạc, ...'}
                onChange={(e) => {
                  form.setValue('detail', e.target.value);
                }}
              />
              <FormMessage>{form.formState.errors.detail?.message}</FormMessage>
            </FormItem>

            <DialogFooter>
              <Button type={'submit'}>Đăng ký</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterSessionModal;
