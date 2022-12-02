import React from 'react'
import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { useGetGoodsQuery } from '../../../redux'

import ProductList from '../ProductcList'
import SelectCategories from '../inputs/SelectCategories'
import SelectProducts from '../inputs/SelectProducts'

export default function StepTwo() {
  const { data = [], isLoading } = useGetGoodsQuery()
  const selectedCategories = useSelector(
    (state) => state.selectedCategoriesReducer.categories
  )

  if (isLoading) return <h1>Loading...</h1>

  return (
    <>
      <Typography variant='h5' component='p' sx={{ mb: 4 }}>
        Выберите группу предметов которую хотите рекламировать
      </Typography>

      <SelectCategories data={data} label='Группы предметов' />

      <Typography variant='h5' component='p' sx={{ mb: 2, mt: 4 }}>
        Выберите предметы из группы
      </Typography>

      <SelectProducts
        helperText
        label={
          !selectedCategories.length ? 'Сначала выберите группу' : 'Предметы'
        }
      />

      <Typography variant='h5' component='p' sx={{ mb: 2, mt: 4 }}>
        Товары в рекламу
      </Typography>

      <ProductList />
    </>
  )
}
