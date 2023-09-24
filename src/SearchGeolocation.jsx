import { createEffect, createSignal } from 'solid-js'
import Button from './Button';
import { IconLocationFilled } from '@tabler/icons-solidjs';
import { OW_WEATHER_URL } from './Utils';
import { useAppActions } from './Store';

function SearchGeolocation(props) {

    const {setGeolocationData, setLoading} = useAppActions();

    const handleGeolocation = () => {
        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            async position => {
                Promise.all([
                    fetch(`${OW_WEATHER_URL}&lat=${position.coords.latitude}&lon=${position.coords.longitude}`).then(res => res.json()),
                    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json&zoom=10`).then(res => res.json())
                ]).then(data => {
                    setGeolocationData({weather: data[0], location: data[1]});
                    setLoading(false);
                });
            },
            error => console.log("error", error), 
            { maximumAge: 0, timeout: 5000 }
        );
    }

    return (
        <>
            <Button className="w-full" 
                content={<>
                    <IconLocationFilled size={24} />
                    <span>Use Current Location</span>
                </>} 
                onClick={handleGeolocation} />
        </>
    )
}

export default SearchGeolocation
