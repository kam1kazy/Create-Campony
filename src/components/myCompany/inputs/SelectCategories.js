import react from "react"
import { useTheme } from "@mui/material/styles"
import { useDispatch, useSelector } from "react-redux"
import {
  addCategories,
  removeCategories,
} from "../../../redux/slice/selectedCategories"
import { removeProduct } from "../../../redux/slice/productsSlice"

import {
  Box,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Chip,
} from "@mui/material"

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

function getStyles(name, groupName, theme) {
  return {
    fontWeight:
      groupName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}

export default function SelectCategories({ label, data }) {
  const theme = useTheme()
  const dispatch = useDispatch()

  // USE SELECTOR
  const productList = useSelector((state) => state.productsReducer.goods)
  const selectedCategories = useSelector(
    (state) => state.selectedCategoriesReducer.categories
  )

  const groupName = selectedCategories.map((item) => item.name)

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

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="multiple-chip-label">{label}</InputLabel>
        <Select
          labelId="multiple-chip-label"
          id="multiple-chip"
          multiple
          value={groupName}
          input={<OutlinedInput id="select-multiple-chip" label={label} />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {data.map((item) => (
            <MenuItem
              key={item.id}
              onClick={() => handleSelectedCategory(item)}
              value={item.name}
              style={getStyles(item.name, groupName, theme)}
            >
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
