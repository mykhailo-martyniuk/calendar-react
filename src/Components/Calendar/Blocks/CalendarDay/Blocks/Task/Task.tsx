import { TaskType } from '@/Components/Calendar/calendar.types.ts';
import TaskStyled from '@/Components/Calendar/Blocks/CalendarDay/Blocks/Task/styles/Task.styled.ts';
import LabelStyled from '@/Components/Calendar/Blocks/CalendarDay/Blocks/Task/styles/Label.styled.ts';
import FlexStyled from '@/Components/UI/Styles/Flex.styled';
import TaskUtils from '@/Components/Calendar/Blocks/CalendarDay/Blocks/Task/task.utils.ts';

type TaskProps = { item: TaskType; searchValue: string } & React.ComponentProps<'div'>;
const Task = ({ item, searchValue, ...rest }: TaskProps) => {
  return (
    <TaskStyled
      $variant={TaskUtils.getTaskState(searchValue.toLowerCase(), item.title.toLowerCase(), item.isHoliday)}
      {...rest}
    >
      <FlexStyled $wrap="nowrap" $gap="4px">
        {item.labels.map((label) => (
          <LabelStyled color={label.color} key={label.id} />
        ))}
      </FlexStyled>
      {item.title}
    </TaskStyled>
  );
};

export default Task;
