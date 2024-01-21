import { createEffect, createSignal } from 'solid-js'
import SearchGeolocation from './SearchGeolocation'
import SearchQuery from './SearchQuery'
import logo from './assets/img/logo.svg';
import SearchSaved from './SearchSaved'

function Start(props) {

    return (
        <>
            <div className='grid gap-4 px-8 py-8 max-w-xs mx-auto'>
                <div className='grid gap-4 pb-4 justify-center'>
                    <div className='w-3/4 mx-auto'>{logo}</div>
                    <div className='font-bold text-center text-4xl'>Weather</div>
                </div>
                <SearchGeolocation />
                {/* <SearchSaved /> */}
                <SearchQuery />
            </div>
        </>
    )
}

export default Start