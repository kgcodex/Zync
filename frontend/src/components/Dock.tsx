import { useNavigate } from 'react-router-dom';

import {
  Camera,
  CameraOff,
  HeadphoneOff,
  Headphones,
  MessageSquare,
  MessageSquareOff,
  ScreenShare,
  ScreenShareOff,
  X,
} from 'lucide-react';
import { toast } from 'sonner';

import type { DockButtonProps, DockProps } from '@/types/types';

import { Button } from './ui/button';

const DockButton = ({
  icon: Icon,
  altIcon: AltIcon,
  active,
  className,
  onClick,
}: DockButtonProps) => {
  return (
    <Button
      className="size-15 rounded-2xl items-center justify-center border-0"
      onClick={onClick}
      variant={active ? 'outline' : 'default'}
    >
      {active ? <Icon className={className} /> : <AltIcon className={className} />}
    </Button>
  );
};

const Dock = ({
  cameraOn,
  micOn,
  screenOn,
  chatOn,
  onToggleCamera,
  onToggleMic,
  onToggleScreen,
  onToggleChat,
}: DockProps) => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2  mb-8 flex items-center justify-around gap-6">
      <DockButton
        icon={CameraOff}
        altIcon={Camera}
        active={cameraOn}
        onClick={onToggleCamera}
        className="size-8 "
      />
      <DockButton
        icon={HeadphoneOff}
        altIcon={Headphones}
        active={micOn}
        onClick={onToggleMic}
        className="size-8"
      />
      <DockButton
        icon={ScreenShareOff}
        altIcon={ScreenShare}
        active={screenOn}
        onClick={onToggleScreen}
        className="size-8"
      />
      <DockButton
        icon={MessageSquareOff}
        altIcon={MessageSquare}
        active={chatOn}
        onClick={onToggleChat}
        className="size-8"
      />
      <Button
        className="size-15 rounded-2xl items-center justify-center border-0 bg-red-600 hover:bg-red-700"
        onClick={() => {
          toast.success('Meeting Ends.');
          setTimeout(() => {
            navigate('/meeting');
          }, 500);
        }}
      >
        <X className="size-8" />
      </Button>
    </div>
  );
};

export default Dock;
