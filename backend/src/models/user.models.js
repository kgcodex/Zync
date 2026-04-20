import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  sessionToken: { type: String },
  profilePic: {
    data: Buffer,
    contentType: String,
  },
});

const User = mongoose.model('User', userSchema);

export { User };
