from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str = "postgresql+psycopg://coach:coach@127.0.0.1:5433/coach"
    app_name: str = "Спринт"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()
