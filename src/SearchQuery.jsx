import { createEffect, createSignal } from 'solid-js'
import { debounce } from '@solid-primitives/scheduled';
import { IconChevronRight, IconX } from '@tabler/icons-solidjs';
import { OW_WEATHER_URL } from './Utils';
import Button from './Button';
import Loader from './Loader';
import { useAppActions } from './Store';

function SearchQuery(props) {

    const {setGeolocationData, setLoading} = useAppActions();

    const [queryValue, setQueryValue] = createSignal("");
	const [queryData, setQueryData] = createSignal(undefined);
    const [noResults, setNoResults] = createSignal(false);
    const [querying, setQuerying] = createSignal(false);

	const queryTrigger = debounce((query) => handleQuery(query), 500);

    const handleQueryUpdate = (e) => {
        setQueryValue(e.target.value);
        setQueryData(undefined);
        setNoResults(false);
        setQuerying(true);
        queryTrigger(e);
    }

    const handleQueryReset = () => {
        setQueryValue("");
        setQueryData(undefined);
        setNoResults(false);
        setQuerying(false);
    }

	const handleQuery = (e) => {
		const val = e.target.value;
		if (val) {
			fetch(`https://nominatim.openstreetmap.org/search?q=${val}&format=json`)
			.then(res => res.json())
			.then(data => {
                setQuerying(false);
                if (data.length) {
                    setQueryData(data);
                } else {
                    setQueryData(undefined);
                    setNoResults(true);
                }
            });
		} else {
            handleQueryReset()
        }
	}

    const handleQueryClick = (lat, lon) => {
        console.log(lat, lon);
        setLoading(true);
        Promise.all([
            fetch(`${OW_WEATHER_URL}&lat=${lat}&lon=${lon}`).then(res => res.json()),
            fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&zoom=10`).then(res => res.json())
        ]).then(data => {
            setGeolocationData({weather: data[0], location: data[1]});
            setLoading(false);
        });
    }

    return (
        <div className='grid gap-4'>
            <div className='flex gap-2 justify-center relative'>
                <input type="text" 
                    value={queryValue()}
                    className='font-bold border border-black py-2 px-4 rounded w-full'
                    placeholder='Search by City/State or ZIP'
                    onInput={(e) => handleQueryUpdate(e)} />
                {queryValue() && 
                    <button type="button" 
                        onClick={handleQueryReset}
                        className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer'>
                        <IconX size={24} />
                    </button>}
            </div>

            {queryData()?.length &&
                <div className='grid gap-4'>
                    {queryData().map(d => {
                        return (
                            <Button className="text-sm text-left" 
                                onClick={() => handleQueryClick(d.lat, d.lon)}
                                content={
                                    <>
                                        <div className='w-full'>{d.display_name}</div>
                                        <IconChevronRight size={24} />
                                    </>
                                } />
                        )
                    })}
                </div>}

            {querying() && <Loader className="mx-auto" text="" size={64} />}
            {noResults() && <div className='uppercase text-sm font-bold text-center'>No results</div>}
            
        </div>
    )
}

export default SearchQuery
