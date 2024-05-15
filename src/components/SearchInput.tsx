import React, { useCallback, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { AutoComplete, Input } from 'antd';
import { Color } from './Color';
import './SearchInput.scss';
import debounce from 'lodash.debounce';

interface SearchInputProps {
  placeholder: string;
  onSearch: (value: string) => Promise<AutoSuggestOption[]>;
  onSelect: (key: string) => void;
}

interface AutoSuggestOption {
  key: string;
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
      }}
    >
      <img
        src={imageUrl}
        alt={title}
        style={{ marginRight: 10, width: 40, height: 40 }}
      />
      {title}
    </div>
  );
}

interface OptionType {
  key: string;
  value: string;
  label: JSX.Element; // JSX.Element for custom render
}

function SearchInput(props: SearchInputProps) {
  const {
    placeholder,
    onSearch: handleOnSearch,
    onSelect: handleOnSelect,
  } = props;

  const [options, setOptions] = useState<OptionType[]>([]);

  const debouncedSearch = useCallback(
    debounce(async (searchText: string) => {
      if (!searchText) {
        setOptions([]);
        return;
      }

      try {
        const autoSuggestOptions = await handleOnSearch(searchText);
        const filteredOptions = autoSuggestOptions.map((option) => ({
          key: option.key,
          value: option.title,
          label: AutoCompleteOptions(option.imageUrl, option.title),
        }));
        setOptions(filteredOptions);
      } catch (error) {
        console.error('Failed to fetch auto suggestions:', error);
      }
    }, 400),
    [handleOnSearch]
  );

  const onSelect = (value: string, option: OptionType) => {
    handleOnSelect(option.key);
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
