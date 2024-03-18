import styled from 'styled-components';

type ModalContainerStyledProps = {
  $width: number;
  $backgroundColor: string;
  $height?: number;
};

const ModalContainerStyled = styled.div<ModalContainerStyledProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 4px 8px 8px 8px;
  width: ${(props) => props.$width + 'px'};
  height: ${(props) => (props?.$height ? props.$height + 'px' : 'auto')};
  background-color: ${(props) => props.$backgroundColor || props.theme.colors.white};
  overflow: ${(props) => (props?.$height ? 'auto' : 'visible')};
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.35) 0 5px 15px;
  z-index: 99;
`;

export default ModalContainerStyled;
