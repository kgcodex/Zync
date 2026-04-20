export type LoginSigninFormProps = {
  title: 'Log in' | 'Sign in';
  onSubmit: () => void;
  children: React.ReactNode;
};

export type OverlayProps = {
  login_signin?: 'login' | 'signin';
};

export type DockButtonProps = {
  icon: React.ComponentType<{ className?: string }>;
  altIcon: React.ComponentType<{ className?: string }>;
  active: boolean;
  className?: string;
  onClick: () => void;
};

export type DockProps = {
  cameraOn: boolean;
  micOn: boolean;
  screenOn: boolean;
  chatOn: boolean;
  onToggleCamera: () => void;
  onToggleMic: () => void;
  onToggleScreen: () => void;
  onToggleChat: () => void;
};

export type Participant = {
  userId: string;
  username: string;
};

export type SignalPayload = {
  to: string;
  from: string;
  signal: any;
};

export type UseWebRTCProps = {
  socket: any;
  meetingCode: string;
  localStreamRef: React.MutableRefObject<MediaStream | null>;
};

export type Peer = {
  pc: RTCPeerConnection;
  stream: MediaStream;
  name?: string;
};

export type User = {
  socketId: string;
  userId: string;
  username: string;
  name: string;
};

export type UserDetails = {
  name: string | null;
  username: string | null;
  profilePic: string | undefined;
};

export type Meeting = {
  _id: string;
  meetingCode: string;
  startTime: Date;
  endTime: Date;
};

export type ChatBubbleProps = {
  avatarURL: string | undefined;
  username: string | null;
  message: string;
  type: 'send' | 'receive';
};

export type Message = {
  from: string;
  name: string;
  username: string;
  profilePic: string | undefined;
  text: string;
  timestamp: number;
};

export type ChatProps = {
  socket: Socket | null;
  meetingCode: string;
};
