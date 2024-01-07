import { MoreVertical } from 'lucide-react';
import { FC } from 'react';
import { useParams } from 'react-router-dom';

import AddEditExperienceModal from '@/components/modal/add-edit-experience-modal.tsx';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog.tsx';
import { Button } from '@/components/ui/button.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { useDeleteExperience } from '@/services/queries/experience.ts';
import { Experience } from '@/types';

const ExperienceMoreOption: FC<{ experience: Experience }> = ({
  experience,
}) => {
  const { mentorId } = useParams();
  const { mutate, isPending } = useDeleteExperience(+mentorId!);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'} size={'icon'}>
          <MoreVertical className={'h-4 w-4'} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <AddEditExperienceModal experience={experience}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            Chỉnh sửa
          </DropdownMenuItem>
        </AddEditExperienceModal>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Xóa
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Bạn có chắc chắn muốn xóa kinh nghiệm này?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Hủy</AlertDialogCancel>
              <AlertDialogAction
                className={'bg-red-600 hover:bg-red-700'}
                disabled={isPending}
                onClick={() => mutate(experience.id)}
              >
                Xóa
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExperienceMoreOption;
