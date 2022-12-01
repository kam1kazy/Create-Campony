import React from "react"
import { Button, Stack } from "@mui/material"

import { useDispatch } from "react-redux"
import { nextStep } from "../../../redux/slice/stepCount"

export default function ButtonsForm({ name, disabled, nextStepActive }) {
  const dispatch = useDispatch()

  const handleNextStep = () => {
    dispatch(nextStep())
  }

  return (
    <Stack direction="row" spacing={2} sx={{ mt: 2, mb: 5, mr: 2 }}>
      <Button
        variant="outlined"
        disabled={disabled}
        onClick={nextStepActive ? handleNextStep : null}
      >
        {name}
      </Button>
    </Stack>
  )
}
