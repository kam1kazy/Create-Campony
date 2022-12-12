import React from 'react'
import { useTheme } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import {
  addProduct,
  removeProduct,
  deleteChipProducts,
} from '../../../redux/slice/productsSlice'
import {
  productListSelector,
  selectedCategoriesSelector,
} from '../../../redux/selectors'

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

  // USE SELECTOR
  const productList = useSelector(productListSelector)
  const selectedCategories = useSelector(selectedCategoriesSelector)

  // Chips - выбранные категории в Input Select, имя в овальном блоке
  const groupName = productList.map((item) => item.name)

  // Delete / Selected product
  const handleSelectProduct = (item) => {
    if (!productList.includes(item)) {
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
    let count = 0

    item.products.forEach(function (item, i, arr) {
      if (!productList.includes(item)) {
        dispatch(addProduct({ item }))
      } else {
        count = count + 1

        if (arr.length === count) {
          arr.forEach(function (item, i) {
            dispatch(removeProduct(item))
          })
        }
      }
    })
  }

  return (
    <FormControl sx={{ m: 1, maxWidth: 450 }} fullWidth={true}>
      <InputLabel id='multiple-chip-label'>{label}</InputLabel>

      <Select
        labelId='multiple-chip-label'
        id='multiple-chip'
        multiple
        value={groupName}
        input={<OutlinedInput id='select-multiple-chip' label={label} />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {groupName.map((value) => (
              <Chip
                key={value}
                label={value}
                sx={{ zIndex: '1' }}
                deleteIcon={
                  <CancelIcon
                    onMouseDown={(event) => event.stopPropagation()}
                  />
                }
                onDelete={() => handleDeleteChip(value)}
              />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
        disabled={selectedCategories.length === 0 ? true : false}
      >
        {/* Рендер категорий, внутри них уже рендер продуктов */}
        {selectedCategories.map((item, id) => {
          {
            /* Проверка ниже, нужна чтобы переключать текст "Добавить всё/Удалить всё" */
          }
          let count = 0
          let boolean = false

          selectedCategories[id].products.forEach(function (product, id, arr) {
            if (productList.includes(product)) {
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
                    backgroundColor: '#fcfcfc',
                    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
                  },
                  // boolean && {
                  //   backgroundColor: '#ffb494',
                  // },
                ]}
                onClick={() => selectedAllCategory(item)}
              >
                <span>{item.name}</span>

                <span>{boolean ? 'Удалить всё' : 'Добавить всё'}</span>
              </ListSubheader>

              {/* Здесь рендерит список доступных продукций в категории */}
              {item.products.map((item) => (
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
                  {productList.includes(item) ? (
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
              ))}
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
