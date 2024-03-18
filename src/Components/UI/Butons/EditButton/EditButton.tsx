import UiButtonStyled from '../../UiButton/UiButton.styled';
import { useTheme } from 'styled-components';
import PencilIcon from '@/Components/UI/Icons/PencilIcon.tsx';

type EditButtonProps = {
  onClick: () => void;
};
const EditButton = ({ onClick }: EditButtonProps) => {
  const theme = useTheme();

  return (
    <UiButtonStyled $variant="transparent" onClick={onClick}>
      <PencilIcon color={theme.colors.black.dark} />
    </UiButtonStyled>
  );
};

export default EditButton;
