import type {
  Athlete,
  AttendanceMark,
  AttendanceStatus,
  Injury,
  NutritionEntry,
  TrainingPlan,
  TrainingSession,
} from "../types.ts";
import { addDays, mondayOf, startOfDay, toISODate } from "../lib/dates.ts";

export const today = startOfDay(new Date());
export const todayISO = toISODate(today);
export const thisMonday = mondayOf(today);
export const thisMondayISO = toISODate(thisMonday);

function onMonday(offset: number): string {
  return toISODate(addDays(thisMonday, offset));
}

export const athletes: Athlete[] = [
  {
    id: 1,
    firstName: "Дмитрий",
    lastName: "Волков",
    birthDate: "2008-03-14",
    gender: "male",
    sport: "Бег 100 м",
    groupName: "Спринт-17",
    phone: "+7 (900) 100-00-01",
    email: "d.volkov@sprint.local",
    status: "active",
    notes: "Личный рекорд 10,92. Старт собран, на финише ещё теряет частоту.",
  },
  {
    id: 2,
    firstName: "Мария",
    lastName: "Лебедева",
    birthDate: "2009-07-02",
    gender: "female",
    sport: "Бег 400 м",
    groupName: "Спринт-17",
    phone: "+7 (900) 100-00-02",
    email: "m.lebedeva@sprint.local",
    status: "injured",
    notes: "Растяжение задней поверхности бедра. Ускорения и барьеры пока нельзя.",
  },
  {
    id: 3,
    firstName: "Артём",
    lastName: "Орлов",
    birthDate: "2008-11-21",
    gender: "male",
    sport: "Бег 200 м",
    groupName: "Спринт-17",
    phone: "+7 (900) 100-00-03",
    email: "a.orlov@sprint.local",
    status: "active",
    notes: "Хорошо держит вираж. Нужно спокойнее выходить из колодок.",
  },
  {
    id: 4,
    firstName: "Ева",
    lastName: "Соколова",
    birthDate: "2009-01-30",
    gender: "female",
    sport: "Бег 800 м",
    groupName: "Спринт-17",
    phone: "+7 (900) 100-00-04",
    email: "e.sokolova@sprint.local",
    status: "active",
    notes: "Равномерный темп уже есть. Не хватает ускорения за 200 м до финиша.",
  },
  {
    id: 5,
    firstName: "Илья",
    lastName: "Кузнецов",
    birthDate: "2007-05-18",
    gender: "male",
    sport: "110 м с барьерами",
    groupName: "Спринт-17",
    phone: "+7 (900) 100-00-05",
    email: "i.kuznetsov@sprint.local",
    status: "rest",
    notes: "Ахилл ноет после ритмовых. Эта неделя без барьеров, только зал и техника.",
  },
  {
    id: 6,
    firstName: "Алина",
    lastName: "Морозова",
    birthDate: "2009-09-09",
    gender: "female",
    sport: "Прыжок в длину",
    groupName: "Спринт-17",
    phone: "+7 (900) 100-00-06",
    email: "a.morozova@sprint.local",
    status: "active",
    notes: "Разбег стабильный на 16 шагов. На последнем шаге рано садится.",
  },
  {
    id: 7,
    firstName: "Никита",
    lastName: "Павлов",
    birthDate: "2008-12-01",
    gender: "male",
    sport: "400 м с барьерами",
    groupName: "Спринт-17",
    phone: "+7 (900) 100-00-07",
    email: "n.pavlov@sprint.local",
    status: "active",
    notes: "Между барьерами держит 13 шагов. Часто задерживается на разминке.",
  },
  {
    id: 8,
    firstName: "Кира",
    lastName: "Егорова",
    birthDate: "2010-04-12",
    gender: "female",
    sport: "Бег 200 м",
    groupName: "Спринт-17",
    phone: "+7 (900) 100-00-08",
    email: "k.egorova@sprint.local",
    status: "active",
    notes: "Самая молодая в группе. Объём пока меньше, акцент на технику бега.",
  },
];

export const plans: TrainingPlan[] = [
  {
    id: 1,
    title: "Базовая скорость",
    weekStart: onMonday(-7),
    goal: "Вернуть частоту шага после контрольной и не набирать лишний объём.",
    notes: "Силовая короткая. В субботу только техника, без прикидки.",
  },
  {
    id: 2,
    title: "Старты и специальная выносливость",
    weekStart: onMonday(0),
    goal: "Собрать старт с колодок и удержать скорость на отрезках 150–300 м.",
    notes: "Лебедева работает отдельно: без ускорений, только техника и зал.",
  },
  {
    id: 3,
    title: "Объём и восстановление",
    weekStart: onMonday(7),
    goal: "Спокойно вернуть объём и разгрузить стопу и заднюю поверхность бедра.",
    notes: "Барьеры только у тех, у кого нет ограничений. Воскресенье выходной.",
  },
];

const sessionDrafts: Array<Omit<TrainingSession, "date"> & { offset: number }> = [
  { id: 1, planId: 1, offset: -7, startTime: "18:00", title: "Частота шага", durationMin: 80, location: "Манеж «Старт»", description: "Бег с высоким бедром и ускорения по 60 м через полный отдых." },
  { id: 2, planId: 1, offset: -5, startTime: "17:30", title: "Силовая в зале", durationMin: 70, location: "Зал ОФП", description: "Присед, выпады и упражнения на стопу. Без прыжков в глубину." },
  { id: 3, planId: 1, offset: -3, startTime: "18:00", title: "Отрезки 150 м", durationMin: 85, location: "Манеж «Старт»", description: "Четыре раза по 150 м в режиме 90%. Между сериями ходьба." },
  { id: 4, planId: 1, offset: -1, startTime: "11:00", title: "Техника и гибкость", durationMin: 60, location: "Стадион «Динамо»", description: "Бег по прямой, специальные упражнения и растяжка." },
  { id: 5, planId: 2, offset: 0, startTime: "18:00", title: "Старты с колодок", durationMin: 90, location: "Манеж «Старт»", description: "Выход из колодок на 20 и 30 м. Смотрим первые три шага." },
  { id: 6, planId: 2, offset: 1, startTime: "17:30", title: "Силовая", durationMin: 75, location: "Зал ОФП", description: "Жим ногами, ягодичный мост и кор. Лебедева — по своему листу." },
  { id: 7, planId: 2, offset: 2, startTime: "18:00", title: "Техника бега", durationMin: 80, location: "Манеж «Старт»", description: "Работа рук, постановка стопы и ускорения по 40 м." },
  { id: 8, planId: 2, offset: 3, startTime: "18:00", title: "Интервалы 300 м", durationMin: 90, location: "Стадион «Динамо»", description: "Три раза по 300 м. Цель — не развалиться на последней сотне." },
  { id: 9, planId: 2, offset: 4, startTime: "17:00", title: "Стартовая реакция", durationMin: 70, location: "Манеж «Старт»", description: "Старты по хлопку и с задержкой команды «марш»." },
  { id: 10, planId: 2, offset: 5, startTime: "11:00", title: "Контрольный отрезок", durationMin: 60, location: "Стадион «Динамо»", description: "Один отрезок 150 м с фиксацией времени. Потом заминка." },
  { id: 11, planId: 3, offset: 7, startTime: "18:00", title: "Лёгкий бег", durationMin: 70, location: "Манеж «Старт»", description: "Ровный бег и специальные упражнения без максимальных ускорений." },
  { id: 12, planId: 3, offset: 9, startTime: "18:00", title: "Техника барьера", durationMin: 80, location: "Манеж «Старт»", description: "Через низкие барьеры. Кузнецов остаётся на прямой без снаряда." },
  { id: 13, planId: 3, offset: 11, startTime: "17:30", title: "Объём в зале", durationMin: 75, location: "Зал ОФП", description: "Круговая на ноги и спину, паузы длиннее обычных." },
  { id: 14, planId: 3, offset: 12, startTime: "11:00", title: "Фартлек", durationMin: 65, location: "Парк у школы", description: "Чередование спокойного бега и коротких ускорений по самочувствию." },
];

export const sessions: TrainingSession[] = sessionDrafts.map((draft) => ({
  id: draft.id,
  planId: draft.planId,
  date: onMonday(draft.offset),
  startTime: draft.startTime,
  title: draft.title,
  durationMin: draft.durationMin,
  location: draft.location,
  description: draft.description,
}));

function markStatus(athleteId: number, sessionId: number): AttendanceStatus {
  if (athleteId === 2) return "excused";
  if (athleteId === 5 && sessionId % 2 === 0) return "excused";
  if (athleteId === 7 && sessionId % 3 === 0) return "late";
  if (athleteId === 3 && sessionId % 4 === 1) return "absent";
  return "present";
}

function markComment(status: AttendanceStatus, athleteId: number): string {
  if (status === "excused" && athleteId === 2) return "Восстановление, без ускорений";
  if (status === "excused") return "Разгрузка по плану тренера";
  if (status === "late") return "Подошёл к концу разминки";
  if (status === "absent") return "Не предупредил";
  return "";
}

// Отметки есть только у уже прошедших тренировок. Сегодняшние и будущие ещё пустые.
let nextMarkId = 1;
export const attendance: AttendanceMark[] = sessions
  .filter((session) => session.date < todayISO)
  .flatMap((session) =>
    athletes.map((athlete) => {
      const status = markStatus(athlete.id, session.id);
      const mark: AttendanceMark = {
        id: nextMarkId,
        sessionId: session.id,
        athleteId: athlete.id,
        status,
        comment: markComment(status, athlete.id),
      };
      nextMarkId += 1;
      return mark;
    }),
  );

export const injuries: Injury[] = [
  {
    id: 1,
    athleteId: 2,
    startedOn: onMonday(-12),
    expectedEnd: onMonday(10),
    bodyPart: "Задняя поверхность бедра",
    severity: "moderate",
    status: "active",
    description: "Почувствовала на ускорении 150 м, на следующий день боль при шаге.",
    restrictions: "Без спринта, барьеров и прыжков. Можно велосипед и зал по листу.",
  },
  {
    id: 2,
    athleteId: 5,
    startedOn: onMonday(-5),
    expectedEnd: onMonday(3),
    bodyPart: "Ахиллово сухожилие",
    severity: "mild",
    status: "recovering",
    description: "Ноет после ритмовых пробежек. Отёка нет.",
    restrictions: "Без барьерного ритма. Прыжковые пока убрать.",
  },
  {
    id: 3,
    athleteId: 1,
    startedOn: onMonday(-40),
    expectedEnd: onMonday(-18),
    bodyPart: "Правое колено",
    severity: "mild",
    status: "closed",
    description: "Дискомфорт после прыжков в глубину. Прошёл за две недели.",
    restrictions: "Сняты. Прыжки в глубину в план не возвращали.",
  },
];

const mealDrafts: Array<Omit<NutritionEntry, "id" | "date"> & { dayOffset: number }> = [
  { athleteId: 1, dayOffset: -1, mealType: "breakfast", description: "Овсянка, яйца и ягоды", calories: 540, proteinG: 29, carbsG: 64, fatG: 16, notes: "" },
  { athleteId: 1, dayOffset: -1, mealType: "lunch", description: "Гречка, индейка, салат", calories: 720, proteinG: 46, carbsG: 70, fatG: 22, notes: "" },
  { athleteId: 1, dayOffset: -1, mealType: "dinner", description: "Рыба, картофель, овощи", calories: 610, proteinG: 38, carbsG: 48, fatG: 24, notes: "После тренировки" },
  { athleteId: 1, dayOffset: -2, mealType: "breakfast", description: "Творог и банан", calories: 430, proteinG: 32, carbsG: 42, fatG: 12, notes: "" },
  { athleteId: 1, dayOffset: -2, mealType: "lunch", description: "Паста с курицей", calories: 780, proteinG: 42, carbsG: 92, fatG: 20, notes: "" },
  { athleteId: 4, dayOffset: -1, mealType: "breakfast", description: "Омлет и тост", calories: 460, proteinG: 28, carbsG: 34, fatG: 22, notes: "" },
  { athleteId: 4, dayOffset: -1, mealType: "lunch", description: "Рис, говядина, овощи", calories: 690, proteinG: 40, carbsG: 68, fatG: 22, notes: "" },
  { athleteId: 4, dayOffset: -1, mealType: "snack", description: "Йогурт и орехи", calories: 280, proteinG: 14, carbsG: 18, fatG: 16, notes: "Перед залом" },
  { athleteId: 6, dayOffset: -1, mealType: "breakfast", description: "Сырники и сметана", calories: 510, proteinG: 24, carbsG: 46, fatG: 24, notes: "" },
  { athleteId: 6, dayOffset: -1, mealType: "lunch", description: "Булгур и курица", calories: 640, proteinG: 39, carbsG: 62, fatG: 18, notes: "" },
  { athleteId: 6, dayOffset: -2, mealType: "dinner", description: "Омлет и салат", calories: 420, proteinG: 27, carbsG: 12, fatG: 28, notes: "День без прыжков" },
  { athleteId: 2, dayOffset: -1, mealType: "lunch", description: "Суп, хлеб, творог", calories: 560, proteinG: 34, carbsG: 52, fatG: 18, notes: "Аппетит ниже обычного" },
];

export const nutrition: NutritionEntry[] = mealDrafts.map((draft, index) => ({
  id: index + 1,
  athleteId: draft.athleteId,
  date: toISODate(addDays(today, draft.dayOffset)),
  mealType: draft.mealType,
  description: draft.description,
  calories: draft.calories,
  proteinG: draft.proteinG,
  carbsG: draft.carbsG,
  fatG: draft.fatG,
  notes: draft.notes,
}));
