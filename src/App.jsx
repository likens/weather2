import { createEffect, createSignal } from 'solid-js'
import Weather from './Weather';
import Loader from './Loader';
import Start from './Start';
import { useAppStore } from './Store';

// this.setState({
// 	theme: theme,
// 	weather: {
// 		raw: json,
// 		times: {
// 			current: time,
// 			sunrise: sunrise,
// 			sunset: sunset
// 		},
// 		temps: {
// 			current: json.current.temp,
// 			feels_like: json.current.feels_like,
// 			high: json.daily[0].temp.max,
// 			low: json.daily[0].temp.min
// 		},
// 		precip: {
// 			humidity: json.current.humidity,
// 			probability: json.daily[0].pop,
// 			dew_point: json.daily[0].dew_point
// 		},
// 		misc: {
// 			pressure: json.current.pressure,
// 			visibility: json.current.visibility,
// 			wind: {
// 				speed: json.current.wind_speed,
// 				deg: json.current.wind_deg
// 			}
// 		},
// 		desc: {
// 			code: json.current.weather[0].id,
// 			tagline: json.current.weather[0].description,
// 			term: term,
// 			time: time,
// 			img: img
// 		},
// 		alerts: json.alerts,
// 		daily: json.daily,
// 		hourly: json.hourly,
// 		url: url,
// 	},
// })


function App() {
	
	const [loading, setLoading] = createSignal(false);
	const [data, setData] = createSignal(false);

	useAppStore.subscribe((state) => {
		setData(state.geolocationData);
		setLoading(state.loading);
	})

	// const handlePick = (e) => {
	// 	console.log(e);
	// 	geocodingFetch(e.lat, e.lon);
	// }

	const appView = () => {
		let components = undefined;
		if (!loading()) {
			if (data()) {
				components = <Weather />
			} else {
				components = <Start />
			}
		} else {
			components = <Loader className="py-12" />
		}

		return components;
	}

	return (
		<>
			<div className='min-w-screen min-h-screen'>
				<div className='flex justify-center'>
					{appView()}
				</div>
			</div>
		</>
	)
}

export default App
