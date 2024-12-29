import { WeekDay } from "../models/WeekDay.enum";

export class WeekDayUtils {
  public static getWeekDayName = (weekDay: number): WeekDay => {
    return Object.values(WeekDay)[weekDay - 1];
  };

  public static getWeekDayNumber = (weekDayName: WeekDay): number => {
    return Object.values(WeekDay).indexOf(weekDayName) - 1;
  };
}
