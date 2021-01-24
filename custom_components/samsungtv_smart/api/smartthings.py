""" Smartthings TV integration """

from datetime import timedelta
from enum import Enum
import logging
from typing import Dict, Optional
from aiohttp import ClientSession, ClientConnectionError, ClientResponseError
from asyncio import TimeoutError as AsyncTimeoutError
import json

from homeassistant.util import Throttle

API_BASEURL = "https://api.smartthings.com/v1"
API_DEVICES = f"{API_BASEURL}/devices"

DEVICE_TYPE_OCF = "OCF"
DEVICE_TYPEID_OCF = "f7b59139-a784-41d1-8624-56d10931b6c3"

COMMAND_POWER_OFF = (
    "{'commands': [{'component': 'main','capability': 'switch','command': 'off'}]}"
)
COMMAND_POWER_ON = (
    "{'commands': [{'component': 'main','capability': 'switch','command': 'on'}]}"
)
COMMAND_REFRESH = (
    "{'commands':[{'component': 'main','capability': 'refresh','command': 'refresh'}]}"
)
COMMAND_PAUSE = (
    "{'commands':[{'component': 'main','capability': 'mediaPlayback','command': 'pause'}]}"
)
COMMAND_MUTE = (
    "{'commands':[{'component': 'main','capability': 'audioMute','command': 'mute'}]}"
)
COMMAND_UNMUTE = (
    "{'commands':[{'component': 'main','capability': 'audioMute','command': 'unmute'}]}"
)
COMMAND_VOLUME_UP = (
    "{'commands':[{'component': 'main','capability': 'audioVolume','command': 'volumeUp'}]}"
)
COMMAND_VOLUME_DOWN = (
    "{'commands':[{'component': 'main','capability': 'audioVolume','command': 'volumeDown'}]}"
)
COMMAND_PLAY = (
    "{'commands':[{'component': 'main','capability': 'mediaPlayback','command': 'play'}]}"
)
COMMAND_STOP = (
    "{'commands':[{'component': 'main','capability': 'mediaPlayback','command': 'stop'}]}"
)
COMMAND_REWIND = (
    "{'commands':[{'component': 'main','capability': 'mediaPlayback','command': 'rewind'}]}"
)
COMMAND_FAST_FORWARD = (
    "{'commands':[{'component': 'main','capability': 'mediaPlayback','command': 'fastForward'}]}"
)
COMMAND_CHANNEL_UP = (
    "{'commands':[{'component': 'main','capability': 'tvChannel','command': 'channelUp'}]}"
)
COMMAND_CHANNEL_DOWN = (
    "{'commands':[{'component': 'main','capability': 'tvChannel','command': 'channelDown'}]}"
)

COMMAND_SET_VOLUME = (
    "{'commands':[{'component': 'main','capability': 'audioVolume','command': 'setVolume','arguments': "
)
ARGS_SET_VOLUME = "[{}]}}]}}"
COMMAND_SET_SOURCE = (
    "{'commands':[{'component': 'main','capability': 'mediaInputSource','command': 'setInputSource', 'arguments': "
)
ARGS_SET_SOURCE = "['{}']}}]}}"
COMMAND_SET_CHANNEL = (
    "{'commands':[{'component': 'main','capability': 'tvChannel','command': 'setTvChannel', 'arguments': "
)
ARGS_SET_CHANNEL = "['{}']}}]}}"

DIGITAL_TV = "digitalTv"

MIN_TIME_BETWEEN_UPDATES = timedelta(seconds=10)
_LOGGER = logging.getLogger(__name__)


def _headers(api_key: str) -> Dict[str, str]:
    return {
        "Authorization": f"Bearer {api_key}",
        "Accept": "application/json",
        "Connection": "keep-alive",
    }


class STStatus(Enum):
    STATE_OFF = 0
    STATE_ON = 1
    STATE_UNKNOWN = 2


class SmartThingsTV:
    def __init__(
        self,
        api_key: str,
        device_id: str,
        use_channel_info: bool = True,
        session: Optional[ClientSession] = None,
    ):

        """Initialize SmartThingsTV."""
        self._api_key = api_key
        self._device_id = device_id
        self._use_channel_info = use_channel_info
        if session:
            self._session = session
            self._managed_session = False
        else:
            self._session = ClientSession()
            self._managed_session = True

        self._device_name = None
        self._state = STStatus.STATE_UNKNOWN
        self._prev_state = STStatus.STATE_UNKNOWN
        self._muted = False
        self._volume = 10
        self._source_list = None
        self._source = ""
        self._channel = ""
        self._channel_name = ""

        self._is_forced_val = False
        self._forced_count = 0

    def __enter__(self):
        return self

    def __exit__(self, type, value, traceback):
        pass

    @property
    def api_key(self) -> str:
        """Return currently api_key."""
        return self._api_key

    @property
    def device_id(self) -> str:
        """Return currently device_id."""
        return self._device_id

    @property
    def device_name(self) -> str:
        """Return currently device_name."""
        return self._device_name

    @property
    def state(self):
        """Return currently state."""
        return self._state

    @property
    def prev_state(self):
        """Return currently state."""
        return self._prev_state

    @property
    def muted(self) -> bool:
        """Return currently muted state."""
        return self._muted

    @property
    def volume(self) -> int:
        """Return currently volume."""
        return self._volume

    @property
    def source(self) -> str:
        """Return currently source."""
        return self._source

    @property
    def channel(self) -> str:
        """Return currently channel."""
        return self._channel

    @property
    def channel_name(self) -> str:
        """Return currently channel name."""
        return self._channel_name

    @property
    def source_list(self):
        """Return currently source list."""
        return self._source_list

    def set_application(self, app_id):
        if self._use_channel_info:
            self._channel = ""
            self._channel_name = app_id
            self._is_forced_val = True
            self._forced_count = 0

    def _set_source(self, source):
        if source != self._source:
            self._source = source
            self._channel = ""
            self._channel_name = ""
            self._is_forced_val = True
            self._forced_count = 0

    @staticmethod
    async def get_devices_list(api_key, session: ClientSession, device_label=""):
        """Get list of available devices"""

        result = {}

        async with session.get(
            API_DEVICES, headers=_headers(api_key), raise_for_status=True,
        ) as resp:
            device_list = await resp.json()

        if device_list:
            _LOGGER.debug("SmartThings available devices: %s", str(device_list))

            for k in device_list.get("items", []):
                device_id = k.get("deviceId", "")
                device_type = k.get("type", "")
                device_type_id = k.get("deviceTypeId", "")
                if device_id and (
                    device_type_id == DEVICE_TYPEID_OCF
                    or device_type == DEVICE_TYPE_OCF
                ):
                    label = k.get("label", "")
                    if device_label == "" or (label == device_label and label != ""):
                        result.setdefault(device_id, {})["name"] = k.get("name", "")
                        result.setdefault(device_id, {})["label"] = label

        _LOGGER.info("SmartThings discovered TV devices: %s", str(result))

        return result

    @Throttle(MIN_TIME_BETWEEN_UPDATES)
    async def _device_refresh(self, **kwargs):
        """Refresh device status on SmartThings"""

        device_id = self._device_id
        if not device_id:
            return

        api_device = f"{API_DEVICES}/{device_id}"
        api_command = f"{api_device}/commands"

        if self._use_channel_info:
            async with self._session.post(
                api_command,
                headers=_headers(self._api_key),
                data=COMMAND_REFRESH,
                raise_for_status=False,
            ) as resp:
                if resp.status == 409:
                    self._state = STStatus.STATE_OFF
                    return
                resp.raise_for_status()
                await resp.json()

        return

    async def async_device_health(self):
        """Check device availability"""

        device_id = self._device_id
        if not device_id:
            return False

        api_device = f"{API_DEVICES}/{device_id}"
        api_device_health = f"{api_device}/health"

        # this get the real status of the device
        async with self._session.get(
            api_device_health, headers=_headers(self._api_key), raise_for_status=True,
        ) as resp:
            health = await resp.json()

        _LOGGER.debug(health)

        if health["state"] == "ONLINE":
            return True
        return False

    async def async_device_update(self, use_channel_info: bool = None):
        """Query device status on SmartThing"""

        device_id = self._device_id
        if not device_id:
            return

        if use_channel_info is not None:
            self._use_channel_info = use_channel_info

        api_device = f"{API_DEVICES}/{device_id}"
        api_device_status = f"{api_device}/states"
        # not used, just for reference
        api_device_main_status = f"{api_device}/components/main/status"

        self._prev_state = self._state

        try:
            is_online = await self.async_device_health()
        except (
            AsyncTimeoutError,
            ClientConnectionError,
            ClientResponseError,
        ):
            self._state = STStatus.STATE_UNKNOWN
            return

        if is_online:
            self._state = STStatus.STATE_ON
        else:
            self._state = STStatus.STATE_OFF
            return

        await self._device_refresh()
        if self._state == STStatus.STATE_OFF:
            return

        async with self._session.get(
            api_device_status, headers=_headers(self._api_key), raise_for_status=True,
        ) as resp:
            data = await resp.json()

        _LOGGER.debug(data)

        dev_data = data.get("main", {})
        # device_state = data['main']['switch']['value']
        device_volume = dev_data.get("volume", {}).get("value", 0)
        device_muted = dev_data.get("mute", {}).get("value", "")
        device_source = dev_data.get("inputSource", {}).get("value", "")
        device_tv_chan = dev_data.get("tvChannel", {}).get("value", "")
        device_tv_chan_name = dev_data.get("tvChannelName", {}).get("value", "")
        device_all_sources = {}

        json_sources = dev_data.get("supportedInputSources", {}).get("value")
        if json_sources:
            try:
                device_all_sources = json.loads(json_sources)
            except (TypeError, ValueError):
                pass

        if device_volume and device_volume.isdigit():
            self._volume = int(device_volume) / 100
        else:
            self._volume = 0
        self._source_list = device_all_sources
        if device_muted == "mute":
            self._muted = True
        else:
            self._muted = False

        if self._is_forced_val and self._forced_count <= 0:
            self._forced_count += 1
            return

        self._is_forced_val = False
        self._forced_count = 0
        if device_source:
            if device_source.upper() == DIGITAL_TV.upper():
                device_source = DIGITAL_TV
        self._source = device_source
        # if the status is not refreshed this info may become not reliable
        if self._use_channel_info:
            self._channel = device_tv_chan
            self._channel_name = device_tv_chan_name
        else:
            self._channel = ""
            self._channel_name = ""

    async def async_send_command(self, cmdtype, command=""):
        """Send a command too the device"""

        device_id = self._device_id
        if not device_id:
            return

        api_device = f"{API_DEVICES}/{device_id}"
        api_command = f"{api_device}/commands"
        datacmd = None

        if cmdtype == "turn_off":  # turns off
            datacmd = COMMAND_POWER_OFF
        elif cmdtype == "turn_on":  # turns on
            datacmd = COMMAND_POWER_ON
        elif cmdtype == "setvolume":  # sets volume
            cmdargs = ARGS_SET_VOLUME.format(command)
            datacmd = COMMAND_SET_VOLUME + cmdargs
        elif cmdtype == "stepvolume":  # steps volume up or down
            if command == "up":
                datacmd = COMMAND_VOLUME_UP
            elif command == "down":
                datacmd = COMMAND_VOLUME_DOWN
        elif cmdtype == "audiomute":  # mutes audio
            if command == "on":
                datacmd = COMMAND_MUTE
            elif command == "off":
                datacmd = COMMAND_UNMUTE
        elif cmdtype == "selectchannel":  # changes channel
            cmdargs = ARGS_SET_CHANNEL.format(command)
            datacmd = COMMAND_SET_CHANNEL + cmdargs
        elif cmdtype == "stepchannel":  # steps channel up or down
            if command == "up":
                datacmd = COMMAND_CHANNEL_UP
            elif command == "down":
                datacmd = COMMAND_CHANNEL_DOWN
        elif cmdtype == "selectsource":  # changes source
            cmdargs = ARGS_SET_SOURCE.format(command)
            datacmd = COMMAND_SET_SOURCE + cmdargs
            # set property to reflect new changes
            self._set_source(command)

        if datacmd:
            async with self._session.post(
                api_command,
                headers=_headers(self._api_key),
                data=datacmd,
                raise_for_status=True,
            ) as resp:
                await resp.json()

            await self._device_refresh()
