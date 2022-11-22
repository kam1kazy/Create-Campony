import React, {useState, useEffect, Children} from 'react'

import { Button, Box, Typography, Stepper, Step, StepLabel, Grid, Card, CardContent, CardActions} from '@mui/material';
import {Formik, Form } from 'formik'

import InputField from './InputField';
import MultipleSelect from './MultipleSelect';
import { useGetGoodsQuery } from '../../redux'


export default function FormArea() {
   const {data = [], isLoading} = useGetGoodsQuery()

   if(isLoading) return <h1>Loading...</h1>

   const dataSelectedGroup = data.filter(item => item.active)

   console.log();

  return (
   <FormikStepper initialValues={{
         firsName: '',
         lastNme: '',
         booleanField: '',
         numberField: '',
         description: '',
      }} onSubmit={() => {}}
   >
      {/* Шаг первый */}
      <Box label="Создание компании">

         <Typography variant="h5" component="p" sx={{ mb: 4}}>
            Дайте название новой компании
         </Typography>

         <InputField required="required" name="nameCompany" label="Компания" />

         <Typography variant="h5" component="p" sx={{ mb: 2, mt: 7}}>
            Выберите способ загрузки предметов
         </Typography>

         <Typography variant="p" component="p" sx={{ mb: 4, maxWidth: 600 }}>
            Мы автоматически подгрузим все предметы по выбранным вами группам предметов или вы можете загрузить свой Excel файл с номенклатурами которые подойдут под эти группы предметов
         </Typography>
      </Box>

      {/* Шаг второй */}
      <Box label="Выбор товаров">
         <Typography variant="h5" component="p" sx={{ mb: 4}}>
            Выберите группу предметов которую хотите рекламировать
         </Typography>

         <MultipleSelect selectedChip={dataSelectedGroup} data={data} label="Группа предметов"/>

         <Typography variant="h5" component="p" sx={{ mb: 2, mt: 4}}>
            Выберите предметы из группы
         </Typography>

         <MultipleSelect data={dataSelectedGroup} helperText productList label="Предметы"/>

         <Typography variant="h5" component="p" sx={{ mb: 2, mt: 4}}>
            Товары в рекламу
         </Typography>

         <Grid container spacing="30">
            {data.map((product) => (
               <Grid item xs={12} md={4} key={product.id}>
                  <Card sx={{ minWidth: 275 }}>
                     <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {product.name}
                        </Typography>

                        <Typography variant="h5" component="div">
                           Название
                        </Typography>
                        
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                           adjective
                        </Typography>

                        <Typography sx={{ mb: 3 }} variant="body2">
                           well meaning and kindly.
                           <br />
                           {'"a benevolent smile"'}
                        </Typography>

                        <CardActions>
                           <Button size="small">Удалить</Button>
                        </CardActions>
                     </CardContent>
                  </Card>
               </Grid>
            ))}
         </Grid>
      </Box>
      
      {/* Шаг третий */}
      <Box label="Подтверждение">
         <Typography variant="h5" component="p" sx={{ mb: 4}}>
            Последний шаг
         </Typography>
        
      </Box>
   </FormikStepper>
  )
}

export function FormikStepper({children, ...props}) {
   const childrenArray = Children.toArray(children)
   const [step, setStep] = useState(0)
   const currentChild = childrenArray[step]

   function isLastStep() {
      return step === childrenArray.length - 1
   }

   return (
      <Formik {...props} onSubmit={ async(value, helpers) => {
         if(isLastStep()) {
            await props.onSubmit(value, helpers)
         } else {
            setStep( s => s + 1 )
         }
      }}>
         <Form autoComplete='off'>
            <Stepper activeStep={step} sx={{ mt: 3, mb: 6}}>
               {childrenArray.map((child) => {
                  return (
                     <Step key={child.props.label} >
                        <StepLabel>{child.props.label}</StepLabel>
                     </Step>
                  );
               })}
            </Stepper>
         
            <Box sx={{mt: 2 }}>
               {currentChild}
            </Box>

            <Box sx={{ 
               display: 'flex', 
               flexDirection: 'row',
               pt: 2, 
               justifyContent: 'space-between',
               mt: 4
            }}>
               { step > 0 ? <Button onClick={ () => setStep( s => s - 1 )} variant="contained"> Назад </Button> : null }
               <Button type="submit" variant="contained"> {isLastStep() ? 'Отправить' : 'Дальше'} </Button>
            </Box>
         </Form>
      </Formik>
   );
}
