import React from 'react';
import { DatePicker } from 'antd';
import { Color } from './Color';
import './CustomDateRangePicker.scss';

const { RangePicker } = DatePicker;

const NewDateRangePicker = () => {
  return (
    <RangePicker
      size="large"
      style={{
        height: '3rem',
        width: '100%',
        borderRadius: '3rem',
        // borderColor: Color.border,
        fontFamily: 'Poppins',
        fontSize: '1rem',
        color: Color.dark,
      }}
    />
  );
};

export default NewDateRangePicker;
