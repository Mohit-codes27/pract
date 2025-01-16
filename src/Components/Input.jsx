import React, {useId} from 'react'

const Input = React.forwardRef( function Input({
    label,
    type = 'text',
    className = "",
    ...props
}, ref){
    const id = useId()
    return(
        <div className='w-full'>
            {label && <label className='hidden' htmlFor={id}>{label}</label>}
            <input type={type}
            className={`w-[300px] mt-2 py-3 px-3 rounded-lg bg-[#eff7fc] border border-gray-400 text-gray-800 font-semibold focus:border-blue-500 focus:bg-white focus:outline-none ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input
