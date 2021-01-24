"""HACS Configuration Schemas."""
# pylint: disable=dangerous-default-value
import voluptuous as vol

from custom_components.hacs.const import LOCALE

# Configuration:
TOKEN = "token"
SIDEPANEL_TITLE = "sidepanel_title"
SIDEPANEL_ICON = "sidepanel_icon"
FRONTEND_REPO = "frontend_repo"
FRONTEND_REPO_URL = "frontend_repo_url"
APPDAEperson2 = "appdaeperson2"
NETDAEperson2 = "netdaeperson2"

# Options:
COUNTRY = "country"
DEBUG = "debug"
RELEASE_LIMIT = "release_limit"
EXPERIMENTAL = "experimental"

# Config group
PATH_OR_URL = "frontend_repo_path_or_url"


def hacs_base_config_schema(config: dict = {}) -> dict:
    """Return a shcema configuration dict for HACS."""
    if not config:
        config = {
            TOKEN: "xxxxxxxxxxxxxxxxxxxxxxxxxxx",
        }
    return {
        vol.Required(TOKEN, default=config.get(TOKEN)): str,
    }


def hacs_config_option_schema(options: dict = {}) -> dict:
    """Return a shcema for HACS configuration options."""
    if not options:
        options = {
            APPDAEperson2: False,
            COUNTRY: "ALL",
            DEBUG: False,
            EXPERIMENTAL: False,
            NETDAEperson2: False,
            RELEASE_LIMIT: 5,
            SIDEPANEL_ICON: "hacs:hacs",
            SIDEPANEL_TITLE: "HACS",
            FRONTEND_REPO: "",
            FRONTEND_REPO_URL: "",
        }
    return {
        vol.Optional(SIDEPANEL_TITLE, default=options.get(SIDEPANEL_TITLE)): str,
        vol.Optional(SIDEPANEL_ICON, default=options.get(SIDEPANEL_ICON)): str,
        vol.Optional(RELEASE_LIMIT, default=options.get(RELEASE_LIMIT)): int,
        vol.Optional(COUNTRY, default=options.get(COUNTRY)): vol.In(LOCALE),
        vol.Optional(APPDAEperson2, default=options.get(APPDAEperson2)): bool,
        vol.Optional(NETDAEperson2, default=options.get(NETDAEperson2)): bool,
        vol.Optional(DEBUG, default=options.get(DEBUG)): bool,
        vol.Optional(EXPERIMENTAL, default=options.get(EXPERIMENTAL)): bool,
        vol.Exclusive(FRONTEND_REPO, PATH_OR_URL): str,
        vol.Exclusive(FRONTEND_REPO_URL, PATH_OR_URL): str,
    }


def hacs_config_combined() -> dict:
    """Combine the configuration options."""
    base = hacs_base_config_schema()
    options = hacs_config_option_schema()

    for option in options:
        base[option] = options[option]

    return base
