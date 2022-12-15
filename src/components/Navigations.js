import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Tabs, Tab, Box, Card, CardContent } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import blue from '@mui/material/colors/blue'

import CreateCompany from './myCompany/CreateCompany'

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
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
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
                textColor='rgba(0, 0, 0, 0.87)'
                indicatorColor='secondary'
              >
                <Tab label='Акции' {...a11yProps(0)} />
                <Tab label='Карточка товара' {...a11yProps(1)} />
                <Tab label='Каталог' {...a11yProps(2)} />
                <Tab label='Поиск' {...a11yProps(3)} />
                <Tab label='Рекомендации на главной' {...a11yProps(4)} />
              </Tabs>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Card variant='outlined' sx={{ mt: 3 }}>
        <CardContent>
          <TabPanel value={value} index={0}>
            <CreateCompany />
          </TabPanel>
          <TabPanel value={value} index={1}>
            Страница карточки товара
          </TabPanel>
          <TabPanel value={value} index={2}>
            Страница каталога
          </TabPanel>
          <TabPanel value={value} index={3}>
            Поиск
          </TabPanel>
          <TabPanel value={value} index={4}>
            Рекомендации на главной
          </TabPanel>
        </CardContent>
      </Card>
    </>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}
