export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function parseISODate(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function toISODate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export function addDays(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
}

export function mondayOf(date: Date): Date {
  const current = startOfDay(date);
  const weekday = current.getDay();
  const shift = weekday === 0 ? -6 : 1 - weekday;
  return addDays(current, shift);
}

export function formatLongDate(value: string): string {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parseISODate(value));
}

export function formatDayMonth(value: string): string {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "short",
  }).format(parseISODate(value));
}

export function formatWeekday(value: string): string {
  const label = new Intl.DateTimeFormat("ru-RU", { weekday: "short" }).format(
    parseISODate(value),
  );
  return label.replace(".", "");
}

export function formatWeekRange(weekStart: string): string {
  const end = toISODate(addDays(parseISODate(weekStart), 6));
  return `${formatDayMonth(weekStart)} — ${formatDayMonth(end)}`;
}

export function formatMonthTitle(date: Date): string {
  const title = new Intl.DateTimeFormat("ru-RU", {
    month: "long",
    year: "numeric",
  }).format(date);
  return title.charAt(0).toUpperCase() + title.slice(1);
}

export function ageFrom(birthDate: string, on = new Date()): number {
  const birth = parseISODate(birthDate);
  let age = on.getFullYear() - birth.getFullYear();
  const monthShift = on.getMonth() - birth.getMonth();
  if (monthShift < 0 || (monthShift === 0 && on.getDate() < birth.getDate())) {
    age -= 1;
  }
  return age;
}

export function monthCells(anchor: Date): Array<Date | null> {
  const year = anchor.getFullYear();
  const month = anchor.getMonth();
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: Array<Date | null> = Array.from({ length: firstWeekday }, () => null);
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(new Date(year, month, day));
  }
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }
  return cells;
}
