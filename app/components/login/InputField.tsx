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
    <div className="relative">
      <label htmlFor={id} className="block text-sm font-medium text-dark mb-1 font-inter">
        {label}
      </label>
      <div className="p-[2px] rounded-md bg-gradient-to-r from-primary via-secondary to-accent">
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className="w-full px-4 py-3 border-none rounded-md shadow-sm  
                   focus:ring-2 focus:ring-secondary focus:border-secondary
                   placeholder-gray-400 font-inter
                   transition-all duration-300 ease-in-out 
                   bg-light text-dark"
        />
      </div>
    </div>
  );
}