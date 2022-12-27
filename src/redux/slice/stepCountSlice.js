import { createSlice } from '@reduxjs/toolkit'

const stepCountSlice = createSlice({
  name: 'Step',
  initialState: {
    step: 0,
  },
  reducers: {
    firstStep(state, action) {
      state.step = 0
    },
    nextStep(state, action) {
      state.step = state.step + 1
    },
    backStep(state, action) {
      state.step = state.step - 1
    },
  },
})

export const { nextStep, backStep, firstStep } = stepCountSlice.actions

export default stepCountSlice.reducer
