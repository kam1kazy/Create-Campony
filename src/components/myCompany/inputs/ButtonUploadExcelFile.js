import React, { useState } from 'react'
import * as XLSX from 'xlsx'
import { Button, Stack } from '@mui/material'
import { useDispatch } from 'react-redux'
import { nextStep } from '../../../redux/slice/stepCountSlice'
import { setNomenclatura } from '../../../redux/slice/nomenclaturaSlice'

export default function ButtonUploadExcelFile({ name, disabled }) {
  const dispatch = useDispatch()

  const readUploadFile = (e) => {
    e.preventDefault()

    if (e.target.files) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const data = e.target.result
        const workbook = XLSX.read(data, { type: 'array' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const jsonData = XLSX.utils.sheet_to_json(worksheet)

        const jsonFilter = jsonData.map(function (value) {
          return value[1]
        })

        dispatch(setNomenclatura(jsonFilter))
      }
      reader.readAsArrayBuffer(e.target.files[0])
    }

    handleNextStep()
  }

  const getUploadProducts = () => {}

  const handleNextStep = () => {
    dispatch(nextStep())
  }

  return (
    <Stack direction='row' spacing={2} sx={{ mt: 2, mb: 5, mr: 2 }}>
      <input
        color='primary'
        type='file'
        accept='.xls,.xlsx'
        onChange={readUploadFile}
        id='icon-button-file'
        style={{ display: 'none' }}
        disabled={disabled}
      />
      <label htmlFor='icon-button-file'>
        <Button
          variant='outlined'
          component='span'
          size='large'
          disabled={disabled}
        >
          {name}
        </Button>
      </label>
    </Stack>
  )
}
