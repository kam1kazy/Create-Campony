import React, { useEffect, useRef } from 'react'
import { useTheme } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'

import ChipTagsCircle from './chips/ChipTagsCircle'

// SLICES
import {
  addProduct,
  removeProduct,
  deleteChipProducts,
  setProductsList,
} from '../../../redux/slice/productsSlice'

// SELECTORS
import {
  selectedProductsSelector,
  selectedCategoriesSelector,
  productListSelector,
} from '../../../redux/selectors'

// MUI Components
import {
  Box,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Chip,
  FormHelperText,
  ListSubheader,
  CardMedia,
  Typography,
} from '@mui/material'

// ICONS
import CancelIcon from '@mui/icons-material/Cancel'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'

// Стили выпадающего списка
const ITEM_HEIGHT = 48
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 7.5,
      width: 450,
    },
  },
}

// Здесь задается цвет выбранной категории
function getStyles(name, groupName) {
  return {
    color: groupName.indexOf(name) === -1 ? null : '#fa7d47',
  }
}

export default function SelectProducts({ label, helperText }) {
  const theme = useTheme()
  const dispatch = useDispatch()
  const chipTags = useRef(null)

  // USE SELECTOR
  const selectedProductList = useSelector(selectedProductsSelector)
  const selectedCategories = useSelector(selectedCategoriesSelector)
  const productsList = useSelector(productListSelector)

  // Chips - выбранные категории в Input Select, имя в овальном блоке
  const groupName = selectedProductList.map((item) => item.name)

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

  // Выбрать всю всю категорию
  const selectedAllCategory = (item) => {
    // Счетчик чтобы узнать, весь ли список выбрал
    let count = 0

    item.products.forEach(function (item, i, arr) {
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
    <FormControl sx={{ m: 1, maxWidth: 470 }} fullWidth={true}>
      <InputLabel id='multiple-chip-label'>{label}</InputLabel>
      <Select
        labelId='multiple-chip-label'
        id='multiple-chip'
        multiple
        value={groupName}
        input={<OutlinedInput id='select-multiple-chip' label={label} />}
        MenuProps={MenuProps}
        disabled={selectedCategories.length === 0 ? true : false}
        renderValue={(selected) => (
          <>
            <Box ref={chipTags}>
              {groupName.map((value, index) => {
                if (index < 3) {
                  return (
                    <Chip
                      key={value}
                      label={value}
                      sx={{ zIndex: '1', margin: '0 2px' }}
                      deleteIcon={
                        <CancelIcon
                          onMouseDown={(event) => event.stopPropagation()}
                        />
                      }
                      onDelete={() => handleDeleteChip(value)}
                    />
                  )
                }
              })}
            </Box>

            {(selectedProductList.length > 3) & (chipTags.current !== null) ? (
              <ChipTagsCircle
                chipTags={chipTags}
                selectedList={selectedProductList}
              />
            ) : null}
          </>
        )}
      >
        {/* Рендер категорий, внутри них уже рендер продуктов */}
        {selectedCategories.map((item, id) => {
          {
            /* Проверка ниже, нужна чтобы переключать текст "Добавить всё/Удалить всё" */
          }
          let count = 0
          let boolean = false

          selectedCategories[id].products.forEach(function (product, id, arr) {
            if (selectedProductList.includes(product)) {
              count++
            }
            if (arr.length === count) {
              boolean = true
            }
          })

          return (
            <Box key={item.id} sx={{ borderBottom: '1px solid #e9ecf1' }}>
              {/* ListSubheader  -  это имя категории в списке */}
              <ListSubheader
                sx={[
                  {
                    display: 'flex',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    zIndex: '2',
                    backgroundColor: '#fcfcfc',
                    '&:hover': { backgroundColor: 'rgb(249 249 249)' },
                  },
                ]}
                onClick={() => selectedAllCategory(item)}
              >
                <span>{item.name}</span>

                <span>{boolean ? 'Удалить всё' : 'Добавить всё'}</span>
              </ListSubheader>

              {/* Здесь рендерит список доступных продукций в категории */}
              {item.products.map((item) => {
                return (
                  <MenuItem
                    key={item.id}
                    onClick={() => handleSelectProduct(item)}
                    value={item.name}
                    style={getStyles(item.name, groupName, theme)}
                    sx={{
                      flexFlow: 'row',
                      alignItems: 'center',
                      pt: 1,
                    }}
                  >
                    {selectedProductList.includes(item) ? (
                      <CheckRoundedIcon sx={{ pr: 1 }} />
                    ) : null}
                    <CardMedia
                      component='img'
                      image={item.image}
                      alt={item.name}
                      sx={{
                        objectFit: 'contain',
                        maxWidth: '60px',
                        maxHeight: '60px',
                        mr: 2,
                      }}
                    />
                    <Box
                      sx={{
                        justifyContent: 'space-between',
                        display: 'flex',
                        width: '100%',
                      }}
                    >
                      <Box>
                        <Typography variant='p' sx={{ mb: 1 }}>
                          {item.name}
                        </Typography>
                        <Typography
                          variant='caption'
                          display='block'
                          color='text.secondary'
                        >
                          {item.categories}
                        </Typography>
                      </Box>
                      <Typography variant='caption'>№{item.id}</Typography>
                    </Box>
                  </MenuItem>
                )
              })}
            </Box>
          )
        })}
      </Select>
      {helperText ? (
        <FormHelperText sx={{ mt: 2 }}>
          Выберите от 1 до 50 предметов
        </FormHelperText>
      ) : null}
    </FormControl>
  )
}
