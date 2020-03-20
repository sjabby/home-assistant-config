"""Class for appdaeperson2 apps in HACS."""
from aiogithubapi import AIOGitHubException
from .repository import HacsRepository, register_repository_class
from ..hacsbase.exceptions import HacsException


@register_repository_class
class HacsAppdaeperson2(HacsRepository):
    """Appdaeperson2 apps in HACS."""

    category = "appdaeperson2"

    def __init__(self, full_name):
        """Initialize."""
        super().__init__()
        self.information.full_name = full_name
        self.information.category = self.category
        self.content.path.local = self.localpath
        self.content.path.remote = "apps"

    @property
    def localpath(self):
        """Return localpath."""
        return f"{self.system.config_path}/appdaeperson2/apps/{self.information.name}"

    async def validate_repository(self):
        """Validate."""
        await self.comperson2_validate()

        # Custom step 1: Validate content.
        try:
            addir = await self.repository_object.get_contents("apps", self.ref)
        except AIOGitHubException:
            raise HacsException(
                f"Repostitory structure for {self.ref.replace('tags/','')} is not compliant"
            )

        if not isinstance(addir, list):
            self.validate.errors.append("Repostitory structure not compliant")

        self.content.path.remote = addir[0].path
        self.information.name = addir[0].name
        self.content.objects = await self.repository_object.get_contents(
            self.content.path.remote, self.ref
        )

        self.content.files = []
        for filename in self.content.objects:
            self.content.files.append(filename.name)

        # Handle potential errors
        if self.validate.errors:
            for error in self.validate.errors:
                if not self.system.status.startup:
                    self.logger.error(error)
        return self.validate.success

    async def registration(self):
        """Registration."""
        if not await self.validate_repository():
            return False

        # Run comperson2 registration steps.
        await self.comperson2_registration()

        # Set local path
        self.content.path.local = self.localpath

    async def update_repository(self):
        """Update."""
        if self.github.ratelimits.remaining == 0:
            return
        await self.comperson2_update()

        # Get appdaeperson2 objects.
        if self.repository_manifest:
            if self.repository_manifest.content_in_root:
                self.content.path.remote = ""

        if self.content.path.remote == "apps":
            addir = await self.repository_object.get_contents(
                self.content.path.remote, self.ref
            )
            self.content.path.remote = addir[0].path
            self.information.name = addir[0].name
        self.content.objects = await self.repository_object.get_contents(
            self.content.path.remote, self.ref
        )

        self.content.files = []
        for filename in self.content.objects:
            self.content.files.append(filename.name)

        # Set local path
        self.content.path.local = self.localpath
