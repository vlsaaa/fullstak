import type {
  AthleteStatus,
  AttendanceStatus,
  Gender,
  InjurySeverity,
  InjuryStatus,
  MealType,
} from "../types.ts";

export const genderLabel: Record<Gender, string> = {
  female: "жен.",
  male: "муж.",
};

export const athleteStatusLabel: Record<AthleteStatus, string> = {
  active: "В строю",
  injured: "Травма",
  rest: "Отдых",
};

export const attendanceLabel: Record<AttendanceStatus, string> = {
  present: "Был",
  absent: "Не был",
  late: "Опоздал",
  excused: "Уважительная",
};

export const injuryStatusLabel: Record<InjuryStatus, string> = {
  active: "Острая",
  recovering: "Восстановление",
  closed: "Закрыта",
};

export const severityLabel: Record<InjurySeverity, string> = {
  mild: "Лёгкая",
  moderate: "Средняя",
  severe: "Тяжёлая",
};

export const mealLabel: Record<MealType, string> = {
  breakfast: "Завтрак",
  lunch: "Обед",
  dinner: "Ужин",
  snack: "Перекус",
};
