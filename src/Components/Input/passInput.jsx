import React, { useState, useRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PassInput = React.forwardRef(({ label, className = "", ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const timeoutRef = useRef(null); // To store the timeout ID

  const handleShowPassword = () => {
    // Clear any existing timeout to avoid overlapping
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Show the password
    setShowPassword(true);

    // Hide the password 
    timeoutRef.current = setTimeout(() => {
      setShowPassword(false);
    }, 500); 
  };

  return (
    <div className="w-full relative mb-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          ref={ref}
          className={`w-full py-3 px-4 pr-12 rounded-md bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-200 ease-in-out ${className}`}
          {...props}
        />

        {/* Eye toggle button */}
        <button
          type="button"
          onClick={handleShowPassword}
          className="absolute inset-y-0 right-3 flex items-center"
        >
          {showPassword ? (
            <FaEyeSlash className="text-gray-500" />
          ) : (
            <FaEye className="text-gray-500" />
          )}
        </button>
      </div>
    </div>
  );
});

export default PassInput;
