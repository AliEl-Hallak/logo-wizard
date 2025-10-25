'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  isReview?: boolean;
}

export default function ProgressBar({ currentStep, totalSteps, isReview = false }: ProgressBarProps) {
  const progress = isReview ? 100 : (currentStep / totalSteps) * 100;

  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full mb-8"
    >
      {/* Step indicators - Above the slider */}
      <div className="relative mb-4">
        <div className="flex justify-between px-2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
              className="flex flex-col items-center"
            >
              <motion.div
                animate={{
                  scale: !isReview && index + 1 === currentStep ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  duration: 2,
                  repeat: !isReview && index + 1 === currentStep ? Infinity : 0,
                  ease: "easeInOut"
                }}
                className={`w-11 h-11 rounded-full flex items-center justify-center text-base font-bold transition-all duration-500`}
                style={{
                  background: (isReview || index + 1 <= currentStep)
                    ? 'linear-gradient(135deg, var(--primary), var(--accent), var(--primary-dark))'
                    : 'var(--white)',
                  color: (isReview || index + 1 <= currentStep) ? 'var(--white)' : 'var(--text-light)',
                  boxShadow: (isReview || index + 1 <= currentStep)
                    ? '0 4px 8px var(--shadow), 0 8px 16px var(--shadow), 0 0 0 3px var(--shadow)'
                    : '0 2px 4px var(--shadow), 0 4px 8px var(--shadow)',
                  border: (isReview || index + 1 <= currentStep) ? undefined : '2px solid var(--border)',
                  transform: (isReview || index + 1 <= currentStep) ? 'translateY(-2px)' : 'translateY(0)'
                }}
              >
                {isReview || index + 1 < currentStep ? (
                  <motion.svg 
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-6 h-6" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </motion.svg>
                ) : (
                  index + 1
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Modern Slider */}
  <div className="relative w-full rounded-full h-4 overflow-hidden shadow-inner border" style={{ background: 'linear-gradient(90deg, var(--light-bg), var(--border), var(--light-bg))', borderColor: 'var(--border)' }}>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)'
          }} />
        </div>
        
        {/* Progress fill */}
        <div
          className="absolute top-0 right-0 h-full rounded-full transition-all duration-700 ease-out transform"
          style={{ 
            width: `${progress}%`,
            background: 'linear-gradient(270deg, var(--primary) 0%, var(--accent) 50%, var(--primary-dark) 100%)',
            boxShadow: '0 0 25px var(--shadow), inset 0 1px 2px rgba(255,255,255,0.3)'
          }}
        >
          {/* Animated shine effect */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white to-transparent opacity-40 animate-shimmer" />
          
          {/* Moving dots */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white opacity-70 animate-pulse" style={{ animationDelay: '0ms' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-white opacity-70 animate-pulse" style={{ animationDelay: '200ms' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-white opacity-70 animate-pulse" style={{ animationDelay: '400ms' }} />
          </div>
        </div>
      </div>

      {/* Info section below slider */}
      <div className="mt-4 flex items-center justify-between gap-2 md:gap-3 px-1 md:px-2">
        {/* Left side - Motivational message */}
        {!isReview ? (
          <div className="flex items-center gap-1.5 md:gap-2 px-2.5 md:px-5 py-1.5 md:py-2.5 rounded-full shadow-md border flex-1 justify-center" style={{ background: 'var(--light-bg)', borderColor: 'var(--border)' }}>
            <span className="text-xs md:text-sm font-bold bg-clip-text text-transparent whitespace-nowrap overflow-hidden text-ellipsis" style={{ backgroundImage: 'linear-gradient(90deg, var(--primary-dark), var(--accent))' }}>
              {currentStep === totalSteps ? (
                '🎉 خطوة أخيرة'
              ) : (
                `💪 باقي ${totalSteps - currentStep} خطوات`
              )}
            </span>
          </div>
        ) : (
        <div className="flex items-center gap-1.5 md:gap-2 px-2.5 md:px-5 py-1.5 md:py-2.5 rounded-full shadow-md border flex-1 justify-center" style={{ background: ' var(--light-bg), var(--border)', borderColor: 'var(--border)' }}>
          <span className="text-xs md:text-sm font-bold bg-clip-text text-transparent whitespace-nowrap" style={{ backgroundImage: 'linear-gradient(90deg, var(--primary-dark), var(--accent))' }}>
               راجع وأرسل
            </span>
          </div>
        )}

        {/* Right side - Step info */}
        <div className="flex items-center gap-1.5 md:gap-2 px-2.5 md:px-5 py-1.5 md:py-2.5 rounded-full shadow-md border flex-1 justify-center" style={{ background: 'var(--light-bg)', borderColor: 'var(--border)' }}>
          <svg className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" style={{ color: 'var(--primary)' }} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-xs md:text-sm font-bold bg-clip-text text-transparent whitespace-nowrap" style={{ backgroundImage: 'linear-gradient(90deg, var(--primary-dark), var(--accent))' }}>
            {isReview ? ' مراجعة ' : `${currentStep}/${totalSteps}`}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
