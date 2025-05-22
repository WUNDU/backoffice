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
      <label htmlFor={id} className="block text-sm font-medium text-dark mb-1 font-inter">
        {label}
      </label>
      <div
        className={`p-[2px] rounded-lg transition-all duration-300 ease-in-out
                    ${hasError
            ? "bg-tertiary animate-shake" // Usando tertiary para erro e shake para animação
            : "bg-gradient-to-r from-primary via-secondary to-accent" // Usando suas cores principais
          }
                    ${isFocused && !hasError ? "shadow-lg shadow-secondary/50" : ""}`}
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
                      placeholder-gray-400 font-inter text-base
                      transition-all duration-300 ease-in-out
                      bg-light text-dark
                      ${hasError
              ? "ring-2 ring-tertiary" // Usando tertiary para o anel de erro
              : ""
            }`}
        />
      </div>
      {hasError && errorMessage && (
        <p className="mt-2 text-sm text-tertiary animate-fade-in"> {/* Usando tertiary para texto de erro e fade-in */}
          {errorMessage}
        </p>
      )}
    </div>
  );
}