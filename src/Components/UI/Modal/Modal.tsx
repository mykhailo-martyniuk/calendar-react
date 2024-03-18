import ModalContainerStyled from '@/Components/UI/Modal/Styles/ModalContainer.styled.ts';
import CrossIcon from '@/Components/UI/Icons/CrossIcon.tsx';
import FlexStyled from '@/Components/UI/Styles/Flex.styled.ts';
import FooterStyled from '@/Components/UI/Modal/Styles/ModalFooter.styled.ts';
import UiButtonStyled from '../UiButton/UiButton.styled.ts';
import { useTheme } from 'styled-components';
import { Coordinates } from '@/Components/UI/Modal/modal.types.ts';

type ModalProps = {
  onClose: () => void;
  width?: number;
  height?: number;
  title?: string;
  footer?: JSX.Element;
  backgroundColor?: string;
  hasOverlay?: boolean;
  position?: Coordinates;
} & React.ComponentProps<'div'>;

const Modal = ({
  onClose,
  children,
  footer,
  height,
  position,
  backgroundColor = '',
  title = '',
  width = 500,
}: ModalProps) => {
  const theme = useTheme();

  return (
    <>
      <ModalContainerStyled
        onClick={(e: React.PointerEvent<HTMLDivElement>) => e.stopPropagation()}
        $width={width}
        $height={height}
        $backgroundColor={backgroundColor}
        style={
          position
            ? {
                position: 'absolute',
                top: position?.top,
                left: position?.left,
                right: position?.right,
                bottom: position?.bottom,
              }
            : undefined
        }
      >
        {title ? (
          <FlexStyled $content={title ? 'space-between' : 'flex-end'}>
            {title}
            <UiButtonStyled $variant="transparent" onClick={onClose}>
              <CrossIcon color={theme.colors.black.dark} />
            </UiButtonStyled>
          </FlexStyled>
        ) : (
          <UiButtonStyled
            $variant="transparent"
            onClick={onClose}
            $styles={{
              position: 'absolute',
              top: 10,
              right: 10,
            }}
          >
            <CrossIcon color={theme.colors.black.dark} />
          </UiButtonStyled>
        )}
        <div style={{ overflow: 'auto', paddingBottom: '10px', flex: 1 }}>{children}</div>
        {footer && <FooterStyled>{footer}</FooterStyled>}
      </ModalContainerStyled>
    </>
  );
};

export default Modal;
