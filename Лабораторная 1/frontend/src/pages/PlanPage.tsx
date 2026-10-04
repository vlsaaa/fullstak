import Button from "@mui/material/Button";
import { Link as RouterLink, useParams } from "react-router-dom";
import { EmptyState } from "../components/EmptyState.tsx";
import { PageHeader } from "../components/PageHeader.tsx";
import { getPlan, sessionsByPlan } from "../data/queries.ts";
import { formatDayMonth, formatWeekRange, formatWeekday } from "../lib/dates.ts";

export function PlanPage() {
  const params = useParams();
  const plan = getPlan(Number(params.planId));
  if (!plan) {
    return (
      <EmptyState
        title="План не найден"
        text="Такой недели в журнале нет."
        to="/plans"
        action="Ко всем планам"
      />
    );
  }
  const weekSessions = sessionsByPlan(plan.id);

  return (
    <>
      <PageHeader
        title={plan.title}
        subtitle={formatWeekRange(plan.weekStart)}
        action={
          <Button component={RouterLink} to="/plans" variant="outlined">
            Все планы
          </Button>
        }
      />
      <section className="panel" style={{ marginBottom: 16 }}>
        <h2>Задача недели</h2>
        <p>{plan.goal}</p>
        <p className="muted">{plan.notes}</p>
      </section>
      <section className="panel">
        <h2>Тренировки</h2>
        <div className="session-list">
          {weekSessions.map((session) => (
            <div className="session-row" key={session.id}>
              <div>
                <strong>{formatWeekday(session.date)}</strong>
                <div className="muted">{formatDayMonth(session.date)}</div>
                <div>{session.startTime}</div>
              </div>
              <div>
                <strong>{session.title}</strong>
                <div className="muted">
                  {session.location} · {session.durationMin} мин
                </div>
                <p style={{ marginBottom: 0 }}>{session.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
