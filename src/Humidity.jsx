import { PERCENT_SYMBOL, CLASSES_WEATHER_SECTIONS } from "./Utils";

function Humidity(props) {
    const humidity = <>
        <div className='px-1 whitespace-nowrap overflow-hidden'>Humidity</div>
        <div className='text-2xl leading-none'>{props.humidity}<span className="text-sm">{PERCENT_SYMBOL}</span></div>
    </>;

    const humidityBlock = (name, color, active) => {
        return (
            <div className={`grid ${color} self-end outline outline-1 relative whitespace-nowrap ${active ? `z-20 col-span-4` : `z-10 col-span-3`}`}>
                {active && humidity}
                <div className="pl-1 whitespace-nowrap overflow-hidden">{name}</div>
            </div>
        )
    }
    return (
        <>
            <div id="humidity" className={`${CLASSES_WEATHER_SECTIONS} grid grid-cols-10 text-xs uppercase text-center font-bold leading-7 text-black`}>
                {humidityBlock('Dry', 'bg-amber-400', props.humidity < 40)}
                {humidityBlock('Normal', 'bg-emerald-400', props.humidity >= 40 && props.humidity < 70)}
                {humidityBlock('Moist', 'bg-cyan-400', props.humidity >= 70)}
            </div>
        </>
    )
}

export default Humidity
