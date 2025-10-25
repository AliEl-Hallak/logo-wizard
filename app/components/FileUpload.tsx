'use client';

import { useState } from 'react';

interface FileUploadProps {
  label: string;
  name: string;
  onChange: (file: File | null) => void;
  required?: boolean;
  accept?: string;
  maxSize?: number;
}

export default function FileUpload({
  label,
  name,
  onChange,
  required = false,
  accept = 'image/*,.pdf',
  maxSize = 10,
}: FileUploadProps) {
  const [fileName, setFileName] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [fileSize, setFileSize] = useState<string>('');

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file && file.size > maxSize * 1024 * 1024) {
      alert(`حجم الملف يجب أن يكون أقل من ${maxSize} ميجابايت`);
      e.target.value = '';
      onChange(null);
      setFileName('');
      setFileSize('');
      return;
    }
    
    setFileName(file?.name || '');
    setFileSize(file ? formatFileSize(file.size) : '');
    onChange(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      const input = document.getElementById(name) as HTMLInputElement;
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      input.files = dataTransfer.files;
      handleChange({ target: input } as any);
    }
  };

  const clearFile = () => {
    const input = document.getElementById(name) as HTMLInputElement;
    input.value = '';
    setFileName('');
    setFileSize('');
    onChange(null);
  };

  return (
    <div className="mb-6 form-field">
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl p-4 sm:p-6 transition-all duration-300 cursor-pointer group overflow-hidden ${
          isDragging ? 'scale-[1.02] shadow-xl' : fileName ? 'shadow-md' : 'hover:shadow-lg'
        }`}
        style={{
          borderColor: isDragging
            ? 'var(--primary)'
            : fileName
            ? 'var(--primary-light)'
            : 'var(--border)',
          background: 'linear-gradient(135deg, var(--white), var(--light-bg))',
        }}
      >
        {/* Animated background gradient */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'linear-gradient(135deg, var(--light-bg), var(--border))' }}
        />
        
        <input
          id={name}
          name={name}
          type="file"
          onChange={handleChange}
          required={required}
          accept={accept}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          dir="rtl"
        />
        
        <div className="relative flex flex-col items-center gap-3 pointer-events-none">
          {fileName ? (
            <>
              {/* File icon with animation */}
              <div className="text-3xl sm:text-5xl animate-bounce-slow">
                {fileName.match(/\.(jpg|jpeg|png|gif|svg)$/i) ? '🖼️' : 
                 fileName.match(/\.(pdf)$/i) ? '📄' : '📁'}
              </div>
              <div className="text-center space-y-1.5">
                <p className="text-sm sm:text-base font-bold break-all px-2" style={{ color: 'var(--primary-dark)' }}>
                  {fileName}
                </p>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ backgroundColor: 'var(--border)' }}>
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: 'var(--primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-xs sm:text-sm font-bold" style={{ color: 'var(--primary-dark)' }}>
                    {fileSize}
                  </p>
                </div>
              </div>
              {/* Clear button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  clearFile();
                }}
                className="pointer-events-auto mt-2 px-3 py-1.5 sm:px-4 sm:py-2 text-white rounded-lg text-xs sm:text-sm font-bold transition-all hover:scale-105 shadow-md flex items-center gap-1.5 z-20"
                style={{ backgroundColor: 'var(--danger)' }}
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                إزالة الملف
              </button>
            </>
          ) : (
            <>
              {/* Label at top - above icon */}
              <div className="pointer-events-none mb-2">
                <div className="flex flex-row-reverse items-center justify-center gap-1.5">
                  <span className="text-xs sm:text-sm font-bold bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg, var(--primary-dark), var(--accent), var(--primary-dark))' }}>
                    {label}
                  </span>
                  {required && <span className="text-base sm:text-lg" style={{ color: 'var(--primary)' }}>*</span>}
                </div>
              </div>
              
              {/* Upload icon */}
              <div className="relative">
                <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-md" style={{ backgroundImage: 'linear-gradient(135deg, var(--light-bg), var(--border))' }}>
                  <svg className="w-7 h-7 sm:w-10 sm:h-10" style={{ color: 'var(--primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center animate-pulse shadow-md" style={{ backgroundImage: 'linear-gradient(135deg, var(--primary), var(--accent))' }}>
                  <span className="text-white text-base sm:text-xl font-bold">+</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm sm:text-base font-bold bg-clip-text text-transparent px-2" style={{ backgroundImage: 'linear-gradient(90deg, var(--primary-dark), var(--accent), var(--primary-dark))' }}>
                  {isDragging ? '🎯 أفلت الملف الآن!' : 'اسحب الملف أو اضغط'}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
