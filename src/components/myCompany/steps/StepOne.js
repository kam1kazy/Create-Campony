import React from 'react'
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

  return (
    <>
      <Box sx={{ justifyContent: 'space-between' }} display='flex'>
        <Box>
          <Typography variant='h5' component='p' sx={{ mb: 4 }}>
            Дайте название новой компании
          </Typography>

          <InputField name='nameCompany' label='Компания' type='text' />

          <Typography variant='h5' component='p' sx={{ mb: 2, mt: 7 }}>
            Выберите способ загрузки предметов
          </Typography>

          <Box sx={{ flexFlow: 'row' }} display='flex'>
            <ButtonSelectProducts
              name='Выбрать предметы'
              nextStepActive
              disabled={!companyName}
            />
            <ButtonUploadExcelFile
              name='Загрузить номенклатуру'
              disabled={!companyName}
            />
          </Box>

          <Typography sx={{ mb: 4, maxWidth: 600 }}>
            Мы автоматически подгрузим все предметы по выбранным вами группам
            предметов или вы можете загрузить свой Excel файл с номенклатурами
            которые подойдут под эти группы предметов
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
