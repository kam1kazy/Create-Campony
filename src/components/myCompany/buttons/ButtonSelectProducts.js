import React from 'react'
import { Button, Stack } from '@mui/material'

import { useDispatch } from 'react-redux'
import { nextStep } from '../../../redux/slice/stepCountSlice'
import { resetNomenclatura } from '../../../redux/slice/nomenclaturaSlice'

export default function ButtonSelectProducts({
  name,
  disabled,
  nextStepActive,
}) {
  const dispatch = useDispatch()

  // Next step
  const handleNextStep = () => {
    dispatch(resetNomenclatura())
    dispatch(nextStep())
  }

  return (
    <Stack direction='row' spacing={2} sx={{ mt: 2, mb: 5, mr: 1 }}>
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
