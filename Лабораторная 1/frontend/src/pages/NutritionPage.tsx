import { useMemo, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import { PageHeader } from "../components/PageHeader.tsx";
import { mealLabel } from "../data/labels.ts";
import { athletes, nutrition } from "../data/mock.ts";
import { fullName, nutritionTotals } from "../data/queries.ts";
import { formatDayMonth } from "../lib/dates.ts";

export function NutritionPage() {
  const [athleteId, setAthleteId] = useState("all");
  const visible = useMemo(() => {
    const entries =
      athleteId === "all"
        ? nutrition
        : nutrition.filter((entry) => entry.athleteId === Number(athleteId));
    return [...entries].sort(
      (left, right) => right.date.localeCompare(left.date) || left.mealType.localeCompare(right.mealType),
    );
  }, [athleteId]);
  const totals = nutritionTotals(visible);

  return (
    <>
      <PageHeader
        title="Питание"
        subtitle="Дневник со слов спортсмена. Это учёт, а не назначение врача."
        action={
          <TextField
            select
            size="small"
            label="Спортсмен"
            value={athleteId}
            onChange={(event) => setAthleteId(event.target.value)}
            sx={{ minWidth: 220 }}
          >
            <MenuItem value="all">Вся группа</MenuItem>
            {athletes.map((athlete) => (
              <MenuItem key={athlete.id} value={String(athlete.id)}>
                {fullName(athlete)}
              </MenuItem>
            ))}
          </TextField>
        }
      />
      <section className="stat-grid">
        <article className="panel stat">
          <span>Ккал</span>
          <strong>{totals.calories}</strong>
        </article>
        <article className="panel stat">
          <span>Белки, г</span>
          <strong>{totals.proteinG}</strong>
        </article>
        <article className="panel stat">
          <span>Углеводы, г</span>
          <strong>{totals.carbsG}</strong>
        </article>
        <article className="panel stat">
          <span>Жиры, г</span>
          <strong>{totals.fatG}</strong>
        </article>
      </section>
      <section className="panel table-wrap">
        {visible.length === 0 ? (
          <p className="muted">Для этого спортсмена записей нет.</p>
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>День</TableCell>
                <TableCell>Спортсмен</TableCell>
                <TableCell>Приём</TableCell>
                <TableCell>Что ел</TableCell>
                <TableCell>Ккал</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visible.map((entry) => {
                const athlete = athletes.find((item) => item.id === entry.athleteId);
                return (
                  <TableRow key={entry.id}>
                    <TableCell>{formatDayMonth(entry.date)}</TableCell>
                    <TableCell>{athlete ? fullName(athlete) : "—"}</TableCell>
                    <TableCell>{mealLabel[entry.mealType]}</TableCell>
                    <TableCell>
                      {entry.description}
                      {entry.notes ? <div className="muted">{entry.notes}</div> : null}
                    </TableCell>
                    <TableCell>{entry.calories}</TableCell>
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
