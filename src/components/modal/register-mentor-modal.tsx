import { zodResolver } from '@hookform/resolvers/zod';
import { FC, PropsWithChildren, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';

import { Button } from '@/components/ui/button.tsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Input } from '@/components/ui/input.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import { useMe } from '@/services/queries/auth.ts';
import { supabase } from '@/services/supabase-client.ts';

type Props = PropsWithChildren;

const formSchema = z.object({
  introduction: z.coerce.string().min(1, 'Giời thiệu bản thân quá ngắn'),
  cv: z.instanceof(File).optional(),
});

const RegisterMentorModal: FC<Props> = ({ children }) => {
  const { data: me } = useMe();
  const [open, setOpen] = useState(false);
  const [isUploadingCv, setUploadingCv] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      introduction: '',
      cv: new File([], ''),
    },
  });
  const navigate = useNavigate();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let cvUrl = '';
    if (values.cv) {
      setUploadingCv(true);
      const { data, error } = await supabase.storage
        .from('urMentor')
        .upload('cv/' + me?.id, values.cv, {
          cacheControl: '3600',
          upsert: true,
        });
      cvUrl =
        'https://uogksvzmmzswvobaubhr.supabase.co/storage/v1/object/public/urMentor/' +
        data?.path;

      if (error) {
        toast.error('Upload cv bị lỗi: ' + error.message);
        setUploadingCv(false);
        return;
      }

      setUploadingCv(false);
    }

    const payload = {
      ...values,
      cv: cvUrl,
    };
  };

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Đăng ký làm mentor</DialogTitle>
          <DialogDescription>
            • Hãy cập nhật hồ sơ của bạn về học vấn, kinh nghiệm,...
            <br />
            • Viết một lời giới thiệu về bản thân, vì sao muốn làm mentor.
            <br />• Có thể upload thêm cv để tăng cơ hội được duyệt đơn.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
            <FormField
              control={form.control}
              name="introduction"
              render={({ field }) => (
                <FormItem className={'w-full'}>
                  <FormLabel>Giới thiệu về bản thân</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="min-h-[150px]  resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cv"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cv</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept={'application/pdf'}
                      onChange={(e) =>
                        field.onChange(
                          e.target.files ? e.target.files[0] : null,
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className={'space-x-2'}>
              <Button type="submit">Đăng ký</Button>
              <Button
                type={'button'}
                variant={'outline'}
                onClick={() => {
                  navigate(`/profile/${me?.id}`);
                  setOpen(false);
                }}
              >
                Cập nhật hồ sơ
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterMentorModal;
