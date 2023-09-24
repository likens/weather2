function UVIndex(props) {

    const uvIndex = <>
        <div className='px-1 whitespace-nowrap overflow-hidden'>UV Index</div>
        <div className='text-2xl leading-none'>{props.uvindex}</div>
    </>;

    const indexBlock = (name, three, color, active) => {
        return (
            <div className={`grid ${three ? `col-span-3` : `col-span-2`} gap-1 ${color} self-end outline outline-1 relative whitespace-nowrap overflow-ellipsis ${active ? `z-20` : `z-10`}`}>
                {active && uvIndex}
                <div className="pl-1 whitespace-nowrap overflow-hidden">{name}</div>
            </div>
        )
    }

    return (
        <>
            <div className='bg-neutral-50 border border-neutral-300 rounded-lg p-4'>
                <div className='grid grid-cols-12 text-xs uppercase text-center font-bold leading-7'>
                    {indexBlock('Low', false, 'bg-green-400', props.uvindex < 2)}
                    {indexBlock('Moderate', true, 'bg-yellow-400', props.uvindex >= 2 && props.uvindex < 6)}
                    {indexBlock('High', false, 'bg-orange-400', props.uvindex >= 6 && props.uvindex < 8)}
                    {indexBlock('Very High', true, 'bg-red-400', props.uvindex >= 8 && props.uvindex < 11)}
                    {indexBlock('Extreme', false, 'bg-purple-400', props.uvindex >= 11)}
                </div>
            </div>
        </>
    )
}

export default UVIndex
