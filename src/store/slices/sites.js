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
      state.sites = [...action.payload.sites];
      state.dailyTotals = [...action.payload.dailyTotals];
    },
  },
});

export const { getAllSites } = sites.actions;

export default sites.reducer;
