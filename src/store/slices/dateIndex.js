import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

const dateIndexSlice = createSlice({
  name: 'dateIndex',
  initialState,
  reducers: {
    setDateIndex: (state, action) => {
      state.value = action.payload;
    },
    resetDateIndex: (state) => {
      state.value = 0;
    },
  },
});

export const { setDateIndex, resetDateIndex } = dateIndexSlice.actions;

export default dateIndexSlice.reducer;
