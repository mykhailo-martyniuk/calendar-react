import styled from 'styled-components';

type DayNumberStyledProps = {
  $selected: boolean;
  $size: 'normal' | 'large';
};
const DayNumberStyled = styled.div<DayNumberStyledProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => (props.$size === 'large' ? props.theme.font.xxl : props.theme.font.xl)};
  height: ${(props) => (props.$size === 'large' ? '36px' : '24px')};
  width: ${(props) => (props.$size === 'large' ? '36px' : '24px')};
  //text-align: center;
  color: ${(props) => (props.$selected ? props.theme.colors.white : 'inherit')};
  border-radius: 50%;
  background-color: ${(props) => (props.$selected ? props.theme.colors.blue.middle : 'inherit')};
`;

export default DayNumberStyled;
