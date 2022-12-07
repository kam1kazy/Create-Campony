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
import {
  productListSelector,
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
    backgroundColor:
      groupName.indexOf(name) === -1 ? null : 'rgba(25, 118, 210, 0.08)',
  }
}

export default function SelectCategories({ label, data }) {
  const theme = useTheme()
  const dispatch = useDispatch()

  // USE SELECTOR
  const productList = useSelector(productListSelector)
  const selectedCategories = useSelector(selectedCategoriesSelector)

  const groupName = selectedCategories.map((item) => item.name)

  // Select / Delete Categories
  const handleSelectedCategory = (item) => {
    if (!selectedCategories.includes(item)) {
      dispatch(addCategories({ item }))
    } else {
      dispatch(removeCategories({ item }))

      item.products.forEach(function (product, i) {
        if (productList.includes(product)) {
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
    dispatch(resetCategories())
    dispatch(resetProducts())
  }

  return (
    <div>
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
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  sx={{ zIndex: '999999' }}
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
              --- сбросить всё ---
            </MenuItem>
            {data.map((item) => {
              return (
                <MenuItem
                  key={item.id}
                  onClick={() => handleSelectedCategory(item)}
                  value={item.name}
                  style={getStyles(item.name, groupName, theme)}
                >
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
