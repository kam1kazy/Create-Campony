import React from "react";
import {
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";

export default function ProductList(productList, setProductList) {
  console.log("productList.productList");
  console.log(productList.productList);

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
                Категория
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
