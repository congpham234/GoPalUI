import React, { useState } from 'react';
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { FiUser } from 'react-icons/fi';
import { Color } from './Color';

const MySelectComponent = () => {
  const [selectedValue, setSelectedValue] = useState<string>('1 person');

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <Select
        value={selectedValue}
        onChange={handleChange}
        displayEmpty
        renderValue={(value) => {
          console.log(value);
          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <FiUser style={{ marginRight: '8px' }} />
              {value}
            </Box>
          );
        }}
        sx={{
          height: '3rem',
          borderRadius: '3rem',
          '& .MuiSelect-select': {
            color: Color.dark,
            fontFamily: 'Poppins',
          },
        }}
      >
        <MenuItem value="1 person">1 person</MenuItem>
        <MenuItem value="2 people">2 people</MenuItem>
        <MenuItem value="3 people">3 people</MenuItem>
        <MenuItem value="4 people">4 people</MenuItem>
        <MenuItem value="5 people">5 people</MenuItem>
        <MenuItem value="6 people">6 people</MenuItem>
      </Select>
    </FormControl>
  );
};

export default MySelectComponent;
