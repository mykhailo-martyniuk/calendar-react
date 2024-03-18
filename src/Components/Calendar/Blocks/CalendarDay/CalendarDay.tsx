import { format } from 'date-fns';
import { TaskType } from '@/Components/Calendar/calendar.types.ts';
import TaskStyled from '@/Components/Calendar/Blocks/CalendarDay/Blocks/Task/styles/Task.styled.ts';
import DayStyled from '@/Components/Calendar/Blocks/CalendarDay/Styles/Day.styled.ts';
import DayNumberStyled from '@/Components/Calendar/Blocks/CalendarDay/Styles/DayNumber.styled.ts';
import Modal from '@/Components/UI/Modal/Modal.tsx';
import TasksList from '@/Components/Calendar/Blocks/CalendarDay/Blocks/TasksList/TasksList.tsx';
import { useTheme } from 'styled-components';
import FlexStyled from '@/Components/UI/Styles/Flex.styled.ts';
import Task from '@/Components/Calendar/Blocks/CalendarDay/Blocks/Task/Task.tsx';
import { useEffect } from 'react';
import {
  calendarDayUtils,
  MAX_TASKS_WITHOUT_OVERFLOW,
} from '@/Components/Calendar/Blocks/CalendarDay/calendarDay.utils.ts';

type CalendarDayProps = {
  day: Date;
  isDaySelected: boolean;
  isCurrentDay: boolean;
  dayTasks: TaskType[];
  variant: 'currentMonth' | undefined;
  searchValue: string;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, day: Date) => void;
  onTaskClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, item: TaskType) => void;
  onTasksReordering: (tasks: TaskType[]) => void;
  onTaskReassign: (task: TaskType, newDay: Date) => void;
  showModal: boolean;
  onOpenModal: (day: Date) => void;
  onCloseModal: () => void;
};

const CalendarDay = ({
  day,
  variant,
  isDaySelected,
  isCurrentDay,
  dayTasks,
  searchValue,
  onClick,
  onTaskClick,
  onTasksReordering,
  onTaskReassign,
  showModal,
  onOpenModal,
  onCloseModal,
}: CalendarDayProps) => {
  const theme = useTheme();
  const isDayOverflow = dayTasks.length > MAX_TASKS_WITHOUT_OVERFLOW;

  const handleMoreTasksClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    onOpenModal(day);
  };

  useEffect(() => {
    if (dayTasks.length <= MAX_TASKS_WITHOUT_OVERFLOW && dayTasks.length > 0) onCloseModal();
  }, [dayTasks.length]);

  return (
    <DayStyled onClick={(e) => onClick(e, day)} $variant={variant} data-day={format(day, 'yyyy-MM-dd')}>
      <DayNumberStyled $selected={isCurrentDay} $size="normal">
        {format(day, 'd')}
      </DayNumberStyled>
      {isDaySelected && <TaskStyled $variant="new">(Without title)</TaskStyled>}

      {isDayOverflow ? (
        <>
          {dayTasks.slice(0, MAX_TASKS_WITHOUT_OVERFLOW - 1).map((task) => (
            <Task key={task.id} item={task} searchValue={searchValue} onClick={handleMoreTasksClick} />
          ))}
          <TaskStyled
            onClick={handleMoreTasksClick}
            $variant={
              searchValue && dayTasks.slice(2).some((el) => el.title.toLowerCase().includes(searchValue.toLowerCase()))
                ? 'found'
                : 'transparent'
            }
          >
            and {dayTasks.length - MAX_TASKS_WITHOUT_OVERFLOW + 1} more
          </TaskStyled>
        </>
      ) : (
        <TasksList
          day={day}
          dayTasks={dayTasks}
          searchValue={searchValue}
          onTaskClick={onTaskClick}
          onTasksReordering={onTasksReordering}
          onTaskReassign={onTaskReassign}
        />
      )}
      {showModal && (
        <Modal
          onClose={onCloseModal}
          width={200}
          backgroundColor={theme.colors.gray.light}
          position={calendarDayUtils.getModalPosition(day, dayTasks.length)}
        >
          <FlexStyled $direction="column" $gap="10px">
            <FlexStyled $direction="column">
              <span style={{ fontSize: theme.font.base }}>{format(day, 'EEE')}</span>
              <DayNumberStyled $selected={isCurrentDay} $size="large">
                {format(day, 'd')}
              </DayNumberStyled>
            </FlexStyled>
            <TasksList
              day={day}
              dayTasks={dayTasks}
              searchValue={searchValue}
              onTaskClick={onTaskClick}
              onTasksReordering={onTasksReordering}
              onTaskReassign={onTaskReassign}
            />
          </FlexStyled>
        </Modal>
      )}
    </DayStyled>
  );
};

export default CalendarDay;
