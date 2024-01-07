import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import * as z from 'zod';

import { Button } from '@/components/ui/button.tsx';
import { Calendar } from '@/components/ui/calendar.tsx';
import { Checkbox } from '@/components/ui/checkbox.tsx';
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
import { Input } from '@/components/ui/input.tsx';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import { cn } from '@/lib/utils.ts';
import {
  useCreateExperience,
  useUpdateExperience,
} from '@/services/queries/experience.ts';
import { Experience } from '@/types';

const schema = z
  .object({
    title: z.string().min(1, { message: 'Vị trí không được để trống' }),
    description: z.string(),
    startDate: z.coerce
      .date()
      .refine((data) => data > new Date('1900-01-01') || data < new Date(), {
        message: 'Ngày bắt đầu không hợp lệ',
        path: ['startDate'],
      }),
    endDate: z.coerce.date().refine((data) => data > new Date('1900-01-01'), {
      message: 'Ngày kết thúc không hợp lệ',
      path: ['endDate'],
    }),
    isCurrent: z.boolean(),
    company: z.string().min(1, { message: 'Tên công ty không được để trống' }),
  })
  .refine((data) => data.startDate <= data.endDate, {
    message: 'Ngày bắt đầu không hợp lệ',
    path: ['startDate'],
  });

const AddEditExperienceModal: FC<
  PropsWithChildren<{ experience?: Experience }>
> = ({ children, experience }) => {
  const form = useForm({
    defaultValues: {
      title: experience?.title || '',
      description: experience?.description || '',
      startDate: experience?.startDate
        ? new Date(experience.startDate)
        : new Date(),
      endDate: experience?.startDate
        ? new Date(experience.startDate)
        : new Date(),
      isCurrent:
        experience?.isCurrent === undefined ? false : experience?.isCurrent,
      company: experience?.company || '',
    },
    resolver: zodResolver(schema),
  });

  const { getValues } = form;
  const { mentorId } = useParams();
  const { mutate: create, isPending: creating } = useCreateExperience(
    +mentorId!,
  );
  const { mutate: update, isPending: updating } = useUpdateExperience(
    +mentorId!,
  );

  const onSubmit = (data: z.infer<typeof schema>) => {
    if (!experience) {
      create(data);
    } else {
      update({ experienceId: experience.id, body: data });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {experience ? 'Chỉnh sửa kinh nghiệm' : 'Thêm kinh nghiệm'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Công ty / tổ chức</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vị trí</FormLabel>
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

            <FormField
              control={form.control}
              name="isCurrent"
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Hiện tại tôi làm việc ở đây
                  </label>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Ngày bắt đầu</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {getValues('isCurrent') ? null : (
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Ngày kết thúc</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-[240px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date('1900-01-01')
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </form>
        </Form>
        <DialogFooter className={'fle'}>
          <Button
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            disabled={creating || updating}
          >
            {creating || updating ? (
              <ClipLoader size={15} className={'mr-2'} />
            ) : null}
            {experience ? 'Chỉnh sửa' : 'Thêm'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditExperienceModal;
