import { useState } from "react";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link as RouterLink } from "react-router-dom";
import { AttendanceChip } from "../components/StatusChips.tsx";
import { PageHeader } from "../components/PageHeader.tsx";
import { athletes } from "../data/mock.ts";
import {
  currentPlan,
  defaultSessionId,
  fullName,
  getSession,
  marksForSession,
  sessionsByPlan,
} from "../data/queries.ts";
import { formatDayMonth, formatWeekday } from "../lib/dates.ts";

export function AttendancePage() {
  const plan = currentPlan();
  const weekSessions = sessionsByPlan(plan.id);
  const [sessionId, setSessionId] = useState(() => {
    const preferred = defaultSessionId();
    return weekSessions.some((session) => session.id === preferred)
      ? preferred
      : weekSessions[0].id;
  });
  const session = getSession(sessionId) ?? weekSessions[0];
  const marks = marksForSession(session.id);

  return (
    <>
      <PageHeader
        title="Посещения"
        subtitle="Отметки прошедших тренировок. Опоздание считается посещением."
      />
      <div className="filters" style={{ marginBottom: 16 }}>
        {weekSessions.map((item) => (
          <Button
            key={item.id}
            variant={item.id === session.id ? "contained" : "outlined"}
            onClick={() => setSessionId(item.id)}
          >
            {formatWeekday(item.date)} {formatDayMonth(item.date)}
          </Button>
        ))}
      </div>
      <section className="panel table-wrap">
        <h2>
          {session.startTime} · {session.title}
        </h2>
        <p className="muted">
          {session.location}. {session.description}
        </p>
        {marks.length === 0 ? (
          <p>Тренировка ещё не прошла, отметок нет.</p>
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Спортсмен</TableCell>
                <TableCell>Отметка</TableCell>
                <TableCell>Комментарий</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {athletes.map((athlete) => {
                const mark = marks.find((item) => item.athleteId === athlete.id);
                return (
                  <TableRow key={athlete.id}>
                    <TableCell>
                      <RouterLink className="quiet-link" to={`/athletes/${athlete.id}`}>
                        {fullName(athlete)}
                      </RouterLink>
                    </TableCell>
                    <TableCell>
                      {mark ? <AttendanceChip status={mark.status} /> : "—"}
                    </TableCell>
                    <TableCell>{mark?.comment || "—"}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </section>
    </>
  );
}
