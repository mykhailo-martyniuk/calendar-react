import styled from 'styled-components';

export type FlexStyledProps = {
  $wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  $gap?: string;
  $content?: 'space-between' | 'space-around' | 'space-evenly' | 'flex-start' | 'flex-end' | 'center';
  $direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  $isEqualChildren?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const FlexStyled = styled.div<FlexStyledProps>`
  display: flex;
  align-items: center;
  flex-wrap: ${(props) => props.$wrap || 'nowrap'};
  gap: ${(props) => props.$gap || ''};
  justify-content: ${(props) => props.$content};
  flex-direction: ${(props) => props.$direction};
  & > * {
    width: ${(props) => (props.$direction === 'column' ? '100%' : 'auto')};
    flex: ${(props) => (props.$isEqualChildren ? 1 : undefined)};
  }
`;

export default FlexStyled;
