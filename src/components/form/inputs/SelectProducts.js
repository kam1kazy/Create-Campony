import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct } from "../../../redux/slice/productsSlice";

import {
  Box,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Chip,
  FormHelperText,
  ListSubheader,
  CardMedia,
  Typography,
} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, groupName, theme) {
  return {
    fontWeight:
      groupName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function SelectProducts({ label, data, helperText }) {
  const theme = useTheme();
  const [groupName, setGroupName] = useState([]);

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productsReducer.goods);

  const handleSelectItem = (item) => {
    if (!productList.includes(item)) {
      dispatch(addProduct({ item }));
      setGroupName([...groupName, item.name]);
    } else {
      dispatch(removeProduct({ item }));
      const arr = groupName.filter((element) => element !== item.name);
      setGroupName(arr);
    }
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="multiple-chip-label">{label}</InputLabel>

        <Select
          labelId="multiple-chip-label"
          id="multiple-chip"
          multiple
          value={groupName}
          input={<OutlinedInput id="select-multiple-chip" label={label} />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {groupName.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {data.map((item, id) => {
            return (
              <div key={item.id}>
                <ListSubheader>{item.name}</ListSubheader>
                {item.products.map((item) => (
                  <MenuItem
                    key={item.id}
                    onClick={() => handleSelectItem(item)}
                    value={item.name}
                    style={getStyles(item.name, groupName, theme)}
                    sx={{ flexFlow: "row", alignItems: "flex-start" }}
                  >
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt={item.name}
                      sx={{
                        objectFit: "contain",
                        maxWidth: "60px",
                        maxHeight: "60px",
                        mr: 2,
                      }}
                    />
                    <Box
                      sx={{
                        justifyContent: "space-between",
                        display: "flex",
                        width: "100%",
                      }}
                    >
                      <Box>
                        <Typography variant="p" sx={{ mb: 1 }}>
                          {item.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          display="block"
                          color="text.secondary"
                        >
                          {item.categories}
                        </Typography>
                      </Box>
                      <Typography variant="caption">№{item.id}</Typography>
                    </Box>
                  </MenuItem>
                ))}
              </div>
            );
          })}
        </Select>

        {helperText ? (
          <FormHelperText sx={{ mt: 2 }}>
            Выберите от 1 до 50 предметов
          </FormHelperText>
        ) : null}
      </FormControl>
    </div>
  );
}
