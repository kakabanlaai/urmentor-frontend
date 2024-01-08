import {
  differenceInMinutes,
  format,
  isAfter,
  isBefore,
  isEqual,
} from 'date-fns';
import { addHours } from 'date-fns/addHours';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import { useState } from 'react';
import {
  Calendar,
  Event,
  SlotInfo,
  dateFnsLocalizer,
} from 'react-big-calendar';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import FullPageLoading from '@/components/ui/full-page-loading.tsx';
import { useMe } from '@/services/queries/auth.ts';
import { useCreateSession } from '@/services/queries/session.ts';
import { Role } from '@/types';

const locales = {
  'en-US': enUS,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const SessionPage = () => {
  const { data: user, isLoading: userLoading } = useMe();
  const navigate = useNavigate();

  const [selectedSlot, setSelectedSlot] = useState<Event>();

  const { mutate: create } = useCreateSession();

  if (userLoading) return <FullPageLoading className={'h-full w-full'} />;

  if (!user) return <div>Bạn chưa đăng nhập</div>;

  if (user.role !== Role.Mentor) return <div>Bạn không phải là cố vấn</div>;

  const events = user?.sessions.map((session) => ({
    start: new Date(session.start),
    end: new Date(session.end),
    resource: session,
  }));

  const addNewEvent = (slotInfo: SlotInfo) => {
    setSelectedSlot(undefined);

    if (
      differenceInMinutes(slotInfo.end, slotInfo.start) < 60 ||
      differenceInMinutes(slotInfo.end, slotInfo.start) > 120
    ) {
      toast.error('Bạn chỉ có thể chọn tối thiểu 1 giờ và tối đa 2 giờ');
      return;
    }

    if (
      events?.some((event) => {
        return (
          !(
            isAfter(event.start!, slotInfo.end) ||
            isBefore(event.end!, slotInfo.start)
          ) &&
          !(
            isEqual(event.start!, slotInfo.end) ||
            isEqual(event.end!, slotInfo.start)
          )
        );
      })
    ) {
      toast.error('Thời gian này đã có phiên cố vấn');
      return;
    }

    if (slotInfo.start < addHours(new Date(), 1)) {
      toast.error(
        `Bạn chỉ có thể tạo lịch bắt đầu từ ${format(
          addHours(new Date(), 1),
          'HH:mm',
        )} trở đi`,
      );
      return;
    }

    create(
      {
        start: slotInfo.start,
        end: slotInfo.end,
        userId: +user.id,
      },
      {
        onSuccess: () => {
          toast.success('Tạo phiên thành công');
        },
        onError: () => {
          toast.error('Tạo phiên thất bại');
        },
      },
    );
  };

  // const handleSelectSlot = (event: Event) => {
  //   setSelectedSlot(event);
  // };

  return (
    <div className={'w-full'}>
      <Calendar
        selected={selectedSlot}
        defaultView="week"
        events={events}
        localizer={localizer}
        style={{ height: '100%' }}
        startAccessor="start"
        onSelectEvent={(event) => {
          navigate(`/dashboard/sessions/${event.resource.id}`);
        }}
        onSelectSlot={addNewEvent}
        selectable
        eventPropGetter={(event) => {
          const isSelectedEvent =
            selectedSlot &&
            isEqual(event.end!, selectedSlot.end!) &&
            isEqual(event.start!, selectedSlot.start!);
          return {
            style: {
              backgroundColor: isSelectedEvent ? '#f59e0b' : '#38bdf8',
              border: isSelectedEvent ? '2px solid #facc15' : 'none',
              fontWeight: 'bold',
            },
          };
        }}
      />
    </div>
  );
};

export default SessionPage;
