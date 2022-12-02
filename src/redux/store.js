import { configureStore } from '@reduxjs/toolkit'
import { goodsApi } from './goodsApi'
import productsSlice from './slice/productsSlice'
import companyNameSlice from './slice/companyNameSlice'
import selectedCategories from './slice/selectedCategories'
import stepCount from './slice/stepCount'

export const store = configureStore({
  reducer: {
    [goodsApi.reducerPath]: goodsApi.reducer,
    productsReducer: productsSlice,
    companyNameReducer: companyNameSlice,
    selectedCategoriesReducer: selectedCategories,
    stepCountReducer: stepCount,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware().concat(goodsApi.middleware),
})
