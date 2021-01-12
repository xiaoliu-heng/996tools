export type SalaryInput = {
  focus: boolean;
  salary: number;
};

export enum SalaryType {
  Basic = "BASIC",
  WeekDays = "WEEKDAYS",
  Weekends = "WEEKENDS",
}
