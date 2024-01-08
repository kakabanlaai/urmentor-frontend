import { zodResolver } from '@hookform/resolvers/zod';
import { FC, PropsWithChildren } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
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
import { Textarea } from '@/components/ui/textarea.tsx';
import { useUpdateMe } from '@/services/queries/auth.ts';

const schema = z.object({
  introduction: z.string(),
});

const EditIntroductionModal: FC<
  PropsWithChildren<{ introduction: string }>
> = ({ children, introduction }) => {
  const form = useForm({
    defaultValues: {
      introduction: introduction || '',
    },
    resolver: zodResolver(schema),
  });

  const { mentorId } = useParams<{ mentorId: string }>();

  const { mutate: update, isPending: updating } = useUpdateMe(+mentorId!);

  const onSubmit = async (data: z.infer<typeof schema>) => {
    update(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="introduction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thông tin thêm</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={'Trãi nghiệm, thành tích,...'}
                      {...field}
                      className={'resize-none'}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter className={'fle'}>
          <Button
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            disabled={updating}
          >
            {updating ? <ClipLoader size={15} className={'mr-2'} /> : null}
            Chỉnh sửa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditIntroductionModal;
