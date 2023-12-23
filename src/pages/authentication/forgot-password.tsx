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
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  email: z.coerce.string().email('Email không hợp lệ'),
});

const ForgotPasswordPage: FC = function () {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
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
              Bạn đã quên mật khẩu?
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="example@gm.com" {...field} />
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

export default ForgotPasswordPage;
