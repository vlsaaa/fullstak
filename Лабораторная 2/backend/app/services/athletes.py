from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.errors import AppError
from app.models import AttendanceMark, Athlete, Injury, NutritionEntry
from app.schemas.entities import AthleteCreate, AthleteUpdate
from app.services.common import apply_changes, require_athlete, save


def list_athletes(db: Session) -> list[Athlete]:
    return list(db.scalars(select(Athlete).order_by(Athlete.last_name, Athlete.first_name)))


def create_athlete(db: Session, data: AthleteCreate) -> Athlete:
    return save(db, Athlete(**data.model_dump()))


def update_athlete(db: Session, athlete_id: int, data: AthleteUpdate) -> Athlete:
    athlete = require_athlete(db, athlete_id)
    apply_changes(athlete, data)
    db.commit()
    db.refresh(athlete)
    return athlete


def delete_athlete(db: Session, athlete_id: int) -> None:
    athlete = require_athlete(db, athlete_id)
    history = (
        _count(db, AttendanceMark, AttendanceMark.athlete_id == athlete_id)
        + _count(db, Injury, Injury.athlete_id == athlete_id)
        + _count(db, NutritionEntry, NutritionEntry.athlete_id == athlete_id)
    )
    if history:
        raise AppError(
            409,
            "Нельзя удалить спортсмена: в журнале уже есть его отметки, травмы или питание",
        )
    db.delete(athlete)
    db.commit()


def _count(db: Session, model: type, condition: object) -> int:
    return int(db.scalar(select(func.count()).select_from(model).where(condition)) or 0)
