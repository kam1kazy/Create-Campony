import React from "react";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import ProductList from "../ProductcList";

export default function StepThree() {
  const companyName = useSelector((state) => state.companyNameReducer.name);
  const selectedCategories = useSelector(
    (state) => state.selectedCategoriesReducer.categories
  );
  const splitCategories = selectedCategories.map((item) => item.name);

  return (
    <>
      <Typography variant="h5" component="p" sx={{ mb: 4 }}>
        Информация о компании
      </Typography>

      <Typography variant="overline" display="block" gutterBottom>
        Название компании
      </Typography>

      <Typography variant="p" component="p" sx={{ mb: 4 }}>
        {companyName}
      </Typography>

      <Typography variant="overline" display="block" gutterBottom>
        Группы товаров
      </Typography>

      <Typography variant="p" component="p" sx={{ mb: 8 }}>
        {splitCategories.join(", ")}
      </Typography>

      <Typography variant="h5" component="p" sx={{ mb: 4 }}>
        Предметы которые вы будете рекламировать.
      </Typography>

      <ProductList />
    </>
  );
}
