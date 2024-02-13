import { CLASSES_WEATHER_SECTIONS } from "./Utils";

function UVIndex(props) {

    const uvIndex = <>
        <div className='px-1 whitespace-nowrap overflow-hidden'>UV Index</div>
        <div className='text-2xl leading-none'>{props.uvindex}</div>
    </>;

    const indexBlock = (name, color, active) => {
        return (
            <div className={`grid ${color} self-end outline outline-1 relative whitespace-nowrap ${active ? `z-20 col-span-3` : `z-10 col-span-2`}`}>
                {active && uvIndex}
                <div className="pl-1 whitespace-nowrap overflow-hidden">{name}</div>
            </div>
        )
    }

    return (
        <>
            <div id="uvIndex" className={`${CLASSES_WEATHER_SECTIONS} grid grid-cols-11 text-xs uppercase text-center font-bold leading-7 text-black`}>
                {indexBlock('Low', 'bg-green-400', props.uvindex < 2)}
                {indexBlock('Moderate', 'bg-yellow-400', props.uvindex >= 2 && props.uvindex < 6)}
                {indexBlock('High', 'bg-orange-400', props.uvindex >= 6 && props.uvindex < 8)}
                {indexBlock('Severe', 'bg-red-400', props.uvindex >= 8 && props.uvindex < 11)}
                {indexBlock('Extreme', 'bg-purple-400', props.uvindex >= 11)}
            </div>
        </>
    )
}

export default UVIndex
