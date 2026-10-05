import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
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
    <section className="panel">
      <Typography variant="h6">{title}</Typography>
      {text ? <Typography color="text.secondary">{text}</Typography> : null}
      {to && action ? (
        <Button component={RouterLink} to={to} variant="contained" sx={{ mt: 2 }}>
          {action}
        </Button>
      ) : null}
    </section>
  );
}
