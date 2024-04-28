import { createEffect, createSignal } from 'solid-js'
import SearchGeolocation from './SearchGeolocation'
import SearchQuery from './SearchQuery'
import logo from './assets/img/logo.svg';
import SearchSaved from './SearchSaved'
import { IconArrowUpRight } from '@tabler/icons-solidjs';

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
                <div className='w-full text-center'>
                    <a className='text-neutral-400 dark:text-neutral-700 text-xs uppercase p-2 inline-flex font-bold' href="https://weather.likens.dev">Weather <IconArrowUpRight size={16} /></a>
                </div>
            </div>
        </>
    )
}

export default Start