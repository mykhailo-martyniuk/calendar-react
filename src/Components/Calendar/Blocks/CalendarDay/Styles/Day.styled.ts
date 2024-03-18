import styled from 'styled-components';

export type DayStyledProps = {
  $variant?: 'currentMonth';
};

const DayStyled = styled.div<DayStyledProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 8px;
  border-radius: ${(props) => props.theme.borderRadius};
  text-align: center;
  background-color: ${(props) =>
    props.$variant === 'currentMonth' ? props.theme.colors.gray.middle : props.theme.colors.gray.light};
`;

export default DayStyled;
