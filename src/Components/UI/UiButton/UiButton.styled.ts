import styled, { CSSObject } from 'styled-components';

type ButtonStyledProps = {
  $variant: 'primary' | 'transparent';
  $styles?: CSSObject;
};

const UiButtonStyled = styled.button<ButtonStyledProps>`
  padding: ${(props) => (props.$variant === 'transparent' ? '5px 10px' : '10px 20px')};
  font-size: 16px;
  border: none;
  border-radius: ${(props) => (props.$variant === 'transparent' ? 'inherit' : props.theme.borderRadius)};
  cursor: pointer;
  background-color: ${(props) => (props.$variant === 'transparent' ? 'inherit' : props.theme.colors.blue.middle)};
  color: ${(props) => props.theme.colors.white};
  transition: background-color ${(props) => `border-color ${props.theme.animationTime}`};

  &:hover {
    background-color: ${(props) => (props.$variant === 'transparent' ? 'inherit' : props.theme.colors.blue.hover)};
  }

  ${(props) => props.$styles}
`;
export default UiButtonStyled;
