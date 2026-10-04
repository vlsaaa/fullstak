from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.errors import AppError
from app.models import TrainingPlan
from app.schemas.entities import PlanCreate, PlanUpdate
from app.services.common import apply_changes, require_plan


def list_plans(db: Session) -> list[TrainingPlan]:
    return list(db.scalars(select(TrainingPlan).order_by(TrainingPlan.week_start)))


def create_plan(db: Session, data: PlanCreate) -> TrainingPlan:
    plan = TrainingPlan(**data.model_dump())
    return _save_plan(db, plan)


def update_plan(db: Session, plan_id: int, data: PlanUpdate) -> TrainingPlan:
    plan = require_plan(db, plan_id)
    apply_changes(plan, data)
    return _save_plan(db, plan)


def delete_plan(db: Session, plan_id: int) -> None:
    plan = require_plan(db, plan_id)
    db.delete(plan)
    db.commit()


def _save_plan(db: Session, plan: TrainingPlan) -> TrainingPlan:
    db.add(plan)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise AppError(409, "План на эту неделю уже есть") from None
    db.refresh(plan)
    return plan
