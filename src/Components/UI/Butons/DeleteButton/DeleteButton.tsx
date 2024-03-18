import UiButtonStyled from '../../UiButton/UiButton.styled';
import { useTheme } from 'styled-components';
import DeleteIcon from '@/Components/UI/Icons/DeleteIcon.tsx';

type DeleteButtonProps = {
  onClick: () => void;
};
const DeleteButton = ({ onClick }: DeleteButtonProps) => {
  const theme = useTheme();

  return (
    <UiButtonStyled $variant="transparent" onClick={onClick}>
      <DeleteIcon color={theme.colors.red} />
    </UiButtonStyled>
  );
};

export default DeleteButton;
