import React from 'react'
import { useTheme } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, removeProduct } from '../../../redux/slice/productsSlice'
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
    backgroundColor:
      groupName.indexOf(name) === -1 ? null : 'rgba(25, 118, 210, 0.08)',
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
    <FormControl sx={{ m: 1, width: 400 }}>
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
              <Chip key={value} label={value} />
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
                    pb: 1,
                    pt: 1,
                    '&:hover': { backgroundColor: '#f2f2f2' },
                  },
                  boolean && {
                    backgroundColor: '#ebf4fc',
                  },
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
                    alignItems: 'flex-start',
                    pt: 2,
                    pb: 2,
                  }}
                >
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
