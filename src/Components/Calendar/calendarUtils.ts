import {
  eachDayOfInterval,
  endOfMonth,
  startOfMonth,
  addDays,
  getDay,
  subMonths,
  isSameMonth,
  format,
  isSunday,
  isMonday,
  isTuesday,
} from 'date-fns';
import { TaskType } from '@/Components/Calendar/calendar.types.ts';
import { PublicHolidayV3Dto } from '@/types/types.generated.ts';

const getDaysOfMonth = (date: Date): Date[] => {
  const firstDayOfMonth = startOfMonth(date);
  const lastDayOfMonth = endOfMonth(date);

  return eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });
};

const getCountOfDaysFromPrevMonth = (date: Date): number => {
  const firstDayOfMonth = startOfMonth(date);
  return getDay(firstDayOfMonth);
};

const getCountOfDaysFromNextMonth = (date: Date): number => {
  const lastDayOfMonth = endOfMonth(date);
  return 7 - (getDay(lastDayOfMonth) + 1);
};

const getLastDaysOfPreviousMonth = (date: Date, count: number): Date[] => {
  if (count <= 0) return [];

  const lastDayOfPreviousMonth = endOfMonth(subMonths(date, 1));

  const startDate = addDays(lastDayOfPreviousMonth, -count + 1);

  return eachDayOfInterval({
    start: startDate,
    end: lastDayOfPreviousMonth,
  });
};

const getFirstDaysOfNextMonth = (date: Date, count: number): Date[] => {
  if (count <= 0) return [];

  const firstDayOfNextMonth = startOfMonth(addDays(endOfMonth(date), 1));
  const endDate = addDays(firstDayOfNextMonth, count - 1);

  const lastDayOfNextMonth = endOfMonth(firstDayOfNextMonth);
  if (endDate > lastDayOfNextMonth) {
    return eachDayOfInterval({
      start: firstDayOfNextMonth,
      end: lastDayOfNextMonth,
    });
  }

  return eachDayOfInterval({
    start: firstDayOfNextMonth,
    end: endDate,
  });
};

const calendarUtils = {
  getDays(date: Date) {
    const lastDaysOfPreviousMonth = getLastDaysOfPreviousMonth(date, getCountOfDaysFromPrevMonth(date));
    const daysOfCurrentMonth = getDaysOfMonth(date);
    const firstDaysOfNextMonth = getFirstDaysOfNextMonth(date, getCountOfDaysFromNextMonth(date));

    return [...lastDaysOfPreviousMonth, ...daysOfCurrentMonth, ...firstDaysOfNextMonth];
  },

  getDayVariant(date: Date, currentMonth: Date): 'currentMonth' | undefined {
    if (isSameMonth(currentMonth, date)) return 'currentMonth';
  },

  getNewId<T extends object>(arr: T[], key: keyof T): number {
    return Math.max(...arr.map((task) => task[key] as number)) + 1;
  },

  mapHolidayToTask(holidays: PublicHolidayV3Dto[], tasks: TaskType[]): TaskType[] {
    return holidays
      .map((holiday) =>
        holiday.date
          ? {
              title: holiday.name,
              date: new Date(holiday.date),
              labels: [],
              isHoliday: true,
              id: calendarUtils.getNewId(tasks, 'id'),
            }
          : undefined
      )
      .filter(Boolean) as TaskType[];
  },

  getTasksByDate(tasks: TaskType[]) {
    return tasks.reduce((acc: { [key: string]: TaskType[] }, task) => {
      const dateKey = format(task.date, 'yyyy-MM-dd');
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(task);
      return acc;
    }, {});
  },

  getModalPosition(day: Date, event: React.MouseEvent<HTMLDivElement>) {
    const showOnLeft = !(isSunday(day) || isMonday(day) || isTuesday(day));
    const rect = event.currentTarget.getBoundingClientRect();
    if (showOnLeft) return { top: rect.top - 50, left: rect.left - 410 };
    return { top: rect.top - 50, left: rect.right + 10 };
  },
};

export default calendarUtils;
