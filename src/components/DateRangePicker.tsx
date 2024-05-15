import React from 'react';
import { DatePicker } from 'antd';
import { Color } from './Color';
import './CustomDateRangePicker.scss';

interface DateRangePickerProps {
  onChange: (dates: any | null, dateStrings: [string, string]) => void;
}

function DateRangePicker(props: DateRangePickerProps) {
  const { RangePicker } = DatePicker;

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
      onChange={props.onChange}
    />
  );
}

export default DateRangePicker;
