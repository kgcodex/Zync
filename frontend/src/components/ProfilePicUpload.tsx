import { type ChangeEvent, useEffect, useRef } from 'react';

import imageCompression, { type Options } from 'browser-image-compression';
import { ImagePlus } from 'lucide-react';
import { toast } from 'sonner';

import api from '@/api';
import { useAppDispatch } from '@/store/hooks';
import { updateProfilePic } from '@/store/userSlice';

const compressionConfig: Options = {
  maxSizeMB: 0.5,
  maxWidthOrHeight: 512,
  useWebWorker: true,
  fileType: 'image/webp',
};

const ProfilePicUpload = () => {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasOpened = useRef(false);

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const compressedFile = await imageCompression(file, compressionConfig);

    const formData = new FormData();
    formData.append('avatar', compressedFile, compressedFile.name);

    try {
      const response = await api.post('users/addAvatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success(response.data?.message);

      dispatch(updateProfilePic(response.data?.profilePic));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (fileInputRef.current && !hasOpened.current) {
      fileInputRef.current.click();
      hasOpened.current = true;
    }
  }, []);
  return (
    <div
      className="absolute text-lg -bottom-2 -right-2 rounded-full p-2 bg-background size-10 border-2 border-border group-hover:visible invisible"
      onClick={(event) => event.stopPropagation()}
    >
      <ImagePlus />
      <input
        type="file"
        ref={fileInputRef}
        accept="image/png, image/jpeg"
        className=" size-10 cursor-pointer opacity-0 absolute -bottom-2 -right-2"
        onChange={handleImageUpload}
      />
    </div>
  );
};

export default ProfilePicUpload;
