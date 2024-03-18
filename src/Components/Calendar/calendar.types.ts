export type TaskType = {
  id: number;
  date: Date;
  title: string;
  labels: LabelType[];
  isHoliday: boolean;
};

export type LabelType = {
  color: string;
  title: string;
  id: number;
};
