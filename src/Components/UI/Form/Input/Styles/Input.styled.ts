import styled from 'styled-components';

const InputStyled = styled.input`
  padding: 10px;
  font-size: 16px;
  border: ${(props) => props.theme.border};
  border-radius: 5px;
  outline: none;
  transition: ${(props) => `border-color ${props.theme.animationTime}, box-shadow ${props.theme.animationTime}`};
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.black.dark};

  &:focus {
    border-color: ${(props) => props.theme.colors.blue.dark};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

export default InputStyled;
