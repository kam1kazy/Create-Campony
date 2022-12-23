import React, { useEffect, useState } from 'react'
import axios from 'axios'
import fileDownload from 'js-file-download'
import { useSelector } from 'react-redux'
import { Box, Typography } from '@mui/material'
import { companyNameSelector } from '../../../redux/selectors'

// Components
import ButtonSelectProducts from '../buttons/ButtonSelectProducts'
import LinkButton from '../links/LinkButton'
import ButtonUploadExcelFile from '../buttons/ButtonUploadExcelFile'
import InputField from '../inputs/InputField'

// Static File
import nomenclaturaFile from '../../../assets/nomenclatura.xlsx'

export default function StepOne() {
  const companyName = useSelector(companyNameSelector)
  const [toggleActiveButton, setToggleActiveButton] = useState(true)

  // Download Template - link
  const handleDownload = async () => {
    await axios
      .get(nomenclaturaFile, {
        responseType: 'blob',
      })
      .then((res) => {
        fileDownload(res.data, 'templateExcel.xlsx')
      })
  }

  // Проверка название компании, что оно состоит не из одних пробелов
  useEffect(() => {
    if (companyName.trim().length > 0) {
      setToggleActiveButton(false)
    } else {
      setToggleActiveButton(true)
    }
  }, [companyName])

  return (
    <>
      <Box sx={{ justifyContent: 'space-between' }} display='flex'>
        <Box>
          <Typography variant='h5' component='p' sx={{ mb: 4 }}>
            Дайте название новой компании
          </Typography>

          <InputField name='nameCompany' label='Компании' type='text' />

          <Typography variant='h5' component='p' sx={{ mb: 2, mt: 7 }}>
            Выберите способ загрузки предметов
          </Typography>

          <Box sx={{ flexFlow: 'row' }} display='flex'>
            <ButtonSelectProducts
              name='Выбрать предметы'
              nextStepActive
              disabled={toggleActiveButton}
            />
            <ButtonUploadExcelFile
              name='Загрузить номенклатуру'
              disabled={toggleActiveButton}
            />
          </Box>

          <Typography sx={{ mb: 4, maxWidth: 600 }}>
            Мы автоматически подгрузим все предметы по выбранным Вами группам
            предметов или Вы можете загрузить свой excel-файл с номенклатурами,
            которые подойдут под эти группы предметов”
          </Typography>
        </Box>

        <Box sx={{ alignItems: 'flex-end', flexFlow: 'column' }} display='flex'>
          <LinkButton name='Предосмотр' disabled />
          <LinkButton name='Скачать шаблон' handleDownload={handleDownload} />
        </Box>
      </Box>
    </>
  )
}
