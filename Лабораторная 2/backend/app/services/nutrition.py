from sqlalchemy import select
from sqlalchemy.orm import Session

from app.errors import AppError
from app.models import NutritionEntry
from app.schemas.entities import NutritionCreate, NutritionUpdate
from app.services.common import apply_changes, require_athlete, save


def list_meals(db: Session, athlete_id: int | None = None) -> list[NutritionEntry]:
    query = select(NutritionEntry).order_by(NutritionEntry.entry_date.desc(), NutritionEntry.id)
    if athlete_id is not None:
        require_athlete(db, athlete_id)
        query = query.where(NutritionEntry.athlete_id == athlete_id)
    return list(db.scalars(query))


def get_meal(db: Session, meal_id: int) -> NutritionEntry:
    meal = db.get(NutritionEntry, meal_id)
    if meal is None:
        raise AppError(404, "Запись питания не найдена")
    return meal


def create_meal(db: Session, data: NutritionCreate) -> NutritionEntry:
    require_athlete(db, data.athlete_id)
    return save(db, NutritionEntry(**data.model_dump()))


def update_meal(db: Session, meal_id: int, data: NutritionUpdate) -> NutritionEntry:
    meal = get_meal(db, meal_id)
    apply_changes(meal, data)
    db.commit()
    db.refresh(meal)
    return meal


def delete_meal(db: Session, meal_id: int) -> None:
    meal = get_meal(db, meal_id)
    db.delete(meal)
    db.commit()
