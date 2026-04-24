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
      className="lg:size-15 size-12 lg:rounded-2xl rounded-xl items-center justify-center border-0"
      onClick={onClick}
      variant={active ? 'outline' : 'default'}
    >
      {active ? <Icon className="lg:size-8 size-6" /> : <AltIcon className="lg:size-8 size-6" />}
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
      <DockButton icon={CameraOff} altIcon={Camera} active={cameraOn} onClick={onToggleCamera} />
      <DockButton icon={HeadphoneOff} altIcon={Headphones} active={micOn} onClick={onToggleMic} />
      <DockButton
        icon={ScreenShareOff}
        altIcon={ScreenShare}
        active={screenOn}
        onClick={onToggleScreen}
      />
      <DockButton
        icon={MessageSquareOff}
        altIcon={MessageSquare}
        active={chatOn}
        onClick={onToggleChat}
      />
      <Button
        className="lg:size-15 size-12 lg:rounded-2xl rounded-xl items-center justify-center border-0 bg-red-600 hover:bg-red-700"
        onClick={() => {
          toast.success('Meeting Ends.');
          setTimeout(() => {
            navigate('/meeting');
          }, 500);
        }}
      >
        <X className="lg:size-8 size-6" />
      </Button>
    </div>
  );
};

export default Dock;
