import React from 'react'
import { Button, Stack } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'

// Slices
import { nextStep } from '../../../redux/slice/stepCountSlice'
import { resetNomenclatura } from '../../../redux/slice/nomenclaturaSlice'
import { resetProducts } from '../../../redux/slice/productsSlice'
import { resetCategories } from '../../../redux/slice/selectedCategories'

// Selectors
import { nomenclaturaSelector } from '../../../redux/selectors'

export default function ButtonSelectProducts({
  name,
  disabled,
  nextStepActive,
}) {
  const dispatch = useDispatch()
  const nomenclatura = useSelector(nomenclaturaSelector)

  // Next step
  const handleNextStep = () => {
    if (nomenclatura.length > 0) {
      dispatch(resetNomenclatura())
      dispatch(resetProducts())
      dispatch(resetCategories())
    }
    dispatch(nextStep())
  }

  return (
    <Stack direction='row' spacing={2} sx={{ mb: 5, mr: 1 }}>
      <Button
        variant='outlined'
        disabled={disabled}
        onClick={nextStepActive ? handleNextStep : null}
        size='large'
        sx={{ fontSize: '12px' }}
      >
        {name}
      </Button>
    </Stack>
  )
}
