from sqlalchemy import select
from sqlalchemy.orm import Session

from app.errors import AppError
from app.models import Injury
from app.schemas.entities import InjuryCreate, InjuryUpdate
from app.services.common import apply_changes, require_athlete, save


def list_injuries(db: Session, athlete_id: int | None = None) -> list[Injury]:
    query = select(Injury).order_by(Injury.started_on.desc())
    if athlete_id is not None:
        require_athlete(db, athlete_id)
        query = query.where(Injury.athlete_id == athlete_id)
    return list(db.scalars(query))


def get_injury(db: Session, injury_id: int) -> Injury:
    injury = db.get(Injury, injury_id)
    if injury is None:
        raise AppError(404, "Запись о травме не найдена")
    return injury


def create_injury(db: Session, data: InjuryCreate) -> Injury:
    require_athlete(db, data.athlete_id)
    return save(db, Injury(**data.model_dump()))


def update_injury(db: Session, injury_id: int, data: InjuryUpdate) -> Injury:
    injury = get_injury(db, injury_id)
    apply_changes(injury, data)
    db.commit()
    db.refresh(injury)
    return injury


def delete_injury(db: Session, injury_id: int) -> None:
    injury = get_injury(db, injury_id)
    db.delete(injury)
    db.commit()
