import React from 'react'
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'

import { useSelector, useDispatch } from 'react-redux'
import { setDeleteProductRef } from '../../redux/slice/productsSlice'

// Selectors
import {
  selectedProductsSelector,
  stepCountSelector,
} from '../../redux/selectors'

export default function selectedProductList() {
  const dispatch = useDispatch()
  // SELECTORS from reducer

  const selectedProductList = useSelector(selectedProductsSelector)
  const stepCount = useSelector(stepCountSelector)

  // Delete selected product
  const handleDeleteItem = (product) => {
    dispatch(setDeleteProductRef(product))
  }

  return (
    <>
      {!selectedProductList.length > 0 ? (
        <Typography
          variant='h6'
          component='p'
          sx={{ textAlign: 'center', opacity: 0.2, mb: 5, mt: 5 }}
        >
          Здесь будут отображаться, выбранный Вами ассортимент
        </Typography>
      ) : null}

      <Grid container spacing='20'>
        {selectedProductList.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                minWidth: '300px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  maxWidth: '100px',
                  p: 1,
                  pr: 2,
                  boxSizing: 'border-box',
                }}
              >
                <CardMedia
                  component='img'
                  height='124'
                  image={product.image}
                  alt={product.name}
                />
              </Box>

              <Box
                sx={{
                  width: '100%',
                }}
              >
                <CardContent sx={{ position: 'relative', pl: 0 }}>
                  <Typography color='text.secondary' sx={{ fontSize: '13px' }}>
                    Номенклатура:
                  </Typography>
                  <Typography sx={{ mb: 2.5 }}>{product.id}</Typography>

                  <Typography color='text.secondary' sx={{ fontSize: '13px' }}>
                    Название:
                  </Typography>
                  <Typography>{product.name}</Typography>

                  {stepCount === 2 ? null : (
                    <Button
                      sx={{ position: 'absolute', top: '10px', right: '5px' }}
                      onClick={() => handleDeleteItem(product)}
                      size='small'
                    >
                      <DeleteOutlineRoundedIcon
                        color='action'
                        fontSize='small'
                      />
                    </Button>
                  )}
                </CardContent>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}
