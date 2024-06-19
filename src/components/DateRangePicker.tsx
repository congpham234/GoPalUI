import React from 'react';
import { DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
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
      className="range-picker"
      onChange={props.onChange}
      disabledDate={disabledDate}
    />
  );
}

export default DateRangePicker;
