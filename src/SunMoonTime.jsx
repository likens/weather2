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
    const posY = 0;
    return (
        <>
            <div className='flex leading-none bg-neutral-50 border border-neutral-300 rounded p-4'>
                <div className='flex gap-2 w-full relative'>
                    <div className='grid items-center justify-center content-center text-center'>
                        <div className='text-lg font-bold whitespace-nowrap'>{new Date(riseTime * 1000).toLocaleString('en-us', { hour: '2-digit', minute: '2-digit'})}</div>
                        <div className='text-sm'>{riseLabel}</div>
                    </div>
                    <div className="flex relative w-full">
                        <div className='w-full relative z-10 h-[50px] overflow-hidden '>
                            <div className='absolute z-10 top-0 left-1/2 -translate-x-1/2 w-full h-[300%] bg-neutral-200 rounded-[50%] border border-neutral-400 border-dashed'></div>
                        </div>
                        <div className="top-0 left-0 absolute z-10 h-[50px]" style={{left: `${posX}%`, top: posY}}>
                            <div className='absolute -translate-y-[12px] top-0 left-0 -translate-x-1/2 z-20'>
                                {icon}
                            </div>
                        </div>
                    </div>
                    <div className='grid items-center justify-center content-center text-center'>
                        <div className='text-lg font-bold whitespace-nowrap'>{new Date(setTime * 1000).toLocaleString('en-us', { hour: '2-digit', minute: '2-digit'})}</div>
                        <div className='text-sm'>{setLabel}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SunMoonTime
