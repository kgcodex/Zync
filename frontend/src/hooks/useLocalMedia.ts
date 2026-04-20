import { useEffect, useRef, useState } from 'react';

import { toast } from 'sonner';

export const useLocalMedia = (videoRef: React.RefObject<HTMLVideoElement | null>) => {
  const localStreamRef = useRef<MediaStream | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);

  const [cameraOn, setCameraOn] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [screenOn, setScreenOn] = useState(false);

  // Init Camera + Mic
  // --------------

  const initMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

      localStreamRef.current = stream;

      setCameraOn(stream.getVideoTracks().length > 0);
      setMicOn(stream.getAudioTracks().length > 0);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.log('Failed to init media:', err);
      toast.error('Failed to start Camera.');
    }
  };

  // Toggle Camera
  // ------------

  const toggleCamera = () => {
    const videoTrack = localStreamRef.current?.getVideoTracks()[0];
    if (!videoTrack) return;

    videoTrack.enabled = !videoTrack.enabled;
    setCameraOn(videoTrack.enabled);
  };

  // Toggle Mic
  // ---------

  const toggleMic = () => {
    const audioTrack = localStreamRef.current?.getAudioTracks()[0];
    if (!audioTrack) return;

    audioTrack.enabled = !audioTrack.enabled;
    setMicOn(audioTrack.enabled);
  };

  // Start Screen Share
  // -----------------

  const startScreenShare = async () => {
    if (screenOn) return;

    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });

      const screenTrack = screenStream.getVideoTracks()[0];
      if (!screenTrack) return;

      const stream = localStreamRef.current;
      if (!stream) return;

      // Remove Camera
      stream.getVideoTracks().forEach((track) => {
        track.stop();
        stream.removeTrack(track);
      });

      // Add Screen
      stream.addTrack(screenTrack);
      screenStreamRef.current = screenStream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setScreenOn(true);
      setCameraOn(true);

      screenTrack.onended = () => {
        stopScreenShare();
      };
    } catch (err) {
      console.log('Screen Share Failed:', err);
      toast.error('Screen Share Failed.');
    }
  };

  // Stop Screen Share
  // ---------------

  const stopScreenShare = async () => {
    if (!screenOn) return;

    screenStreamRef.current?.getTracks().forEach((track) => track.stop());
    screenStreamRef.current = null;

    try {
      const cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
      const cameraTrack = cameraStream.getVideoTracks()[0];

      const stream = localStreamRef.current;
      if (!stream || !cameraTrack) return;

      stream.getVideoTracks().forEach((track) => {
        track.stop();
        stream.removeTrack(track);
      });

      stream.addTrack(cameraTrack);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setScreenOn(false);
      setCameraOn(true);
    } catch (err) {
      console.log('Failed to Restore Camera:', err);
      toast.error('Failed to restore Camera.');
    }
  };

  // Expose Current Video Track
  //------------------------

  const getCurrentVideoTrack = () => {
    return localStreamRef.current?.getVideoTracks()[0] || null;
  };

  useEffect(() => {
    return () => {
      localStreamRef.current?.getTracks().forEach((track) => track.stop());
      screenStreamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return {
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
  };
};
