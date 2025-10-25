'use client';

import { useState } from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'textarea' | 'date';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  icon?: React.ReactNode;
}

export default function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required = false,
  placeholder,
  rows = 3,
  icon,
}: FormFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.length > 0;

  const baseClasses = `w-full ${icon ? 'pr-4 pl-12' : 'px-4'} ${isFocused || hasValue ? 'pt-6 pb-2' : 'py-3'} text-base border-2 rounded-2xl transition-all duration-300 text-right
    ${isFocused 
      ? 'bg-white' 
      : 'hover:bg-white/80'
    }
    backdrop-blur-sm focus:outline-none`
    .concat(isFocused ? ' border-[var(--primary-light)] shadow-[0_8px_16px_var(--shadow)]' : ' border-[var(--border)] hover:border-[var(--primary)]');

  return (
    <div className="relative mb-5">
      <div className="relative">
        {type === 'textarea' ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            required={required}
            placeholder={isFocused ? placeholder : ''}
            rows={rows}
            className={baseClasses}
            dir="rtl"
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            required={required}
            placeholder={isFocused ? placeholder : ''}
            className={baseClasses}
            dir="rtl"
          />
        )}
        
        {/* Floating Label */}
        <label 
          htmlFor={name} 
          className={`absolute right-4 transition-all duration-300 pointer-events-none text-right
            ${isFocused || hasValue 
              ? 'top-2 text-[10px] sm:text-xs font-bold' 
              : 'top-1/2 -translate-y-1/2 text-sm sm:text-base font-medium'
            }
            ${icon && !isFocused && !hasValue ? 'pr-8' : ''}
          `}
          style={{ color: isFocused || hasValue ? 'var(--primary)' : 'var(--text-light)' }}
        >
          {label}
          {required && <span style={{ color: 'var(--primary)' }} className="mr-1">*</span>}
        </label>
        
        {/* Icon */}
        {icon && (
          <div 
            className={`absolute left-4 transition-all duration-300 pointer-events-none ${type === 'textarea' ? 'top-3' : 'top-1/2 -translate-y-1/2'}`}
            style={{ color: isFocused || hasValue ? 'var(--primary)' : 'var(--text-light)' }}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
