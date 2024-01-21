function Radar(props) {

    const {location} = props;

    return (
        <div className='relative overflow-hidden flex leading-none border border-neutral-300 rounded h-[400px] w-full'>
            <iframe className="w-[calc(100%+40px)] h-[calc(100%+64px)] absolute -top-16 -left-10" src={`https://openweathermap.org/weathermap?basemap=map&cities=false&layer=precipitation&lat=${location.lat}&lon=${location.lon}&zoom=9`} />
        </div>
    )
}

export default Radar
