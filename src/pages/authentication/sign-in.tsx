import { zodResolver } from '@hookform/resolvers/zod';
import { useGoogleLogin } from '@react-oauth/google';
import { Loader2 } from 'lucide-react';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { HiArrowLeft } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
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
import { useSignIn } from '@/services/queries/auth';

const formSchema = z.object({
  email: z.coerce.string().email('Email không hợp lệ'),
  password: z.coerce.string().min(10, 'Mật khẩu phải có ít nhất 10 ký tự'),
});

const SignInPage: FC = () => {
  const [errMessage, setErrMessage] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate: signIn, isPending } = useSignIn();

  const signInWithGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    signIn(values, {
      onError: (err) => {
        setErrMessage(err.message);
      },
    });
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <div className="m-auto w-full bg-white lg:max-w-lg">
        <Card className="border-0 shadow-none lg:border lg:shadow-sm">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-4xl font-bold">Đăng nhập</CardTitle>
            <Link to="/">
              <Button variant={'ghost'} size={'icon'}>
                <HiArrowLeft className={'h-7 w-7'} />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="example@gm.com" {...field} />
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
                          placeholder="*********"
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
                  Đăng nhập
                </Button>
              </form>
            </Form>
          </CardContent>

          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                hoặc
              </span>
            </div>
          </div>

          <CardFooter className="flex flex-col">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => signInWithGoogle()}
            >
              <FcGoogle className="mr-2 h-4 w-4" />
              Đăng nhập với Google
            </Button>
          </CardFooter>

          <CardFooter className="flex items-center justify-between">
            <p className="text-xs text-gray-700">
              Bạn chưa có tài khoản?{' '}
              <Link to="/sign-up" className=" text-blue-600 hover:underline">
                Đăng ký
              </Link>
            </p>
            <Link
              to="/forgot-password"
              className=" text-xs text-blue-600 hover:underline"
            >
              Quên mật khẩu?
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignInPage;
