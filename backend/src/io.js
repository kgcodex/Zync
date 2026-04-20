import { Server } from 'socket.io';
import cookie from 'cookie';
import { User } from './models/user.models.js';
import { Meeting } from './models/meeting.models.js';
import { ENV } from './config/env.js';

export const initializeSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: ENV.FRONTEND_URL,
      credentials: true,
    },
  });

  // Auth Middleware
  io.use(async (socket, next) => {
    try {
      const sessionToken = cookie.parse(socket.request.headers.cookie).sessionToken;

      if (!sessionToken) {
        return next(new Error('Authentication required'));
      }

      const user = await User.findOne({ sessionToken });
      if (!user) {
        return next(new Error('Invalid session'));
      }

      socket.data.userId = user._id.toString();
      socket.data.name = user.name;
      socket.data.username = user.username;

      let profilePicData = null;
      if (user.profilePic && user.profilePic.data) {
        const base64 = user.profilePic.data.toString('base64');
        profilePicData = `data:${user.profilePic.contentType};base64,${base64}`;
      }
      socket.data.profilePic = profilePicData;

      next();
    } catch (err) {
      next(new Error('Authentication Failed'));
    }
  });

  // Connection Handler
  io.on('connection', (socket) => {
    socket.on('join-meeting', async ({ meetingCode }) => {
      try {
        if (!meetingCode) return;

        const meeting = await Meeting.findOne({ meetingCode });
        if (!meeting) {
          socket.emit('join-error', 'Meeting not found');
          return;
        }

        // Existing Users
        const userInMeeting = await io.in(meetingCode).fetchSockets();

        const existingUsers = userInMeeting
          .filter((existingUser) => existingUser.data.userId !== socket.data.userId)
          .map((existingUser) => ({
            socketId: existingUser.id,
            userId: existingUser.data.userId,
            username: existingUser.data.username,
            name: existingUser.data.name,
          }));

        // Join Room
        socket.join(meetingCode);

        socket.emit('existing-users', existingUsers);

        // Notify Others
        socket.to(meetingCode).emit('user-joined', {
          socketId: socket.id,
          userId: socket.data.userId,
          username: socket.data.username,
        });
      } catch (err) {
        console.log(err);
        socket.emit('join-error', 'Unable to join meeting.');
      }
    });

    socket.on('disconnecting', () => {
      socket.rooms.forEach((roomId) => {
        if (roomId !== socket.id) {
          socket.to(roomId).emit('user-left', {
            socketId: socket.id,
            userId: socket.data.userId,
            username: socket.data.username,
          });
        }
      });
    });

    socket.on('signal', ({ meetingCode, signal }) => {
      if (!meetingCode || !signal || !signal.to) return;

      io.to(signal.to).emit('signal', {
        from: socket.id,
        name: socket.data.name,
        signal,
      });
    });

    socket.on('chat-message', ({ meetingCode, text }) => {
      if (!meetingCode || !text) return;

      const message = {
        from: socket.data.userId,
        name: socket.data.name,
        username: socket.data.username,
        profilePic: socket.data.profilePic,
        text,
        timestamp: Date.now(),
      };

      io.to(meetingCode).emit('chat-message', message);
    });
  });

  return io;
};
