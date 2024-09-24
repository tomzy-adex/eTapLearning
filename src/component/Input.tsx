import React from "react";

type InputProps = {
  type?: string;
  value: string;
  required?: boolean;
  onChange: () => void;
  title: string;
};

const Input: React.FC<InputProps> = ({
  type = 'text',
  value,
  required = true,
  onChange,
  title,
}) => {
  return (
    <div className="mt-4">
      <label className="block mb-1">{title}</label>
      <input
        type={type}
        value={value}
        required={required}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
  );
};

export default Input;
