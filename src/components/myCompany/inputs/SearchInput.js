import React from 'react'
import { useSelector } from 'react-redux'

import { Autocomplete, TextField, Box } from '@mui/material'
import { styled, lighten, darken } from '@mui/system'

// SELECTORS
import {
  productListSelector,
  selectedCategoriesSelector,
  selectedProductsSelector,
} from '../../../redux/selectors'

export default function SearchInput() {
  // USE SELECTOR
  const selectedProductList = useSelector(selectedProductsSelector)
  const selectedCategories = useSelector(selectedCategoriesSelector)
  const productsList = useSelector(productListSelector)

  // Выбрать всю всю категорию
  const selectedAllCategory = (categories) => {
    // Счетчик чтобы узнать, весь ли список выбрал
    let count = 0

    categories.products.forEach(function (item, i, arr) {
      if (!selectedProductList.includes(item)) {
        dispatch(addProduct({ item }))
      } else {
        count = count + 1
        // Если длинна массива равна счетчику, значит вся категория выбрана
        if (arr.length === count) {
          arr.forEach(function (item, i) {
            dispatch(removeProduct(item))
          })
        }
      }
    })
  }

  // Стили для группировки списка
  const GroupHeader = styled('div')(({ theme }) => ({
    position: 'sticky',
    top: '-8px',
    padding: '0 16px',
    height: '48px',
    lineHeight: '48px',
    backgroundColor: '#fcfcfc',
  }))

  const GroupItems = styled('ul')({
    padding: 0,
  })

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      limitTags={2}
      id='tags-standard'
      options={productsList}
      groupBy={(product) => product.categories}
      getOptionLabel={(product) => product.name}
      renderInput={(products) => (
        <TextField {...products} label='Предметы' placeholder='Поиск...' />
      )}
      renderGroup={(categories) => (
        <li key={categories.id}>
          <GroupHeader
            onClick={() => selectedAllCategory(categories)}
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <div>{categories.group}</div>
            <div>Добавить всё</div>
          </GroupHeader>

          <GroupItems>{categories.children}</GroupItems>
        </li>
      )}
    />
  )
}
