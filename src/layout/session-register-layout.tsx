import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import FullPageLoading from '@/components/ui/full-page-loading.tsx';
import Header from '@/components/ui/header';
import { useMe } from '@/services/queries/auth.ts';

export default function SessionRegisterLayout() {
  const { data: user, isLoading } = useMe();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      navigate('/sign-in');
    }

    if (user && !user.isActive) {
      navigate('/verify-email');
      return;
    }
  }, [user, isLoading]);

  if (isLoading) return <FullPageLoading />;
  return (
    <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
      {/* Header */}
      <Header />

      <div className="mx-auto w-full max-w-6xl px-3 pt-24">
        <Outlet />
      </div>
    </div>
  );
}
