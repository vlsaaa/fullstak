import { useState } from "react";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import { PageHeader } from "../components/PageHeader.tsx";
import { InjuryStatusChip, SeverityChip } from "../components/StatusChips.tsx";
import { injuryStatusLabel } from "../data/labels.ts";
import { athletes, injuries } from "../data/mock.ts";
import { fullName } from "../data/queries.ts";
import { formatLongDate } from "../lib/dates.ts";
import type { InjuryStatus } from "../types.ts";

const filters: Array<{ id: "all" | InjuryStatus; label: string }> = [
  { id: "all", label: "Все" },
  { id: "active", label: injuryStatusLabel.active },
  { id: "recovering", label: injuryStatusLabel.recovering },
  { id: "closed", label: injuryStatusLabel.closed },
];

export function InjuriesPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const visible = injuries.filter((injury) => filter === "all" || injury.status === filter);

  return (
    <>
      <PageHeader
        title="Травмы"
        subtitle="Журнал ограничений. Закрытая травма остаётся в истории."
      />
      <div className="filters" style={{ marginBottom: 16 }}>
        {filters.map((item) => (
          <Button
            key={item.id}
            variant={filter === item.id ? "contained" : "outlined"}
            onClick={() => setFilter(item.id)}
          >
            {item.label}
          </Button>
        ))}
      </div>
      <div className="stack">
        {visible.length === 0 ? (
          <section className="panel">
            <p className="muted">В этом разделе записей нет.</p>
          </section>
        ) : (
          visible.map((injury) => {
            const athlete = athletes.find((item) => item.id === injury.athleteId);
            return (
              <article className="panel" key={injury.id}>
                <div className="toolbar">
                  <h2 style={{ margin: 0 }}>{injury.bodyPart}</h2>
                  <div style={{ display: "flex", gap: 8 }}>
                    <SeverityChip severity={injury.severity} />
                    <InjuryStatusChip status={injury.status} />
                  </div>
                </div>
                {athlete ? (
                  <RouterLink className="quiet-link" to={`/athletes/${athlete.id}`}>
                    {fullName(athlete)} · {athlete.sport}
                  </RouterLink>
                ) : null}
                <p>{injury.description}</p>
                <p className="muted">Ограничение: {injury.restrictions}</p>
                <p className="muted">
                  С {formatLongDate(injury.startedOn)}
                  {injury.expectedEnd ? ` · ориентир до ${formatLongDate(injury.expectedEnd)}` : ""}
                </p>
              </article>
            );
          })
        )}
      </div>
    </>
  );
}
