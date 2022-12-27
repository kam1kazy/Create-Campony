import React from 'react'
import * as XLSX from 'xlsx'
import { Button, Stack } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { nextStep } from '../../../redux/slice/stepCountSlice'

// Slices
import { resetCategories } from '../../../redux/slice/selectedCategories'
import { resetProducts } from '../../../redux/slice/productsSlice'
import { setNomenclatura } from '../../../redux/slice/nomenclaturaSlice'

export default function ButtonUploadExcelFile({ name, disabled, size }) {
  const dispatch = useDispatch()
  const step = useSelector((state) => state.stepCountReducer.step)

  // Получаем Excel файл и рендерим из него json
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
        // Делаем фильтр для комфортной работы с данными и отправляем в reducer
        const jsonFilter = jsonData.map(function (value) {
          return Object.values(value)[0]
        })

        if (step === 0) {
          dispatch(setNomenclatura(jsonFilter))
          dispatch(resetCategories())
          dispatch(resetProducts())
          dispatch(nextStep())
        } else {
          dispatch(resetCategories())
          dispatch(resetProducts())
          dispatch(setNomenclatura(jsonFilter))
        }
      }
      reader.readAsArrayBuffer(e.target.files[0])
    }

    // Next step
  }

  return (
    <Stack direction='row' spacing={2} sx={{ mb: 5, mr: 2 }}>
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
          sx={{ fontSize: '12px' }}
        >
          {name}
        </Button>
      </label>
    </Stack>
  )
}
