import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import AgoraUIKit from 'agora-react-uikit';
import { format, isAfter, isBefore } from 'date-fns';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import AvatarWithFallback from '@/components/ui/avatar-with-fallback.tsx';
import { Button } from '@/components/ui/button.tsx';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import FullPageLoading from '@/components/ui/full-page-loading.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { getMinuteHour } from '@/lib/utils.ts';
import { useMe } from '@/services/queries/auth.ts';
import { useGetSessionRegister } from '@/services/queries/session-register.ts';

export function getUrlParams(url = window.location.href) {
  const urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

const SessionRegisterPage = () => {
  const [isVideoCall, setIsVideoCall] = useState(false);

  const { sessionId } = useParams();

  const { data: user, isLoading: userLoading } = useMe();

  const { data: sessionRegister, isLoading } = useGetSessionRegister(
    +sessionId!,
  );

  if (isLoading || userLoading)
    return <FullPageLoading className={'h-full w-full'} />;
  if (!sessionRegister) return <div>Không tìm thấy phiên</div>;
  if (
    sessionRegister.status === 'rejected' ||
    sessionRegister.status === 'pending'
  ) {
    return <div>Phiên chưa được duyệt</div>;
  }

  if (!user) return <div>Bạn chưa đăng nhập</div>;

  const myMeeting = async (element) => {
    const roomID = sessionRegister.session.id.toString();
    // generate Kit Token
    const appID = 1619208624;
    const serverSecret = '8889b723899302941bb657c74c153819';
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      user.id,
      user.name,
    );

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Personal link',
          url:
            window.location.protocol +
            '//' +
            window.location.host +
            window.location.pathname +
            '?roomID=' +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
      },
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{sessionRegister.program.title}</CardTitle>
        </CardHeader>
        <CardContent className={'space-y-4'}>
          <div className={'flex items-center justify-between'}>
            <div className={'flex items-center gap-3'}>
              <AvatarWithFallback user={sessionRegister.program.user} />
              <div className={'flex flex-col'}>
                <h1 className={'text-xl font-semibold'}>
                  {sessionRegister.program.user.name}
                </h1>
                <p>{sessionRegister.program.user.email}</p>
              </div>
            </div>
            <Button onClick={() => setIsVideoCall(true)}>
              Tạo cuộc hội thoại
            </Button>
          </div>
          <Separator />
          <div>
            {isBefore(new Date(), sessionRegister.session?.start) ? (
              <h1>{`Phiên bắt đầu lúc: ${getMinuteHour(
                sessionRegister.session.start,
              )} - ${format(sessionRegister.session.start, 'dd/MM/yyyy')}`}</h1>
            ) : null}

            {isBefore(new Date(), sessionRegister.session?.end) &&
            isBefore(sessionRegister.session.start, new Date()) ? (
              <h1>Phiên đang diễn ra</h1>
            ) : null}

            {isAfter(new Date(), sessionRegister.session?.end) ? (
              <h1>{`Phiên kết thúc lúc: ${getMinuteHour(
                sessionRegister.session.end,
              )} - ${format(sessionRegister.session.end, 'dd/MM/yyyy')}`}</h1>
            ) : null}
          </div>
          <Separator />
          <div className={'flex flex-col gap-2'}>
            <h1 className={'text-xl font-semibold'}>Nội dung</h1>
            <p>{sessionRegister.program.description}</p>
          </div>
        </CardContent>
      </Card>
      {isVideoCall ? (
        <div
          className="myCallContainer"
          ref={myMeeting}
          style={{
            width: '100vw',
            height: '100vh',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        ></div>
      ) : null}
    </>
  );
};

export default SessionRegisterPage;
