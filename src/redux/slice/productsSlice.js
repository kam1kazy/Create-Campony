import { createSlice } from '@reduxjs/toolkit'

const productsSlice = createSlice({
  name: 'Product Data',
  initialState: {
    clearInputSearch: false,
    deleteProductRef: null,
    goodsSelected: [],
    goodsList: [],
  },
  reducers: {
    addProduct(state, action) {
      if (state.goodsSelected.length < 50) {
        state.goodsSelected.unshift(action.payload)
      } else {
        alert('Добавлено максимальное число товаров!')
      }
    },
    toggleClearInputState(state, action) {
      state.clearInputSearch = action.payload
    },
    setDeleteProductRef(state, action) {
      state.deleteProductRef = action.payload
    },
    setProductsList(state, action) {
      state.goodsList.unshift(action.payload)
    },
    setProductsSelectedList(state, action) {
      state.goodsSelected = action.payload
    },
    toggleSelected(state, action) {
      const toggledSelect = state.products.find(
        (item) => item.id === action.payload.item.id
      )
      toggledSelect.active = !toggledSelect.active
    },
    removeProductList(state, action) {
      state.goodsList = state.goodsList.filter(
        (item) => item.name !== action.payload
      )
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
        (item) => item.name !== action.payload.name
      )
    },
    resetProducts(state) {
      state.goodsSelected = []
      state.clearInputSearch = true
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
  removeProductList,
  removeGroupSelectedProduct,
  setProductsSelectedList,
  setDeleteProductRef,
  toggleClearInputState,
} = productsSlice.actions

export default productsSlice.reducer
