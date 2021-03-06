"""Helper constants."""
# pylint: disable=missing-class-docstring
from enum import Enum


class HacsCategory(str, Enum):
    APPDAEperson2 = "appdaeperson2"
    INTEGRATION = "integration"
    LOVELACE = "lovelace"
    PLUGIN = "plugin"  # Kept for legacy purposes
    NETDAEperson2 = "netdaeperson2"
    PYTHON_SCRIPT = "python_script"
    THEME = "theme"
    REMOVED = "removed"


class LovelaceMode(str, Enum):
    """Lovelace Modes."""

    STORAGE = "storage"
    AUTO = "auto"
    YAML = "yaml"


class HacsStage(str, Enum):
    SETUP = "setup"
    STARTUP = "startup"
    WAITING = "waiting"
    RUNNING = "running"
    BACKGROUND = "background"


class HacsSetupTask(str, Enum):
    WEBSOCKET = "WebSocket API"
    FRONTEND = "Frontend"
    SENSOR = "Sensor"
    HACS_REPO = "Hacs Repository"
    CATEGORIES = "Additional categories"
    CLEAR_STORAGE = "Clear storage"


class HacsDisabledReason(str, Enum):
    RATE_LIMIT = "rate_limit"
    REMOVED = "removed"
    INVALID_TOKEN = "invalid_token"
    CONSTRAINS = "constrains"
    LOAD_HACS = "load_hacs"
    RESTORE = "restore"
