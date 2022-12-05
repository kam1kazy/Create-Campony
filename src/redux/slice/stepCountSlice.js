import { createSlice } from '@reduxjs/toolkit'

const stepCountSlice = createSlice({
  name: 'Step',
  initialState: {
    step: 0,
  },
  reducers: {
    nextStep(state, action) {
      state.step = state.step + 1
    },
    lastStep(state, action) {
      state.step = state.step - 1
    },
  },
})

export const { nextStep, lastStep } = stepCountSlice.actions

export default stepCountSlice.reducer
