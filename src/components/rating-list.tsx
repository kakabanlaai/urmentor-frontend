import { FC } from 'react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar.tsx';
import { Label } from '@/components/ui/label.tsx';
import Rating from '@/components/ui/rating.tsx';
import { Rating as IRating } from '@/types';

const RatingList: FC<{ ratings: IRating[] }> = ({ ratings }) => {
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
                    <AvatarImage src={rating?.fromUser?.avatar} />
                    <AvatarFallback>
                      {rating.fromUser.name[0] || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <Label>{rating.fromUser.name}</Label>
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
        {ratings.length === 0 && (
          <div className="flex w-full justify-center">
            <p className="text-gray-500">Không tìm thấy đánh giá nào.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default RatingList;
