import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { Meeting } from '@/types/types';

const initialState: { meetings: Meeting[] } = {
  meetings: [],
};

export const meetingSlice = createSlice({
  name: 'meetings',
  initialState,
  reducers: {
    setMeetings: (state, action: PayloadAction<Meeting[]>) => {
      state.meetings = action.payload;
    },

    addMeeting: (state, action: PayloadAction<Meeting>) => {
      state.meetings.unshift(action.payload);
    },
  },
});

export const { setMeetings, addMeeting } = meetingSlice.actions;

export default meetingSlice.reducer;
