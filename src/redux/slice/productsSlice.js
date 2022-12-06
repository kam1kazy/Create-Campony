import { createSlice } from '@reduxjs/toolkit'

const productsSlice = createSlice({
  name: 'Product Data',
  initialState: {
    goods: [],
  },
  reducers: {
    addProduct(state, action) {
      state.goods.push(action.payload.item)
    },
    toggleSelected(state, action) {
      const toggledSelect = state.products.find(
        (item) => item.id === action.payload.item.id
      )
      toggledSelect.active = !toggledSelect.active
    },
    removeProduct(state, action) {
      state.goods = state.goods.filter((item) => item.id !== action.payload.id)
    },
    deleteChipProducts(state, action) {
      state.goods = state.goods.filter(
        (item) => item.categories !== action.payload.name
      )
    },
    resetProducts(state) {
      state.goods = []
    },
  },
})

export const {
  addProduct,
  toggleSelected,
  removeProduct,
  deleteChipProducts,
  resetProducts,
} = productsSlice.actions

export default productsSlice.reducer
