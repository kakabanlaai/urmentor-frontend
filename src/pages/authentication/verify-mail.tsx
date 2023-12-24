import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
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
  FormMessage,
} from '@/components/ui/form';
import FullPageLoading from '@/components/ui/full-page-loading.tsx';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label.tsx';
import {
  useVerifyEmail,
  useVerifyEmailWithCode,
} from '@/services/queries/auth';

const formSchema = z.object({
  code: z.coerce.string().min(1, 'Mã xác nhận không được để trống'),
});

const VerifyMailPage: FC = function () {
  const [errMessage, setErrMessage] = useState('');
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: '',
    },
  });

  const { mutate: verifyMail, isPending } = useVerifyEmailWithCode();
  const { isPending: getVerifyPending } = useVerifyEmail();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    verifyMail(values, {
      onSuccess: () => {
        navigate('/');
      },
      onError: (err) => {
        setErrMessage(err.message);
      },
    });
  };

  if (getVerifyPending) return <FullPageLoading />;

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
            <CardTitle className="text-3xl font-bold">Xác minh email</CardTitle>
            <CardDescription className="text-center">
              Chúng tôi đã gửi cho bạn một mã để xác minh email của bạn!
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
                {errMessage ? (
                  <Label className="text-sm text-red-500">{errMessage}</Label>
                ) : null}
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Xác nhận email
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerifyMailPage;
