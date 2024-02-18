import { IconCloudFog, IconCloudRain, IconCloudSnow, IconCloudStorm, IconHaze, IconMist, IconTornado, IconWind, IconCloud, IconSun, IconMoonStars, IconSunHigh, IconHazeMoon } from "@tabler/icons-solidjs";

const OW_URL = "https://api.openweathermap.org";
const OW_WEATHER_PATH = "/data/2.5/onecall";
const OW_GEOCODING_PATH = "/geo/1.0/";
const OW_PARAMS_START = "?appid="
export const OW_API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

const NOMINATIM_URL = `https://nominatim.openstreetmap.org`;
const NOMINATIM_REVERSE_PATH = `/reverse`;
const NOMINATIM_SEARCH_PATH = `/search`;
const NOMINATIM_PARAMS_START = `?format=json`;

export const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export const TOMORROW_IO_API_KEY = import.meta.env.VITE_TOMORROW_IO_API_KEY;

const TOMORROW_IO_URL = "https://api.tomorrow.io/v4";
const TOMORROW_IO_TIMELINES = "/timelines";
const TOMORROW_IO_REALTIME = "/weather/realtime"
const TOMORROW_IO_PARAMS_START = "?apikey="
const TOMORROW_IO_FIELDS = [
    "precipitationIntensity",
    "precipitationType",
    "precipitationProbability",
    "windSpeed",
    "windGust",
    "windDirection",
    "temperature",
    "temperatureApparent",
    "cloudCover",
    "cloudBase",
    "cloudCeiling",
    "weatherCode",
    "weatherCodeFullDay",
    "weatherCodeDay",
    "weatherCodeNight",
    "uvIndex",
    "uvHealthConcern",
    "dewPoint",
    "humidity",
    "pressureSurfaceLevel",
    "pressureSeaLevel",
    "sunriseTime",
    "sunsetTime",
    "visibility",
    "moonPhase"
];
const TOMORROW_IO_UNITS = ["imperial", "metric"]
const TOMORROW_IO_TIMESTEPS = ["current", "1h", "1d"]

export const OW_WEATHER_URL = `${OW_URL}${OW_WEATHER_PATH}${OW_PARAMS_START}${OW_API_KEY}&units=imperial&exclude=minutely`;
export const OW_REVERSE_GEO_URL = `${OW_URL}${OW_GEOCODING_PATH}reverse${OW_PARAMS_START}${OW_API_KEY}&limit=1`;
export const OW_ZIP_GEO_URL = `${OW_URL}${OW_GEOCODING_PATH}zip${OW_PARAMS_START}${OW_API_KEY}&limit=20`;
export const OW_DIRECT_GEO_URL = `${OW_URL}${OW_GEOCODING_PATH}direct${OW_PARAMS_START}${OW_API_KEY}&limit=20`;
export const NOMINATIM_LOCATION_URL = `${NOMINATIM_URL}${NOMINATIM_REVERSE_PATH}${NOMINATIM_PARAMS_START}&zoom=10`;
export const NOMINATIM_SEARCH_URL = `${NOMINATIM_URL}${NOMINATIM_SEARCH_PATH}${NOMINATIM_PARAMS_START}`;
export const TOMORROW_IO_WEATHER_URL = `${TOMORROW_IO_URL}${TOMORROW_IO_REALTIME}${TOMORROW_IO_PARAMS_START}${TOMORROW_IO_API_KEY}&units=imperial`

const REGEX_ZIP = /^\d{5}(?:-\d{4})?$/;
const REGEX_CITY = /^[A-Za-z\s']+$/;

export const DEGREE_SYMBOL = "˚";
export const PERCENT_SYMBOL = "%";
export const COMPASS_OPTIONS = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
export const CODE_MIST = 701;
export const CODE_HAZE = 721;
export const CODE_FOG = 741;
export const CODE_WIND = 771;
export const CODE_TORNADO = 781;
export const CODE_TSTORM = [200, 201, 202, 210, 211, 212, 221, 230, 231, 232];
export const CODE_RAIN_LIGHT = [300, 301, 310, 321, 500, 501];
export const CODE_RAIN_HEAVY = [302, 311, 312, 313, 314, 502, 503, 504, 520, 521, 522, 531];
export const CODE_SNOW_LIGHT = [600, 601, 620, 621];
export const CODE_SNOW_HEAVY = [602, 622];
export const CODE_SNOW_MIXED = [511, 611, 612, 613, 615, 616]
export const CODE_ATMOSPHERE = [CODE_MIST, 711, CODE_HAZE, 731, CODE_FOG, 751, 761, 762, CODE_WIND, CODE_TORNADO];
export const CODE_CLEAR = [800];
export const CODE_CLOUD_LIGHT = [801, 802];
export const CODE_CLOUD_HEAVY = [803, 804];

export const degToCompass = (deg = 0) => COMPASS_OPTIONS[(Math.floor((deg / 22.5) + 0.5) % 16)];

export const CLASSES_WEATHER_SECTIONS = `p-4 bg-neutral-50/50 dark:bg-neutral-900/75 border border-neutral-100/50 dark:border-neutral-900 backdrop-blur rounded shadow-md`;

function checkCodes(code, codeList) {
    if (codeList.includes(code)) {
        return code;
    }
    return false;
}

export const getWeatherIcon = (code = 800, size = 36, night = false) => {
    switch (code) {
        case checkCodes(code, CODE_RAIN_LIGHT):
            return <IconCloudRain size={size} />;
        case checkCodes(code, CODE_RAIN_HEAVY):
            return <IconCloudRain size={size} />;
        case checkCodes(code, CODE_SNOW_LIGHT):
            return <IconCloudSnow size={size} />;
        case checkCodes(code, CODE_SNOW_HEAVY):
            return <IconCloudSnow size={size} />;
        case checkCodes(code, CODE_SNOW_MIXED):
            return <IconCloudSnow size={size} />;
        case checkCodes(code, CODE_TSTORM):
            return <IconCloudStorm size={size} />;
        case checkCodes(code, CODE_CLOUD_HEAVY):
            return <IconCloud size={size} />;
        case checkCodes(code, CODE_CLOUD_LIGHT):
            return <IconCloud size={size} />;
        case checkCodes(code, CODE_CLEAR):
            return night ? <IconMoonStars size={size} /> : <IconSunHigh size={size} />;
        case checkCodes(code, CODE_ATMOSPHERE):
            switch (code) {
                case CODE_HAZE:
                    return <IconMist size={size} />;
                case CODE_HAZE:
                    return night ? <IconHazeMoon size={size} /> : <IconHaze size={size} />;
                case CODE_WIND:
                    return <IconWind size={size} />;
                case CODE_TORNADO:
                    return <IconTornado size={size} />;
                default:
                    return <IconCloudFog size={size} />;
            }
        default:
            return <IconCloud size={size} />;
    }
}

export const getWeatherBackground = (code = 800, night = false) => {
    let modifier = night ? `night`:`day`;
    switch (code) {
        case checkCodes(code, CODE_RAIN_LIGHT):
            return `rainLight-${modifier}`;
        case checkCodes(code, CODE_RAIN_HEAVY):
            return `rainHeavy-${modifier}`;
        case checkCodes(code, CODE_SNOW_LIGHT):
            return `snowLight-${modifier}`;
        case checkCodes(code, CODE_SNOW_HEAVY):
            return `snowHeavy-${modifier}`;
        case checkCodes(code, CODE_SNOW_MIXED):
            return `snowMixed`;
        case checkCodes(code, CODE_TSTORM):
            return 'tStorm';
        case checkCodes(code, CODE_CLOUD_HEAVY):
            return `cloudsHeavy-${modifier}`;
        case checkCodes(code, CODE_CLOUD_LIGHT):
            return `cloudsLight-${modifier}`;
        case checkCodes(code, CODE_CLEAR):
            return `clear-${modifier}`;
        case checkCodes(code, CODE_ATMOSPHERE):
            switch (code) {
                case CODE_MIST:
                    return 'haze';
                case CODE_HAZE:
                    return 'haze';
                case CODE_WIND:
                    return 'wind';
                case CODE_TORNADO:
                    return 'tornado';
                default:
                    return `fog-${modifier}`;
            }
        default:
            return <IconCloud size={size} />;
    }
}

export const geocodingFetchData = (lat, lon) => {
    let dataFetched = undefined;
    Promise.all([
        fetch(`${OW_WEATHER_URL}&lat=${lat}&lon=${lon}`).then(res => res.json()),
        fetch(`${OW_REVERSE_GEO_URL}&lat=${lat}&lon=${lon}`).then(res => res.json()),
    ]).then(data => {
        dataFetched = data;
        return dataFetched;
    });
}


export const getWeatherUrl = (lat, lon) => `${OW_WEATHER_URL}&lat=${lat}&lon=${lon}`;
export const getLocationUrl = (lat, lon) => `${NOMINATIM_LOCATION_URL}&lat=${lat}&lon=${lon}`;
export const getTomorrowUrl = (lat, lon) => `${TOMORROW_IO_WEATHER_URL}&location=${lat},${lon}`

export const formatLocationName = (location) => {
    let primary;
    let secondary;
    if (location.town) {
        primary = location.town;
    } else if (location.city) {
        primary = location.city;
    } else if (location.county) {
        primary = location.county;
    }
    if (location.state) {
        secondary = location.state;
    } else if (location.country) {
        secondary = location.country;
    }
    return {primary:primary,secondary:secondary};
}