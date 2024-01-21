import { createEffect, createSignal } from 'solid-js'
import { degToCompass, DEGREE_SYMBOL, PERCENT_SYMBOL, getWeatherIcon, formatLocationName } from './Utils';
import { IconArrowUpRight, IconCaretDownFilled, IconCurrentLocation, IconDroplet, IconExternalLink, IconGauge, IconMoodEmpty, IconSunFilled, IconSunrise, IconSunset, IconTemperatureMinus, IconTemperaturePlus, IconUmbrella, IconUvIndex, IconWind, IconWindsock, IconEye, IconCloud, IconRefresh, IconStar, IconSettings } from '@tabler/icons-solidjs';
import UVIndex from './UVIndex';
import Humidity from './Humidity';
import Pressure from './Pressure';
import { useAppActions, useAppStore } from './Store';
import SunMoonTime from './SunMoonTime';
import Radar from './Radar';

const WeatherStat = (props) => {
    return <>
        <div className='grid items-center justify-center content-center gap-2 text-center whitespace-nowrap'>
            {props.icon && <div className='flex justify-center'>{props.icon}</div> }
            <div className='text-xl font-bold leading-none'>{props.value}</div>
            <div className='text-xs'>{props.label}</div>
        </div>
    </>
}

function Weather(props) {

	const [data, setData] = createSignal(undefined);
    const [datetime, setDatetime] = createSignal(undefined);
    const [location, setLocation] = createSignal(undefined);
    const [weather, setWeather] = createSignal(undefined);

    const {appReset,refreshWeather,saveGeolocation} = useAppActions()

	useAppStore.subscribe((state) => {
		if (state.geolocationData) {
			setData(state.geolocationData);
		}
	})

    const Datetime = () => {
        return (
            <div className='flex leading-tight font-bold text-sm'>
                <div className='flex gap-1'>
                    <span>{datetime().toLocaleString('default', { weekday: 'short' })}</span>
                    <span>•</span>
                    <span>{datetime().toLocaleString('default', { month: 'short' })} {datetime().toLocaleString('default', { day: 'numeric' })}</span>
                    <span>•</span>
                    <span>{datetime().toLocaleTimeString('default', { hour: "numeric", minute: "2-digit" })}</span>
                </div>
            </div>
        )
    }

    const Location = () => {
        const locationName = formatLocationName(location().address);
        return (
            <button onClick={appReset}
                className='flex text-sm gap-2 bg-black rounded-full text-white text-left py-1 px-2 font-bold items-center'>
                <IconCurrentLocation size={16} />
                <span className='whitespace-nowrap overflow-hidden text-ellipsis'>
                    {locationName.primary}, {locationName.secondary}
                </span>
                <IconArrowUpRight size={16} />
            </button>
        )
    }

    const Controls = () => {
        return (
            <div className='flex justify-between gap-2'>
                {/* <div className='flex items-center gap-1 text-sm uppercase font-bold'>Now <IconCaretDownFilled /></div> */}
                <button onClick={refreshWeather} 
                    className='flex text-xs gap-2 bg-black rounded-full text-white text-left py-1 pl-2 pr-3 font-bold items-center uppercase'>
                    <IconRefresh size={16} />
                    <span>Refresh</span>
                </button>
                {/* <button onClick={saveGeolocation} 
                    className='flex text-sm gap-2 bg-black rounded-full text-white text-left py-1 px-2 font-bold items-center'>
                    <IconStar size={16} />
                </button> */}
                {/* <button onClick={appReset} 
                    className='flex text-sm gap-2 bg-black rounded-full text-white text-left py-1 px-2 font-bold items-center'>
                    <IconSettings size={16} />
                </button> */}
            </div>
        )
    }

    const Visibility = () => {
        let visibility = weather().current.visibility * 0.000621371;
        if (weather().current.visibility === 10000) {
            visibility = `${Math.round(visibility)}+`
        } else {
            visibility = visibility.toFixed(2);
        }
        return (
            <WeatherStat 
                icon={<IconEye size={26} />}
                label="Visibility"
                value={<>{parseFloat(visibility).toString()}<span className='text-sm'>mi</span></>} />
        )
    }

    createEffect(() => {
        if (data()) {
            setDatetime(new Date(data().weather.current.dt * 1000));
            setLocation(data().location);
            setWeather(data().weather);
        }
    })

    return (
        <div className='grid gap-4 p-4 w-full'>
        
            <div className='grid gap-2 w-full max-w-[600px] mx-auto'>

                {location() && 
                    <div className='flex flex-wrap gap-2 justify-between'>
                        <Location />
                        <Controls />
                    </div>}

                {datetime() && <Datetime />}

                {weather() && <div className='grid w-full gap-6 pt-4'>

                    <div className='flex flex-wrap gap-4 mx-auto items-center'>

                        <div className='flex -my-4 mx-auto justify-center'>
                            {getWeatherIcon(weather().current.weather[0].id, 120, weather().current.dt > weather().current.sunset)}
                        </div>

                        <div className='grid gap-2 self-center w-min mx-auto'>
                            <div className='capitalize font-bold text-3xl'>{weather().current.weather[0].description}</div> 
                            <div className='flex gap-2 items-end'>
                                <div className='text-6xl font-bold leading-none'>{Math.round(weather().current.temp)}{DEGREE_SYMBOL}</div>
                                <div className='grid text-sm text-right -translate-y-1 whitespace-nowrap'>
                                    <div>High: <span className='inline-flex font-bold text-lg leading-5 w-8'>{Math.round(weather().daily[0].temp.max)}{DEGREE_SYMBOL}</span></div>
                                    <div>Low: <span className='inline-flex font-bold text-lg leading-5 w-8'>{Math.round(weather().daily[0].temp.min)}{DEGREE_SYMBOL}</span></div>
                                    <div>Feels Like: <span className='inline-flex font-bold text-lg leading-5 w-8'>{Math.round(weather().current.feels_like)}{DEGREE_SYMBOL}</span></div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='grid gap-4'>

                        <div className='grid grid-cols-2 min-[400px]:grid-cols-4 gap-8 justify-evenly leading-none bg-neutral-50 border border-neutral-300 rounded-lg p-4'>
                            <WeatherStat 
                                icon={<IconUmbrella size={26} />}
                                label="Precipitation"
                                value={<>{Math.round(weather().daily[0].pop * 100)}<span className='text-sm'>{PERCENT_SYMBOL}</span></>} />
                            <WeatherStat 
                                icon={<IconWind size={26} />}
                                label="Wind"
                                value={<>{Math.round(weather().current.wind_speed)}<span className='text-sm'>mph, {degToCompass(weather().current.wind_deg)}</span></>} />
                            <Visibility />
                            <WeatherStat 
                                icon={<IconCloud size={26} />}
                                label="Cloudiness"
                                value={<>{Math.round(weather().current.clouds)}<span className='text-sm'>%</span></>} />
                        </div>

                        <UVIndex uvindex={Math.round(weather().current.uvi)} />
                        <Humidity humidity={weather().current.humidity} />
                        <Pressure pressure={weather().current.pressure} />
                        <SunMoonTime 
                            current={weather().current.dt}
                            today={{
                                sunrise: weather().daily[0].sunrise,
                                sunset: weather().daily[0].sunset
                            }}
                            tomorrow={{
                                sunrise: weather().daily[1].sunrise,
                                sunset: weather().daily[1].sunset
                            }}
                        />
                        <Radar location={location()} />

                    </div>
                </div> }

            </div>
        </div>
    )
}

export default Weather
