import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.username;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    setUser: (state, action) => {
      console.log(action.payload);
      state.user = action.payload.username;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    signup: (state, action) => {
      state.user = action.payload.username;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export const { login, setUser, logout, signup } = authSlice.actions;

export default authSlice.reducer;
