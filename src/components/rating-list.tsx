import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar.tsx';
import { Label } from '@/components/ui/label.tsx';
import Rating from '@/components/ui/rating.tsx';

type IRating = {
  id: string;
  rating: number;
  comment: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
};
const ratings: IRating[] = [
  {
    id: '1',
    rating: 4,
    comment: 'Mentor tận tình, giải đáp nhiệt tình',
    user: {
      id: '1',
      name: 'Nguyễn Văn A',
      avatar: 'https://i.pravatar.cc/300?u=1',
    },
  },
  {
    id: '2',
    rating: 5,
    comment: 'Mentor tận tình, giải đáp nhiệt tình',
    user: {
      id: '2',
      name: 'Nguyễn Văn B',
      avatar: 'https://i.pravatar.cc/300?u=2',
    },
  },
  {
    id: '3',
    rating: 4,
    comment: 'Mentor tận tình, giải đáp nhiệt tình',
    user: {
      id: '3',
      name: 'Nguyễn Văn C',
      avatar: 'https://i.pravatar.cc/300?u=3',
    },
  },
  {
    id: '4',
    rating: 5,
    comment: 'Mentor tận tình, giải đáp nhiệt tình',
    user: {
      id: '4',
      name: 'Nguyễn Văn D',
      avatar: 'https://i.pravatar.cc/300?u=4',
    },
  },
  {
    id: '5',
    rating: 4,
    comment: 'Mentor tận tình, giải đáp nhiệt tình',
    user: {
      id: '5',
      name: 'Nguyễn Văn E',
      avatar: 'https://i.pravatar.cc/300?u=5',
    },
  },
  {
    id: '6',
    rating: 5,
    comment: 'Mentor tận tình, giải đáp nhiệt tình',
    user: {
      id: '6',
      name: 'Nguyễn Văn F',
      avatar: 'https://i.pravatar.cc/300?u=6',
    },
  },
];

const RatingList = () => {
  return (
    <>
      <div className="container mx-auto flex flex-col flex-wrap items-center gap-2 px-3">
        <Label className="text-xl font-bold uppercase text-primary">
          Đánh giá
        </Label>
        <div className="h-1 w-[100px] bg-primary" />
      </div>
      <div className="flex flex-wrap justify-center ">
        {ratings.map((rating) => (
          <div className="w-full p-2 hover:cursor-pointer">
            <div className="rounded-lg bg-white shadow-lg hover:shadow-xl">
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={rating?.user?.avatar} />
                    <AvatarFallback>
                      {rating.user.name[0] || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <Label>{rating.user.name}</Label>
                    <span className="text-sm text-gray-600">Mentee</span>
                  </div>
                </div>
                <div className="-ml-1 mt-2">
                  <Rating rating={rating.rating} />
                </div>
                <p className="mt-2 text-sm text-gray-600">{rating.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RatingList;
