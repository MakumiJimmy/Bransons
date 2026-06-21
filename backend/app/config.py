"""
Bransons Kitchen — FastAPI Backend Configuration
"""
from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    database_url: str = "postgresql://postgres:password@localhost:5432/bransons_kitchen"
    cors_origins: str = "http://localhost:5173,http://localhost:3000"
    secret_key: str = "dev-secret-key-change-in-production"

    @property
    def cors_origins_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",")]

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache()
def get_settings() -> Settings:
    return Settings()
