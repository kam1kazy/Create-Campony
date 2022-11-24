import React from "react";
import { Button, Stack } from "@mui/material";

export default function FormButtons({ name }) {
  return (
    <Stack direction="row" spacing={2} sx={{ mt: 2, mb: 5, mr: 2 }}>
      <Button variant="outlined">{name}</Button>
    </Stack>
  );
}
