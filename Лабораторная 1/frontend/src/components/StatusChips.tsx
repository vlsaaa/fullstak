import Chip from "@mui/material/Chip";
import type { ChipProps } from "@mui/material/Chip";
import type {
  AthleteStatus,
  AttendanceStatus,
  InjurySeverity,
  InjuryStatus,
} from "../types.ts";
import {
  athleteStatusLabel,
  attendanceLabel,
  injuryStatusLabel,
  severityLabel,
} from "../data/labels.ts";

function tone(background: string, color: string): ChipProps["sx"] {
  return { bgcolor: background, color, fontWeight: 700 };
}

const athleteTone: Record<AthleteStatus, ChipProps["sx"]> = {
  active: tone("#e5f4eb", "#1f6b45"),
  injured: tone("#fde8df", "#9a3d16"),
  rest: tone("#ece7dc", "#5c5346"),
};

const attendanceTone: Record<AttendanceStatus, ChipProps["sx"]> = {
  present: tone("#e5f4eb", "#1f6b45"),
  absent: tone("#fde8df", "#9a3d16"),
  late: tone("#f8efd8", "#8a5a12"),
  excused: tone("#ece7dc", "#5c5346"),
};

const injuryTone: Record<InjuryStatus, ChipProps["sx"]> = {
  active: tone("#fde8df", "#9a3d16"),
  recovering: tone("#f8efd8", "#8a5a12"),
  closed: tone("#ece7dc", "#5c5346"),
};

const severityTone: Record<InjurySeverity, ChipProps["sx"]> = {
  mild: tone("#e5f4eb", "#1f6b45"),
  moderate: tone("#f8efd8", "#8a5a12"),
  severe: tone("#fde8df", "#9a3d16"),
};

export function AthleteStatusChip({ status }: { status: AthleteStatus }) {
  return <Chip size="small" label={athleteStatusLabel[status]} sx={athleteTone[status]} />;
}

export function AttendanceChip({ status }: { status: AttendanceStatus }) {
  return <Chip size="small" label={attendanceLabel[status]} sx={attendanceTone[status]} />;
}

export function InjuryStatusChip({ status }: { status: InjuryStatus }) {
  return <Chip size="small" label={injuryStatusLabel[status]} sx={injuryTone[status]} />;
}

export function SeverityChip({ severity }: { severity: InjurySeverity }) {
  return <Chip size="small" label={severityLabel[severity]} sx={severityTone[severity]} />;
}
