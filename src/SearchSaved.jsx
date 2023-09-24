import { createEffect, createSignal } from 'solid-js'
import { debounce } from '@solid-primitives/scheduled';
import Button from './Button';

function SearchSaved(props) {

    return (
        <>
            <Button className="w-full" 
                content={<>
                    <span>Saved Locations</span>
                </>} />
        </>
    )
}

export default SearchSaved
