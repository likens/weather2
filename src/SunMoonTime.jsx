import { IconMoonFilled, IconSunFilled } from "@tabler/icons-solidjs"

function SunMoonTime(props) {
    const current = props.current;
    const today = props.today;
    const tomorrow = props.tomorrow;
    const riseTime = current > today.sunset ? today.sunset : today.sunrise;
    const riseLabel = current > today.sunset ? "Sunset" : "Sunrise";
    const setTime = current > today.sunset ? tomorrow.sunrise : today.sunset;
    const setLabel = current > today.sunset ? "Sunrise" : "Sunset";
    const icon = current > today.sunset ? <IconMoonFilled size={24} /> : <IconSunFilled size={24} />
    const range = setTime-riseTime;
    const reached = current-riseTime;
    const posX = reached / range * 100;
    return (
        <>
            <div className='flex leading-none bg-neutral-50 border border-neutral-300 rounded p-4'>
                <div className='flex gap-2 w-full relative'>
                    <div className='grid items-center justify-center content-center text-center'>
                        <div className='text-xs uppercase font-bold'>{riseLabel}</div>
                        <div className='text-md font-bold whitespace-nowrap'>{new Date(riseTime * 1000).toLocaleTimeString('en-us', { hour: 'numeric', minute: '2-digit'})}</div>
                    </div>
                    <div className="flex relative w-full">
                        <div className='w-full relative z-10 overflow-hidden mx-2'>
                            <div className='absolute z-10 top-1/2 left-1/2 -translate-x-1/2 w-full h-1px border-t-2 border-neutral-200 border-dashed'></div>
                        </div>
                        <div className="top-1/2 left-0 absolute -translate-y-[12px] z-10 text-yellow-400" style={{left: `${posX}%`}}>
                            <div className="relative z-20">{icon}</div>
                            <div className="absolute w-[36px] h-full top-0 left-1/2 -translate-x-1/2 bg-neutral-50 z-10"></div>
                        </div>
                    </div>
                    <div className='grid items-center justify-center content-center text-center'>
                        <div className='text-xs uppercase font-bold'>{setLabel}</div>
                        <div className='text-md font-bold whitespace-nowrap'>{new Date(setTime * 1000).toLocaleTimeString('en-us', { hour: 'numeric', minute: '2-digit'})}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SunMoonTime
