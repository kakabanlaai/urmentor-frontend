import SetPassForm from '@/components/form/set-pass-form.tsx';
import UpdatePassForm from '@/components/form/update-pass-form.tsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import FullPageLoading from '@/components/ui/full-page-loading.tsx';
import { useMe } from '@/services/queries/auth.ts';

const PersonaPage = () => {
  const { data: user, isLoading } = useMe();

  if (isLoading) return <FullPageLoading />;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Đặt lại mật khẩu</CardTitle>
        <CardDescription>
          {!user?.hasSetPass
            ? 'Lúc đăng ký bạn chưa đặt mật khẩu, vui lòng đặt mật khẩu!'
            : ''}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!user?.hasSetPass ? <SetPassForm /> : <UpdatePassForm />}
      </CardContent>
    </Card>
  );
};

export default PersonaPage;
