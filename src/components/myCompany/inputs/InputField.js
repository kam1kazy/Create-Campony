import React, { useState } from 'react'
import { Field } from 'formik'
import { TextField } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'
import { changeName } from '../../../redux/slice/companyNameSlice'
import { companyNameSelector } from '../../../redux/selectors'

export default function InputField({ name, label, type }) {
  const dispatch = useDispatch()
  const companyName = useSelector(companyNameSelector)
  const [emptyInput, useEmptyInput] = useState(false)

  // Контролируемый Inupt через глобальное состояние (state reducer)
  const handleCheckInput = (e) => {
    dispatch(changeName(e.target.value))

    if (e.target.value === '') {
      useEmptyInput(true)
    } else {
      useEmptyInput(false)
    }
  }

  return (
    <Field
      required
      autoComplete='off'
      value={companyName}
      name={name}
      label={label}
      type={type}
      as={TextField}
      onChange={handleCheckInput}
      error={emptyInput ? true : false}
      helperText={emptyInput ? 'Пустое поле!' : ' '}
    />
  )
}
