import styled from 'styled-components';

const OptionStyled = styled.li`
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.gray.light};
  }
`;

export default OptionStyled;
