import { TaskType } from '@/Components/Calendar/calendar.types.ts';

const useTasksDnd = (
  tasks: TaskType[],
  tasksByDate: { [p: string]: TaskType[] },
  handleTasksReordering: (tasks: TaskType[]) => void
) => {
  const handleReordering = (dateKey: string, tasks: TaskType[]) => {
    const newTasks = Object.entries(tasksByDate).flatMap((el) => {
      if (el[0] !== dateKey) return el[1];
      return tasks;
    }) as TaskType[];

    handleTasksReordering(newTasks);
  };

  const handleReassign = (reassignedTask: TaskType, newDay: Date) => {
    const taskIndex = tasks.findIndex((task) => reassignedTask.id === task.id);
    if (taskIndex >= 0) {
      const newTasks = [...tasks];
      newTasks[taskIndex].date = newDay;
      handleTasksReordering([...newTasks]);
    }
  };

  return { handleReassign, handleReordering };
};

export default useTasksDnd;
