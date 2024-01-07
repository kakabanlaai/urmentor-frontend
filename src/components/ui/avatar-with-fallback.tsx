import { FC } from 'react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar.tsx';
import { User } from '@/types';

const AvatarWithFallback: FC<{ user: User; className?: string }> = ({
  user,
  className,
}) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={user.avatar} />
      <AvatarFallback>
        {user.name
          .split(' ')
          .map((name) => name[0])
          .join('')}
      </AvatarFallback>
    </Avatar>
  );
};
export default AvatarWithFallback;
