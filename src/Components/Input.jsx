import React, { useId } from 'react';

const Input = React.forwardRef(function Input(
  { label, type = 'text', className = '', ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full mb-6">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        ref={ref}
        className={`w-full py-3 px-4 rounded-md bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-200 ease-in-out ${className}`}
        {...props}
      />
    </div>
  );
});

export default Input;
