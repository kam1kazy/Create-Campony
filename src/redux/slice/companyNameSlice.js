import { createSlice } from '@reduxjs/toolkit'

const companyNameSlice = createSlice({
  name: 'Company Name',
  initialState: {
    name: '',
  },
  reducers: {
    changeName(state, action) {
      state.name = action.payload
    },
    resetName(state, action) {
      state.name = ''
    },
  },
})

export const { changeName, resetName } = companyNameSlice.actions

export default companyNameSlice.reducer
