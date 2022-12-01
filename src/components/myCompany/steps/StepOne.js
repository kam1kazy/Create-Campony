import React from "react";
import { useSelector } from "react-redux";
import ButtonForm from "../inputs/ButtonForm";
import ButtonTemplate from "../inputs/ButtonTemplate";
import InputField from "../inputs/InputField";

import { Box, Typography } from "@mui/material";

export default function StepOne() {
  const companyName = useSelector((state) => state.companyNameReducer.name);

  return (
    <>
      <Box sx={{ justifyContent: "space-between" }} display="flex">
        <Box>
          <Typography variant="h5" component="p" sx={{ mb: 4 }}>
            Дайте название новой компании
          </Typography>

          <InputField name="nameCompany" label="Компания" type="text" />

          <Typography variant="h5" component="p" sx={{ mb: 2, mt: 7 }}>
            Выберите способ загрузки предметов
          </Typography>

          <Box sx={{ flexFlow: "row" }} display="flex">
            <ButtonForm
              name="Выбрать предметы"
              nextStepActive
              disabled={!companyName}
            />
            <ButtonForm name="Загрузить номенклатуру" disabled={!companyName} />
          </Box>

          <Typography sx={{ mb: 4, maxWidth: 600 }}>
            Мы автоматически подгрузим все предметы по выбранным вами группам
            предметов или вы можете загрузить свой Excel файл с номенклатурами
            которые подойдут под эти группы предметов
          </Typography>
        </Box>

        <Box sx={{ alignItems: "flex-end", flexFlow: "column" }} display="flex">
          <ButtonTemplate name="Предосмотр" />
          <ButtonTemplate name="Скачать шаблон" />
        </Box>
      </Box>
    </>
  );
}
