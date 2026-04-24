import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import { ENV } from './config/env.js';
import { erroHandler } from './middlewares/error.middlewares.js';
import meetingRouter from './routes/meeting.routes.js';
import userRoutes from './routes/users.routes.js';

const app = express();
// app.set('trust proxy', 1);

app.use(cookieParser());

app.use(
  cors({
    origin: ENV.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json({ limit: '40kb' }));
app.use(express.urlencoded({ limit: '40kb', extended: true }));

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/meeting', meetingRouter);
app.use(erroHandler);

export default app;
