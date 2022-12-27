import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { Tabs, Tab, Box, Card, CardContent } from '@mui/material'
import {
  Slide,
  DialogTitle,
  DialogContentText,
  DialogContent,
  Dialog,
  Button,
} from '@mui/material'

import CreateCompany from './myCompany/CreateCompany'

// SELECTORS
import { companyNameSelector } from '../redux/selectors'

// Slices
import { resetCategories } from '../redux/slice/selectedCategories'
import { resetProducts } from '../redux/slice/productsSlice'
import { resetNomenclatura } from '../redux/slice/nomenclaturaSlice'
import { resetName } from '../redux/slice/companyNameSlice'
import { firstStep } from '../redux/slice/stepCountSlice'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default function Navigations() {
  const [value, setValue] = useState(2)
  const [valueInDialog, setValueInDialog] = useState(0)
  const [open, setOpen] = useState(false)

  const dispatch = useDispatch()

  const companyName = useSelector(companyNameSelector)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChangeAndReset = () => {
    setOpen(false)
    dispatch(resetCategories())
    dispatch(resetProducts())
    dispatch(resetNomenclatura())
    dispatch(resetName())
    dispatch(firstStep())

    setValue(valueInDialog)
  }

  const handleChange = (event, newValue) => {
    if (companyName.length > 0) {
      setOpen(true)
      setValueInDialog(newValue)
    } else setValue(newValue)
  }

  return (
    <>
      <Card variant='outlined' sx={{ mt: 2 }}>
        <CardContent>
          <Box sx={{ width: '100%', marginTop: '5px' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label='basic tabs example'
                textColor='inherit'
                indicatorColor='secondary'
              >
                <Tab label='Акции' {...a11yProps(0)} />
                <Tab label='Разделы сайта' {...a11yProps(1)} />
                <Tab label='Карточка товара' {...a11yProps(2)} />
                <Tab label='Каталог' {...a11yProps(3)} />
                <Tab label='Поиск' {...a11yProps(4)} />
                <Tab label='Рекомендации на главной' {...a11yProps(5)} />
              </Tabs>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Card variant='outlined' sx={{ mt: 3 }}>
        <CardContent>
          <TabPanel value={value} index={0}>
            Страница Акции
          </TabPanel>
          <TabPanel value={value} index={1}>
            Разделы сайта
          </TabPanel>
          <TabPanel value={value} index={2}>
            <CreateCompany />
          </TabPanel>
          <TabPanel value={value} index={3}>
            Страница каталога
          </TabPanel>
          <TabPanel value={value} index={4}>
            <CreateCompany />
          </TabPanel>
          <TabPanel value={value} index={5}>
            Рекомендации на главной
          </TabPanel>
        </CardContent>
      </Card>

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
        <DialogContent sx={{ minWidth: 420 }}>
          <DialogContentText
            id='alert-dialog-slide-description'
            sx={{ textAlign: 'center', mt: 2 }}
          >
            Данные не изменены
            <Box
              component='span'
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                maxWidth: 350,
                margin: '30px auto 20px',
              }}
            >
              <Button onClick={handleChangeAndReset} variant='outlined'>
                Все равно выйти
              </Button>
              <Button onClick={handleClose} variant='contained'>
                Отменить
              </Button>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}
