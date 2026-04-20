import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import Chat from '@/components/Chat';
import Dock from '@/components/Dock';
import MeetingGrid from '@/components/MeetingGrid';
import { useLocalMedia } from '@/hooks/useLocalMedia';
import { useSocket } from '@/hooks/useSocket';
import { useWebRTC } from '@/hooks/useWebRTC';
import type { User } from '@/types/types';

const Meeting = () => {
  const { meetingCode } = useParams<string>();
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const [chatOn, setChatOn] = useState(false);

  const {
    cameraOn,
    micOn,
    screenOn,
    initMedia,
    toggleCamera,
    toggleMic,
    startScreenShare,
    stopScreenShare,
    getCurrentVideoTrack,
    localStreamRef,
  } = useLocalMedia(localVideoRef);

  if (!meetingCode) return;

  const { socket, joinMeeting } = useSocket(meetingCode);

  const { peers, createOffer, handleSignal, replaceVideoTrack, removePeer } = useWebRTC({
    socket,
    meetingCode,
    localStreamRef,
  });

  // Init
  useEffect(() => {
    const start = async () => {
      await initMedia();
      joinMeeting();
    };
    if (socket) start();
  }, [socket]);

  // Create offer to existing users
  useEffect(() => {
    if (!socket) return;

    // New User Create Offer
    const handleExistingUsers = (users: User[]) => {
      users.forEach((user) => {
        createOffer(user.socketId, user.name);
      });
    };

    socket.on('existing-users', handleExistingUsers);
    socket.on('signal', handleSignal);
    socket.on('user-left', ({ socketId }) => {
      removePeer(socketId);
    });

    return () => {
      socket.off('existing-users', handleExistingUsers);
      socket.off('signal', handleSignal);
      socket.off('user-left', ({ socketId }) => {
        removePeer(socketId);
      });
    };
  }, [socket, createOffer, handleSignal, removePeer]);

  //  Screen share handler (with track replace)
  const handleScreenToggle = async () => {
    if (screenOn) {
      await stopScreenShare();
    } else {
      await startScreenShare();
    }
    const newTrack = getCurrentVideoTrack();
    if (newTrack) {
      replaceVideoTrack(newTrack);
    }
  };

  return (
    <>
      <div className="flex w-full h-screen">
        <div className="flex-1 min-h-0">
          <MeetingGrid>
            {Object.entries(peers).map(([peerId, peer]) => (
              <div
                key={peerId}
                className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 shadow-xl"
              >
                <video
                  autoPlay
                  muted
                  playsInline
                  ref={(el) => {
                    if (el && el.srcObject !== peer.stream) el.srcObject = peer.stream;
                  }}
                  className="w-full h-full object-cover  "
                />
                <div className="absolute bottom-3 left-3 bg-black/60 px-2 py-1 rounded-lg  text-white text-sm">
                  {peer.name}
                </div>
              </div>
            ))}
          </MeetingGrid>
        </div>

        <div
          className={`relative no-scrollbar ${chatOn ? 'w-108' : 'hidden'} transition-[width] duration-300 ease-in-out h-full  bg-zinc-900 border-l border-white/10 rounded-tl-2xl rounded-bl-2xl`}
        >
          <Chat socket={socket} meetingCode={meetingCode} />
        </div>
      </div>

      {/*  LOCAL VIDEO  */}
      <div className="fixed bottom-28 left-12 h-50 aspect-video rounded-2xl overflow-hidden border-2 border-primary/40 shadow-2xl z-20 bg-muted">
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      {/*  DOCK */}
      <Dock
        cameraOn={cameraOn}
        micOn={micOn}
        screenOn={screenOn}
        chatOn={chatOn}
        onToggleCamera={toggleCamera}
        onToggleMic={toggleMic}
        onToggleScreen={handleScreenToggle}
        onToggleChat={() => setChatOn((prev) => !prev)}
      />
    </>
  );
};

export default Meeting;
