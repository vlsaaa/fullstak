from datetime import date, time

from sqlalchemy import CheckConstraint, Date, ForeignKey, Integer, String, Text, Time, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class Athlete(Base):
    __tablename__ = "athletes"
    __table_args__ = (
        CheckConstraint("gender IN ('female', 'male')", name="ck_athletes_gender"),
        CheckConstraint("status IN ('active', 'injured', 'rest')", name="ck_athletes_status"),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    first_name: Mapped[str] = mapped_column(String(80))
    last_name: Mapped[str] = mapped_column(String(80))
    birth_date: Mapped[date] = mapped_column(Date)
    gender: Mapped[str] = mapped_column(String(10))
    sport: Mapped[str] = mapped_column(String(80))
    group_name: Mapped[str] = mapped_column(String(80))
    phone: Mapped[str] = mapped_column(String(32))
    email: Mapped[str] = mapped_column(String(120))
    status: Mapped[str] = mapped_column(String(20), default="active")
    notes: Mapped[str] = mapped_column(Text, default="")

    attendance: Mapped[list["AttendanceMark"]] = relationship(back_populates="athlete")
    injuries: Mapped[list["Injury"]] = relationship(back_populates="athlete")
    meals: Mapped[list["NutritionEntry"]] = relationship(back_populates="athlete")


class TrainingPlan(Base):
    __tablename__ = "training_plans"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(160))
    week_start: Mapped[date] = mapped_column(Date, unique=True)
    goal: Mapped[str] = mapped_column(Text)
    notes: Mapped[str] = mapped_column(Text, default="")

    sessions: Mapped[list["TrainingSession"]] = relationship(
        back_populates="plan",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )


class TrainingSession(Base):
    __tablename__ = "training_sessions"
    __table_args__ = (CheckConstraint("duration_min > 0", name="ck_sessions_duration"),)

    id: Mapped[int] = mapped_column(primary_key=True)
    plan_id: Mapped[int] = mapped_column(ForeignKey("training_plans.id", ondelete="CASCADE"))
    session_date: Mapped[date] = mapped_column(Date)
    start_time: Mapped[time] = mapped_column(Time)
    title: Mapped[str] = mapped_column(String(160))
    duration_min: Mapped[int] = mapped_column(Integer)
    location: Mapped[str] = mapped_column(String(160))
    description: Mapped[str] = mapped_column(Text, default="")

    plan: Mapped[TrainingPlan] = relationship(back_populates="sessions")
    marks: Mapped[list["AttendanceMark"]] = relationship(
        back_populates="session",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )


class AttendanceMark(Base):
    __tablename__ = "attendance_marks"
    __table_args__ = (
        UniqueConstraint("session_id", "athlete_id", name="uq_attendance_session_athlete"),
        CheckConstraint(
            "status IN ('present', 'absent', 'late', 'excused')",
            name="ck_attendance_status",
        ),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    session_id: Mapped[int] = mapped_column(ForeignKey("training_sessions.id", ondelete="CASCADE"))
    athlete_id: Mapped[int] = mapped_column(ForeignKey("athletes.id", ondelete="RESTRICT"))
    status: Mapped[str] = mapped_column(String(20))
    comment: Mapped[str] = mapped_column(Text, default="")

    session: Mapped[TrainingSession] = relationship(back_populates="marks")
    athlete: Mapped[Athlete] = relationship(back_populates="attendance")


class Injury(Base):
    __tablename__ = "injuries"
    __table_args__ = (
        CheckConstraint("severity IN ('mild', 'moderate', 'severe')", name="ck_injuries_severity"),
        CheckConstraint("status IN ('active', 'recovering', 'closed')", name="ck_injuries_status"),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    athlete_id: Mapped[int] = mapped_column(ForeignKey("athletes.id", ondelete="RESTRICT"))
    started_on: Mapped[date] = mapped_column(Date)
    expected_end: Mapped[date | None] = mapped_column(Date, nullable=True)
    body_part: Mapped[str] = mapped_column(String(120))
    severity: Mapped[str] = mapped_column(String(20))
    status: Mapped[str] = mapped_column(String(20))
    description: Mapped[str] = mapped_column(Text)
    restrictions: Mapped[str] = mapped_column(Text, default="")

    athlete: Mapped[Athlete] = relationship(back_populates="injuries")


class NutritionEntry(Base):
    __tablename__ = "nutrition_entries"
    __table_args__ = (
        CheckConstraint("meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')", name="ck_meals_type"),
        CheckConstraint("calories >= 0", name="ck_meals_calories"),
        CheckConstraint("protein_g >= 0 AND carbs_g >= 0 AND fat_g >= 0", name="ck_meals_macros"),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    athlete_id: Mapped[int] = mapped_column(ForeignKey("athletes.id", ondelete="RESTRICT"))
    entry_date: Mapped[date] = mapped_column(Date)
    meal_type: Mapped[str] = mapped_column(String(20))
    description: Mapped[str] = mapped_column(String(200))
    calories: Mapped[int] = mapped_column(Integer)
    protein_g: Mapped[int] = mapped_column(Integer, default=0)
    carbs_g: Mapped[int] = mapped_column(Integer, default=0)
    fat_g: Mapped[int] = mapped_column(Integer, default=0)
    notes: Mapped[str] = mapped_column(Text, default="")

    athlete: Mapped[Athlete] = relationship(back_populates="meals")
