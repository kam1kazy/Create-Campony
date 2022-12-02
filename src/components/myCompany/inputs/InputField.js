import React from 'react'
import { ErrorMessage, Field } from 'formik'
import { TextField } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'
import { changeName } from '../../../redux/slice/companyNameSlice'

export default function InputField({ name, label, type }) {
  const dispatch = useDispatch()
  const companyName = useSelector((state) => state.companyNameReducer.name)

  const handleCheckInput = (e) => {
    dispatch(changeName(e.target.value))
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
      helperText={<ErrorMessage name={name} />}
    />
  )
}
