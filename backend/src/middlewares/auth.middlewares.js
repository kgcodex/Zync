import httpStatus from 'http-status';
import { User } from '../models/user.models.js';
import ApiError from '../utils/apiError.utils.js';

export const userAuth = async (req, res, next) => {
  const sessionToken = req.cookies?.sessionToken;

  if (!sessionToken) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'No Session Token Found.');
  }

  const user = await User.findOne({ sessionToken });

  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'No User Found');
  }

  req.user = user;
  next();
};
