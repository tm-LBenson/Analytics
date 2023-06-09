import { configureStore } from '@reduxjs/toolkit';

import sites from './slices/sites';
import loggerMiddleware from './middleware/logger';
import fetchSitesMiddleware from './middleware/fetchSitesMiddleware';
import preprocessMiddleware from './middleware/preprocessMiddleware';
import dateIndex from './slices/dateIndex';
import auth from './slices/auth';
import signupMiddleware from './middleware/signupMiddleware';
import loginMiddleware from './middleware/loginMiddleware';
import checkSessionCookieMiddleware from './middleware/checkSessionCookieMiddleware';
const store = configureStore({
  reducer: {
    sites,
    dateIndex,
    auth,
  },

  middleware: [
    checkSessionCookieMiddleware,
    signupMiddleware,
    loginMiddleware,
    fetchSitesMiddleware,
    preprocessMiddleware,
  ],
});

export default store;
