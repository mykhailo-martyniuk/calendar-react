import { useState } from 'react';
import InputStyled from '@/Components/UI/Form/Input/Styles/Input.styled.ts';

type InputProps = {
  onChange: (value: string) => void;
  defaultValue?: string;
  placeholder?: string;
};
const Input = ({ onChange, defaultValue = '', placeholder = '' }: InputProps) => {
  const [inputValue, setInputValue] = useState(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onChange(value);
  };

  return <InputStyled type="text" value={inputValue} onChange={handleChange} placeholder={placeholder} />;
};

export default Input;
