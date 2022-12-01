import React from "react"
import { useTheme } from "@mui/material/styles"
import { useDispatch, useSelector } from "react-redux"
import { addProduct, removeProduct } from "../../../redux/slice/productsSlice"

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
} from "@mui/material"
import { red } from "@mui/material/colors"

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 7.5 + ITEM_PADDING_TOP,
      width: 450,
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

export default function SelectProducts({ label, helperText }) {
  const theme = useTheme()
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productsReducer.goods)
  const selectedCategories = useSelector(
    (state) => state.selectedCategoriesReducer.categories
  )

  const groupName = productList.map((item) => item.name)

  const handleSelectItem = (item) => {
    if (!productList.includes(item)) {
      dispatch(addProduct({ item }))
    } else {
      dispatch(removeProduct(item))
    }
  }

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
            {groupName.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {selectedCategories.map((item, id) => {
          return (
            <div key={item.id}>
              <ListSubheader
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
                onClick={() => selectedAllCategory(item)}
              >
                <span>{item.name}</span>

                <span>Добавить всё</span>
              </ListSubheader>
              {item.products.map((item) => (
                <MenuItem
                  key={item.id}
                  onClick={() => handleSelectItem(item)}
                  value={item.name}
                  style={getStyles(item.name, groupName, theme)}
                  sx={{ flexFlow: "row", alignItems: "flex-start" }}
                >
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.name}
                    sx={{
                      objectFit: "contain",
                      maxWidth: "60px",
                      maxHeight: "60px",
                      mr: 2,
                    }}
                  />
                  <Box
                    sx={{
                      justifyContent: "space-between",
                      display: "flex",
                      width: "100%",
                    }}
                  >
                    <Box>
                      <Typography variant="p" sx={{ mb: 1 }}>
                        {item.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        display="block"
                        color="text.secondary"
                      >
                        {item.categories}
                      </Typography>
                    </Box>
                    <Typography variant="caption">№{item.id}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </div>
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
