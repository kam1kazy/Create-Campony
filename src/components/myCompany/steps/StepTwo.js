import React from 'react'
import { Button, Typography, Box } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { useGetGoodsQuery } from '../../../redux'

// Slices
import { resetProducts } from '../../../redux/slice/productsSlice'

// Components
import ProductList from '../ProductcList'
import SelectCategories from '../selects/SelectCategories'
import SelectProducts from '../selects/SelectProducts'
import ButtonUploadExcelFile from '../buttons/ButtonUploadExcelFile'
import SearchInput from '../inputs/SearchInput'

import LoopIcon from '@mui/icons-material/Loop'

// Selectors
import {
  selectedProductsSelector,
  selectedCategoriesSelector,
  nomenclaturaSelector,
} from '../../../redux/selectors'

export default function StepTwo() {
  const dispatch = useDispatch()

  // RTKQuery получаем дату по запросу и ждем пока загрузиться
  const { data = [], isLoading } = useGetGoodsQuery()

  // SELECTORS from Reducer
  const selectedCategories = useSelector(selectedCategoriesSelector)
  const selectedProductList = useSelector(selectedProductsSelector)
  const nomenclatura = useSelector(nomenclaturaSelector)

  // Если была загружена номенклатура, то отфильтровать data
  const nomenclaturaGoods = data
    .map((categories) => {
      const obj = {
        ...categories,

        products: categories.products.filter((product) => {
          for (let i = 0; nomenclatura.length > i; i++) {
            if (nomenclatura[i] === product.id) {
              return product
            }
          }
        }),
      }
      return obj
    })
    .filter((cat) => cat.products.length > 0)

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant='h5' component='p' sx={{ mb: 4 }}>
            Выберите группы предметов, которые хотите рекламировать
          </Typography>

          {/* В зависимости - была ли загружена номенклатура, мы выбираем какие категории отобразить */}
          {/* Data - всю базу, nomenclaturaGoods - отфильтрованный список по загруженной номенклатуре */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SelectCategories
              data={nomenclatura.length > 0 ? nomenclaturaGoods : data}
              label={isLoading ? 'Загрузка...' : 'Группы предметов'}
            />

            {isLoading ? (
              <LoopIcon
                sx={{
                  ml: 1,
                  animation: 'spin 2s linear infinite',
                  '@keyframes spin': {
                    '0%': {
                      transform: 'rotate(360deg)',
                    },
                    '100%': {
                      transform: 'rotate(0deg)',
                    },
                  },
                }}
              />
            ) : null}
          </Box>

          <Typography variant='h5' component='p' sx={{ mb: 2, mt: 4 }}>
            Выберите предметы из группы
          </Typography>

          <SearchInput />

          {/* <SelectProducts
            helperText
            label={
              !selectedCategories.length ? 'Сначала выберите группу' : 'Предмет'
            }
          /> */}

          <Typography variant='h5' component='p' sx={{ mb: 4, mt: 4 }}>
            {selectedProductList.length > 0 ? (
              <>
                Товары в рекламу
                <Typography variant='h6' component='span' sx={{ ml: 2, mr: 2 }}>
                  {selectedProductList.length}
                </Typography>
                <Button
                  variant='outlined'
                  onClick={() => dispatch(resetProducts())}
                >
                  Сбросить
                </Button>
              </>
            ) : null}
          </Typography>
        </Box>
        <Box sx={{ mt: 7 }}>
          <ButtonUploadExcelFile name='Загрузить номенклатуру' size='small' />
        </Box>
      </Box>
      <ProductList />
    </>
  )
}
