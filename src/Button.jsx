

function Button(props) {
    const clazz = `flex items-center justify-center font-bold border border-black rounded cursor-pointer bg-black text-white dark:bg-white dark:text-black ${props.className}`;
    return (
        <>
            <button type='button' 
                className={clazz}
                onClick={() => props.onClick()} >{props.content}</button>
        </>
    )
}

export default Button
