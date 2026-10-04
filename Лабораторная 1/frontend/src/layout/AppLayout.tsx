import { useState } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import HealingOutlinedIcon from "@mui/icons-material/HealingOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import type { ReactNode } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { coach } from "../data/coach.ts";
import { todayISO } from "../data/mock.ts";
import { formatLongDate } from "../lib/dates.ts";

const links: Array<{ to: string; label: string; icon: ReactNode; end?: boolean }> = [
  { to: "/", label: "Обзор", icon: <HomeOutlinedIcon />, end: true },
  { to: "/athletes", label: "Спортсмены", icon: <GroupsOutlinedIcon /> },
  { to: "/plans", label: "Планы", icon: <TimerOutlinedIcon /> },
  { to: "/calendar", label: "Календарь", icon: <CalendarMonthOutlinedIcon /> },
  { to: "/attendance", label: "Посещения", icon: <EventAvailableOutlinedIcon /> },
  { to: "/injuries", label: "Травмы", icon: <HealingOutlinedIcon /> },
  { to: "/nutrition", label: "Питание", icon: <RestaurantOutlinedIcon /> },
  { to: "/reports", label: "Отчёты", icon: <AssessmentOutlinedIcon /> },
];

export function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="shell">
      {menuOpen ? (
        <button className="backdrop" aria-label="Закрыть меню" onClick={() => setMenuOpen(false)} />
      ) : null}
      <aside className={menuOpen ? "sidebar open" : "sidebar"}>
        <div className="brand">
          <div className="brand-mark">С</div>
          <div>
            <strong>Спринт</strong>
            <small>Тренерская</small>
          </div>
        </div>
        <nav>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              onClick={() => setMenuOpen(false)}
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-foot">
          <strong>{coach.fullName}</strong>
          <small>Тренер группы «{coach.group}»</small>
        </div>
      </aside>
      <div className="workspace">
        <header className="topbar">
          <button className="menu-button" type="button" onClick={() => setMenuOpen(true)}>
            Меню
          </button>
          <div>
            <strong>{coach.school}</strong>
            <small>Группа «{coach.group}»</small>
          </div>
          <small>{formatLongDate(todayISO)}</small>
        </header>
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
