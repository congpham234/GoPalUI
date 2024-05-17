import React from 'react';
import { DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { Color } from './Color';
import './DateRangePicker.scss';

interface DateRangePickerProps {
  onChange: (dates: any | null, dateStrings: [string, string]) => void;
}

function DateRangePicker(props: DateRangePickerProps) {
  const { RangePicker } = DatePicker;

  // Function to disable dates before today
  const disabledDate = (current: Dayjs | null): boolean => {
    return current ? current < dayjs().startOf('day') : false;
  };

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
      disabledDate={disabledDate}
    />
  );
}

export default DateRangePicker;
