from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import TrainingSession
from app.schemas.entities import SessionCreate, SessionUpdate
from app.services.common import apply_changes, require_plan, require_session, save


def list_sessions(db: Session, plan_id: int | None = None) -> list[TrainingSession]:
    query = select(TrainingSession).order_by(TrainingSession.session_date, TrainingSession.start_time)
    if plan_id is not None:
        require_plan(db, plan_id)
        query = query.where(TrainingSession.plan_id == plan_id)
    return list(db.scalars(query))


def create_session(db: Session, data: SessionCreate) -> TrainingSession:
    require_plan(db, data.plan_id)
    return save(db, TrainingSession(**data.model_dump()))


def update_session(db: Session, session_id: int, data: SessionUpdate) -> TrainingSession:
    session = require_session(db, session_id)
    changes = data.model_dump(exclude_unset=True)
    if "plan_id" in changes:
        require_plan(db, changes["plan_id"])
    apply_changes(session, data)
    db.commit()
    db.refresh(session)
    return session


def delete_session(db: Session, session_id: int) -> None:
    session = require_session(db, session_id)
    db.delete(session)
    db.commit()
