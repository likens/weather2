import { createEffect, createSignal } from 'solid-js'
import { degToCompass, DEGREE_SYMBOL, PERCENT_SYMBOL, getWeatherIcon, formatLocationName, CLASSES_WEATHER_SECTIONS } from './Utils';
import Button from './Button';
import { IconUmbrella, IconWind, IconEye, IconCloud, IconRefresh, IconStar, IconArrowUpLeft, IconX, IconMenu2, IconSettingsFilled } from '@tabler/icons-solidjs';
import UVIndex from './UVIndex';
import Humidity from './Humidity';
import Pressure from './Pressure';
import { useAppActions, useAppStore } from './Store';
import SunMoonTime from './SunMoonTime';
import Radar from './Radar';
import WeatherStat from './WeatherStat';

function Weather(props) {

	const [data, setData] = createSignal(undefined);
    const [datetime, setDatetime] = createSignal(undefined);
    const [location, setLocation] = createSignal(undefined);
    const [weather, setWeather] = createSignal(undefined);
    const [dialog, setDialog] = createSignal(false);

    const {appReset,refreshWeather,saveGeolocation} = useAppActions();

    const handleGetLatest = () => refreshWeather();
    const handleChangeLocation = () => appReset();
    const handleSaveLocation = () => saveGeolocation();
    const handleDialogOpen = () => setDialog(true);
    const handleDialogClose = () => setDialog(false);
    const handleSettings = () => undefined;

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
            <div className='flex text-sm gap-2 items-center font-bold'>
                <span className='whitespace-nowrap overflow-hidden text-ellipsis'>
                    {locationName.primary}, {locationName.secondary}
                </span>
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

    const Dialog = () => {
        return (
            <>
                 {/* data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0  */}
                <div onClick={handleDialogClose} data-state="open" className='fixed inset-0 z-50 bg-white/75 dark:bg-black/75 backdrop-blur-sm' />
                {/* duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] */}
                <div data-state="open" className='bg-white dark:bg-black backdrop-blur-sm rounded shadow-md fixed left-[50%] top-[50%] z-50 grid w-10/12 max-w-md translate-x-[-50%] translate-y-[-50%] gap-2 p-4'>
                    <Button className="w-full p-2 gap-2 justify-items-start" 
                        onClick={handleGetLatest}
                        content={
                            <>
                                <IconRefresh size={20} />
                                <span>Get Latest</span>
                            </>
                        } />
                    <Button className="w-full p-2 gap-2 justify-items-start" 
                        onClick={handleChangeLocation}
                        content={
                            <>
                                <IconArrowUpLeft size={20} />
                                <span>Change Location</span>
                            </>
                        } />
                    <Button className="w-full p-2 gap-2 justify-items-start pointer-events-none opacity-30 text-neutral-500" 
                        onClick={handleSaveLocation}
                        content={
                            <>
                                <IconStar size={20} />
                                <span>Save Location</span>
                            </>
                        } />
                    <Button className="w-full p-2 gap-2 justify-items-start pointer-events-none opacity-30 text-neutral-500" 
                        onClick={handleSettings}
                        content={
                            <>
                                <IconSettingsFilled size={20} />
                                <span>Settings</span>
                            </>
                        } />
                    <Button className="w-full p-2 gap-2 justify-items-start" 
                        onClick={handleDialogClose}
                        content={
                            <>
                                <IconX size={20} />
                                <span>Cancel</span>
                            </>
                        } />
                </div>
            </>
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
        
            <div className='w-full max-w-[600px] mx-auto grid gap-4'>
                {weather() && 
                    <>
                        <div className={`${CLASSES_WEATHER_SECTIONS} grid gap-2`}>
                            <div className='flex flex-wrap gap-2 justify-between'>
                                <div className='grid'>
                                    {location() && <Location />}
                                    {datetime() && <Datetime />}
                                </div>
                                <div className='flex justify-between gap-2'>
                                    <Button className="py-.5 px-2 gap-2 text-xs" content={<>
                                        <IconMenu2 size={24} />
                                    </>} onClick={handleDialogOpen} />
                                </div>
                            </div>
                            <div className='flex flex-wrap gap-8 pt-2 mx-auto items-center'>
                                <div className='flex -mt-4 -mb-8 mx-auto justify-center'>
                                    {getWeatherIcon(weather().current.weather[0].id, 120, weather().current.dt > weather().current.sunset)}
                                </div>
                                <div className='grid gap-2 self-center w-max mx-auto'>
                                    <div className='capitalize font-bold text-3xl text-center'>{weather().current.weather[0].description}</div> 
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
                        </div>
                        {/* min-[400px]:grid-cols-4  */}
                        <div id="stats" className={`${CLASSES_WEATHER_SECTIONS} grid grid-cols-4 gap-8 justify-evenly leading-none`}>
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
                        <UVIndex uvindex={Math.round(weather().current.uvi)} />
                        <Humidity humidity={weather().current.humidity} />
                        <Pressure pressure={weather().current.pressure} />
                        <Radar location={location()} />
                    </>
                }
            </div>

            {weather() && dialog() && <Dialog />}

        </div>
    )
}

export default Weather
