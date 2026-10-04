import type { Athlete, NutritionEntry } from "../types.ts";
import {
  athletes,
  attendance,
  injuries,
  nutrition,
  plans,
  sessions,
  thisMondayISO,
  todayISO,
} from "./mock.ts";

export function fullName(athlete: Athlete): string {
  return `${athlete.lastName} ${athlete.firstName}`;
}

export function getAthlete(id: number) {
  return athletes.find((athlete) => athlete.id === id);
}

export function getPlan(id: number) {
  return plans.find((plan) => plan.id === id);
}

export function getSession(id: number) {
  return sessions.find((session) => session.id === id);
}

export function currentPlan() {
  return plans.find((plan) => plan.weekStart === thisMondayISO) ?? plans[0];
}

export function sessionsByPlan(planId: number) {
  return sessions
    .filter((session) => session.planId === planId)
    .sort(
      (left, right) =>
        left.date.localeCompare(right.date) || left.startTime.localeCompare(right.startTime),
    );
}

export function sessionsOn(isoDate: string) {
  return sessions
    .filter((session) => session.date === isoDate)
    .sort((left, right) => left.startTime.localeCompare(right.startTime));
}

export function marksForSession(sessionId: number) {
  return attendance.filter((mark) => mark.sessionId === sessionId);
}

export function marksForAthlete(athleteId: number) {
  return attendance.filter((mark) => mark.athleteId === athleteId);
}

export function injuriesForAthlete(athleteId: number) {
  return injuries.filter((injury) => injury.athleteId === athleteId);
}

export function mealsForAthlete(athleteId: number) {
  return nutrition.filter((entry) => entry.athleteId === athleteId);
}

export function upcomingSessions(limit = 4) {
  return sessions
    .filter((session) => session.date >= todayISO)
    .sort(
      (left, right) =>
        left.date.localeCompare(right.date) || left.startTime.localeCompare(right.startTime),
    )
    .slice(0, limit);
}

export function attentionAthletes() {
  return athletes.filter((athlete) => athlete.status !== "active");
}

export function attendanceRate(athleteId?: number) {
  const marks = athleteId === undefined ? attendance : marksForAthlete(athleteId);
  if (marks.length === 0) return null;
  const attended = marks.filter((mark) => mark.status === "present" || mark.status === "late").length;
  return Math.round((attended / marks.length) * 100);
}

export function activeInjuries() {
  return injuries.filter((injury) => injury.status !== "closed");
}

export function defaultSessionId() {
  const finished = sessions
    .filter((session) => session.date < todayISO)
    .sort(
      (left, right) =>
        right.date.localeCompare(left.date) || right.startTime.localeCompare(left.startTime),
    );
  return (finished[0] ?? sessions[0]).id;
}

export function nutritionTotals(entries: NutritionEntry[]) {
  return entries.reduce(
    (sum, entry) => ({
      calories: sum.calories + entry.calories,
      proteinG: sum.proteinG + entry.proteinG,
      carbsG: sum.carbsG + entry.carbsG,
      fatG: sum.fatG + entry.fatG,
    }),
    { calories: 0, proteinG: 0, carbsG: 0, fatG: 0 },
  );
}

export function reportRows() {
  return athletes
    .map((athlete) => {
      const marks = marksForAthlete(athlete.id);
      const attended = marks.filter(
        (mark) => mark.status === "present" || mark.status === "late",
      ).length;
      const meals = mealsForAthlete(athlete.id);
      const days = new Set(meals.map((meal) => meal.date)).size;
      const totals = nutritionTotals(meals);
      return {
        athlete,
        sessions: marks.length,
        attended,
        rate: marks.length ? Math.round((attended / marks.length) * 100) : null,
        avgCalories: days ? Math.round(totals.calories / days) : null,
      };
    })
    .sort((left, right) => (right.rate ?? -1) - (left.rate ?? -1));
}
