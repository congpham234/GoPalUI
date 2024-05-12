import React, { useCallback, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { AutoComplete, Input } from 'antd';
import { Color } from './Color';
import './SearchInput.scss';
import debounce from 'lodash.debounce';

interface SearchInputProps {
  placeholder: string;
  handleOnSearch: (value: string) => Promise<AutoSuggestOption[]>;
}

interface AutoSuggestOption {
  imageUrl: string;
  title: string;
}

function AutoCompleteOptions(imageUrl: string, title: string) {
  return (
    <div
      className="AutoCompleteOptions"
      style={{
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'space-between',
      }}
    >
      <img src={imageUrl} alt={title} style={{ marginRight: 10 }} />
      {title}
    </div>
  );
}

interface OptionType {
  value: string;
  label: JSX.Element; // JSX.Element for custom render
}

function SearchInput(props: SearchInputProps) {
  const { placeholder, handleOnSearch } = props;

  const [options, setOptions] = useState<OptionType[]>([]);
  // debounce for 400 ms
  const debouncedSearch = useCallback(
    debounce((nextValue: string) => onSearch(nextValue), 400),
    []
  );

  const onSearch = async (searchText: string) => {
    try {
      const autoSuggestOptions = await handleOnSearch(searchText);
      const filteredOptions = autoSuggestOptions.map((option) => ({
        value: option.title,
        label: AutoCompleteOptions(option.imageUrl, option.title),
      }));
      setOptions(filteredOptions);
    } catch (error) {
      console.error('Failed to fetch auto suggestions:', error);
    }
  };

  const onSelect = (value: string) => {
    console.log('onSelect', value);
  };

  return (
    <AutoComplete
      style={{
        width: '100%',
        height: '3rem',
        borderRadius: '3rem',
      }}
      options={options}
      onSelect={onSelect}
      onSearch={debouncedSearch}
    >
      <Input
        placeholder={placeholder}
        prefix={<FiSearch />}
        style={{
          height: '3rem',
          borderRadius: '3rem',
          borderColor: Color.border,
          fontFamily: 'Poppins',
          fontSize: '1rem',
          color: Color.dark,
        }}
      />
    </AutoComplete>
  );
}

export default SearchInput;
