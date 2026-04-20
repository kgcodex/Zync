import httpStatus from 'http-status';
import { getMeetingCode } from '../utils/meetingCode.utils.js';
import { Meeting } from '../models/meeting.models.js';
import ApiError from '../utils/apiError.utils.js';

const createMeeting = async (req, res) => {
  const { startTime, endTime } = req.body;
  const user = req.user;

  if (!startTime || !endTime) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Start and End times are required');
  }

  const meeting = await Meeting.create({
    user_id: user._id,
    meetingCode: getMeetingCode(),
    startTime,
    endTime,
  });

  return res.status(httpStatus.CREATED).json(meeting);
};

const showMeeting = async (req, res) => {
  const user = req.user;

  const meetings = await Meeting.find({ user_id: user._id }).sort({ date: -1 });
  return res.status(httpStatus.OK).json(meetings);
};

export { createMeeting, showMeeting };
