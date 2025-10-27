"use client";

import { motion } from 'framer-motion';
import Lottie from "lottie-react";
import iconAnimation from "@/public/Success.json";
import confettiAnimation from "@/public/congratulation.json";
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="min-h-[100dvh] relative overflow-hidden px-6 py-10 grid place-items-center lg:block lg:py-14" dir="rtl">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 animated-bg opacity-30" />
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ backgroundColor: 'var(--primary-light)' }}
        className="fixed top-20 right-10 w-64 h-64 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" 
      />
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        style={{ backgroundColor: 'var(--accent)' }}
        className="fixed bottom-20 left-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" 
      />

      {/* Fullscreen confetti - plays once; always on top, mobile too */}
      <Lottie
        animationData={confettiAnimation}
        loop={false}
        autoplay
        className="pointer-events-none fixed inset-0 z-[9999] w-full h-full"
        aria-hidden="true"
      />

      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          className="glass rounded-3xl shadow-2xl p-8 lg:p-12 backdrop-blur-lg border-2 border-white/50 text-center relative z-20"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.5 }}
          >
            <Lottie
              animationData={iconAnimation}
              loop
              autoplay
              className="w-[75px] md:w-[100px] h-auto opacity-100 mx-auto"
              style={{ pointerEvents: "none" }}
            />
          </motion.div>

          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-3xl sm:text-4xl font-black p-3 mb-3 bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(to right, var(--primary-dark), var(--accent), var(--primary-dark))',
              WebkitBackgroundClip: 'text'
            }}
          >
            تم استلام طلبك بنجاح
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-base sm:text-lg font-medium max-w-2xl mx-auto mb-6"
            style={{ color: 'var(--text-dark)' }}
          >
            شكراً لوقتك! سنراجع معلوماتك ونتواصل معك قريباً للخطوات التالية.
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link href="/logo-wizard"  rel="noopener noreferrer">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-3 rounded-xl font-bold text-white shadow-lg hover:shadow-xl transition-all cursor-pointer"
                style={{
                  background: 'linear-gradient(to right, var(--primary-light), var(--accent), var(--primary-light))'
                }}
              >
                بدء نموذج جديد
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
