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
    <div className="flex flex-row justify-center items-center mt-20 ">
      <div className="flex flex-col lg:w-[50%] w-[80%] gap-6 px-4">
        <h1 className="text-4xl">Your Meetings</h1>
        <div className="flex flex-row justify-between items-end">
          <div className="flex flex-row justify-center items-start gap-4">
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
            <h1 className="text-3xl">{user.name}</h1>
          </div>
          <CreateMeeting />
        </div>

        {/* Meetings  */}
        <ShowMeetings />
      </div>
    </div>
  );
};

export default MeetingDashboard;
