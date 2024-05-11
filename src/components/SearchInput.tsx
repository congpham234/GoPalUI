import React from 'react'
import { FiSearch } from 'react-icons/fi'
import { Input } from 'antd'
import { Color } from './Color'
import './SearchInput.scss'

interface SearchInputProps {
  placeholder: string
  handleOnChange: (value: string) => void
}

function SearchInput(props: SearchInputProps) {
  const { placeholder, handleOnChange } = props

  return (
    <Input
      placeholder={placeholder}
      prefix={<FiSearch />}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        handleOnChange(e.target.value)
      }}
      style={{
        height: '3rem',
        width: '100%',
        borderRadius: '3rem',
        borderColor: Color.border,
        fontFamily: 'Poppins',
        fontSize: '1rem',
        color: Color.dark,
      }}
    />
  )
}

export default SearchInput
