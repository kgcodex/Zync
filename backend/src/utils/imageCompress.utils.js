import sharp from 'sharp';

const SIZE_THRESHOLD = 500 * 1024; //500KB

export const compressImage = async (buffer, size) => {
  let resultBuffer = buffer;
  const contentType = 'image/webp';

  if (size > SIZE_THRESHOLD) {
    resultBuffer = await sharp(buffer)
      .resize({ width: 256, height: 256, fit: 'cover' })
      .webp({ quality: 80 })
      .toBuffer();
  } else {
    resultBuffer = await sharp(buffer).webp().toBuffer();
  }

  return { compressedBuffer: resultBuffer, contentType };
};
