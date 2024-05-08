import React, { useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select'; // Import SelectChangeEvent
import MenuItem from '@mui/material/MenuItem';
import { FormControl, InputAdornment } from '@mui/material';
import Typography from './Typography';

interface CustomSelectProps {
  icon: React.ReactNode;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ icon }) => {
  const [selectedValue, setSelectedValue] = useState<string>('');


  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <FormControl>
      <Select
        value={selectedValue}
        onChange={handleChange}
        displayEmpty
        inputProps={{
          startadornment: (
            <InputAdornment position="end">
              {icon}
            </InputAdornment>
          ),
        }}
        sx={{
          height: '3rem',
          width: '20rem',
          borderRadius: '3rem',
          borderColor: '#aaa',
          '&:focus': {
            borderColor: '#007bff',
          },
        }}
      >
        <MenuItem value="" disabled><Typography variant='body'>
          Select an option
        </Typography>
        </MenuItem>
        <MenuItem value="option1">Option 1</MenuItem>
        <MenuItem value="option2">Option 2</MenuItem>
        <MenuItem value="option3">Option 3</MenuItem>
      </Select>
    </FormControl>
  );
}

export default CustomSelect;
