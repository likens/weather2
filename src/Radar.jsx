import { createSignal } from "solid-js";
import MapGL, { Source, Layer } from "solid-map-gl";
import { CLASSES_WEATHER_SECTIONS, MAPBOX_ACCESS_TOKEN, OW_API_KEY, TOMORROW_IO_API_KEY } from "./Utils";

const DATA_FIELD = "precipitationIntensity";
const TIMESTAMP = (new Date()).toISOString();

const radarFrame = (location) => {
    return (
        <iframe className="w-[calc(100%+40px)] h-[calc(100%+64px)] absolute -top-16 -left-10" src={`https://openweathermap.org/weathermap?basemap=map&cities=false&layer=precipitation&lat=${location.lat}&lon=${location.lon}&zoom=9`} />
    )
}

const mapGL = (location) => {
    const [viewport, setViewport] = createSignal({
        center: [location.lon, location.lat],
        zoom: 8, // 9
    });

    return (
        <MapGL options={{
            accessToken: MAPBOX_ACCESS_TOKEN,
            style: "mapbox://styles/mapbox/light-v11",
            darkStyle: "mapbox://styles/mapbox/dark-v11"
        }}
        viewport={viewport()}
        onViewportChange={(evt) => setViewport(evt)}
        >
            {/* <Source id="tomorrow-io"
                source={{
                    type: 'raster',
                    tiles: [
                        `https://api.tomorrow.io/v4/map/tile/{z}/{x}/{y}/${DATA_FIELD}/${TIMESTAMP}.png?apikey=${TOMORROW_IO_API_KEY}`
                    ],
                    tileSize: 256,
                }}>
                <Layer id="tomorrow-io-tiles" style={{ source: 'tomorrow-io', type: 'raster', }}/>
            </Source> */}
            <Source id="openWeather"
                source={{
                    type: 'raster',
                    tiles: [
                        `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${OW_API_KEY}`
                    ],
                    tileSize: 256,
                }}>
                <Layer id="openWeatherLayer" style={{ source: 'openWeather', type: 'raster', }}/>
            </Source>

        </MapGL>
    )
}

function Radar(props) {

    const {location} = props;

    return (
        <div id="radar" className={`${CLASSES_WEATHER_SECTIONS} relative overflow-hidden flex h-[400px] w-full`}>
            {/* {radarFrame(location)} */}
            {mapGL(location)}
        </div>
    )
}

export default Radar
