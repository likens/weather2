import create from 'solid-zustand';
import { getWeatherUrl, getLocationUrl, formatLocationName, getTomorrowUrl } from './Utils';

export const useAppStore = create((set, get) => ({

    geolocationData: undefined,
    loading: false,

    actions: {
        appReset: () => {
            set(({
                geolocationData: undefined,
                queryData: undefined
            }))
        },
        setGeolocationData: (data) => {
            set(({geolocationData: data}))
        },
        setQueryData: (data) => {
            set(({queryData: data}))
        },
        setLoading: (loading) => {
            set(({loading: loading}))
        },
        fetchWeather: (lat,lon,setting=true) => {
            get().actions.setLoading(true);
            const requests = [
                getWeatherUrl(lat,lon),
                getLocationUrl(lat,lon),
                // getTomorrowUrl(lat,lon)
            ]
            Promise.all(requests.map(req => fetch(req).then(res => res.json())))
            .then(json => {
                const data = { 
                    weather: json[0], 
                    location: json[1],
                    // tomorrow: json[2]
                };
                if (setting) {
                    get().actions.setGeolocationData(data);
                    get().actions.setLoading(false);
                }
            });
        },
        refreshWeather: () => {
            const lat = get().geolocationData.location.lat;
            const lon = get().geolocationData.location.lon;
            get().actions.fetchWeather(lat,lon);
        },
        saveGeolocation: () => {
            // const data = get().geolocationData;
            // const bookmarks = localStorage.getItem("weatherBookmarks");
            // if (bookmarks) {
            // 
            // } else {
            //     localStorage.setItem("weatherBookmarks", JSON.stringify([
            //         {
            //             name: formatLocationName(data.location.address),
            //             lat: data.location.lat,
            //             lon: data.location.lon
            //         }
            //     ]));
            // }
        }
    }

}));

// state
export const useGeolocationData = () => useAppStore((state) => state.geolocationData);
export const useLoading = () => useAppStore((state) => state.loading);

// actions
export const useAppActions = () => useAppStore((state) => state.actions);