interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  required?: boolean;
}

export function InputField({
  id,
  label,
  type,
  name,
  placeholder,
  required = false,
}: InputFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-dark mb-1 font-inter"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm 
                 focus:ring-2 focus:ring-secondary focus:border-secondary
                 placeholder-gray-400 font-inter
                 transition-all duration-200 ease-in-out"
      />
    </div>
  );
}