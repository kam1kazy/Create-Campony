import { createSlice } from "@reduxjs/toolkit";

const companyNameSlice = createSlice({
  name: "Company Name",
  initialState: {
    name: "",
  },
  reducers: {
    changeName(state, action) {
      state.name = action.payload;
    },
  },
});

export const { changeName } = companyNameSlice.actions;

export default companyNameSlice.reducer;
