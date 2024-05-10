import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Color } from './Color';

interface CustomInputProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  placeholder: string;
}

const CustomInputWithIcon: React.FC<CustomInputProps> = ({ icon: IconComponent, label, ...rest }) => {
  return (
    <TextField
      variant="outlined"
      label={label}
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconComponent />
          </InputAdornment>
        ),
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          color: Color.dark,
          fontFamily: "Poppins",
          height: '3rem',
          borderRadius: '3rem',
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: Color.border,
          },
        },
      }}
      {...rest}
    />
  );
};

export default CustomInputWithIcon;
