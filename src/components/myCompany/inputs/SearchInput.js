import React, { useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTheme } from '@mui/material/styles'

import {
  Autocomplete,
  TextField,
  Box,
  Chip,
  Typography,
  CardMedia,
} from '@mui/material'
import { styled } from '@mui/system'

import ChipTagsCircle from '../selects/chips/ChipTagsCircle'

// SELECTORS
import {
  productListSelector,
  selectedProductsSelector,
  getDeleteProductRef,
} from '../../../redux/selectors'

// SLICES
import {
  addProduct,
  removeProduct,
  removeGroupSelectedProduct,
  setProductsSelectedList,
  setDeleteProductRef,
} from '../../../redux/slice/productsSlice'

// ICONS
import CancelIcon from '@mui/icons-material/Cancel'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'

function getStyles(name, groupName) {
  return {
    color: groupName.indexOf(name) === -1 ? null : '#fa7d47',
    backgroundColor:
      groupName.indexOf(name) === -1 ? null : 'rgb(250 125 71 / 10%)',
  }
}

export default function SearchInput() {
  const theme = useTheme()
  const dispatch = useDispatch()
  const chipTags = useRef(null)
  const deleteRef = useRef(null)

  // USE SELECTOR
  const selectedProductList = useSelector(selectedProductsSelector)
  const productRef = useSelector(getDeleteProductRef)
  const productsList = useSelector(productListSelector)

  // Chips - выбранные категории в Input Select, имя в овальном блоке
  const groupName = selectedProductList.map((item) => item.name)

  // Стили для группировки списка
  const GroupHeader = styled('div')(({ theme }) => ({
    position: 'sticky',
    top: '-8px',
    padding: '0 16px',
    height: '58px',
    lineHeight: '58px',
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
        dispatch(addProduct(product))
      } else {
        count = count + 1
        // Если длинна массива равна счетчику, значит вся категория выбрана
        if (arr.length === count) {
          arr.forEach(function (item, i) {
            // dispatch(removeGroupSelectedProduct(item.key))
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

    return selectedProductList.map((product, index) => {
      if (index < 3) {
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
      }
    })
  }

  // Delete selected product
  const handleDeleteItem = (product) => {
    const id = selectedProductList.findIndex((e) => e.name === product.name)

    if (!selectedProductList.includes(product.id)) {
      deleteRef.current[id]()
      dispatch(removeProduct(product))
      dispatch(setDeleteProductRef(null))
    }
  }

  useEffect(() => {
    if (productRef !== null) {
      handleDeleteItem(productRef)
    }
  }, [productRef])

  return (
    <Box sx={{ maxWidth: 470, position: 'relative' }}>
      <Autocomplete
        ref={chipTags}
        multiple
        disableClearable
        disableCloseOnSelect
        id='tags-standard'
        noOptionsText={'Список пуст'}
        options={productsList}
        onChange={setSelectProducts}
        groupBy={(product) => product.categories}
        getOptionLabel={(product) => product.name}
        renderTags={deleteSelectProducts}
        renderOption={(props, option) => (
          <Box
            component='li'
            style={getStyles(option.name, groupName, theme)}
            {...props}
          >
            {selectedProductList.includes(option) ? (
              <CheckRoundedIcon sx={{ pr: 1 }} />
            ) : null}
            <CardMedia
              component='img'
              image={option.image}
              alt={option.name}
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
                  {option.name}
                </Typography>
                <Typography
                  variant='caption'
                  display='block'
                  color='text.secondary'
                >
                  {option.categories}
                </Typography>
              </Box>
              <Typography variant='caption'>№{option.id}</Typography>
            </Box>
          </Box>
        )}
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
