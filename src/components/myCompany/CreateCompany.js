import React, { Children } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Formik, Form } from 'formik'

import { Button, Box, Stepper, Step, StepLabel } from '@mui/material'

// SELECTORS
import { selectedProductsSelector } from '../../redux/selectors'

// Slices
import { nextStep, backStep } from '../../redux/slice/stepCountSlice'

// Components
import StepOne from './steps/StepOne'
import StepTwo from './steps/StepTwo'
import StepThree from './steps/StepThree'
import DialogBackStepButton from './dialogs/DialogBackStepButton'

export default function CreateCompany() {
  return (
    <FormikStepper
      initialValues={{
        firsName: '',
        lastNme: '',
        booleanField: '',
        numberField: '',
        description: '',
      }}
      onSubmit={() => {}}
    >
      {/* Шаг первый */}
      <Box label='Ваша компания'>
        <StepOne />
      </Box>

      {/* Шаг второй */}
      <Box label='Ассортимент'>
        <StepTwo />
      </Box>

      {/* Шаг третий */}
      <Box label='Подтверждение'>
        <StepThree />
      </Box>
    </FormikStepper>
  )
}

export function FormikStepper({ children, ...props }) {
  const dispatch = useDispatch()
  const selectedProductList = useSelector(selectedProductsSelector)

  const childrenArray = Children.toArray(children)
  const step = useSelector((state) => state.stepCountReducer.step)
  const currentChild = childrenArray[step]

  function isLastStep() {
    return step === childrenArray.length - 1
  }

  const goToBackStep = () => {
    dispatch(backStep())
  }

  return (
    <Formik
      {...props}
      onSubmit={async (value, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(value, helpers)
        } else {
          dispatch(nextStep())
        }
      }}
    >
      <Form autoComplete='off'>
        <Stepper activeStep={step} sx={{ mt: 0, mb: 5 }}>
          {childrenArray.map((child) => {
            return (
              <Step
                key={child.props.label}
                sx={{
                  '& .MuiStepLabel-root .Mui-completed': {
                    color: 'success.main', // circle color (COMPLETED)
                  },
                  '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
                    {
                      color: 'grey.500', // Just text label (COMPLETED)
                    },
                  '& .MuiStepLabel-root .Mui-active': {
                    color: '#ba68c8', // circle color (ACTIVE)
                  },
                  '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
                    {
                      color: 'common.white', // Just text label (ACTIVE)
                    },
                  '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                    fill: 'common.white', // circle's number (ACTIVE)
                  },
                }}
              >
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            )
          })}
        </Stepper>

        <Box sx={{ mt: 2 }}>{currentChild}</Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            pt: 2,
            justifyContent: 'space-between',
            mt: 4,
          }}
        >
          {step > 0 ? (
            <>
              {step === 1 ? (
                <DialogBackStepButton />
              ) : (
                <Button onClick={goToBackStep} variant='contained'>
                  Назад
                </Button>
              )}

              {!isLastStep() ? (
                <Button
                  type='submit'
                  variant='contained'
                  disabled={selectedProductList.length > 0 ? false : true}
                >
                  Дальше
                </Button>
              ) : null}
            </>
          ) : null}
          {isLastStep() ? (
            <Button type='submit' variant='contained'>
              Отправить
            </Button>
          ) : null}
        </Box>
      </Form>
    </Formik>
  )
}
