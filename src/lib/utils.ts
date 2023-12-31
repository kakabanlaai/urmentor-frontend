import { type ClassValue, clsx } from 'clsx';
import { getHours, getMinutes } from 'date-fns';
import { matchSorter } from 'match-sorter';
import { twMerge } from 'tailwind-merge';

import { User } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCardTitle = (mentor: User) => {
  if (mentor.experiences.length > 0) {
    const sortedEperiences = matchSorter(mentor.experiences, '', {
      baseSort: (a, b) => (a.item.startDate > b.item.startDate ? -1 : 1),
    });
    return sortedEperiences[0].title + ' tại ' + sortedEperiences[0].company;
  }

  if (mentor.educations.length > 0) {
    const sortedEducations = matchSorter(mentor.educations, '', {
      baseSort: (a, b) => (a.item.startDate > b.item.startDate ? -1 : 1),
    });
    return (
      'Học ' + sortedEducations[0].major + ' tại ' + sortedEducations[0].school
    );
  }

  if (mentor.achievements.length > 0) {
    const sortedAchievements = matchSorter(mentor.achievements, '', {
      baseSort: (a, b) => (a.item.date > b.item.date ? -1 : 1),
    });
    return sortedAchievements[0].title;
  }
  return '';
};

export const getRatingInfo = (mentor: User) => {
  if (!mentor.ratings || mentor.ratings.length === 0)
    return { rating: 0, count: 0, average: 0 };

  const rating = mentor.ratings.reduce((sum, review) => {
    return sum + review.rating;
  }, 0);
  const count = mentor.ratings.length;
  const average = Math.round((rating * 100) / count) / 100;
  return { rating, count, average };
};

export const getMonthYear = (date: Date) => {
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${month}/${year}`;
};

export const getMinuteHour = (date: Date) => {
  const hour = getHours(date);
  const minute = getMinutes(date);
  return `${hour}:${minute}`;
};
