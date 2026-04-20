import { Router } from 'express';
import { addAvatar, getAvatar, login, register } from '../controllers/user.controllers.js';
import { upload } from '../middlewares/uploadImage.middlewares.js';
import { userAuth } from '../middlewares/auth.middlewares.js';

const userRouter = Router();

userRouter.route('/login').post(login);
userRouter.route('/register').post(register);
userRouter.route('/addAvatar').post(userAuth, upload.single('avatar'), addAvatar);
userRouter.route('/getAvatar').get(userAuth, getAvatar);

export default userRouter;
