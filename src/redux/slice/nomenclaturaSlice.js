import { createSlice } from '@reduxjs/toolkit'

const nomenclaturaSlice = createSlice({
  name: 'Step',
  initialState: {
    array: [],
  },
  reducers: {
    setNomenclatura(state, action) {
      state.array = action.payload
    },
    resetNomenclatura(state) {
      state.array = []
    },
  },
})

export const { setNomenclatura, resetNomenclatura } = nomenclaturaSlice.actions

export default nomenclaturaSlice.reducer
