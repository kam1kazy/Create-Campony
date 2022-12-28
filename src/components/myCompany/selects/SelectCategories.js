import React, { useRef, useEffect } from 'react'
import { useTheme } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'

import ChipTagsCircle from './chips/ChipTagsCircle'

import {
  Box,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Chip,
} from '@mui/material'

// ICONS
import CancelIcon from '@mui/icons-material/Cancel'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'

import {
  selectedProductsSelector,
  selectedCategoriesSelector,
  productListSelector,
} from '../../../redux/selectors'

// Slices
import {
  addCategories,
  removeCategories,
  resetCategories,
  deleteChipCategory,
} from '../../../redux/slice/selectedCategories'
import {
  removeProduct,
  removeProductList,
  setProductsList,
  resetProducts,
  resetProductsList,
} from '../../../redux/slice/productsSlice'

// Стили выпадающего списка
const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

// Стили выбранного Select
function getStyles(name, groupName) {
  return {
    color: groupName.indexOf(name) === -1 ? null : '#fa7d47',
  }
}

export default function SelectCategories({ label, data, disabled }) {
  const theme = useTheme()
  const dispatch = useDispatch()
  const chipTags = useRef(null)

  // USE SELECTOR
  const selectedProductList = useSelector(selectedProductsSelector)
  const selectedCategories = useSelector(selectedCategoriesSelector)
  const productsList = useSelector(productListSelector)

  const groupName = selectedCategories.map((item) => item.name)

  // Select / Delete Categories
  const handleSelectedCategory = (item) => {
    if (!selectedCategories.includes(item)) {
      dispatch(addCategories({ item }))
      hadleAddToReducer(item)
    } else {
      dispatch(removeCategories({ item }))
      handleDeleteFromReducer(item)
    }
  }

  const handleDeleteFromReducer = (item) => {
    // Удаляет продукты из "productsList" и "selectedProductList" вместе с категорией
    item.products.forEach(function (product, i) {
      if (selectedProductList.includes(product)) {
        dispatch(removeProduct(product))
      }
      if (productsList.includes(product)) {
        dispatch(removeProductList(product.name))
      }
    })
  }

  const hadleAddToReducer = (item) => {
    // Добавляет список продуктов из категории в reducer "productsList"
    item.products.forEach((item) => {
      if (!productsList.includes(item)) {
        dispatch(setProductsList(item))
      }
    })
  }
  // Delete Chips Categories
  const handleDeleteCategory = (name) => {
    dispatch(deleteChipCategory({ name }))

    selectedProductList.filter((item) => {
      if (item.categories === name) {
        dispatch(removeProduct(item))
      }
    })

    productsList.filter((item) => {
      if (item.categories === name) {
        dispatch(removeProductList(item.name))
      }
    })
  }

  // Reset categories and products
  const handleResetCategory = () => {
    if (selectedCategories.length > 0) {
      dispatch(resetCategories())
      dispatch(resetProducts())
      dispatch(resetProductsList())
    } else {
      // Проходимся по категориям
      data.forEach(function (item, i, arr) {
        dispatch(addCategories({ item }))
        hadleAddToReducer(item)
      })
    }
  }

  return (
    <FormControl margin='dense' sx={{ maxWidth: 470 }} fullWidth={true}>
      <InputLabel id='multiple-chip-label'>{label}</InputLabel>
      <Select
        labelId='multiple-chip-label'
        id='multiple-chip-products'
        multiple
        disabled={disabled}
        MenuProps={MenuProps}
        value={groupName}
        input={<OutlinedInput id='select-multiple-chip' label={label} />}
        renderValue={(selected) => (
          <>
            <Box ref={chipTags}>
              {selected.map((value, index) => {
                if (index < 3) {
                  return (
                    <Chip
                      key={value}
                      label={value}
                      sx={{ zIndex: '2', margin: '0 2px' }}
                      deleteIcon={
                        <CancelIcon
                          onMouseDown={(event) => event.stopPropagation()}
                        />
                      }
                      onDelete={() => handleDeleteCategory(value)}
                    />
                  )
                }
              })}
            </Box>

            {(selectedCategories.length > 3) & (chipTags.current !== null) ? (
              <ChipTagsCircle
                chipTags={chipTags}
                selectedList={selectedCategories}
              />
            ) : null}
          </>
        )}
      >
        <Box>
          <MenuItem
            sx={{
              justifyContent: 'center',
              fontSize: '14px',
              opacity: '.6',
            }}
            onClick={handleResetCategory}
          >
            {selectedCategories.length > 0
              ? '-- Удалить всё --'
              : '-- Добавить всё --'}
          </MenuItem>
          {data.map((item) => {
            return (
              <MenuItem
                key={item.id}
                onClick={() => handleSelectedCategory(item)}
                value={item.name}
                style={getStyles(item.name, groupName, theme)}
              >
                {selectedCategories.includes(item) ? (
                  <CheckRoundedIcon sx={{ pr: 1 }} />
                ) : null}
                {item.name}
              </MenuItem>
            )
          })}
        </Box>
      </Select>
    </FormControl>
  )
}
