import { configureStore } from '@reduxjs/toolkit'
import { goodsApi } from './goodsApi'

// Slices
import productsSlice from './slice/productsSlice'
import companyNameSlice from './slice/companyNameSlice'
import selectedCategoriesSlice from './slice/selectedCategories'
import stepCountSlice from './slice/stepCountSlice'
import nomenclaturaSlice from './slice/nomenclaturaSlice'

export const store = configureStore({
  reducer: {
    [goodsApi.reducerPath]: goodsApi.reducer,
    productsReducer: productsSlice,
    companyNameReducer: companyNameSlice,
    selectedCategoriesReducer: selectedCategoriesSlice,
    stepCountReducer: stepCountSlice,
    nomenclaturaReducer: nomenclaturaSlice,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware().concat(goodsApi.middleware),
})
