import React from 'react'
import { ConfigProvider, Select } from 'antd'
import { Color } from './Color'
import './NewSelect.scss'

const handleChange = (value: string) => {
  console.log(`selected ${value}`)
}

const NewSelect: React.FC = () => (
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
      defaultValue="1"
      style={{
        height: '3rem',
        width: '100%',
        borderColor: Color.border,
        color: Color.dark,
      }}
      onChange={handleChange}
      options={[
        { value: '1', label: '1 person' },
        { value: '2', label: '2 people' },
        { value: '3', label: '3 people' },
        { value: '4', label: '4 people' },
        { value: '5', label: '5 people' },
        { value: '6', label: '6 people' },
      ]}
    />
  </ConfigProvider>
)

export default NewSelect
