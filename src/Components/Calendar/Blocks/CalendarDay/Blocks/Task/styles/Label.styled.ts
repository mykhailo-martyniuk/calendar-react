import styled from 'styled-components';

const LabelStyled = styled.div`
  height: 6px;
  width: 30px;
  border-radius: 2px;
  background-color: ${(props) => props.color};
`;

export default LabelStyled;
