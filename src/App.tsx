import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import FullPageLoading from '@/components/ui/full-page-loading.tsx';
import { useMe } from '@/services/queries/auth.ts';

import { Label } from './components/ui/label';

function App() {
  const { data: user, isLoading } = useMe();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/sign-in');
    }
  }, [user, isLoading]);

  if (isLoading) return <FullPageLoading />;

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Label>Home Page</Label>
    </div>
  );
}

export default App;
