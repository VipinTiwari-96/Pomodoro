import React, { FC } from "react";

interface InputProps {
  name: string;
  label: string;
  placeholder: string;
  value: number;
  onChange: (e: React.ChangeEvent<any>) => void;
}

const Input: FC<InputProps> = ({
  name,
  label,
  onChange,
  value,
  placeholder,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-gray-900 font-medium">{label}</label>
      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border border-gray-300 outline-none w-60 h-10 rounded-md p-2"
      />
    </div>
  );
};

export default Input;
