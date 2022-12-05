import React from 'react'
import { Link, Stack } from '@mui/material'

import { useDispatch } from 'react-redux'
import { nextStep } from '../../../redux/slice/stepCountSlice'

export default function LinkButton({ name, disabled, nextStepActive }) {
  const dispatch = useDispatch()

  const handleNextStep = () => {
    dispatch(nextStep())
  }

  return (
    <Stack direction='row'>
      <Link
        variant='text'
        disabled={disabled}
        onClick={nextStepActive ? handleNextStep : null}
      >
        {name}
      </Link>
    </Stack>
  )
}
