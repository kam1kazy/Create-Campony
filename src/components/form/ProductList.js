import React from "react";
import {
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  CardMedia,
} from "@mui/material";

import { useSelector } from "react-redux";

export default function ProductList() {
  const productList = useSelector((state) => state.productsReducer.goods);

  return (
    <Grid container spacing="30">
      {productList.map((product) => (
        <Grid item xs={12} md={4} key={product.id}>
          <Card sx={{ minWidth: 275 }}>
            <CardHeader subheader={product.categories} />
            <CardMedia
              component="img"
              height="194"
              image={product.image}
              alt={product.name}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                {product.name}
              </Typography>

              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Номер товара: {product.id}
              </Typography>

              <Typography sx={{ mb: 1 }} variant="body2">
                {product.desc}
              </Typography>

              <Typography sx={{ mb: 2 }} variant="body2">
                {'"a benevolent smile"'}
              </Typography>

              <CardActions>
                <Button onClick={() => product} size="small">
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
