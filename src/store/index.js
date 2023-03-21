import { configureStore } from '@reduxjs/toolkit';

import sites from './slices/sites';
import loggerMiddleware from './middleware/logger';
import fetchSitesMiddleware from './middleware/fetchSitesMiddleware';
import preprocessMiddleware from './middleware/preprocessMiddleware';
const store = configureStore({
  reducer: {
    sites,
  },

  middleware: [loggerMiddleware, fetchSitesMiddleware, preprocessMiddleware],
});

export default store;
