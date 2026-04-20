import { createSlice } from '@reduxjs/toolkit';

import type { UserDetails } from '@/types/types';

const user: UserDetails = {
  name: null,
  username: null,
  profilePic: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: user,
  reducers: {
    initUser: (state, action) => {
      return action.payload;
    },
    updateProfilePic: (state, action) => {
      state.profilePic = action.payload;
    },
  },
});

export const { initUser, updateProfilePic } = userSlice.actions;

export default userSlice.reducer;
