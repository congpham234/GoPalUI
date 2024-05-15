import React from 'react';
import { ConfigProvider, Select } from 'antd';
import { Color } from './Color';
import './SelectPeople.scss';

interface SelectPeopleProps {
  defaultValue?: string;
  onSelect: (value: string) => void;
  options?: { value: string; label: string }[];
}

function SelectPeople(props: SelectPeopleProps) {
  const {
    defaultValue = '1',
    onSelect,
    options = [
      { value: '1', label: '1 person' },
      { value: '2', label: '2 people' },
      { value: '3', label: '3 people' },
      { value: '4', label: '4 people' },
      { value: '5', label: '5 people' },
      { value: '6', label: '6 people' },
    ],
  } = props;

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            optionHeight: 48,
            optionFontSize: 16,
            optionPadding: 12,
          },
        },
      }}
    >
      <Select
        defaultValue={defaultValue}
        style={{
          height: '3rem',
          width: '100%',
          borderColor: Color.border,
          color: Color.dark,
        }}
        onChange={(value) => onSelect(value)}
        options={options}
      />
    </ConfigProvider>
  );
}

export default SelectPeople;
