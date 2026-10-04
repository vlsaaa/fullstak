from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

import app.models  # noqa: F401  — регистрация таблиц до create_all
from app.api.router import router
from app.core.config import settings
from app.db.base import Base
from app.db.session import engine
from app.errors import AppError


@asynccontextmanager
async def lifespan(_: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(title=settings.app_name, lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5173", "http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(router, prefix="/api")


@app.exception_handler(AppError)
async def handle_app_error(_: Request, exc: AppError) -> JSONResponse:
    return JSONResponse(status_code=exc.status_code, content={"detail": exc.detail})


@app.exception_handler(RequestValidationError)
async def handle_validation(_: Request, exc: RequestValidationError) -> JSONResponse:
    fields = []
    for error in exc.errors():
        location = [str(part) for part in error.get("loc", []) if part != "body"]
        fields.append({"field": ".".join(location), "message": error.get("msg", "")})
    return JSONResponse(
        status_code=422,
        content={
            "detail": "Проверьте поля запроса: часть данных заполнена неверно или не передана",
            "errors": fields,
        },
    )
