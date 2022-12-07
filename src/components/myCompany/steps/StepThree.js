import React from 'react'
import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import ProductList from '../ProductcList'

import {
  companyNameSelector,
  selectedCategoriesSelector,
} from '../../../redux/selectors'

export default function StepThree() {
  // SELECTORS from Reducer
  const companyName = useSelector(companyNameSelector)
  const selectedCategories = useSelector(selectedCategoriesSelector)
  const splitCategories = selectedCategories.map((item) => item.name)

  return (
    <>
      <Typography variant='h5' component='p' sx={{ mb: 4 }}>
        Информация о компании
      </Typography>

      <Typography variant='overline' display='block' gutterBottom>
        Название компании
      </Typography>

      <Typography variant='p' component='p' sx={{ mb: 4 }}>
        {companyName}
      </Typography>

      <Typography variant='overline' display='block' gutterBottom>
        Группы товаров
      </Typography>

      <Typography variant='p' component='p' sx={{ mb: 8 }}>
        {splitCategories.join(', ')}
      </Typography>

      <Typography variant='h5' component='p' sx={{ mb: 4 }}>
        Предметы которые вы будете рекламировать.
      </Typography>

      <ProductList />
    </>
  )
}
