import { ClipLoader } from 'react-spinners';

import { cn } from '@/lib/utils.ts';

const FullPageLoading = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'flex h-screen w-screen items-center justify-center',
        className,
      )}
    >
      <ClipLoader color={'#094849'} size={60} />
    </div>
  );
};
export default FullPageLoading;
