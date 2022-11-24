import { configureStore } from "@reduxjs/toolkit";
import { goodsApi } from "./goodsApi";
import productsSlice from "./slice/productsSlice";
import companyNameSlice from "./slice/companyNameSlice";
import selectedCategories from "./slice/selectedCategories";

export const store = configureStore({
  reducer: {
    [goodsApi.reducerPath]: goodsApi.reducer,
    productsReducer: productsSlice,
    companyNameReducer: companyNameSlice,
    selectedCategoriesReducer: selectedCategories,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware().concat(goodsApi.middleware),
});
