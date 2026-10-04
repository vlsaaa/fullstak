import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link as RouterLink } from "react-router-dom";
import { PageHeader } from "../components/PageHeader.tsx";
import { today } from "../data/mock.ts";
import { sessionsOn } from "../data/queries.ts";
import { formatMonthTitle, monthCells, toISODate } from "../lib/dates.ts";

const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export function CalendarPage() {
  const [anchor, setAnchor] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState(today);
  const cells = monthCells(anchor);
  const selectedISO = toISODate(selected);
  const daySessions = sessionsOn(selectedISO);

  return (
    <>
      <PageHeader
        title="Календарь"
        subtitle="Точка на дне — запланированная тренировка. Нажмите день, чтобы увидеть состав."
      />
      <div className="split">
        <section className="panel">
          <div className="calendar-head">
            <h2 style={{ margin: 0 }}>{formatMonthTitle(anchor)}</h2>
            <div>
              <IconButton
                aria-label="Предыдущий месяц"
                onClick={() => setAnchor(new Date(anchor.getFullYear(), anchor.getMonth() - 1, 1))}
              >
                <ChevronLeftIcon />
              </IconButton>
              <IconButton
                aria-label="Следующий месяц"
                onClick={() => setAnchor(new Date(anchor.getFullYear(), anchor.getMonth() + 1, 1))}
              >
                <ChevronRightIcon />
              </IconButton>
            </div>
          </div>
          <div className="weekday-row">
            {weekdays.map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>
          <div className="calendar-grid">
            {cells.map((day, index) => {
              if (!day) return <div className="day-cell empty" key={`empty-${index}`} />;
              const iso = toISODate(day);
              const count = sessionsOn(iso).length;
              const classes = [
                "day-cell",
                iso === toISODate(today) ? "today" : "",
                iso === selectedISO ? "selected" : "",
              ]
                .filter(Boolean)
                .join(" ");
              return (
                <button
                  key={iso}
                  type="button"
                  className={classes}
                  onClick={() => setSelected(day)}
                >
                  <strong>{day.getDate()}</strong>
                  {count > 0 ? (
                    <div className="dots">
                      {Array.from({ length: count }, (_, dot) => (
                        <span className="dot" key={dot} />
                      ))}
                    </div>
                  ) : null}
                </button>
              );
            })}
          </div>
        </section>
        <section className="panel">
          <h2>{selected.toLocaleDateString("ru-RU", { day: "numeric", month: "long" })}</h2>
          {daySessions.length === 0 ? (
            <p className="muted">В этот день тренировки нет.</p>
          ) : (
            daySessions.map((session) => (
              <article key={session.id} style={{ marginBottom: 14 }}>
                <RouterLink className="quiet-link" to={`/plans/${session.planId}`}>
                  {session.startTime} · {session.title}
                </RouterLink>
                <div className="muted">
                  {session.location} · {session.durationMin} мин
                </div>
                <p>{session.description}</p>
              </article>
            ))
          )}
        </section>
      </div>
    </>
  );
}
