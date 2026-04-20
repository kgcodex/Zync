import { User } from '../models/user.models.js';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { compressImage } from '../utils/imageCompress.utils.js';
import ApiError from '../utils/apiError.utils.js';
import { ENV } from '../config/env.js';

const isProd = ENV.ENV === 'prod';

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Please Provide Creditentials');
  }

  const user = await User.findOne({ username });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found.');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid Credentials');
  }

  const sessionToken = crypto.randomBytes(32).toString('hex');
  user.sessionToken = sessionToken;
  await user.save();

  let profilePicData = null;
  if (user.profilePic && user.profilePic.data) {
    const base64 = user.profilePic.data.toString('base64');
    profilePicData = `data:${user.profilePic.contentType};base64,${base64}`;
  }

  res.cookie('sessionToken', sessionToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/',
  });

  return res.status(httpStatus.OK).json({
    name: user.name,
    username: user.username,
    profilePic: profilePicData,
  });
};

const register = async (req, res) => {
  const { name, username, password } = req.body;

  if (!name || !username || !password) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'All fields are required');
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new ApiError(httpStatus.CONFLICT, 'User already exists.');
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name: name,
    username: username,
    password: hashedPassword,
  });

  await newUser.save();

  res.status(httpStatus.CREATED).json({ message: 'User Registered Successfully' });
};

const addAvatar = async (req, res) => {
  const file = req.file;
  const { _id } = req.user;

  if (!file) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Please upload a file.');
  }

  const { compressedBuffer, contentType } = await compressImage(file.buffer, file.size);

  const updatedUser = await User.findOneAndUpdate(
    { _id: _id },
    {
      profilePic: {
        data: compressedBuffer,
        contentType: contentType,
      },
    },
    { new: true }
  );

  if (!updatedUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found.');
  }

  const base64Pic = updatedUser.profilePic.data.toString('base64');
  const imgSrc = `data:${updatedUser.profilePic.contentType};base64,${base64Pic}`;
  res.status(httpStatus.OK).json({ message: 'Avatar added successfully.', profilePic: imgSrc });
};

const getAvatar = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findById(_id);
  if (!user || !user.profilePic || !user.profilePic.data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No image found.');
  }

  res.set('Content-Type', user.profilePic.contentType);
  res.status(httpStatus.OK).send(user.profilePic.data);
};

export { login, register, addAvatar, getAvatar };
