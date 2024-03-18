import { addMonths, format, isSameDay, subMonths } from 'date-fns';
import { useMemo, useState } from 'react';
import { LabelType, TaskType } from '@/Components/Calendar/calendar.types.ts';
import CalendarModal from '@/Components/Calendar/Blocks/CalendarModal/CalendarModal.tsx';
import CalendarDay from '@/Components/Calendar/Blocks/CalendarDay/CalendarDay.tsx';
import Input from '@/Components/UI/Form/Input/Input.tsx';
import useHolidays from '@/Components/Calendar/hooks/useHolidays.ts';
import calendarUtils from '@/Components/Calendar/calendarUtils.ts';
import CalendarGridStyled from '@/Components/Calendar/Styles/CalendarGrid.styled.ts';
import HeaderStyled from '@/Components/Calendar/Styles/Header.styled.ts';
import ContainerStyled from '@/Components/UI/Styles/Container.styled';
import useTasksDnd from '@/Components/Calendar/hooks/useTasksDnd.ts';
import FlexStyled from '../UI/Styles/Flex.styled';
import UiButtonStyled from '../UI/UiButton/UiButton.styled';
import useModal from '@/Components/UI/Modal/useModal.ts';
import useCalendarData from '@/Components/Calendar/hooks/useCalendarData.ts';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar = () => {
  const {
    tasks,
    labels,
    tasksByDate,
    handleEditTask,
    handleTasksReordering,
    handleAddTask,
    handleAddLabels,
    handleDeleteLabels,
    handleEditLabels,
  } = useCalendarData();
  const today = new Date();
  const [searchValue, setSearchValue] = useState('');
  const [currentMonth, setCurrentMonth] = useState(today);
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const [editedTask, setEditedTask] = useState<TaskType | undefined>(undefined);
  const { showModal, modalPosition, setShowModal, setModalPosition } = useModal();
  const [dayWithOpenModal, setDayWithOpenModal] = useState<Date | undefined>(undefined);

  const { holidaysTasks } = useHolidays(currentMonth, tasks);

  const holidaysByDate = useMemo(() => {
    return calendarUtils.getTasksByDate(holidaysTasks);
  }, [holidaysTasks]);

  const { handleReordering, handleReassign } = useTasksDnd(tasks, tasksByDate, handleTasksReordering);

  const handleClickPrevMonth = () => {
    setCurrentMonth((prevState) => subMonths(prevState, 1));
    setShowModal(false);
    setDayWithOpenModal(undefined);
  };

  const handleClickNextMonth = () => {
    setCurrentMonth((prevState) => addMonths(prevState, 1));
    setShowModal(false);
    setDayWithOpenModal(undefined);
  };

  const handleDayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, day: Date) => {
    setModalPosition(calendarUtils.getModalPosition(day, event));
    setSelectedDay(day);
    setShowModal(true);
    setDayWithOpenModal(undefined);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedDay(undefined);
    setEditedTask(undefined);
  };

  const days = calendarUtils.getDays(currentMonth);

  const handleSaveTask = (
    title: string,
    newLabels: LabelType[],
    createdLabels: LabelType[],
    deletedLabelsIds: number[],
    editedLabels: LabelType[]
  ) => {
    const createdLabelsWithUniqueId = createdLabels.map((label) => ({
      ...label,
      id: calendarUtils.getNewId(labels, 'id'),
    }));

    if (editedTask)
      handleEditTask({
        title,
        date: editedTask.date,
        id: editedTask.id,
        labels: [...newLabels, ...createdLabelsWithUniqueId],
        isHoliday: false,
      });
    if (selectedDay)
      handleAddTask({
        title,
        date: selectedDay,
        id: calendarUtils.getNewId(tasks, 'id'),
        labels: [...newLabels, ...createdLabelsWithUniqueId],
        isHoliday: false,
      });
    console.log(editedLabels);
    if (createdLabelsWithUniqueId.length > 0) handleAddLabels(createdLabelsWithUniqueId);
    if (editedLabels.length > 0) handleEditLabels(editedLabels);
    if (deletedLabelsIds.length > 0) handleDeleteLabels(deletedLabelsIds);
  };

  const handleTaskClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, task: TaskType) => {
    setModalPosition(calendarUtils.getModalPosition(task.date, event));
    setEditedTask(task);
    setShowModal(true);
    if (dayWithOpenModal && !isSameDay(dayWithOpenModal, task.date)) setDayWithOpenModal(undefined);
  };

  const handleDayModalOpen = (day: Date) => {
    setDayWithOpenModal(day);
  };
  const handleDayModalClose = () => {
    setDayWithOpenModal(undefined);
  };

  return (
    <>
      <ContainerStyled>
        <HeaderStyled>
          <FlexStyled $gap="8px">
            <UiButtonStyled $variant="primary" onClick={handleClickPrevMonth}>
              prev
            </UiButtonStyled>
            <UiButtonStyled $variant="primary" onClick={handleClickNextMonth}>
              next
            </UiButtonStyled>
            <h2>{format(currentMonth, 'MMMM yyyy')}</h2>
          </FlexStyled>
          <Input placeholder="search" onChange={(value) => setSearchValue(value)} />
        </HeaderStyled>
        <CalendarGridStyled>
          {WEEKDAYS.map((day) => {
            return <div key={day}>{day}</div>;
          })}
          {days.map((day) => {
            const dateKey = format(day, 'yyyy-MM-dd');
            const todayTasks = [...(holidaysByDate?.[dateKey] || []), ...(tasksByDate?.[dateKey] || [])];
            return (
              <CalendarDay
                day={day}
                key={day.valueOf()}
                isDaySelected={isSameDay(day, selectedDay || '')}
                dayTasks={todayTasks}
                variant={calendarUtils.getDayVariant(day, currentMonth)}
                isCurrentDay={isSameDay(today, day)}
                onClick={handleDayClick}
                onTaskClick={handleTaskClick}
                onTasksReordering={(tasks) => handleReordering(dateKey, tasks)}
                onTaskReassign={handleReassign}
                searchValue={searchValue}
                showModal={Boolean(dayWithOpenModal && isSameDay(dayWithOpenModal, day))}
                onOpenModal={handleDayModalOpen}
                onCloseModal={handleDayModalClose}
              />
            );
          })}
        </CalendarGridStyled>
      </ContainerStyled>
      {showModal && (
        <CalendarModal
          onClose={handleModalClose}
          onSave={handleSaveTask}
          setup={editedTask}
          allLabels={labels}
          position={modalPosition}
        />
      )}
    </>
  );
};

export default Calendar;
