import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import InputAdornment from '@mui/material/InputAdornment';
import { FiCalendar } from "react-icons/fi";

export default function CustomDateRangePicker() {
  const handleDateChange = (date: any) => {
    // Define your logic to handle the date change here
    console.log('Selected date:', date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
        label=""
        onChange={handleDateChange}
        slotProps={{
          textField: {
            sx: {
              size: '3rem', // Set the height to 3rem
              borderRadius: '3rem', // Set the border radius to 3rem
              width: 300
            },
            InputProps: {
              startAdornment: (
                <InputAdornment position="start">
                  <FiCalendar />
                </InputAdornment>
              ),
            },
          },
        }}
        // sx={{ 
        //     height: '3rem', // Set the height to 3rem
        //     borderRadius: '3rem', // Set the border radius to 3rem 
        //     width: 300 }}
      />
    </LocalizationProvider>
  );
}
