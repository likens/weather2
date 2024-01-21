import { PERCENT_SYMBOL } from "./Utils";

function Pressure(props) {
    
    const pressure = <>
        <div className='whitespace-nowrap'>Pressure</div>
        <div className='text-2xl leading-none'>{props.pressure}</div>
    </>;

    const pressureBlock = (name, color, active) => {
        return (
            <div className={`grid overflow-hidden px-1 ${color} self-end outline outline-1 relative ${active ? `z-20 col-span-3` : `z-10 col-span-2`}`}>
                {active && pressure}
                <div className="whitespace-nowrap">{name}</div>
            </div>
        )
    }

    return (
        <>
            <div className='bg-neutral-50 border border-neutral-300 rounded-lg p-4'>
                <div className='grid grid-cols-11 text-xs uppercase text-center font-bold leading-7'>
                    {pressureBlock("Stormy", "bg-indigo-400", props.pressure < 980)}
                    {pressureBlock("Rain", "bg-sky-400", props.pressure >= 980 && props.pressure < 1000)}
                    {pressureBlock("Change", "bg-teal-400", props.pressure >= 1000 && props.pressure < 1020)}
                    {pressureBlock("Fair", "bg-lime-400", props.pressure >= 1020 && props.pressure < 1040)}
                    {pressureBlock("Dry", "bg-amber-400", props.pressure >= 1040)}
                </div>
            </div>
        </>
    )
}

export default Pressure
