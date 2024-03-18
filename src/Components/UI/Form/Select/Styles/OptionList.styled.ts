import styled from 'styled-components';

const OptionsListStyled = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border: ${(props) => props.theme.border};
  border-top: none;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

export default OptionsListStyled;
