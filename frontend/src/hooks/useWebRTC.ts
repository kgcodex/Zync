import { useCallback, useRef, useState } from 'react';

import type { Peer, UseWebRTCProps } from '@/types/types';

export const useWebRTC = ({ socket, meetingCode, localStreamRef }: UseWebRTCProps) => {
  const peersRef = useRef<Record<string, Peer>>({});
  const [, forceUpdate] = useState(0);

  // Create Peer Connection
  //----------------------
  const createPeerConnection = useCallback(
    (peerId: string, name?: string) => {
      if (peersRef.current[peerId]) {
        return peersRef.current[peerId].pc; // reuse existing
      }

      const pc = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
      });

      const remoteStream = new MediaStream();

      pc.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => remoteStream.addTrack(track));
        forceUpdate((n) => n + 1);
      };

      pc.onicecandidate = (event) => {
        if (event.candidate && socket) {
          socket.emit('signal', {
            meetingCode,
            signal: {
              type: 'ice',
              candidate: event.candidate,
              to: peerId,
            },
          });
        }
      };

      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => {
          pc.addTrack(track, localStreamRef.current!);
        });
      }

      peersRef.current[peerId] = {
        pc,
        stream: remoteStream,
        name,
      };

      forceUpdate((n) => n + 1);

      return pc;
    },
    [socket, meetingCode, localStreamRef]
  );

  // Create Offer
  //-------------

  const createOffer = useCallback(
    async (peerId: string, name: string) => {
      const pc = createPeerConnection(peerId, name);

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      socket.emit('signal', {
        meetingCode,
        signal: {
          type: 'offer',
          sdp: offer,
          to: peerId,
        },
      });
    },
    [createPeerConnection, socket, meetingCode]
  );

  // Handle Signal
  // --------------

  const handleSignal = useCallback(
    async ({ from, name, signal }: { from: string; name: string; signal: any }) => {
      let peer = peersRef.current[from];

      if (!peer) {
        createPeerConnection(from, name);
        peer = peersRef.current[from];
      }

      const pc = peer.pc;

      if (signal.type === 'offer') {
        await pc.setRemoteDescription(new RTCSessionDescription(signal.sdp));

        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        socket.emit('signal', {
          meetingCode,
          signal: {
            type: 'answer',
            sdp: answer,
            to: from,
          },
        });
      } else if (signal.type === 'answer') {
        await pc.setRemoteDescription(new RTCSessionDescription(signal.sdp));
      } else if (signal.type === 'ice') {
        await pc
          .addIceCandidate(new RTCIceCandidate(signal.candidate))
          .catch((e) => console.error(e));
      }
    },
    [createPeerConnection, socket, meetingCode]
  );

  // Replace Track
  // ------------
  const replaceVideoTrack = useCallback((newTrack: MediaStreamTrack) => {
    Object.values(peersRef.current).forEach(({ pc }) => {
      const sender = pc.getSenders().find((s) => s.track?.kind === 'video');
      if (sender) sender.replaceTrack(newTrack);
    });
  }, []);

  const removePeer = useCallback((peerId: string) => {
    const peer = peersRef.current[peerId];
    if (peer) {
      // Stop all tracks
      peer.stream.getTracks().forEach((track) => track.stop());

      peer.pc.close();
      delete peersRef.current[peerId];

      forceUpdate((n) => n + 1);
    }
  }, []);

  return {
    peers: peersRef.current,
    createOffer,
    handleSignal,
    replaceVideoTrack,
    removePeer,
  };
};
