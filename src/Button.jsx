

function Button(props) {
    const clazz = `${props.className} flex items-center justify-center gap-4 font-bold border border-black py-2 px-4 rounded cursor-pointer bg-neutral-100`;
    return (
        <>
            <button type='button' 
                className={clazz}
                onClick={() => props.onClick()} >{props.content}</button>
        </>
    )
}

export default Button
