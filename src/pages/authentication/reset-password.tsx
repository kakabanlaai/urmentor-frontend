import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
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
import { Label } from '@/components/ui/label.tsx';
import { useResetPassword } from '@/services/queries/auth.ts';

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
  const [errMessage, setErrMessage] = useState('');
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: '',
      password: '',
      confirmPass: '',
    },
  });

  const { mutate: forgotPassword, isPending } = useResetPassword();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    forgotPassword(values, {
      onSuccess: () => {
        toast.success('Đặt lại mật khẩu thành công');
        navigate('/sign-in');
      },
      onError: (err) => {
        setErrMessage(err.message);
      },
    });
  };

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
                onSubmit={form.handleSubmit(onSubmit)}
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
                {errMessage ? (
                  <Label className="text-sm text-red-500">{errMessage}</Label>
                ) : null}
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
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
