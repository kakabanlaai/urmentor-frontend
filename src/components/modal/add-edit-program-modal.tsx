import { zodResolver } from '@hookform/resolvers/zod';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
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
import FullPageLoading from '@/components/ui/full-page-loading.tsx';
import { Input } from '@/components/ui/input.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import {
  useCreateProgram,
  useDeleteProgram,
  useUpdateProgram,
} from '@/services/queries/program.ts';
import { useGetAllTopics } from '@/services/queries/topic.ts';
import { Program } from '@/types';

const schema = z.object({
  title: z.string().min(1, { message: 'Vị trí không được để trống' }),
  description: z.string().min(1, { message: 'Nội dung không được để trống' }),
  price: z.coerce
    .number()
    .int('Giá phải là số nguyên')
    .min(0, 'Giá phải lớn hơn 0'),
  topicId: z.string().min(1, { message: 'Chủ đề không được để trống' }),
});

const AddEditProgramModal: FC<PropsWithChildren<{ program?: Program }>> = ({
  children,
  program,
}) => {
  const [open, setOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      title: program?.title ?? '',
      description: program?.description ?? '',
      price: program?.price ?? 0,
      topicId: program?.topic.id.toString() ?? '',
    },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    setValue('title', program?.title ?? '');
    setValue('description', program?.description ?? '');
    setValue('topicId', program?.topic.id.toString() ?? '');
    setValue('price', program?.price ?? 0);
  }, [program]);

  const { reset, setValue } = form;

  const { data: topics, isLoading: loadingTopic } = useGetAllTopics();
  const { mutate: create, isPending: creating } = useCreateProgram();
  const { mutate: update, isPending: updating } = useUpdateProgram();
  const { mutate: deleteProgram, isPending: deleting } = useDeleteProgram();

  const onSubmit = (data: z.infer<typeof schema>) => {
    if (!program) {
      create(
        {
          ...data,
          topicId: +data.topicId,
        },
        {
          onSuccess: () => {
            toast.success('Tạo chương trình thành công');
            setOpen(false);
            reset();
          },
          onError: () => {
            toast.error('Tạo chương trình thất bại');
          },
        },
      );
    } else {
      update(
        {
          id: program.id,
          body: {
            ...data,
            topicId: +data.topicId,
          },
        },
        {
          onSuccess: () => {
            toast.success('Cập nhật chương trình thành công');
            setOpen(false);

            reset();
          },
          onError: () => {
            toast.error('Cập nhật chương trình thất bại');
          },
        },
      );
    }
  };

  const onDelete = () => {
    deleteProgram(+program!.id, {
      onSuccess: () => {
        toast.success('Xóa chương trình thành công');
        setOpen(false);
      },
      onError: () => {
        toast.error('Xóa chương trình thất bại');
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {program
              ? 'Chỉnh sửa chương trình cố vấn'
              : 'Thêm chương trình cố vấn'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên chương trình</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nội dung </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={'Nội dung chương trình'}
                      {...field}
                      className={'resize-none'}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thông tin thêm</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="topicId"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormItem>
                    <FormLabel>Chủ đề cố vấn</FormLabel>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn chủ để" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {loadingTopic ? (
                        <FullPageLoading className={'h-full w-full'} />
                      ) : (
                        topics?.map((topic) => (
                          <SelectItem value={topic.id.toString()}>
                            {topic.title}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </FormItem>
                </Select>
              )}
            />
          </form>
        </Form>
        <DialogFooter className={'fle'}>
          {program ? (
            <Button
              variant={'destructive'}
              onClick={onDelete}
              disabled={deleting}
            >
              Xóa
            </Button>
          ) : null}
          <Button
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            disabled={creating || updating}
          >
            {creating || updating ? (
              <ClipLoader size={15} className={'mr-2'} />
            ) : null}
            {program ? 'Chỉnh sửa' : 'Thêm'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditProgramModal;
