

function Button(props) {
    const clazz = `flex items-center justify-center font-bold border border-black rounded cursor-pointer bg-neutral-200 dark:bg-neutral-700 ${props.className}`;
    return (
        <>
            <button type='button' 
                className={clazz}
                onClick={() => props.onClick()} >{props.content}</button>
        </>
    )
}

export default Button
