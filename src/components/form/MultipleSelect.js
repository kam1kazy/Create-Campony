import React, {useEffect, useState} from 'react';
import { useTheme } from '@mui/material/styles';

import {Box, OutlinedInput, InputLabel, MenuItem, FormControl, Select, Chip, FormHelperText } from '@mui/material';

import { useUpdateProductMutation } from '../../redux'

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

export default function MultipleSelect({ label, data, helperText, productList }) {
  const theme = useTheme();
  const [groupName, setGroupName] = useState([]);
  const [updateProduct] = useUpdateProductMutation()

  const handleUpdateProduct = async (id) => {
    await updateProduct({
      id: id,
      patch: {
        active: true
      }
    }).unwrap()
  }
   
  const handleDelete = () => {
    // сделать на удаление смену Active у элементов Goods
  };

  // console.log(groupName);

  const handleChange = (event) => {
    const { target: { value } } = event;
    setGroupName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="multiple-chip-label">{ label }</InputLabel>

        <Select
          labelId="multiple-chip-label"
          id="multiple-chip"
          multiple
          value={groupName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label={ label } />}
          renderValue={(selected) => (
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} onDelete={handleDelete}/>
              ))}
            </Box>

          )}
          MenuProps={MenuProps}
        >
    
          {data.map((product) => (
            <MenuItem
              key={product.id}
              onClick={() => handleUpdateProduct(product.id)}
              value={product.name}
              style={getStyles(product.name, groupName, theme)}
            >
              {product.name}
            </MenuItem>
          ))}
          
        </Select>
        { helperText ? <FormHelperText sx={{ mt: 2 }}>Выбрите от 1 до 50 предметов</FormHelperText> : null}
      </FormControl>
    </div>
  );
}
