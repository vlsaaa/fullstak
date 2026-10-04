import Button from "@mui/material/Button";
import { Link as RouterLink, useParams } from "react-router-dom";
import { EmptyState } from "../components/EmptyState.tsx";
import { PageHeader } from "../components/PageHeader.tsx";
import { AthleteStatusChip, AttendanceChip, InjuryStatusChip } from "../components/StatusChips.tsx";
import { genderLabel } from "../data/labels.ts";
import {
  attendanceRate,
  fullName,
  getAthlete,
  getSession,
  injuriesForAthlete,
  marksForAthlete,
  mealsForAthlete,
  nutritionTotals,
} from "../data/queries.ts";
import { ageFrom, formatDayMonth, formatLongDate } from "../lib/dates.ts";

export function AthletePage() {
  const params = useParams();
  const athlete = getAthlete(Number(params.athleteId));
  if (!athlete) {
    return (
      <EmptyState
        title="Спортсмен не найден"
        text="Такой карточки в группе нет."
        to="/athletes"
        action="К списку"
      />
    );
  }

  const marks = marksForAthlete(athlete.id)
    .map((mark) => ({ mark, session: getSession(mark.sessionId) }))
    .filter((item) => item.session)
    .sort((left, right) => right.session!.date.localeCompare(left.session!.date))
    .slice(0, 6);
  const personInjuries = injuriesForAthlete(athlete.id);
  const meals = mealsForAthlete(athlete.id);
  const totals = nutritionTotals(meals);
  const rate = attendanceRate(athlete.id);

  return (
    <>
      <PageHeader
        title={fullName(athlete)}
        subtitle={`${athlete.sport} · группа «${athlete.groupName}»`}
        action={
          <Button component={RouterLink} to="/athletes" variant="outlined">
            Все спортсмены
          </Button>
        }
      />
      <div className="split">
        <section className="panel">
          <div style={{ marginBottom: 14 }}>
            <AthleteStatusChip status={athlete.status} />
          </div>
          <dl className="facts">
            <dt>Возраст</dt>
            <dd>
              {ageFrom(athlete.birthDate)} · {genderLabel[athlete.gender]}
            </dd>
            <dt>Дата рождения</dt>
            <dd>{formatLongDate(athlete.birthDate)}</dd>
            <dt>Телефон</dt>
            <dd>{athlete.phone}</dd>
            <dt>Почта</dt>
            <dd>{athlete.email}</dd>
            <dt>Посещаемость</dt>
            <dd>{rate === null ? "отметок нет" : `${rate}%`}</dd>
          </dl>
          <p>{athlete.notes}</p>
        </section>
        <section className="panel">
          <h2>Питание в журнале</h2>
          {meals.length === 0 ? (
            <p className="muted">Записей о еде пока нет.</p>
          ) : (
            <dl className="facts">
              <dt>Записей</dt>
              <dd>{meals.length}</dd>
              <dt>Ккал</dt>
              <dd>{totals.calories}</dd>
              <dt>Белки</dt>
              <dd>{totals.proteinG} г</dd>
              <dt>Углеводы</dt>
              <dd>{totals.carbsG} г</dd>
              <dt>Жиры</dt>
              <dd>{totals.fatG} г</dd>
            </dl>
          )}
        </section>
      </div>
      <div className="split" style={{ marginTop: 16 }}>
        <section className="panel">
          <h2>Последние отметки</h2>
          {marks.length === 0 ? (
            <p className="muted">Прошедших тренировок с отметкой нет.</p>
          ) : (
            <div className="session-list">
              {marks.map(({ mark, session }) => (
                <div className="session-row" key={mark.id}>
                  <div>
                    <strong>{formatDayMonth(session!.date)}</strong>
                    <div className="muted">{session!.startTime}</div>
                  </div>
                  <div>
                    <div>{session!.title}</div>
                    <div style={{ marginTop: 6 }}>
                      <AttendanceChip status={mark.status} />
                    </div>
                    {mark.comment ? <div className="muted">{mark.comment}</div> : null}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
        <section className="panel">
          <h2>Травмы</h2>
          {personInjuries.length === 0 ? (
            <p className="muted">В журнале травм пусто.</p>
          ) : (
            personInjuries.map((injury) => (
              <article key={injury.id} style={{ marginBottom: 12 }}>
                <strong>{injury.bodyPart}</strong>
                <div style={{ margin: "6px 0" }}>
                  <InjuryStatusChip status={injury.status} />
                </div>
                <div className="muted">{injury.restrictions}</div>
              </article>
            ))
          )}
        </section>
      </div>
    </>
  );
}
