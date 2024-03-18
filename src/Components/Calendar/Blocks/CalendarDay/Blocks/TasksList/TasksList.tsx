import Task from '@/Components/Calendar/Blocks/CalendarDay/Blocks/Task/Task.tsx';
import { format } from 'date-fns';
import DndList from '@/Components/DndList/DndList.tsx';
import { TaskType } from '@/Components/Calendar/calendar.types.ts';

type TasksListProps = {
  day: Date;
  dayTasks: TaskType[];
  searchValue: string;
  onTaskClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, item: TaskType) => void;
  onTasksReordering: (tasks: TaskType[]) => void;
  onTaskReassign: (task: TaskType, newDay: Date) => void;
};
const TasksList = ({ day, dayTasks, searchValue, onTaskClick, onTasksReordering, onTaskReassign }: TasksListProps) => {
  return (
    <DndList
      data={dayTasks}
      keyExtractor={(task) => task.id}
      ListItem={(props) => <Task searchValue={searchValue} {...props} />}
      isItemDraggable={(item) => !item.isHoliday}
      isItemClickable={(item) => !item.isHoliday}
      onDragEnd={(data) => onTasksReordering(data)}
      onItemClick={onTaskClick}
      onItemDroppedAnotherDndList={onTaskReassign}
      containerDataValue={format(day, 'yyyy-MM-dd')}
      containerDataName="data-day"
      styles={{
        display: 'flex',
        flexDirection: 'column',
        width: ' 100%',
        gap: '8px;',
      }}
    />
  );
};

export default TasksList;
