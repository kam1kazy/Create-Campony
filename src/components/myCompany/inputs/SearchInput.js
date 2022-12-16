import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Autocomplete, TextField } from '@mui/material'
import { styled } from '@mui/system'

// SELECTORS
import {
  productListSelector,
  selectedCategoriesSelector,
  selectedProductsSelector,
} from '../../../redux/selectors'

// SLICES
import {
  addProduct,
  removeProduct,
  deleteChipProducts,
  setProductsList,
} from '../../../redux/slice/productsSlice'

export default function SearchInput() {
  const dispatch = useDispatch()
  // USE SELECTOR
  const selectedProductList = useSelector(selectedProductsSelector)
  const selectedCategories = useSelector(selectedCategoriesSelector)
  const productsList = useSelector(productListSelector)

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

  // Delete / Selected product
  const handleSelectProduct = (item) => {
    if (!selectedProductList.includes(item)) {
      dispatch(addProduct({ item }))
    } else {
      dispatch(removeProduct(item))
    }
  }

  // Delete Chips Categories
  const handleDeleteChip = (name) => {
    dispatch(deleteChipProducts({ name }))
  }

  // Когда меняется список выбранных категорий, добавляет все товары из этих категорий в глобальное состояние
  useEffect(() => {
    selectedCategories.forEach((cat) => {
      cat.products.forEach((item) => {
        if (!productsList.includes(item)) {
          dispatch(setProductsList(item))
        }
      })
    })
  }, [selectedCategories])

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
      renderGroup={(categories) => {
        console.log(categories)

        return (
          <li key={categories.key}>
            <GroupHeader
              onClick={() => selectedAllCategory(categories)}
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <div>{categories.group}</div>
              <div>Добавить всё</div>
            </GroupHeader>

            <GroupItems>{categories.children}</GroupItems>
          </li>
        )
      }}
    />
  )
}
