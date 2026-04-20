import express from 'express';
import cors from 'cors';

import userRoutes from './routes/users.routes.js';
import meetingRouter from './routes/meeting.routes.js';
import { erroHandler } from './middlewares/error.middlewares.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '40kb' }));
app.use(express.urlencoded({ limit: '40kb', extended: true }));

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/meeting', meetingRouter);
app.use(erroHandler);

export default app;
