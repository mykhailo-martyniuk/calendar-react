const TaskUtils = {
  getTaskState(searchValue: string, title: string, isHoliday: boolean) {
    return searchValue && title.includes(searchValue) ? 'found' : isHoliday ? 'holiday' : undefined;
  },
};

export default TaskUtils;
