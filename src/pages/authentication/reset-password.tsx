import { zodResolver } from '@hookform/resolvers/zod';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z
  .object({
    code: z.coerce.string().min(1, 'Mã xác nhận không được để trống'),
    password: z.coerce.string().min(10, 'Mật khẩu phải có ít nhất 10 ký tự'),
    confirmPass: z.coerce.string().min(10, 'Mật khẩu phải có ít nhất 10 ký tự'),
  })
  .refine((data) => data.password === data.confirmPass, {
    message: 'Mật khẩu không khớp',
    path: ['confirmPass'],
  });

const ResetPasswordPage: FC = function () {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: '',
      password: '',
      confirmPass: '',
    },
  });

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <div className="m-auto flex w-full flex-col items-center gap-2 bg-white lg:max-w-lg">
        <a href="/" className="my-6 flex items-center gap-x-1 lg:my-0">
          <img
            alt="urMentor logo"
            src="/images/logo.svg"
            className="mr-3 h-16"
          />
          <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
            urMentor
          </span>
        </a>
        <Card>
          <CardHeader className="flex-col items-center justify-between">
            <CardTitle className="text-3xl font-bold">
              Đặt lại mật khẩu
            </CardTitle>
            <CardDescription className="text-center">
              Đừng lo lắng! Chỉ cần nhập email của bạn và chúng tôi sẽ gửi cho
              bạn một mã để đặt lại mật khẩu của bạn!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((values) => {
                  console.log(values);
                })}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mã xác nhận</FormLabel>

                      <FormControl>
                        <Input
                          placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mật khẩu</FormLabel>

                      <FormControl>
                        <Input
                          placeholder="***********"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPass"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Xác nhận mật khẩu</FormLabel>

                      <FormControl>
                        <Input
                          placeholder="***********"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Lấy lại mật khẩu
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
