function WeatherStat(props) {
    return (
        <>
            <div className='grid items-center justify-center content-center gap-2 text-center whitespace-nowrap'>
                <div className='text-xs'>{props.label}</div>
                {props.icon && <div className='flex justify-center'>{props.icon}</div> }
                <div className='text-xl font-bold leading-none'>{props.value}</div>
            </div>
        </>
    )
}

export default WeatherStat
