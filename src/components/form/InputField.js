import React, {useState} from 'react'
import { ErrorMessage, Field } from 'formik'
import {TextField } from "@mui/material";

export default function InputField({ name, label, type, required }) {
  const [companyName, setCompanyName] = useState('')

  return (
   <Field 
      required
      autoComplete="off"
      name={name} 
      label={label}
      type={type}
      as={TextField} 
      onChange={(e) => setCompanyName(e.target.value)}
      helperText={<ErrorMessage name={name} />}
   />
  )
}
