"""Initialize repositories."""
from custom_components.hacs.repositories.theme import HacsTheme
from custom_components.hacs.repositories.integration import HacsIntegration
from custom_components.hacs.repositories.python_script import HacsPythonScript
from custom_components.hacs.repositories.appdaeperson2 import HacsAppdaeperson2
from custom_components.hacs.repositories.netdaeperson2 import HacsNetdaeperson2
from custom_components.hacs.repositories.plugin import HacsPlugin

RERPOSITORY_CLASSES = {
    "theme": HacsTheme,
    "integration": HacsIntegration,
    "python_script": HacsPythonScript,
    "appdaeperson2": HacsAppdaeperson2,
    "netdaeperson2": HacsNetdaeperson2,
    "plugin": HacsPlugin,
}
