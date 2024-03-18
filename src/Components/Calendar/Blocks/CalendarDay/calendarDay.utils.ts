import { isMonday, isSunday, isTuesday } from 'date-fns';

export const MAX_TASKS_WITHOUT_OVERFLOW = 3;

export const calendarDayUtils = {
  getModalPosition(day: Date, dayTasksLength: number) {
    const showOnLeft = !(isSunday(day) || isMonday(day) || isTuesday(day));
    if (showOnLeft) return { top: -25 * (dayTasksLength - 3), left: -50 };
    return { top: -25 * (dayTasksLength - MAX_TASKS_WITHOUT_OVERFLOW), left: 20 };
  },
};
