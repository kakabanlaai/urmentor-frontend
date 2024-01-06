import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useMe } from '@/services/queries/auth';

import { Button } from './button';
import { Label } from './label';
import UserButton from './user-button';

export default function Header() {
  const [top, setTop] = useState<boolean>(true);
  const { data: me, isLoading } = useMe();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    if (me && !me.isActive) {
      navigate('/verify-email');
      return;
    }
  }, [me, isLoading]);

  // detect whether user has scrolled the page down by 10px
  const scrollHandler = () => {
    window.scrollY > 10 ? setTop(false) : setTop(true);
  };

  useEffect(() => {
    scrollHandler();
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top]);

  return (
    <header
      className={`fixed z-30 w-full transition duration-300 ease-in-out md:bg-opacity-90 ${
        !top ? 'bg-white shadow-lg backdrop-blur-sm' : ''
      }`}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Site branding */}
          <Label
            className="mr-4 flex shrink-0 items-center gap-2 text-2xl font-bold text-primary hover:cursor-pointer"
            onClick={() => navigate('/')}
          >
            <img src="/images/logo.svg" alt="urMentor" className="h-14 w-14" />
            <span>urMentor</span>
          </Label>

          {isLoading ? null : me ? (
            <UserButton />
          ) : (
            <nav className=" flex grow">
              {/* Desktop sign in links */}
              <ul className="flex grow flex-wrap items-center justify-end gap-2">
                <li>
                  <Link to="/sign-in">
                    <Button className="" variant={'ghost'} size={'sm'}>
                      Sign in
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link to="/sign-up">
                    <Button className="flex items-center gap-2" size={'sm'}>
                      <span>Sign up</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </li>
              </ul>
            </nav>
          )}

          {/* <MobileMenu /> */}
        </div>
      </div>
    </header>
  );
}
