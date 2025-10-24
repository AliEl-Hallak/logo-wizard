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
                className={`w-11 h-11 rounded-full flex items-center justify-center text-base font-bold transition-all duration-500 ${
                  isReview || index + 1 <= currentStep
                    ? 'bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 text-white shadow-lg shadow-orange-500/50 ring-4 ring-orange-200'
                    : 'bg-white text-gray-400 shadow-md border-2 border-gray-200'
                } ${
                  !isReview && index + 1 === currentStep
                    ? 'ring-orange-300'
                    : ''
                }`}
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
      <div className="relative w-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded-full h-4 overflow-hidden shadow-inner border border-gray-300">
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
            background: 'linear-gradient(270deg, #ff6b00 0%, #ff8c38 30%, #ffa556 60%, #ffb366 100%)',
            boxShadow: '0 0 25px rgba(255, 107, 0, 0.6), inset 0 1px 2px rgba(255,255,255,0.3)'
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
          <div className="flex items-center gap-1.5 md:gap-2 bg-gradient-to-r from-orange-50 to-amber-50 px-2.5 md:px-5 py-1.5 md:py-2.5 rounded-full shadow-md border border-orange-200 flex-1 justify-center">
            <span className="text-xs md:text-sm font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent whitespace-nowrap overflow-hidden text-ellipsis">
              {currentStep === totalSteps ? (
                '🎉 خطوة أخيرة'
              ) : (
                `💪 باقي ${totalSteps - currentStep} خطوات`
              )}
            </span>
          </div>
        ) : (
        <div className="flex items-center gap-1.5 md:gap-2 bg-gradient-to-r from-orange-50 to-amber-50 px-2.5 md:px-5 py-1.5 md:py-2.5 rounded-full shadow-md border border-orange-200 flex-1 justify-center">
          <span className="text-xs md:text-sm font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent whitespace-nowrap">
               راجع وأرسل
            </span>
          </div>
        )}

        {/* Right side - Step info */}
        <div className="flex items-center gap-1.5 md:gap-2 bg-gradient-to-r from-orange-50 to-amber-50 px-2.5 md:px-5 py-1.5 md:py-2.5 rounded-full shadow-md border border-orange-200 flex-1 justify-center">
          <svg className="w-4 h-4 md:w-5 md:h-5 text-orange-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-xs md:text-sm font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent whitespace-nowrap">
            {isReview ? ' مراجعة ' : `${currentStep}/${totalSteps}`}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
