import React from "react";
import { Typography } from "@mui/material";
import { useGetGoodsQuery } from "../../../redux";

import ProductList from "../ProductcList";
import SelectCategories from "../inputs/SelectCategories";
import SelectProducts from "../inputs/SelectProducts";

export default function StepTwo() {
  const { data = [], isLoading } = useGetGoodsQuery();
  if (isLoading) return <h1>Loading...</h1>;

  const dataSelectedGroup = data.filter((item) => item.active);

  return (
    <>
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
    </>
  );
}
