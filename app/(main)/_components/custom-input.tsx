"use client";
import React, { ChangeEvent } from "react";

interface CustomInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  value,
  onChange,
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <label>{label}</label>
      <input type="text" value={value} onChange={handleInputChange} />
    </div>
  );
};

export default CustomInput;
