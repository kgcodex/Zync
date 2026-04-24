import { Suspense, lazy, useState } from 'react';

import { Pencil } from 'lucide-react';

import CreateMeeting from '@/components/CreateMeeting';
import ShowMeetings from '@/components/ShowMeetings';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAppSelector } from '@/store/hooks';

const ProfilePicUpload = lazy(() => import('@/components/ProfilePicUpload'));

const MeetingDashboard = () => {
  const user = useAppSelector((state) => state.user);
  const [showUpload, setShowUpload] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-6 mt-20 mx-10 lg:mx-[20%]">
        <h1 className="lg:text-4xl text-3xl mb-6">Your Meetings</h1>
        <div className="flex flex-row items-center gap-8">
          <div
            className="group relative size-28 rounded-2xl cursor-pointer"
            onClick={() => {
              if (!showUpload) setShowUpload(true);
            }}
          >
            <Avatar className="absolute inset-0 size-28 rounded-2xl">
              <AvatarImage src={user.profilePic} className="rounded-2xl object-cover" />
              <AvatarFallback className="rounded-2xl text-2xl font-bold">
                {`${user.name?.toUpperCase()[0]}` || 'User'}
              </AvatarFallback>
            </Avatar>

            {/* Add Avatar  */}
            {showUpload ? (
              <Suspense
                fallback={
                  <div className="absolute -bottom-2 -right-2 size-10 animate-pulse bg-muted rounded-full" />
                }
              >
                <ProfilePicUpload />
              </Suspense>
            ) : (
              <div className="absolute -bottom-2 -right-2 rounded-full p-2 bg-background border-2 border-border group-hover:flex hidden">
                <Pencil size={16} />
              </div>
            )}
          </div>

          <div className="flex flex-col w-full justify-start gap-4">
            <h1 className="text-3xl ml-2">{user.name}</h1>
            <div className=" ml-auto shrink-0 ">
              <CreateMeeting />
            </div>
          </div>
        </div>
        {/* Meetings  */}
        <ShowMeetings />
      </div>
    </>
  );
};

export default MeetingDashboard;
