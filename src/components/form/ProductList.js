import React from "react";
import {
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";

import { useGetGoodsQuery } from "../../redux";

export default function ProductList(productList, setProductList) {
  const { data = [], isLoading } = useGetGoodsQuery();

  if (isLoading) return <h1>Loading...</h1>;

  console.log("productList.productList");
  console.log(productList.productList);
  console.log("data");
  console.log(data);

  const handleDeleteItem = (product) => {
    let newArray = productList.productList.filter(function (f) {
      return f !== product;
    });
    console.log("--");

    console.log(setProductList);
    console.log(newArray); // ["one", "three"]
  };

  return (
    <Grid container spacing="30">
      {productList.productList.map((product) => (
        <Grid item xs={12} md={4} key={product.id}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {data.find(1)}
              </Typography>

              <Typography variant="h5" component="div">
                {product.name}
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
                <Button onClick={() => handleDeleteItem(product)} size="small">
                  Удалить
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
