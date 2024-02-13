import { createEffect, createSignal } from 'solid-js'
import Button from './Button';
import { IconLocationFilled } from '@tabler/icons-solidjs';
import { useAppActions } from './Store';

function SearchGeolocation(props) {

    const {fetchWeather} = useAppActions();

    const [geolocationError, setGeolocationError] = createSignal("");

    const handleGeolocation = () => {
        navigator.geolocation.getCurrentPosition(
            async position => {
                fetchWeather(position.coords.latitude,position.coords.longitude);
            },
            error => {
                switch(error.code) {
                    case 1:
                        setGeolocationError("Permission to get current location denied");
                        break;
                    case 2:
                        setGeolocationError("Current location's position is unavailable");
                        break;
                    case 3:
                        setGeolocationError("Current location lookup timed out");
                        break;
                }
            }, 
            { maximumAge: 0, timeout: 5000 }
        );
    }

    return (
        <div className='grid gap-2'>
            <Button className="w-full py-2 px-4 gap-4" 
                content={<>
                    <IconLocationFilled size={24} />
                    <span>Use Current Location</span>
                </>} 
                onClick={handleGeolocation} />
            {geolocationError() && <div className='text-xs font-bold text-center text-red-600'>{geolocationError()}</div>}
        </div>
    )
}

export default SearchGeolocation
