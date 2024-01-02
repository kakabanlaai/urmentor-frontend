import { Outlet } from 'react-router-dom';

import Header from '@/components/ui/header';

export default function HomeLayout() {
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
