import { createSlice } from '@reduxjs/toolkit'

const productsSlice = createSlice({
  name: 'Product Data',
  initialState: {
    goodsSelected: [],
    goodsList: [],
  },
  reducers: {
    addProduct(state, action) {
      if (state.goodsSelected.length < 50) {
        state.goodsSelected.unshift(action.payload.item)
      } else {
        alert('Добавлено максимальное число товаров!')
      }
    },
    setProductsList(state, action) {
      state.goodsList.unshift(action.payload)
    },
    toggleSelected(state, action) {
      const toggledSelect = state.products.find(
        (item) => item.id === action.payload.item.id
      )
      toggledSelect.active = !toggledSelect.active
    },
    removeGroupSelectedProduct(state, action) {
      state.goodsSelected = state.goodsSelected.filter(
        (item) => item.name !== action.payload
      )
    },
    removeProduct(state, action) {
      state.goodsSelected = state.goodsSelected.filter(
        (item) => item.id !== action.payload.id
      )
    },
    deleteChipProducts(state, action) {
      state.goodsSelected = state.goodsSelected.filter(
        (item) => item.categories !== action.payload.name
      )
    },
    resetProducts(state) {
      state.goodsSelected = []
    },
    resetProductsList(state) {
      state.goodsList = []
    },
  },
})

export const {
  addProduct,
  toggleSelected,
  removeProduct,
  deleteChipProducts,
  resetProducts,
  setProductsList,
  resetProductsList,
  removeGroupSelectedProduct,
} = productsSlice.actions

export default productsSlice.reducer
