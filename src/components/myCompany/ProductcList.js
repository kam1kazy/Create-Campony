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

import { useSelector, useDispatch } from "react-redux";
import { removeProduct } from "../../redux/slice/productsSlice";

export default function ProductList() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productsReducer.goods);
  const stepCount = useSelector((state) => state.stepCountReducer.step);

  const handleDeleteItem = (product) => {
    if (!productList.includes(product.id)) {
      dispatch(removeProduct(product));
    }
  };

  return (
    <>
      {!productList.length > 0 ? (
        <Typography
          variant="h6"
          component="p"
          sx={{ textAlign: "center", opacity: 0.2, mb: 5, mt: 5 }}
        >
          Здесь будут отображаться, выбранный Вами ассортимент
        </Typography>
      ) : null}

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
                <Typography sx={{ mb: 1 }} variant="h5" component="div">
                  {product.name}
                </Typography>

                <Typography sx={{ mb: 2.5 }} color="text.secondary">
                  Номер товара: {product.id}
                </Typography>

                {stepCount === 2 ? null : (
                  <>
                    <Typography sx={{ mb: 1 }} variant="body2">
                      {product.desc}
                    </Typography>

                    <Typography sx={{ mb: 2 }} variant="body2">
                      {'"a benevolent smile"'}
                    </Typography>

                    <CardActions>
                      <Button
                        onClick={() => handleDeleteItem(product)}
                        size="small"
                      >
                        Удалить
                      </Button>
                    </CardActions>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
