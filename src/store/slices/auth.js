import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const initialState = {
  user: null,
  token: null,
  clientId: null,
  isLoggedIn: false,
  loginFail: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      if (!action.error) {
        state.user = action.payload.username;
        state.token = action.payload.token;
        state.clientId = action.payload.clientId;
        state.isLoggedIn = true;
        state.loginFail = false;
      } else {
        state.loginFail = true;
      }
    },

    setUser: (state, action) => {
      if (action.payload) {
        state.user = action.payload.username;
        state.token = action.payload.token;
        state.clientId = action.payload.clientId;
        state.isLoggedIn = true;
      }
    },
    signup: (state, action) => {
      state.user = action.payload.username;
      state.token = action.payload.token;
      state.clientId = action.payload.clientId;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.clientId = null;
      state.isLoggedIn = false;
      state.loginFail = false;
      cookies.remove('session_token');
      cookies.remove('session_username');
      window.location.reload();
    },
  },
});

export const { login, setUser, logout, signup } = authSlice.actions;

export default authSlice.reducer;
