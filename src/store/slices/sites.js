import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sites: [],
  dailyTotals: [],
};

const sites = createSlice({
  name: 'sites',
  initialState,
  reducers: {
    getAllSites: (state, action) => {
      if (action.payload?.sites) {
        state.sites = [...action.payload.sites];
        state.dailyTotals = [...action.payload.dailyTotals];
      }
    },
    clearData: (state, action) => {
      state.sites = [];
      state.dailyTotals = [];
    },
  },
});

export const { getAllSites, clearData } = sites.actions;

export default sites.reducer;
