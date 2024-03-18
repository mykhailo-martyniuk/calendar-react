import CrossIcon from '@/Components/UI/Icons/CrossIcon';
import UiButtonStyled from '../../UiButton/UiButton.styled';
import { useTheme } from 'styled-components';

type CloseButtonProps = {
  onClick: () => void;
};
const CloseButton = ({ onClick }: CloseButtonProps) => {
  const theme = useTheme();

  return (
    <UiButtonStyled $variant="transparent" onClick={onClick}>
      <CrossIcon color={theme.colors.black.dark} />
    </UiButtonStyled>
  );
};

export default CloseButton;
