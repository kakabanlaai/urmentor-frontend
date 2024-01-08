import { BookOpenCheck, LayoutDashboard, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import RegisterMentorModal from '@/components/modal/register-mentor-modal.tsx';
import { useMe, useSignOut } from '@/services/queries/auth';
import { Role } from '@/types';

import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { Label } from './label';

const UserButton = () => {
  const navigate = useNavigate();
  const { data: me } = useMe();
  const { mutate: signOut } = useSignOut();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={me?.avatar} />
          <AvatarFallback>{me?.name[0] || 'U'}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => navigate(`/profile/${me?.id}`)}>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={me?.avatar} />
              <AvatarFallback>{me?.name[0] || 'U'}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <Label>{me?.name}</Label>
              <span>Xem hồ sơ của bạn</span>
            </div>
          </div>
        </DropdownMenuItem>

        {me?.role === Role.Mentee && (
          <>
            <DropdownMenuSeparator />

            <RegisterMentorModal>
              <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                disabled={!!me.mentorApplication}
              >
                <BookOpenCheck className="mr-2 h-4 w-4" />
                {me.mentorApplication
                  ? 'Đã đăng ký làm mentor'
                  : 'Đăng ký làm mentor'}
              </DropdownMenuItem>
            </RegisterMentorModal>
          </>
        )}

        <DropdownMenuSeparator />

        {/*<DropdownMenuItem>*/}
        {/*  <User className="mr-2 h-4 w-4" />*/}
        {/*  <span>Thông tin cá nhân</span>*/}
        {/*</DropdownMenuItem>*/}

        <Link to="/dashboard">
          <DropdownMenuItem>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() =>
            signOut(undefined, { onSuccess: () => navigate('/sign-in') })
          }
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Đăng xuất</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
