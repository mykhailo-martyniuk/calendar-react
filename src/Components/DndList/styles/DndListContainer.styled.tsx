import styled, { CSSObject } from 'styled-components';

export type DndListContainerStyledProps = {
  $styles: CSSObject;
};

const DndListContainerStyled = styled.div<DndListContainerStyledProps>`
  ${(props) => props.$styles}
`;

export default DndListContainerStyled;
