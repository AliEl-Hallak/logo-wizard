'use client';

import { useState } from 'react';

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  required?: boolean;
  placeholder?: string;
  icon?: React.ReactNode;
}

export default function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  placeholder = 'اختر...',
  icon,
}: SelectFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="mb-4 form-field">
      <label htmlFor={name} className="block text-sm font-semibold text-gray-800 mb-1.5 text-right flex items-center gap-2 justify-end">
        {required && <span className="text-orange-500 text-lg">*</span>}
        {label}
      </label>
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          className={`w-full pr-4 ${icon ? 'pl-11' : 'pl-10'} py-2.5 text-sm border-2 rounded-xl transition-all duration-300 text-right appearance-none cursor-pointer
            ${isFocused 
              ? 'border-orange-500 shadow-lg shadow-orange-200 scale-[1.02]' 
              : 'border-gray-200 hover:border-orange-300'
            }
            bg-white/70 backdrop-blur-sm focus:outline-none`}
          dir="rtl"
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {icon && (
          <div className="absolute left-10 top-1/2 -translate-y-1/2 text-orange-500 pointer-events-none">
            {icon}
          </div>
        )}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
