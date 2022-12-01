import React from "react"
import { Button, Stack } from "@mui/material"

import { useDispatch } from "react-redux"
import { nextStep } from "../../../redux/slice/stepCount"

export default function ButtonTemplate({ name, disabled, nextStepActive }) {
  const dispatch = useDispatch()

  const handleNextStep = () => {
    dispatch(nextStep())
  }

  return (
    <Stack direction="row" sx={{ mb: 2 }}>
      <Button
        variant="text"
        disabled={disabled}
        onClick={nextStepActive ? handleNextStep : null}
      >
        {name}
      </Button>
    </Stack>
  )
}
