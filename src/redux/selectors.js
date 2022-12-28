export const companyNameSelector = (state) => state.companyNameReducer.name
export const selectedProductsSelector = (state) =>
  state.productsReducer.goodsSelected
export const productListSelector = (state) => state.productsReducer.goodsList
export const selectedCategoriesSelector = (state) =>
  state.selectedCategoriesReducer.categories
export const nomenclaturaSelector = (state) => state.nomenclaturaReducer.array
export const stepCountSelector = (state) => state.stepCountReducer.step
export const getDeleteProductRef = (state) =>
  state.productsReducer.deleteProductRef
