from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.entities import (
    AthleteCreate,
    AthleteRead,
    AthleteUpdate,
    AttendanceCreate,
    AttendanceRead,
    AttendanceUpdate,
    InjuryCreate,
    InjuryRead,
    InjuryUpdate,
    NutritionCreate,
    NutritionRead,
    NutritionUpdate,
    PlanCreate,
    PlanRead,
    PlanUpdate,
    SessionCreate,
    SessionRead,
    SessionUpdate,
)
from app.services import athletes, attendance, injuries, nutrition, plans, sessions
from app.services.common import require_athlete, require_plan, require_session

router = APIRouter()


@router.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@router.get("/athletes", response_model=list[AthleteRead])
def read_athletes(db: Session = Depends(get_db)) -> list:
    return athletes.list_athletes(db)


@router.post("/athletes", response_model=AthleteRead, status_code=201)
def add_athlete(data: AthleteCreate, db: Session = Depends(get_db)):
    return athletes.create_athlete(db, data)


@router.get("/athletes/{athlete_id}", response_model=AthleteRead)
def read_athlete(athlete_id: int, db: Session = Depends(get_db)):
    return require_athlete(db, athlete_id)


@router.patch("/athletes/{athlete_id}", response_model=AthleteRead)
def edit_athlete(athlete_id: int, data: AthleteUpdate, db: Session = Depends(get_db)):
    return athletes.update_athlete(db, athlete_id, data)


@router.delete("/athletes/{athlete_id}", status_code=204)
def remove_athlete(athlete_id: int, db: Session = Depends(get_db)) -> Response:
    athletes.delete_athlete(db, athlete_id)
    return Response(status_code=204)


@router.get("/plans", response_model=list[PlanRead])
def read_plans(db: Session = Depends(get_db)) -> list:
    return plans.list_plans(db)


@router.post("/plans", response_model=PlanRead, status_code=201)
def add_plan(data: PlanCreate, db: Session = Depends(get_db)):
    return plans.create_plan(db, data)


@router.get("/plans/{plan_id}", response_model=PlanRead)
def read_plan(plan_id: int, db: Session = Depends(get_db)):
    return require_plan(db, plan_id)


@router.patch("/plans/{plan_id}", response_model=PlanRead)
def edit_plan(plan_id: int, data: PlanUpdate, db: Session = Depends(get_db)):
    return plans.update_plan(db, plan_id, data)


@router.delete("/plans/{plan_id}", status_code=204)
def remove_plan(plan_id: int, db: Session = Depends(get_db)) -> Response:
    plans.delete_plan(db, plan_id)
    return Response(status_code=204)


@router.get("/sessions", response_model=list[SessionRead])
def read_sessions(plan_id: int | None = None, db: Session = Depends(get_db)) -> list:
    return sessions.list_sessions(db, plan_id)


@router.post("/sessions", response_model=SessionRead, status_code=201)
def add_session(data: SessionCreate, db: Session = Depends(get_db)):
    return sessions.create_session(db, data)


@router.get("/sessions/{session_id}", response_model=SessionRead)
def read_session(session_id: int, db: Session = Depends(get_db)):
    return require_session(db, session_id)


@router.patch("/sessions/{session_id}", response_model=SessionRead)
def edit_session(session_id: int, data: SessionUpdate, db: Session = Depends(get_db)):
    return sessions.update_session(db, session_id, data)


@router.delete("/sessions/{session_id}", status_code=204)
def remove_session(session_id: int, db: Session = Depends(get_db)) -> Response:
    sessions.delete_session(db, session_id)
    return Response(status_code=204)


@router.get("/attendance", response_model=list[AttendanceRead])
def read_attendance(session_id: int | None = None, db: Session = Depends(get_db)) -> list:
    return attendance.list_marks(db, session_id)


@router.post("/attendance", response_model=AttendanceRead, status_code=201)
def add_attendance(data: AttendanceCreate, db: Session = Depends(get_db)):
    return attendance.create_mark(db, data)


@router.get("/attendance/{mark_id}", response_model=AttendanceRead)
def read_mark(mark_id: int, db: Session = Depends(get_db)):
    return attendance.get_mark(db, mark_id)


@router.patch("/attendance/{mark_id}", response_model=AttendanceRead)
def edit_mark(mark_id: int, data: AttendanceUpdate, db: Session = Depends(get_db)):
    return attendance.update_mark(db, mark_id, data)


@router.delete("/attendance/{mark_id}", status_code=204)
def remove_mark(mark_id: int, db: Session = Depends(get_db)) -> Response:
    attendance.delete_mark(db, mark_id)
    return Response(status_code=204)


@router.get("/injuries", response_model=list[InjuryRead])
def read_injuries(athlete_id: int | None = None, db: Session = Depends(get_db)) -> list:
    return injuries.list_injuries(db, athlete_id)


@router.post("/injuries", response_model=InjuryRead, status_code=201)
def add_injury(data: InjuryCreate, db: Session = Depends(get_db)):
    return injuries.create_injury(db, data)


@router.get("/injuries/{injury_id}", response_model=InjuryRead)
def read_injury(injury_id: int, db: Session = Depends(get_db)):
    return injuries.get_injury(db, injury_id)


@router.patch("/injuries/{injury_id}", response_model=InjuryRead)
def edit_injury(injury_id: int, data: InjuryUpdate, db: Session = Depends(get_db)):
    return injuries.update_injury(db, injury_id, data)


@router.delete("/injuries/{injury_id}", status_code=204)
def remove_injury(injury_id: int, db: Session = Depends(get_db)) -> Response:
    injuries.delete_injury(db, injury_id)
    return Response(status_code=204)


@router.get("/nutrition", response_model=list[NutritionRead])
def read_meals(athlete_id: int | None = None, db: Session = Depends(get_db)) -> list:
    return nutrition.list_meals(db, athlete_id)


@router.post("/nutrition", response_model=NutritionRead, status_code=201)
def add_meal(data: NutritionCreate, db: Session = Depends(get_db)):
    return nutrition.create_meal(db, data)


@router.get("/nutrition/{meal_id}", response_model=NutritionRead)
def read_meal(meal_id: int, db: Session = Depends(get_db)):
    return nutrition.get_meal(db, meal_id)


@router.patch("/nutrition/{meal_id}", response_model=NutritionRead)
def edit_meal(meal_id: int, data: NutritionUpdate, db: Session = Depends(get_db)):
    return nutrition.update_meal(db, meal_id, data)


@router.delete("/nutrition/{meal_id}", status_code=204)
def remove_meal(meal_id: int, db: Session = Depends(get_db)) -> Response:
    nutrition.delete_meal(db, meal_id)
    return Response(status_code=204)
