import { createEffect, createSignal } from 'solid-js'
import Button from './Button';
import { IconLocationFilled } from '@tabler/icons-solidjs';
import { useAppActions } from './Store';

function SearchGeolocation(props) {

    const {fetchWeather} = useAppActions();

    const handleGeolocation = () => {
        navigator.geolocation.getCurrentPosition(
            async position => {
                fetchWeather(position.coords.latitude,position.coords.longitude);
            },
            error => console.log("error", error), 
            { maximumAge: 0, timeout: 5000 }
        );
    }

    return (
        <>
            <Button className="w-full py-2 px-4 gap-4" 
                content={<>
                    <IconLocationFilled size={24} />
                    <span>Use Current Location</span>
                </>} 
                onClick={handleGeolocation} />
        </>
    )
}

export default SearchGeolocation
