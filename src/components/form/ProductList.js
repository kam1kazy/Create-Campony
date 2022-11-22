import React from "react";
import { MenuItem } from "@mui/material";

export default function ProductList(data) {
  const handleChange = () => {
    // func
  };

  console.log(data.data);

  return data.data.products.map((item, id) => {
    console.log(item.products);

    return (
      <MenuItem key={item.id} onClick={handleChange} value={item.name}>
        {item.name}
      </MenuItem>
    );
  });
}
