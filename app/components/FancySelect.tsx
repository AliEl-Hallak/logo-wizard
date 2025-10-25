'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface FancySelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  required?: boolean;
  placeholder?: string;
  icon?: React.ReactNode;
  optionIcons?: Record<string, React.ReactNode>; // Each option can have its own icon/image
}

export default function FancySelect({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  placeholder = 'اختر...',
  icon,
  optionIcons = {},
}: FancySelectProps) {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const selectedLabel = value || '';
  const hasValue = value && value.length > 0;

  // Close on Escape while open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) {
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }
  }, [open]);

  useEffect(() => {
    if (!open) setHighlight(-1);
  }, [open]);

  // Lock background scroll when the modal is open and focus the close button for accessibility
  useEffect(() => {
    if (open) {
      const prevBodyOverflow = document.body.style.overflow;
      const prevHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      // Focus close button after open for better keyboard UX
      setTimeout(() => closeBtnRef.current?.focus(), 0);
      return () => {
        document.body.style.overflow = prevBodyOverflow;
        document.documentElement.style.overflow = prevHtmlOverflow;
      };
    }
  }, [open]);

  const commitValue = (val: string) => {
    const fakeEvent = { target: { name, value: val } } as unknown as React.ChangeEvent<HTMLSelectElement>;
    onChange(fakeEvent);
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!open && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      setOpen(true);
      setHighlight(Math.max(0, options.findIndex(o => o === value)));
      return;
    }
    if (!open) return;
    if (e.key === 'Escape') {
      setOpen(false);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlight((h) => (h + 1) % options.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlight((h) => (h - 1 + options.length) % options.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      commitValue(options[Math.max(0, highlight)]);
    }
  };

  return (
    <div className="relative mb-5" ref={containerRef}>
      {/* Hidden native select for accessibility and form semantics */}
      <select name={name} value={value} onChange={onChange} required={required} className="sr-only" aria-hidden="true">
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>

      <div className="relative">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          onKeyDown={handleKeyDown}
          className={`w-full ${icon ? 'pr-4 pl-12' : 'px-4'} ${open || hasValue ? 'pt-6 pb-2' : 'py-3'} text-base border-2 rounded-2xl transition-all duration-300 text-right cursor-pointer backdrop-blur-sm focus:outline-none flex items-center justify-between ${open ? 'shadow-xl' : ''}`}
          style={{
            borderColor: open ? 'var(--primary-light)' : 'var(--border)',
            backgroundColor: 'var(--white)'
          }}
        >
          <span className={`truncate flex-1 text-right ${hasValue ? '' : 'opacity-0'}`}>
            {selectedLabel}
          </span>
          <span className={`ml-2 transition-all duration-300`} style={{ color: open || hasValue ? 'var(--primary)' : 'var(--text-light)' }}>
            <svg className={`w-5 h-5 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>

        {/* Floating Label */}
        <label 
          className={`absolute right-4 transition-all duration-300 pointer-events-none text-right
            ${open || hasValue 
              ? 'top-2 text-[10px] sm:text-xs font-bold' 
              : 'top-1/2 -translate-y-1/2 text-sm sm:text-base font-medium'
            }
            ${icon && !open && !hasValue ? 'pr-8' : ''}
          `}
          style={{ color: open || hasValue ? 'var(--primary)' : 'var(--text-light)' }}
        >
          {label}
          {required && <span className="mr-1" style={{ color: 'var(--primary)' }}>*</span>}
        </label>

        {/* Icon */}
        {icon && (
          <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-none`}
            style={{ color: open || hasValue ? 'var(--primary)' : 'var(--text-light)' }}
          >
            {icon}
          </div>
        )}

        {/* Modern Modal Menu */}
        {open && createPortal(
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 backdrop-blur-sm z-40 animate-[fadeIn_0.2s_ease]"
              style={{ background: 'var(--backdrop)' }}
              onClick={() => setOpen(false)}
            />
            {/* Modal Menu centered to viewport */}
            <div
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-3rem)] sm:w-[calc(100vw-4rem)] max-w-sm z-50 animate-[scaleIn_0.2s_ease]"
              role="dialog"
              aria-modal="true"
              dir="rtl"
            >
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border-2" style={{ borderColor: 'var(--border)' }}>
                {/* Header */}
                <div className="px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between" style={{ backgroundImage: 'linear-gradient(90deg, var(--primary), var(--accent), var(--primary-dark))' }}>
                  <h3 className="text-white font-bold text-sm sm:text-base md:text-lg">{label}</h3>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    ref={closeBtnRef}
                    className="text-white hover:bg-white/20 rounded-full p-1 transition-all"
                    aria-label="Close"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                {/* Options List - Max 5 items visible */}
                <ul role="listbox" className="max-h-[25rem] overflow-y-auto p-2 sm:p-3 text-right">
                  {options.map((o, i) => {
                    const active = value === o;
                    const hovered = i === highlight;
                    const optionIcon = optionIcons[o];
                    return (
                      <li
                        key={o}
                        role="option"
                        aria-selected={active}
                        onMouseEnter={() => setHighlight(i)}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => commitValue(o)}
                        className={`flex items-center gap-2 sm:gap-3 px-3 py-3 sm:px-4 sm:py-3.5 rounded-xl sm:rounded-2xl cursor-pointer select-none transition-all duration-200 mb-1.5 sm:mb-2 last:mb-0 ${active ? 'scale-105 shadow-md' : hovered ? 'scale-[1.02]' : ''}`}
                        style={{
                          background: active ? 'linear-gradient(90deg, var(--light-bg), var(--border), var(--light-bg))' : undefined,
                          color: active ? 'var(--primary-dark)' : undefined,
                          border: '2px solid',
                          borderColor: active ? 'var(--primary-light)' : 'transparent'
                        }}
                      >
                        {active && (
                          <div className="rounded-full p-0.5 sm:p-1 flex-shrink-0" style={{ backgroundColor: 'var(--primary)' }}>
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                        <span className="text-sm sm:text-base flex-1 text-right">{o}</span>
                        {/* Option Icon/Image on the left side (visually right in RTL) */}
                        {optionIcon && (
                          <div className={
                            name === 'logoType'
                              ? 'flex-shrink-0 w-15 h-15 flex items-center justify-center'
                              : 'flex-shrink-0 w-7 h-7 flex items-center justify-center'
                          }>
                            {optionIcon}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </>,
          document.body
        )}
      </div>
    </div>
  );
}
