from datetime import date, time
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field

Gender = Literal["female", "male"]
AthleteStatus = Literal["active", "injured", "rest"]
AttendanceStatus = Literal["present", "absent", "late", "excused"]
InjurySeverity = Literal["mild", "moderate", "severe"]
InjuryStatus = Literal["active", "recovering", "closed"]
MealType = Literal["breakfast", "lunch", "dinner", "snack"]


class AthleteCreate(BaseModel):
    first_name: str = Field(min_length=1, max_length=80)
    last_name: str = Field(min_length=1, max_length=80)
    birth_date: date
    gender: Gender
    sport: str = Field(min_length=1, max_length=80)
    group_name: str = Field(min_length=1, max_length=80)
    phone: str = Field(min_length=5, max_length=32)
    email: str = Field(min_length=5, max_length=120, pattern=r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
    status: AthleteStatus = "active"
    notes: str = ""


class AthleteUpdate(BaseModel):
    first_name: str | None = Field(default=None, min_length=1, max_length=80)
    last_name: str | None = Field(default=None, min_length=1, max_length=80)
    birth_date: date | None = None
    gender: Gender | None = None
    sport: str | None = Field(default=None, min_length=1, max_length=80)
    group_name: str | None = Field(default=None, min_length=1, max_length=80)
    phone: str | None = Field(default=None, min_length=5, max_length=32)
    email: str | None = Field(default=None, min_length=5, max_length=120, pattern=r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
    status: AthleteStatus | None = None
    notes: str | None = None


class AthleteRead(AthleteCreate):
    id: int
    model_config = ConfigDict(from_attributes=True)


class PlanCreate(BaseModel):
    title: str = Field(min_length=1, max_length=160)
    week_start: date
    goal: str = Field(min_length=1)
    notes: str = ""


class PlanUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1, max_length=160)
    week_start: date | None = None
    goal: str | None = Field(default=None, min_length=1)
    notes: str | None = None


class PlanRead(PlanCreate):
    id: int
    model_config = ConfigDict(from_attributes=True)


class SessionCreate(BaseModel):
    plan_id: int
    session_date: date
    start_time: time
    title: str = Field(min_length=1, max_length=160)
    duration_min: int = Field(gt=0, le=300)
    location: str = Field(min_length=1, max_length=160)
    description: str = ""


class SessionUpdate(BaseModel):
    plan_id: int | None = None
    session_date: date | None = None
    start_time: time | None = None
    title: str | None = Field(default=None, min_length=1, max_length=160)
    duration_min: int | None = Field(default=None, gt=0, le=300)
    location: str | None = Field(default=None, min_length=1, max_length=160)
    description: str | None = None


class SessionRead(SessionCreate):
    id: int
    model_config = ConfigDict(from_attributes=True)


class AttendanceCreate(BaseModel):
    session_id: int
    athlete_id: int
    status: AttendanceStatus
    comment: str = ""


class AttendanceUpdate(BaseModel):
    status: AttendanceStatus | None = None
    comment: str | None = None


class AttendanceRead(AttendanceCreate):
    id: int
    model_config = ConfigDict(from_attributes=True)


class InjuryCreate(BaseModel):
    athlete_id: int
    started_on: date
    expected_end: date | None = None
    body_part: str = Field(min_length=1, max_length=120)
    severity: InjurySeverity
    status: InjuryStatus
    description: str = Field(min_length=1)
    restrictions: str = ""


class InjuryUpdate(BaseModel):
    started_on: date | None = None
    expected_end: date | None = None
    body_part: str | None = Field(default=None, min_length=1, max_length=120)
    severity: InjurySeverity | None = None
    status: InjuryStatus | None = None
    description: str | None = Field(default=None, min_length=1)
    restrictions: str | None = None


class InjuryRead(InjuryCreate):
    id: int
    model_config = ConfigDict(from_attributes=True)


class NutritionCreate(BaseModel):
    athlete_id: int
    entry_date: date
    meal_type: MealType
    description: str = Field(min_length=1, max_length=200)
    calories: int = Field(ge=0, le=5000)
    protein_g: int = Field(default=0, ge=0, le=500)
    carbs_g: int = Field(default=0, ge=0, le=800)
    fat_g: int = Field(default=0, ge=0, le=400)
    notes: str = ""


class NutritionUpdate(BaseModel):
    entry_date: date | None = None
    meal_type: MealType | None = None
    description: str | None = Field(default=None, min_length=1, max_length=200)
    calories: int | None = Field(default=None, ge=0, le=5000)
    protein_g: int | None = Field(default=None, ge=0, le=500)
    carbs_g: int | None = Field(default=None, ge=0, le=800)
    fat_g: int | None = Field(default=None, ge=0, le=400)
    notes: str | None = None


class NutritionRead(NutritionCreate):
    id: int
    model_config = ConfigDict(from_attributes=True)
