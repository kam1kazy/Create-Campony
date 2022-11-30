import { createSlice } from "@reduxjs/toolkit";

const stepCount = createSlice({
  name: "Step",
  initialState: {
    step: null,
  },
  reducers: {
    nextStep(state, action) {
      console.log(action.payload);
      state.step = action.payload;
    },
    lastStep(state, action) {
      state.step = state.step - 1;
    },
  },
});

export const { nextStep, lastStep } = stepCount.actions;

export default stepCount.reducer;
