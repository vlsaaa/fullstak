import { Link as RouterLink } from "react-router-dom";
import { PageHeader } from "../components/PageHeader.tsx";
import { plans, thisMondayISO } from "../data/mock.ts";
import { sessionsByPlan } from "../data/queries.ts";
import { formatWeekRange } from "../lib/dates.ts";

function sessionCountLabel(count: number): string {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return `${count} тренировка`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${count} тренировки`;
  return `${count} тренировок`;
}

export function PlansPage() {
  return (
    <>
      <PageHeader
        title="Планы по неделям"
        subtitle="Три соседние недели: прошлая, текущая и следующая."
      />
      <div className="card-grid">
        {plans.map((plan) => {
          const count = sessionsByPlan(plan.id).length;
          const current = plan.weekStart === thisMondayISO;
          return (
            <article className="panel" key={plan.id}>
              <div className="muted">{formatWeekRange(plan.weekStart)}</div>
              <h2 style={{ marginTop: 8 }}>
                <RouterLink className="quiet-link" to={`/plans/${plan.id}`}>
                  {plan.title}
                </RouterLink>
              </h2>
              <p>{plan.goal}</p>
              <p className="muted">
                {sessionCountLabel(count)}
                {current ? " · эта неделя" : ""}
              </p>
            </article>
          );
        })}
      </div>
    </>
  );
}
