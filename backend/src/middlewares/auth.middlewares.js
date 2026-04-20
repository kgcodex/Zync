import httpStatus from 'http-status';
import { User } from '../models/user.models.js';
import ApiError from '../utils/apiError.utils.js';

export const userAuth = async (req, res, next) => {
  const sessionToken = req.headers?.authorization?.split(' ')[1];

  if (!sessionToken) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No Session Token Found.');
  }

  const user = await User.findOne({ sessionToken });

  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'No User Found');
  }

  req.user = user;
  next();
};
