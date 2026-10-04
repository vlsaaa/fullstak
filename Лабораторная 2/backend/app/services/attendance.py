from sqlalchemy import select
from sqlalchemy.orm import Session

from app.errors import AppError
from app.models import AttendanceMark
from app.schemas.entities import AttendanceCreate, AttendanceUpdate
from app.services.common import apply_changes, require_athlete, require_session, save


def list_marks(db: Session, session_id: int | None = None) -> list[AttendanceMark]:
    query = select(AttendanceMark).order_by(AttendanceMark.id)
    if session_id is not None:
        require_session(db, session_id)
        query = query.where(AttendanceMark.session_id == session_id)
    return list(db.scalars(query))


def get_mark(db: Session, mark_id: int) -> AttendanceMark:
    mark = db.get(AttendanceMark, mark_id)
    if mark is None:
        raise AppError(404, "Отметка посещения не найдена")
    return mark


def create_mark(db: Session, data: AttendanceCreate) -> AttendanceMark:
    require_session(db, data.session_id)
    require_athlete(db, data.athlete_id)
    existing = db.scalar(
        select(AttendanceMark).where(
            AttendanceMark.session_id == data.session_id,
            AttendanceMark.athlete_id == data.athlete_id,
        )
    )
    if existing is not None:
        raise AppError(409, "Отметка этого спортсмена на тренировке уже есть")
    return save(db, AttendanceMark(**data.model_dump()))


def update_mark(db: Session, mark_id: int, data: AttendanceUpdate) -> AttendanceMark:
    mark = get_mark(db, mark_id)
    apply_changes(mark, data)
    db.commit()
    db.refresh(mark)
    return mark


def delete_mark(db: Session, mark_id: int) -> None:
    mark = get_mark(db, mark_id)
    db.delete(mark)
    db.commit()
