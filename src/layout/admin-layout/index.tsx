import { FileBadge, Folders, User, UserCog } from 'lucide-react';
import { ReactNode, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

import { buttonVariants } from '@/components/ui/button.tsx';
import FullPageLoading from '@/components/ui/full-page-loading.tsx';
import { cn } from '@/lib/utils.ts';
import { useMe } from '@/services/queries/auth.ts';
import { Role } from '@/types';

type NavItem = {
  name: string;
  href: string;
  icon: ReactNode;
};

const navItems: NavItem[] = [
  {
    name: 'Đơn đăng ký',
    href: '/admin/mentor-applications',
    icon: <FileBadge />,
  },
  {
    name: 'Người dùng',
    href: '/admin/users',
    icon: <User />,
  },
  {
    name: 'Quản trị viên',
    href: '/admin/admins',
    icon: <UserCog />,
  },
  {
    name: 'Chủ đề cố vấn',
    href: '/admin/topics',
    icon: <Folders />,
  },
];

const AdminLayout = () => {
  const { pathname } = useLocation();
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

    if (user && user.role !== Role.Admin) {
      navigate('/');
      return;
    }
  }, [user, isLoading]);

  if (isLoading) return <FullPageLoading />;

  return (
    <>
      <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white ">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start ">
              <Link to="/" className="ms-2 flex items-center md:me-24">
                <img
                  src="/images/logo.svg"
                  className="me-3 h-10"
                  alt="urMentor Logo"
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold sm:text-2xl ">
                  urMentor
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full border-r border-gray-200 bg-white pt-20 transition-transform sm:translate-x-0 dark:border-gray-700 dark:bg-gray-800"
        aria-label="Sidebar"
      >
        <div className="h-full overflow-y-auto bg-white px-3 pb-4 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    buttonVariants({
                      variant: pathname === item.href ? 'default' : 'ghost',
                    }),
                    ' w-full justify-start text-base',
                  )}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <div className={'ml-64 p-4'}>
        <div className="mt-14 p-4 ">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
