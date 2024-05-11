import React from 'react'
import { FiSearch } from 'react-icons/fi'
import { Input } from 'antd'
import { Color } from './Color'
import './NewInput.scss'

const NewInput: React.FC = () => (
  <>
    <Input
      placeholder="Search by city or town"
      prefix={<FiSearch />}
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
  </>
)

export default NewInput
