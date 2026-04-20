import { createServer } from 'node:http';

import app from './app.js';
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';
import { initializeSocket } from './io.js';

const server = createServer(app);
const io = initializeSocket(server);

const start = async () => {
  try {
    await connectDB(ENV.MONGODB_CONN_STR);

    server.listen(Number(ENV.PORT), '0.0.0.0', () => {
      console.log(`Server running on ${ENV.PORT}`);
    });
  } catch (err) {
    console.error('Startup failed:', err);
    process.exit(1);
  }
};

start();
