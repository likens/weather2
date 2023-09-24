import { PERCENT_SYMBOL } from "./Utils";

function Humidity(props) {
    return (
        <>
            <div className='bg-neutral-50 border border-neutral-300 rounded-lg p-4'>
                <div className='grid grid-cols-10 text-xs uppercase text-center font-bold leading-7'>
                    <div className={`grid col-span-4 gap-1 bg-amber-400 self-end outline outline-1 relative`}>
                        {props.humidity < 40 && 
                            <>
                                <div className='whitespace-nowrap'>Humidity</div>
                                <div className='text-2xl leading-none'>{props.humidity}<span className="text-sm">{PERCENT_SYMBOL}</span></div>
                            </>
                        }
                        <div>Dry</div>
                    </div>
                    <div className={`grid col-span-3 gap-1 bg-emerald-400 self-end outline outline-1 relative`}>
                        {props.humidity >= 40 && props.humidity < 70 &&
                            <>
                                <div className='whitespace-nowrap'>Humidity</div>
                                <div className='text-2xl leading-none'>{props.humidity}<span className="text-sm">{PERCENT_SYMBOL}</span></div>
                            </>
                        }
                        <div>Normal</div>
                    </div>
                    <div className={`grid col-span-3 gap-1 bg-cyan-400 self-end outline outline-1 relative`}>
                        {props.humidity >= 70 && 
                            <>
                                <div className='whitespace-nowrap'>Humidity</div>
                                <div className='text-2xl leading-none'>{props.humidity}<span className="text-sm">{PERCENT_SYMBOL}</span></div>
                            </>
                        }
                        <div>Moist</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Humidity
