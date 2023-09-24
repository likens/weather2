// import Map from 'ol/Map';
// import View from 'ol/View';
// import TileLayer from 'ol/layer/Tile';
// import OSM from 'ol/source/OSM';

import MapGL, { Layer, Source } from "solid-map-gl";
import {MAPBOX_ACCESS_TOKEN} from "./Utils";
import { createSignal } from "solid-js";

function Radar(props) {

    const {location} = props;

    const [viewport,setViewport] = createSignal({
        center: [location.lon, location.lat],
        zoom: 3,
    })

    console.log(location);

    // const map = new Map({
    //     target: 'map', // The HTML element with the id 'map' to render the map
    //     layers: [
    //         // Add a TileLayer with OpenStreetMap as the source
    //         new TileLayer({
    //             source: new OSM(),
    //         }),
    //     ],
    //     view: new View({
    //         center: [0, 0], // Center of the map [longitude, latitude]
    //         zoom: 2, // Initial zoom level
    //     }),
    // });

    // [
    //     "41.3426940",
    //     "41.3973210",
    //     "-85.0918270",
    //     "-85.0220500"
    // ]

    return (
        <div className='relative overflow-hidden flex leading-none border border-neutral-300 rounded h-[400px] w-full'>
            {/* <MapGL
                options={{
                    accessToken: MAPBOX_ACCESS_TOKEN,
                    style: "mb:basic",
                }}
                viewport={viewport()}
                onViewportChange={(e) => setViewport(e)}>
                <Source source={{
                    type: "raster",
                    tiles: [`https://api.tomorrow.io/v4/map/tile/{z}/{x}/{y}/precipitationIntensity/now.png?apikey=${MAPBOX_ACCESS_TOKEN}`],
                    tileSize: 256
                }}>
                    <Layer id="radar" type="raster" sourceId="tomorrowIoRadar" />
                </Source>

            </MapGL> */}

            <iframe className="w-[calc(100%+40px)] h-[calc(100%+64px)] absolute -top-16 -left-10" src={`https://openweathermap.org/weathermap?basemap=map&cities=false&layer=precipitation&lat=${location.lat}&lon=${location.lon}&zoom=9`} />

            {/* <div id="map" style={{width: '100%', height: "400px"}}>asdf</div> */}
        </div>
    )
}

export default Radar
