import { createSlice } from '@reduxjs/toolkit'

const selectedCategoriesSlice = createSlice({
  name: 'Selected Categories',
  initialState: {
    categories: [],
  },
  reducers: {
    addCategories(state, action) {
      state.categories.push(action.payload.item)
    },
    toggleActive(state, action) {
      const toggledActive = state.categories.find(
        (item) => item.id === action.payload.item.id
      )
      toggledActive.active = !toggledActive.active
    },
    removeCategories(state, action) {
      state.categories = state.categories.filter(
        (item) => item.name !== action.payload.item.name
      )
    },
    resetCategories(state) {
      state.categories = []
    },
  },
})

export const {
  addCategories,
  toggleActive,
  removeCategories,
  resetCategories,
} = selectedCategoriesSlice.actions

export default selectedCategoriesSlice.reducer
