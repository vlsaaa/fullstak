import { Link as RouterLink } from "react-router-dom";
import { PageHeader } from "../components/PageHeader.tsx";
import { injuries } from "../data/mock.ts";
import { fullName, reportRows } from "../data/queries.ts";
import { injuryStatusLabel } from "../data/labels.ts";

export function ReportsPage() {
  const rows = reportRows();
  const injuryCounts = (["active", "recovering", "closed"] as const).map((status) => ({
    status,
    count: injuries.filter((injury) => injury.status === status).length,
  }));

  return (
    <>
      <PageHeader
        title="Отчёты"
        subtitle="Считается по демонстрационным данным. Опоздание входит в посещение."
      />
      <div className="split">
        <section className="panel">
          <h2>Посещаемость</h2>
          <div className="stack">
            {rows.map((row) => (
              <div key={row.athlete.id}>
                <div className="toolbar" style={{ marginBottom: 6 }}>
                  <RouterLink className="quiet-link" to={`/athletes/${row.athlete.id}`}>
                    {fullName(row.athlete)}
                  </RouterLink>
                  <span>{row.rate === null ? "—" : `${row.rate}%`}</span>
                </div>
                <div className={row.rate !== null && row.rate < 80 ? "bar low" : "bar"}>
                  <i style={{ width: `${row.rate ?? 0}%` }} />
                </div>
                <div className="muted">
                  {row.attended} из {row.sessions} тренировок
                </div>
              </div>
            ))}
          </div>
        </section>
        <div className="stack">
          <section className="panel">
            <h2>Травмы по состоянию</h2>
            {injuryCounts.map((item) => (
              <div className="toolbar" key={item.status}>
                <span>{injuryStatusLabel[item.status]}</span>
                <strong>{item.count}</strong>
              </div>
            ))}
          </section>
          <section className="panel">
            <h2>Средние ккал в день</h2>
            {rows.filter((row) => row.avgCalories !== null).length === 0 ? (
              <p className="muted">В дневнике ещё никого нет.</p>
            ) : (
              rows
                .filter((row) => row.avgCalories !== null)
                .map((row) => (
                  <div className="toolbar" key={row.athlete.id}>
                    <span>{fullName(row.athlete)}</span>
                    <strong>{row.avgCalories}</strong>
                  </div>
                ))
            )}
            <p className="muted">Только дни, где есть хотя бы одна запись.</p>
          </section>
        </div>
      </div>
    </>
  );
}
