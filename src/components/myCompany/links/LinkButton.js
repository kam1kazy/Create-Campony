import React from 'react'
import { Link, Stack } from '@mui/material'

export default function LinkButton({ name, disabled, handleDownload }) {
  return (
    <Link
      sx={{ mb: 2, cursor: 'pointer' }}
      variant='text'
      disabled={disabled}
      underline='none'
      onClick={handleDownload ? handleDownload : null}
    >
      {name}
    </Link>
  )
}
