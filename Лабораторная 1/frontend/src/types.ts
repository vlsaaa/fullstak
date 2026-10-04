export type Gender = "female" | "male";

export type AthleteStatus = "active" | "injured" | "rest";

export type AttendanceStatus = "present" | "absent" | "late" | "excused";

export type InjurySeverity = "mild" | "moderate" | "severe";

export type InjuryStatus = "active" | "recovering" | "closed";

export type MealType = "breakfast" | "lunch" | "dinner" | "snack";

export interface Athlete {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: Gender;
  sport: string;
  groupName: string;
  phone: string;
  email: string;
  status: AthleteStatus;
  notes: string;
}

export interface TrainingPlan {
  id: number;
  title: string;
  weekStart: string;
  goal: string;
  notes: string;
}

export interface TrainingSession {
  id: number;
  planId: number;
  date: string;
  startTime: string;
  title: string;
  durationMin: number;
  location: string;
  description: string;
}

export interface AttendanceMark {
  id: number;
  sessionId: number;
  athleteId: number;
  status: AttendanceStatus;
  comment: string;
}

export interface Injury {
  id: number;
  athleteId: number;
  startedOn: string;
  expectedEnd: string | null;
  bodyPart: string;
  severity: InjurySeverity;
  status: InjuryStatus;
  description: string;
  restrictions: string;
}

export interface NutritionEntry {
  id: number;
  athleteId: number;
  date: string;
  mealType: MealType;
  description: string;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  notes: string;
}
