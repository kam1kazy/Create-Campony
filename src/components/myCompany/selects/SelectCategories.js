import { useTheme } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
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
  deleteChipProducts,
  resetProducts,
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

export default function SelectCategories({ label, data }) {
  const theme = useTheme()
  const dispatch = useDispatch()

  // USE SELECTOR
  const selectedProductList = useSelector(selectedProductsSelector)
  const selectedCategories = useSelector(selectedCategoriesSelector)

  const groupName = selectedCategories.map((item) => item.name)

  // Select / Delete Categories
  const handleSelectedCategory = (item) => {
    if (!selectedCategories.includes(item)) {
      dispatch(addCategories({ item }))
    } else {
      dispatch(removeCategories({ item }))

      item.products.forEach(function (product, i) {
        if (selectedProductList.includes(product)) {
          dispatch(removeProduct(product))
        }
      })
    }
  }

  // Delete Chips Categories
  const handleDeleteCategory = (name) => {
    dispatch(deleteChipCategory({ name }))
    dispatch(deleteChipProducts({ name }))
  }

  // Reset categories and products
  const handleResetCategory = () => {
    if (selectedCategories.length > 0) {
      dispatch(resetCategories())
      dispatch(resetProducts())
    } else {
      let count = 0

      data.forEach(function (item, i, arr) {
        if (data.includes(item)) {
          dispatch(addCategories({ item }))
        } else {
          count = count + 1

          if (arr.length === count) {
            arr.forEach(function (item, i) {
              dispatch(removeCategories(item))
            })
          }
        }
      })
    }
  }

  return (
    <div>
      <FormControl sx={{ m: 1, maxWidth: 450 }} fullWidth={true}>
        <InputLabel id='multiple-chip-label'>{label}</InputLabel>
        <Select
          labelId='multiple-chip-label'
          id='multiple-chip-products'
          multiple
          value={groupName}
          input={<OutlinedInput id='select-multiple-chip' label={label} />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  sx={{ zIndex: '1' }}
                  deleteIcon={
                    <CancelIcon
                      onMouseDown={(event) => event.stopPropagation()}
                    />
                  }
                  onDelete={() => handleDeleteCategory(value)}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
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
    </div>
  )
}
