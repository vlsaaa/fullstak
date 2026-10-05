import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, Outlet } from "react-router-dom";
import { coach } from "../data/coach.ts";

const links = [
  { to: "/", label: "Обзор", end: true },
  { to: "/athletes", label: "Спортсмены" },
  { to: "/plans", label: "Планы" },
  { to: "/calendar", label: "Календарь" },
  { to: "/attendance", label: "Посещения" },
  { to: "/injuries", label: "Травмы" },
  { to: "/nutrition", label: "Питание" },
  { to: "/reports", label: "Отчёты" },
];

export function AppLayout() {
  const [open, setOpen] = useState(false);
  const wide = useMediaQuery("(min-width:1000px)");

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {wide ? null : (
            <IconButton color="inherit" edge="start" aria-label="Меню" onClick={() => setOpen(true)}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ mr: 2 }}>
            Спринт
          </Typography>
          {wide
            ? links.map((link) => (
                <Button key={link.to} color="inherit" component={NavLink} to={link.to} end={link.end}>
                  {link.label}
                </Button>
              ))
            : null}
          <Typography variant="body2" sx={{ ml: "auto" }}>
            {coach.fullName}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <List sx={{ width: 220 }}>
          {links.map((link) => (
            <ListItemButton
              key={link.to}
              component={NavLink}
              to={link.to}
              end={link.end}
              onClick={() => setOpen(false)}
            >
              <ListItemText primary={link.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <Container sx={{ py: 3 }}>
        <Outlet />
      </Container>
    </>
  );
}
