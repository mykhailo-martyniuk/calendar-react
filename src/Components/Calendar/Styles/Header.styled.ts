import styled from 'styled-components';

const HeaderStyled = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  & > h2 {
    text-align: center;
    color: ${(props) => props.theme.colors.black.dark};
  }
`;

export default HeaderStyled;
