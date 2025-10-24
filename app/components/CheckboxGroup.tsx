'use client';

import { useState } from 'react';

interface CheckboxGroupProps {
  label: string;
  name: string;
  options: string[];
  values: string[];
  onChange: (value: string) => void;
  required?: boolean;
}

export default function CheckboxGroup({
  label,
  name,
  options,
  values,
  onChange,
  required = false,
}: CheckboxGroupProps) {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  return (
    <div className="mb-6 form-field">
      <label className="block text-xs sm:text-sm md:text-base font-bold mb-3 text-right flex items-center gap-2 justify-end">
        {required && <span className="text-orange-500 text-base sm:text-lg md:text-xl">*</span>}
        <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 bg-clip-text text-transparent">
          {label}
        </span>
      </label>
      <div className="grid grid-cols-2 gap-2.5">
        {options.map((option, index) => {
          const isChecked = values.includes(option);
          const isFocused = focusedIndex === index;
          return (
            <label
              key={option}
              className={`relative flex items-center gap-2.5 p-3 border-2 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-[1.01] group overflow-hidden
                ${isChecked 
                  ? 'border-orange-400 bg-gradient-to-br from-orange-100 via-amber-50 to-orange-50 shadow-md scale-[1.01]' 
                  : 'border-gray-200 bg-white/80 hover:border-orange-300 hover:shadow-sm'
                }
                ${isFocused ? 'ring-2 ring-orange-300 ring-offset-1' : ''}
              `}
              dir="rtl"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Animated background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br from-orange-50 to-amber-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isChecked ? 'opacity-0' : ''}`} />
              
              {/* Text */}
              <span className={`relative text-sm sm:text-base flex-1 text-right font-medium transition-colors ${isChecked ? 'text-orange-700' : 'text-gray-700 group-hover:text-orange-600'}`}>
                {option}
              </span>
              
              {/* Custom Checkbox */}
              <div className="relative flex-shrink-0">
                <input
                  type="checkbox"
                  name={name}
                  value={option}
                  checked={isChecked}
                  onChange={() => onChange(option)}
                  onFocus={() => setFocusedIndex(index)}
                  onBlur={() => setFocusedIndex(null)}
                  className="sr-only"
                />
                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300
                  ${isChecked 
                    ? 'bg-gradient-to-br from-orange-500 to-amber-500 border-orange-500 shadow-sm' 
                    : 'bg-white border-gray-300 group-hover:border-orange-400'
                  }`}
                >
                  {/* Checkmark Icon */}
                  <svg 
                    className={`w-4 h-4 text-white transition-all duration-300 ${isChecked ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
