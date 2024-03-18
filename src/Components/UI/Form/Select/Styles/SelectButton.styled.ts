import styled from 'styled-components';

const SelectButtonStyled = styled.button`
  background-color: ${(props) => props.theme.colors.white};
  border: ${(props) => props.theme.border};
  padding: 8px;
  width: 200px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.colors.black.light};
`;

export default SelectButtonStyled;
