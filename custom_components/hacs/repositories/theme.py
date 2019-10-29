"""Class for themes in HACS."""
from .repository import HacsRepository, register_repository_class


@register_repository_class
class HacsTheme(HacsRepository):
    """Themes in HACS."""

    category = "theme"

    def __init__(self, full_name):
        """Initialize."""
        super().__init__()
        self.information.full_name = full_name
        self.information.category = self.category
        self.content.path.remote = "themes"
        self.content.path.local = f"{self.system.config_path}/themes"
        self.content.single = True

    async def validate_repository(self):
        """Validate."""
        # Run comperson2 validation steps.
        await self.comperson2_validate()

        # Custom step 1: Validate content.
        self.content.objects = await self.repository_object.get_contents(
            self.content.path.remote, self.ref
        )
        if not isinstance(self.content.objects, list):
            self.validate.errors.append("Repostitory structure not compliant")

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

        # Set name
        self.information.name = self.content.objects[0].name.replace(".yaml", "")

    async def update_repository(self):  # lgtm[py/similar-function]
        """Update."""
        if self.github.ratelimits.remaining == 0:
            return
        # Run comperson2 update steps.
        await self.comperson2_update()

        # Get theme objects.
        if self.repository_manifest:
            if self.repository_manifest.content_in_root:
                self.content.path.remote = ""
        self.content.objects = await self.repository_object.get_contents(
            self.content.path.remote, self.ref
        )

        self.content.files = []
        for filename in self.content.objects:
            self.content.files.append(filename.name)

        # Update name
        self.information.name = self.content.objects[0].name.replace(".yaml", "")

        self.content.files = []
        for filename in self.content.objects:
            self.content.files.append(filename.name)
