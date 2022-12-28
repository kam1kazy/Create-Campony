import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Autocomplete, TextField, Box, Chip } from '@mui/material'
import { styled } from '@mui/system'

import ChipTagsCircle from '../selects/chips/ChipTagsCircle'

// SELECTORS
import {
  productListSelector,
  selectedCategoriesSelector,
  selectedProductsSelector,
  getDeleteProductId,
} from '../../../redux/selectors'

// SLICES
import {
  addProduct,
  removeProduct,
  removeGroupSelectedProduct,
  setProductsSelectedList,
} from '../../../redux/slice/productsSlice'

// ICONS
import CancelIcon from '@mui/icons-material/Cancel'

export default function SearchInput() {
  const dispatch = useDispatch()
  const chipTags = useRef(null)
  const deleteRef = useRef(null)

  // USE SELECTOR
  const selectedProductList = useSelector(selectedProductsSelector)
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

    categories.children.forEach(function (item, i, arr) {
      let product = productsList.find((product) => product.name === item.key)

      if (!selectedProductList.includes(product)) {
        dispatch(addProduct({ product }))
      } else {
        count = count + 1
        // Если длинна массива равна счетчику, значит вся категория выбрана
        if (arr.length === count) {
          arr.forEach(function (item, i) {
            dispatch(removeGroupSelectedProduct(item.key))
          })
        }
      }
    })
  }

  // Delete / Selected product
  const setSelectProducts = (_, value, __) => {
    dispatch(setProductsSelectedList(value))
  }

  // Delete Chips Categories
  const deleteSelectProducts = (value, tagProps) => {
    const deleteFnRefObj = {}
    value.forEach((tag, index) => {
      deleteFnRefObj[index] = tagProps({ index }).onDelete
    })

    deleteRef.current = deleteFnRefObj

    return selectedProductList.map((product) => {
      return (
        <Chip
          key={product.name}
          label={product.name}
          sx={{ zIndex: '2', margin: '0 2px' }}
          deleteIcon={
            <CancelIcon onMouseDown={(event) => event.stopPropagation()} />
          }
          onDelete={() => handleDeleteItem(product)}
        />
      )
    })
  }

  // Delete selected product
  const handleDeleteItem = (product) => {
    console.log(product)

    const id = selectedProductList.findIndex((e) => e.name === product.name)

    console.log('id: ' + id)

    deleteRef.current[id]()

    if (!selectedProductList.includes(product.id)) {
      dispatch(removeProduct(product))
    }
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <Autocomplete
        ref={chipTags}
        multiple
        disableClearable
        disableCloseOnSelect
        id='tags-standard'
        options={productsList}
        onChange={setSelectProducts}
        renderTags={deleteSelectProducts}
        groupBy={(product) => product.categories}
        getOptionLabel={(product) => product.name}
        renderInput={(products) => (
          <TextField {...products} label='Предметы' placeholder='Поиск...' />
        )}
        renderGroup={(categories) => {
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
      {(selectedProductList.length > 3) & (chipTags.current !== null) ? (
        <ChipTagsCircle selectedList={selectedProductList} />
      ) : null}
    </Box>
  )
}
