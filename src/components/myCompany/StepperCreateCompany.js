import React, { Children } from "react"
import { useSelector, useDispatch } from "react-redux"
import { nextStep, lastStep } from "../../redux/slice/stepCount"
import { Formik, Form } from "formik"

import { Button, Box, Stepper, Step, StepLabel } from "@mui/material"

import StepOne from "./steps/StepOne"
import StepTwo from "./steps/StepTwo"
import StepThree from "./steps/StepThree"

export default function StepperCreateCompany() {
  const companyName = useSelector((state) => state.companyNameReducer.name)

  return (
    <FormikStepper
      initialValues={{
        firsName: "",
        lastNme: "",
        booleanField: "",
        numberField: "",
        description: "",
      }}
      onSubmit={() => {}}
    >
      {/* Шаг первый */}
      <Box label="Создание компании">
        <StepOne />
      </Box>

      {/* Шаг второй */}
      <Box label="Выбор товаров">
        <StepTwo />
      </Box>

      {/* Шаг третий */}
      <Box label="Подтверждение">
        <StepThree />
      </Box>
    </FormikStepper>
  )
}

export function FormikStepper({ children, ...props }) {
  const childrenArray = Children.toArray(children)
  const step = useSelector((state) => state.stepCountReducer.step)
  const currentChild = childrenArray[step]

  const dispatch = useDispatch()

  function isLastStep() {
    return step === childrenArray.length - 1
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
      <Form autoComplete="off">
        <Stepper activeStep={step} sx={{ mt: 0, mb: 5 }}>
          {childrenArray.map((child) => {
            return (
              <Step key={child.props.label}>
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            )
          })}
        </Stepper>

        <Box sx={{ mt: 2 }}>{currentChild}</Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            pt: 2,
            justifyContent: "space-between",
            mt: 4,
          }}
        >
          {step > 0 ? (
            <>
              {" "}
              <Button onClick={() => dispatch(lastStep())} variant="contained">
                {" "}
                Назад{" "}
              </Button>
              {!isLastStep() ? (
                <Button type="submit" variant="contained">
                  Дальше
                </Button>
              ) : null}{" "}
            </>
          ) : null}{" "}
          {isLastStep() ? (
            <Button type="submit" variant="contained">
              Отправить
            </Button>
          ) : null}{" "}
        </Box>
      </Form>
    </Formik>
  )
}
