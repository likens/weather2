import { createEffect, createSignal } from 'solid-js'
import { degToCompass, DEGREE_SYMBOL, PERCENT_SYMBOL } from './Utils';

function Current(props) {

	const [dateTime, setDateTime] = createSignal(``);
	const [location, setLocation] = createSignal(``);
    const [description, setDescription] = createSignal(``);
    const [temperatures, setTemperatures] = createSignal(``);
    const [precipitation, setPrecipitation] = createSignal(``);
    const [wind, setWind] = createSignal(``);
    const [sunTime, setSunTime] = createSignal(``);

    createEffect(() => {
        const dt = props.data.weather.current.dt;
        setDateTime(new Date(dt * 1000).toLocaleString('en-us'))
        setLocation({
            name: props.data.geocoding.name,
            state: props.data.geocoding.state,
            country: props.data.geocoding.country
        });
        setDescription(props.data.weather.current.weather[0].description);
        setTemperatures({
            current: props.data.weather.current.temp,
            high: props.data.weather.daily[0].temp.max,
            low:  props.data.weather.daily[0].temp.min,
            feelsLike: props.data.weather.current.feels_like
        });
        setPrecipitation({
            humidity: props.data.weather.current.humidity,
            chance: props.data.weather.daily[0].pop
        });
        setWind({
            degrees: props.data.weather.current.wind_deg,
            speed: props.data.weather.current.wind_speed
        })

        let sunLabel = "Sunrise";
        let sunValue = props.data.weather.current.sunrise;
    
        if (dt > sunValue) {
            sunLabel = "Sunset";
            sunValue = props.data.weather.current.sunset;
        }

        setSunTime({
            label: sunLabel,
            value: new Date(sunValue * 1000).toLocaleString('en-us', { hour: '2-digit', minute: '2-digit'})
        })
    })

    return (
        <>
            <div>
                <div className='uppercase font-bold'>Current</div>
                <div>{dateTime()}</div>
                <div>{location().name}, {location().state ? location().state : location().country}</div>
                <div>{description()}</div>
                <div>currently: {temperatures().current}{DEGREE_SYMBOL}</div>
                <div>high: {temperatures().high}{DEGREE_SYMBOL}</div>
                <div>low: {temperatures().low}{DEGREE_SYMBOL}</div>
                <div>feels like: {temperatures().feelsLike}{DEGREE_SYMBOL}</div>
                <div>precipitation chance: {precipitation().chance}{PERCENT_SYMBOL}</div>
                <div>wind: {wind().speed}mph, {degToCompass(wind().degrees)}</div>
                <div>humidity: {precipitation().humidity}{PERCENT_SYMBOL}</div>
                <div>{sunTime().label}: {sunTime().value} </div>
            </div>
        </>
    )
}

export default Current
