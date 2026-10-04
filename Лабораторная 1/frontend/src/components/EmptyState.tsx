import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";

export function EmptyState({
  title,
  text,
  to,
  action,
}: {
  title: string;
  text?: string;
  to?: string;
  action?: string;
}) {
  return (
    <section className="panel empty-state">
      <h2>{title}</h2>
      {text ? <p className="muted">{text}</p> : null}
      {to && action ? (
        <Button component={RouterLink} to={to} variant="contained" sx={{ mt: 2 }}>
          {action}
        </Button>
      ) : null}
    </section>
  );
}
