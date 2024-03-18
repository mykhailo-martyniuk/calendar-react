import { useEffect, useRef, useState } from 'react';
import { Option } from '@/Components/UI/Form/Select/select.types.ts';
import OptionsListStyled from '@/Components/UI/Form/Select/Styles/OptionList.styled.ts';
import SelectContainerStyled from '@/Components/UI/Form/Select/Styles/SelectContainer.styled.ts';
import SelectButtonStyled from '@/Components/UI/Form/Select/Styles/SelectButton.styled.ts';
import OptionStyled from '@/Components/UI/Form/Select/Styles/Option.styled.ts';

type SelectProps = {
  options: Option[];
  onSelect: (option: Option) => void;
  placeholder?: string;
  isFocus?: boolean;
};

const Select = ({ options, onSelect, placeholder = '', isFocus = false }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(isFocus);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const closeSelect = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', closeSelect);

    return () => document.removeEventListener('mousedown', closeSelect);
  }, []);

  return (
    <SelectContainerStyled ref={ref}>
      <SelectButtonStyled onClick={toggleOptions}>
        {selectedOption ? selectedOption.label : placeholder}
        <span>&#9660;</span>
      </SelectButtonStyled>
      {isOpen && (
        <OptionsListStyled>
          {options.map((option) => (
            <OptionStyled key={option.value} onClick={() => handleSelect(option)}>
              {option.label}
            </OptionStyled>
          ))}
        </OptionsListStyled>
      )}
    </SelectContainerStyled>
  );
};

export default Select;
