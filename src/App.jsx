import { createEffect, createSignal } from 'solid-js'
import Weather from './Weather';
import Loader from './Loader';
import Start from './Start';
import { useAppStore } from './Store';
import { getWeatherBackground } from './Utils';

function App() {
	
	const [loading, setLoading] = createSignal(false);
	const [data, setData] = createSignal(false);

	useAppStore.subscribe((state) => {
		setData(state.geolocationData);
		setLoading(state.loading);
	})

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
					{data() && <img className='fixed top-0 w-screen h-screen block object-cover -z-10' src={`/backgrounds/${getWeatherBackground(data().weather.current.weather[0].id)}.jpg`} />}
				</div>
			</div>
		</>
	)
}

export default App
