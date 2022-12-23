import React, { useState } from 'react'
import {
  Slide,
  DialogTitle,
  DialogContentText,
  DialogContent,
  Dialog,
  Button,
  Box,
} from '@mui/material'

import { useSelector, useDispatch } from 'react-redux'

// Slices
import { resetCategories } from '../../../redux/slice/selectedCategories'
import { resetProducts } from '../../../redux/slice/productsSlice'
import { resetNomenclatura } from '../../../redux/slice/nomenclaturaSlice'
import { resetName } from '../../../redux/slice/companyNameSlice'
import { backStep } from '../../../redux/slice/stepCountSlice'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function DialogButtonGoToBack() {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const backToFirstStep = () => {
    dispatch(backStep())

    // dispatch(resetCategories())
    // dispatch(resetProducts())
    // dispatch(resetNomenclatura())
    // dispatch(resetName())
  }

  return (
    <>
      <Button variant='contained' onClick={handleClickOpen}>
        Назад
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle sx={{ textAlign: 'center', mt: 2 }}>
          {'Вы хотите покинуть страницу?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            Сохранить внесенные изменения?
            <Box
              component='span'
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                maxWidth: 300,
                margin: '30px auto 20px',
              }}
            >
              <Button onClick={backToFirstStep} variant='outlined'>
                Ок
              </Button>
              <Button onClick={handleClose} variant='contained'>
                Остаться
              </Button>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  )
}
