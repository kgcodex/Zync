import { Router } from 'express';
import { createMeeting, showMeeting } from '../controllers/meeting.controllers.js';
import { userAuth } from '../middlewares/auth.middlewares.js';

const meetingRouter = Router();

meetingRouter.route('/create').post(userAuth, createMeeting);
meetingRouter.route('/all').get(userAuth, showMeeting);

export default meetingRouter;
