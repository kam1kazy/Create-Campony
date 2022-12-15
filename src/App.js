import { Typography } from '@mui/material'
import { Container } from '@mui/system'
import Navigations from './components/Navigations'

function App() {
  return (
    <>
      <Container maxWidth='lg'>
        <Typography
          variant='h5'
          component='h1'
          sx={{ textTransform: 'uppercase', marginTop: '20px' }}
        >
          Создание компании
        </Typography>

        <Navigations />
      </Container>
    </>
  )
}

export default App
