import { useState } from "react";

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  hasError?: boolean;
  errorMessage?: string;
}

export function InputField({
  id,
  label,
  type,
  name,
  placeholder,
  required = false,
  hasError = false,
  errorMessage,
}: InputFieldProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <div className="relative">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div
        className={`p-[2px] rounded-lg transition-all duration-300 ease-in-out
                    ${hasError
            ? "bg-red-500 animate-pulse"
            : "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          }
                    ${isFocused && !hasError ? "shadow-lg shadow-purple-500/50" : ""}`}
      >
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full px-4 py-3 border-none rounded-lg shadow-sm
                      focus:ring-0 focus:outline-none
                      placeholder-gray-400 text-base
                      transition-all duration-300 ease-in-out
                      bg-white text-gray-900
                      ${hasError
              ? "ring-2 ring-red-500 bg-red-50"
              : ""
            }`}
        />
      </div>
      {hasError && errorMessage && (
        <p className="mt-2 text-sm text-red-600 animate-bounce">
          {errorMessage}
        </p>
      )}
    </div>
  );
}