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
        {required && <span style={{ color: 'var(--primary)' }} className="text-base sm:text-lg md:text-xl">*</span>}
        <span 
          className="bg-clip-text text-transparent"
          style={{ 
            backgroundImage: 'linear-gradient(to right, var(--primary-dark), var(--accent), var(--primary-dark))',
            WebkitBackgroundClip: 'text'
          }}
        >
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
              className={`relative flex items-center gap-2.5 p-3 border-2 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-[1.01] group overflow-hidden ${isFocused ? 'ring-2 ring-offset-1' : ''}`}
              style={{
                animationDelay: `${index * 50}ms`,
                borderColor: isChecked ? 'var(--primary-light)' : 'var(--border)',
                backgroundColor: isChecked ? 'var(--light-bg)' : 'rgba(255, 255, 255, 0.8)',
                ...(isFocused && { '--tw-ring-color': 'var(--primary)' })
              }}
              dir="rtl"
            >
              {/* Animated background on hover */}
              <div 
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isChecked ? 'opacity-0' : ''}`}
                style={{ background: 'linear-gradient(to bottom right, var(--light-bg), var(--border))' }}
              />
              
              {/* Text */}
              <span 
                className="relative text-sm sm:text-base flex-1 text-right font-medium transition-colors"
                style={{ color: isChecked ? 'var(--primary-dark)' : 'var(--text-dark)' }}
              >
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
                <div 
                  className="w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300"
                  style={{
                    background: isChecked ? 'linear-gradient(to bottom right, var(--primary-light), var(--accent))' : 'var(--white)',
                    borderColor: isChecked ? 'var(--primary)' : 'var(--border)',
                    boxShadow: isChecked ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
                  }}
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
