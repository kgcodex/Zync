import mongoose, { Schema } from 'mongoose';

const meetingSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    meetingCode: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
  },
  { timestamps: true }
);

const Meeting = mongoose.model('Meeting', meetingSchema);

export { Meeting };
