import { IconSun } from '@tabler/icons-solidjs'

function Loader(props) {

    const {text = "Loading ...", size = 120} = props;

    const clazz = `${props.className} grid gap-2`;

    return (
        <>
            <div className={clazz}>
                <IconSun class='animate-spin-slow' size={size} />
                <div className='font-bold text-center text-xl'>{text}</div>
            </div>
        </>
    )
}

export default Loader
