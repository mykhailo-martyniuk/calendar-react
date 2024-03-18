import { useMemo, useState } from 'react';
import { LabelType, TaskType } from '@/Components/Calendar/calendar.types.ts';
import { addDays } from 'date-fns';
import calendarUtils from '@/Components/Calendar/calendarUtils.ts';

const labelsDefault: LabelType[] = [
  {
    color: '#60BE50',
    title: 'Family',
    id: 1,
  },
  {
    color: '#01C3E1',
    title: 'Work',
    id: 2,
  },
  {
    color: '#FFAB49',
    title: 'Sport',
    id: 3,
  },
  {
    color: '#FF0000',
    title: 'Important',
    id: 4,
  },
];

const tasksDefault: TaskType[] = [
  { id: 1, date: new Date(), title: 'Run', labels: [labelsDefault[2]], isHoliday: false },
  { id: 5, date: new Date(), title: 'Work', labels: [labelsDefault[1], labelsDefault[3]], isHoliday: false },
  { id: 3, date: new Date(), title: 'Eat', labels: [], isHoliday: false },
  {
    id: 4,
    date: addDays(new Date(), 3),
    title: 'Work',
    labels: [labelsDefault[1]],
    isHoliday: false,
  },
  {
    id: 6,
    date: addDays(new Date(), 2),
    title: 'Run',
    labels: [labelsDefault[2]],
    isHoliday: false,
  },
  {
    id: 7,
    date: addDays(new Date(), 1),
    title: 'Work',
    labels: [labelsDefault[1], labelsDefault[3]],
    isHoliday: false,
  },
  {
    id: 8,
    date: addDays(new Date(), 1),
    title: 'Eat',
    labels: [],
    isHoliday: false,
  },
];

const useCalendarData = () => {
  const [tasks, setTasks] = useState<TaskType[]>(tasksDefault);
  const [labels, setLabels] = useState<LabelType[]>(labelsDefault);

  const handleEditTask = (task: TaskType) => {
    const editedTaskIndex = tasks.findIndex((t) => t.id === task.id);
    if (editedTaskIndex >= 0) {
      setTasks((prevState) => {
        const newState = [...prevState];
        newState[editedTaskIndex].title = task.title;
        newState[editedTaskIndex].labels = task.labels;
        return newState;
      });
    }
  };

  const handleAddTask = (task: TaskType) => {
    setTasks((prevState) => [...prevState, task]);
  };

  const handleTasksReordering = (tasks: TaskType[]) => {
    setTasks(tasks.filter((el) => !el.isHoliday));
  };

  const handleAddLabels = (newLabels: LabelType[]) => {
    setLabels((prevState) => [...prevState, ...newLabels]);
  };

  const handleDeleteLabels = (deletedLabelIds: number[]) => {
    const newLabels = labels.filter((el) => !deletedLabelIds.includes(el.id));
    const newLabelsIds = newLabels.map((label) => label.id);
    const tasksWithoutDeletedLabels = tasks.map((task) => ({
      ...task,
      labels: task.labels.filter((label) => newLabelsIds.includes(label.id)),
    }));
    setLabels(newLabels);
    setTasks(tasksWithoutDeletedLabels);
  };

  const handleEditLabels = (editedLabels: LabelType[]) => {
    const newLabels = [...labels];
    editedLabels.forEach((editedLabel) => {
      const editedLabelIndex = labels.findIndex((label) => label.id === editedLabel.id);
      if (editedLabelIndex >= 0) {
        newLabels[editedLabelIndex] = editedLabel;
      }
    });
    setLabels(newLabels);
  };

  const tasksByDate = useMemo(() => {
    return calendarUtils.getTasksByDate(tasks);
  }, [tasks]);

  return {
    tasks,
    tasksByDate,
    labels,
    handleEditTask,
    handleTasksReordering,
    handleAddTask,
    handleAddLabels,
    handleDeleteLabels,
    handleEditLabels,
  };
};

export default useCalendarData;
