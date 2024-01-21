import { createEffect, createSignal } from 'solid-js'
import { debounce } from '@solid-primitives/scheduled';
import Button from './Button';
import { IconStarFilled } from '@tabler/icons-solidjs';

function SearchSaved(props) {

    return (
        <>
            <Button className="w-full" 
                content={<>
                    <IconStarFilled size={24} />
                    <span>Saved Locations</span>
                </>} />
        </>
    )
}

export default SearchSaved
