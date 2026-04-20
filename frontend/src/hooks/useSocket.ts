import { useEffect, useRef, useState } from 'react';

import { Socket, io } from 'socket.io-client';
import { toast } from 'sonner';

import { SOCKET_URL } from '@/env';
import type { Participant, SignalPayload } from '@/types/types';

export const useSocket = (meetingCode: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [participants, setPartcipants] = useState<Record<string, Participant>>({});

  // Init Socket
  useEffect(() => {
    const s = io(SOCKET_URL, {
      auth: {
        sessionToken: localStorage.getItem('sessionToken'),
      },
      transports: ['websocket'],
    });

    // Listeners
    s.on('connect', () => {
      setSocket(s);
    });

    s.on('join-error', (msg: string) => {
      toast.error(msg);
    });

    s.on('user-joined', ({ socketId, userId, username }) => {
      setPartcipants((prev) => ({
        ...prev,
        [socketId]: { socketId, userId, username },
      }));
      toast.info(`${username} joined the meeting.`);
    });

    s.on('user-left', ({ socketId, userId, username }) => {
      setPartcipants((prev) => {
        const copy = { ...prev };
        delete copy[socketId];
        return copy;
      });
      toast.info(`${username} left the meeting.`);
    });

    return () => {
      s.disconnect();
    };
  }, [meetingCode]);

  // Actions
  const joinMeeting = () => {
    socket?.emit('join-meeting', { meetingCode });
  };

  return {
    socket,
    participants,
    joinMeeting,
  };
};
