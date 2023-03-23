import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      user = action.payload;
    },
    logout: (state, action) => {
      user = null;
    },
  },
});

export const { login, logout, signup } = user.actions;

export default user.reducer;
