import styled from 'styled-components';

export type TaskStyledProps = {
  $variant?: 'new' | 'found' | 'holiday' | 'transparent';
};

const TaskStyled = styled.div<TaskStyledProps>`
  width: 100%;
  padding: 4px 6px;
  cursor: pointer;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  border-radius: ${(props) => props.theme.borderRadius};
  font-size: ${(props) => props.theme.font.base};
  background-color: ${(props) => {
    switch (props.$variant) {
      case 'new':
        return props.theme.colors.blue.light;
      case 'found':
        return props.theme.colors.blue.dark;
      case 'holiday':
        return props.theme.colors.green;
      case 'transparent':
        return 'inherit';
      default:
        return props.theme.colors.white;
    }
  }};
`;

export default TaskStyled;
