export const companyNameSelector = (state) => state.companyNameReducer.name
export const productListSelector = (state) => state.productsReducer.goods
export const selectedCategoriesSelector = (state) =>
  state.selectedCategoriesReducer.categories
export const nomenclaturaSelector = (state) => state.nomenclaturaReducer.array
export const stepCountSelector = (state) => state.stepCountReducer.step
