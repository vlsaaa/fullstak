import { Link as RouterLink } from "react-router-dom";
import { athletes, plans, todayISO } from "../data/mock.ts";
import {
  activeInjuries,
  attendanceRate,
  currentPlan,
  fullName,
  sessionsByPlan,
  upcomingSessions,
} from "../data/queries.ts";
import { AthleteStatusChip } from "../components/StatusChips.tsx";
import { PageHeader } from "../components/PageHeader.tsx";
import { formatDayMonth, formatWeekday } from "../lib/dates.ts";

export function DashboardPage() {
  const plan = currentPlan();
  const weekSessions = sessionsByPlan(plan.id);
  const nextSessions = upcomingSessions(3);
  const rate = attendanceRate();
  const restricted = athletes.filter((athlete) => athlete.status !== "active");

  return (
    <>
      <PageHeader
        title="Обзор"
        subtitle={`Группа «Спринт-17». Сейчас план: ${plan.title}.`}
      />
      <section className="stat-grid">
        <article className="panel stat">
          <span>Спортсмены</span>
          <strong>{athletes.length}</strong>
        </article>
        <article className="panel stat">
          <span>Тренировок на неделе</span>
          <strong>{weekSessions.length}</strong>
        </article>
        <article className="panel stat">
          <span>Посещаемость</span>
          <strong>{rate === null ? "—" : `${rate}%`}</strong>
        </article>
        <article className="panel stat">
          <span>Открытые травмы</span>
          <strong>{activeInjuries().length}</strong>
        </article>
      </section>
      <div className="split">
        <section className="panel">
          <h2>Ближайшие тренировки</h2>
          <div className="session-list">
            {nextSessions.length === 0 ? (
              <p className="muted">На ближайшие дни тренировок нет.</p>
            ) : (
              nextSessions.map((session) => (
                <div className="session-row" key={session.id}>
                  <div>
                    <strong>{formatWeekday(session.date)}</strong>
                    <div className="muted">{formatDayMonth(session.date)}</div>
                  </div>
                  <div>
                    <RouterLink className="quiet-link" to={`/plans/${session.planId}`}>
                      {session.startTime} · {session.title}
                    </RouterLink>
                    <div className="muted">
                      {session.location} · {session.durationMin} мин
                      {session.date === todayISO ? " · сегодня" : ""}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
        <section className="panel">
          <h2>Кого не грузить</h2>
          {restricted.length === 0 ? (
            <p className="muted">Вся группа в строю.</p>
          ) : (
            <div className="session-list">
              {restricted.map((athlete) => (
                <div key={athlete.id}>
                  <RouterLink className="quiet-link" to={`/athletes/${athlete.id}`}>
                    {fullName(athlete)}
                  </RouterLink>
                  <div className="muted" style={{ margin: "6px 0" }}>
                    {athlete.sport}
                  </div>
                  <AthleteStatusChip status={athlete.status} />
                  <p className="muted">{athlete.notes}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
      <p className="muted">В журнале {plans.length} недельных плана. Сейчас открыт текущий.</p>
    </>
  );
}
