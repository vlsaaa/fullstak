from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.errors import AppError
from app.models import Athlete, TrainingPlan, TrainingSession


def apply_changes(row: object, data: BaseModel) -> None:
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(row, key, value)


def require_athlete(db: Session, athlete_id: int) -> Athlete:
    athlete = db.get(Athlete, athlete_id)
    if athlete is None:
        raise AppError(404, "Спортсмен не найден")
    return athlete


def require_plan(db: Session, plan_id: int) -> TrainingPlan:
    plan = db.get(TrainingPlan, plan_id)
    if plan is None:
        raise AppError(404, "План тренировок не найден")
    return plan


def require_session(db: Session, session_id: int) -> TrainingSession:
    session = db.get(TrainingSession, session_id)
    if session is None:
        raise AppError(404, "Тренировка не найдена")
    return session


def save(db: Session, row: object) -> object:
    db.add(row)
    db.commit()
    db.refresh(row)
    return row
