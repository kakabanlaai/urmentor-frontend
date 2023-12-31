import { zodResolver } from '@hookform/resolvers/zod';
import { useGoogleLogin } from '@react-oauth/google';
import { Loader2 } from 'lucide-react';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { HiArrowLeft } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
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
import { useSignInWithGoogle, useSignUp } from '@/services/queries/auth.ts';

const formSchema = z
  .object({
    name: z.coerce.string().min(1, 'Tên không được để trống'),
    email: z.coerce.string().email('Email không hợp lệ'),
    password: z.coerce.string().min(10, 'Mật khẩu phải có ít nhất 10 ký tự'),
    confirmPassword: z.coerce
      .string()
      .min(10, 'Mật khẩu phải có ít nhất 10 ký tự'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu không khớp',
    path: ['confirmPassword'],
  });
const SignUpPage: FC = () => {
  const [errMessage, setErrMessage] = useState('');
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { mutate: signUp, isPending } = useSignUp();

  const {
    mutate: signInWithGoogleMutate,
    isPending: isSignInWithGooglePending,
  } = useSignInWithGoogle();

  const signInWithGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) =>
      signInWithGoogleMutate(
        { token: tokenResponse.access_token },
        {
          onError: (err) => {
            setErrMessage(err.message);
          },
          onSuccess: () => {
            navigate('/');
          },
        },
      ),
    onError: (err) => {
      setErrMessage(err.error_description || '');
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    signUp(values, {
      onError: (err) => {
        switch (err.message) {
          case 'Conflict':
            setErrMessage('Người dùng đã tồn tại');
            break;
          default:
            setErrMessage(err.message);
            break;
        }
      },
      onSuccess: () => {
        navigate('/');
      },
    });
  };

  const isSignInPending = isPending || isSignInWithGooglePending;

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <div className="m-auto w-full bg-white lg:max-w-lg">
        <Card className="border-0 shadow-none lg:border lg:shadow-sm">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-4xl font-bold">Đăng ký</CardTitle>
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Xác nhận mật khẩu</FormLabel>
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
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSignInPending}
                >
                  {isSignInPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Đăng ký
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
              disabled={isSignInPending}
              onClick={() => signInWithGoogle()}
            >
              <FcGoogle className="mr-2 h-4 w-4" />
              Đăng ký với Google
            </Button>
          </CardFooter>

          <CardFooter className="flex items-center ">
            <p className="text-xs text-gray-700">
              Bạn đã có tài khoản?{' '}
              <Link to="/sign-in" className=" text-blue-600 hover:underline">
                Đăng nhập
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;
