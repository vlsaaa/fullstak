import { useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import { AthleteStatusChip } from "../components/StatusChips.tsx";
import { PageHeader } from "../components/PageHeader.tsx";
import { athletes } from "../data/mock.ts";
import { fullName } from "../data/queries.ts";
import { ageFrom } from "../lib/dates.ts";

export function AthletesPage() {
  const [query, setQuery] = useState("");
  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return athletes;
    return athletes.filter((athlete) =>
      `${fullName(athlete)} ${athlete.sport}`.toLowerCase().includes(needle),
    );
  }, [query]);

  return (
    <>
      <PageHeader
        title="Спортсмены"
        subtitle="Группа «Спринт-17». Карточка открывается по имени."
        action={
          <TextField
            size="small"
            label="Поиск"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            sx={{ minWidth: 240 }}
          />
        }
      />
      <section className="panel table-wrap">
        {visible.length === 0 ? (
          <p className="muted">Никого не нашли. Попробуйте другую фамилию или вид.</p>
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Спортсмен</TableCell>
                <TableCell>Вид</TableCell>
                <TableCell>Возраст</TableCell>
                <TableCell>Статус</TableCell>
                <TableCell>Телефон</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visible.map((athlete) => (
                <TableRow key={athlete.id} hover>
                  <TableCell>
                    <RouterLink className="quiet-link" to={`/athletes/${athlete.id}`}>
                      {fullName(athlete)}
                    </RouterLink>
                  </TableCell>
                  <TableCell>{athlete.sport}</TableCell>
                  <TableCell>{ageFrom(athlete.birthDate)}</TableCell>
                  <TableCell>
                    <AthleteStatusChip status={athlete.status} />
                  </TableCell>
                  <TableCell>{athlete.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </section>
    </>
  );
}
