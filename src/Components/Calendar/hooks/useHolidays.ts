import { useQuery } from '@tanstack/react-query';
import ApiPublicHoliday from '@/Services/Api/ApiPublicHoliday.generated.ts';
import { TaskType } from '@/Components/Calendar/calendar.types.ts';
import calendarUtils from '@/Components/Calendar/calendarUtils.ts';
import { filterByUniqueProperty } from '@/utils/helpers.ts';

const useHolidays = (currentMonth: Date, tasks: TaskType[]) => {
  const userLanguage: string = navigator.language;
  const countryCode: string | undefined = new Intl.Locale(userLanguage).region;

  const { data } = useQuery({
    queryKey: ['holidays', countryCode],
    queryFn: () => ApiPublicHoliday.publicHolidaysV3(currentMonth.getFullYear(), countryCode || 'UA'),
    select: (data) => (data?.data ? { data: filterByUniqueProperty(data.data, 'name') } : { data: [] }),
  });

  const holidaysTasks: TaskType[] = data?.data ? calendarUtils.mapHolidayToTask(data.data, tasks) : [];
  return {
    holidaysTasks,
  };
};

export default useHolidays;
