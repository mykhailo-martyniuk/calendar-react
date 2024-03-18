import styled from 'styled-components';

const CalendarGridStyled = styled.div`
  position: relative;
  gap: 8px;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(7, minmax(120px, 1fr));
  grid-template-rows: 30px;
  grid-auto-rows: 184px;
  text-align: center;
`;

export default CalendarGridStyled;
