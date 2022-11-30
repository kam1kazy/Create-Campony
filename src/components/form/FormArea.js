import React, { useState, Children, useEffect } from "react";
import {
  Button,
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { Formik, Form } from "formik";
import { useGetGoodsQuery } from "../../redux";
import { useSelector, useDispatch } from "react-redux";
import { nextStep, lastStep } from "../../redux/slice/stepCount";

import InputField from "./inputs/InputField";
import SelectCategories from "./inputs/SelectCategories";
import SelectProducts from "./inputs/SelectProducts";
import FormButton from "./inputs/FormButton";

import ProductList from "./ProductList";
import CreateCompany from "./CreateCompany";

export default function FormArea() {
  const { data = [], isLoading } = useGetGoodsQuery();

  if (isLoading) return <h1>Loading...</h1>;

  const companyName =
    useSelector((state) => state.companyNameReducer.name).length > 0;
  const dataSelectedGroup = data.filter((item) => item.active);

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
      test="test"
    >
      {/* Шаг первый */}
      <Box label="Создание компании">
        <Typography variant="h5" component="p" sx={{ mb: 4 }}>
          Дайте название новой компании
        </Typography>

        <InputField name="nameCompany" label="Компания" type="text" />

        <Typography variant="h5" component="p" sx={{ mb: 2, mt: 7 }}>
          Выберите способ загрузки предметов
        </Typography>

        <Box sx={{ flexFlow: "row" }} display="flex">
          <FormButton name="Выбрать предметы" nextStepActive />
          <FormButton name="Загрузить номенклатуру" disabled={!companyName} />
        </Box>

        <Typography sx={{ mb: 4, maxWidth: 600 }}>
          Мы автоматически подгрузим все предметы по выбранным вами группам
          предметов или вы можете загрузить свой Excel файл с номенклатурами
          которые подойдут под эти группы предметов
        </Typography>
      </Box>

      {/* Шаг второй */}
      <Box label="Выбор товаров">
        <Typography variant="h5" component="p" sx={{ mb: 4 }}>
          Выберите группу предметов которую хотите рекламировать
        </Typography>

        <SelectCategories data={data} label="Группа предметов" />

        <Typography variant="h5" component="p" sx={{ mb: 2, mt: 4 }}>
          Выберите предметы из группы
        </Typography>

        <SelectProducts data={dataSelectedGroup} helperText label="Предметы" />

        <Typography variant="h5" component="p" sx={{ mb: 2, mt: 4 }}>
          Товары в рекламу
        </Typography>

        <ProductList />
      </Box>

      {/* Шаг третий */}
      <Box label="Подтверждение">
        <CreateCompany />
      </Box>
    </FormikStepper>
  );
}

export function FormikStepper({ children, ...props }) {
  const childrenArray = Children.toArray(children);
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];

  const stepCount = useSelector((state) => state.stepCountReducer.name);
  console.log("step: " + step + ", stepCount: " + stepCount);

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik
      {...props}
      onSubmit={async (value, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(value, helpers);
        } else {
          setStep((s) => s + 1);
        }
      }}
    >
      <Form autoComplete="off">
        <Stepper activeStep={step} sx={{ mt: 3, mb: 6 }}>
          {childrenArray.map((child) => {
            return (
              <Step key={child.props.label}>
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            );
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
              <Button type="submit" variant="contained">
                {" "}
                {isLastStep() ? "Отправить" : "Дальше"}{" "}
              </Button>

              <Button onClick={() => setStep((s) => s - 1)} variant="contained">
                {" "}
                Назад{" "}
              </Button>
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
  );
}
