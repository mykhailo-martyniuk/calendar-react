import { useState } from 'react';
import styled from 'styled-components';

type ColorPickerProps = {
  onChange: (color: string) => void;
  defaultColor?: string;
};

const StyledColorPickerContainer = styled.div`
  display: flex;
`;

const ColorPicker = ({ defaultColor = '#ffffff', onChange }: ColorPickerProps) => {
  const [color, setColor] = useState<string>(defaultColor); // Default color

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setColor(value);
    onChange(value);
  };

  return (
    <StyledColorPickerContainer>
      <input type="color" value={color} onChange={handleChange} />
      {/* <div style={{ width: '10px', height: '10px', backgroundColor: color }}></div> */}
    </StyledColorPickerContainer>
  );
};

export default ColorPicker;
