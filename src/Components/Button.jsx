import React from 'react'

function Button({
    children,
    type = 'button',
    className = '',
    ...props
}) {
  return (
    <button className={`md:w-32 bg-[#0a66c2] hover:bg-blue-dark text-[#eff7fc] font-bold py-3 px-6 rounded-lg mt-3 hover:bg-blue-400 transition ease-in-out duration-300 ${className}`} {...props}>
        {children}
    </button>
  )
}

export default Button
