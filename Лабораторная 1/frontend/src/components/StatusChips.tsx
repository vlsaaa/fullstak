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

const athleteColor: Record<AthleteStatus, ChipProps["color"]> = {
  active: "success",
  injured: "error",
  rest: "default",
};

const attendanceColor: Record<AttendanceStatus, ChipProps["color"]> = {
  present: "success",
  absent: "error",
  late: "warning",
  excused: "default",
};

const injuryColor: Record<InjuryStatus, ChipProps["color"]> = {
  active: "error",
  recovering: "warning",
  closed: "default",
};

const severityColor: Record<InjurySeverity, ChipProps["color"]> = {
  mild: "success",
  moderate: "warning",
  severe: "error",
};

export function AthleteStatusChip({ status }: { status: AthleteStatus }) {
  return <Chip size="small" color={athleteColor[status]} label={athleteStatusLabel[status]} />;
}

export function AttendanceChip({ status }: { status: AttendanceStatus }) {
  return <Chip size="small" color={attendanceColor[status]} label={attendanceLabel[status]} />;
}

export function InjuryStatusChip({ status }: { status: InjuryStatus }) {
  return <Chip size="small" color={injuryColor[status]} label={injuryStatusLabel[status]} />;
}

export function SeverityChip({ severity }: { severity: InjurySeverity }) {
  return <Chip size="small" color={severityColor[severity]} label={severityLabel[severity]} />;
}
