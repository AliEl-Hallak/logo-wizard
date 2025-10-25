// app/components/Hero.tsx
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { MessageCircle, FileText } from "lucide-react";
import FloatingButtons from "./components/FloatingButtons";
export default function Hero() {
  return (
<section
  dir="ltr"
  className="relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-start bg-[var(--light-bg)] min-h-screen"
>

{/* Arka plan gradient */}
<div className="absolute inset-0 animated-bg opacity-20 pointer-events-none"></div>

{/* Üst ışık */}
<div
  className="absolute -top-[10vh] left-1/2 -translate-x-1/2 w-[140vw] h-[60vh] md:w-[90%] md:h-[90%] blur-3xl opacity-20 pointer-events-none"
  style={{ background: "radial-gradient(circle at 50% 30%, var(--primary-light), transparent 70%)" }}
/>

{/* Alt ışık */}
<div
  className="absolute -bottom-[10vh] left-1/2 -translate-x-1/2 w-[140vw] h-[60vh] md:w-[80%] md:h-[70%] blur-3xl opacity-15 pointer-events-none"
  style={{ background: "radial-gradient(circle at 50% 80%, var(--accent), transparent 70%)" }}
/>

      {/* Düzen */}
<div className="relative z-10 w-full max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-16 px-6 md:px-16 items-center">
        {/* Sol sütun */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="relative flex flex-col items-center justify-center gap-4 md:gap-10 md:col-span-2 order-1 md:order-1"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-20"
          >
            <Image
              src="/logo2.png"
              alt="Loay Designs Logo"
              width={140}
              height={70}
              className="drop-shadow-[0_8px_24px_var(--shadow)] md:w-[150px] "
            />
          </motion.div>

          {/* Görsel ve efektler */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 180, damping: 16 }}
            className="relative flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="absolute w-[260px] h-[260px] md:w-[320px] md:h-[320px] rounded-full border-[5px] md:border-[6px]
                        border-t-[var(--accent)] border-b-[var(--primary)]
                        border-l-transparent border-r-transparent opacity-40"
            />
            <div
              className="absolute w-[240px] h-[240px] md:w-[300px] md:h-[300px] rounded-full blur-3xl opacity-25"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, var(--primary-light), transparent 70%)",
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="relative z-10"
            >
              <Image
                src="/designer2.png"
                alt="Loay Designer"
                width={240}
                height={240}
                className="md:w-[300px] md:h-[300px] rounded-full border-4 border-[var(--white)]
                          shadow-[0_0_50px_rgba(255,107,0,0.25)] object-cover"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Sağ sütun */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center text-center md:col-span-3 order-2 md:order-2"
        >
          <motion.h1
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="font-bold leading-[1.05] text-transparent bg-clip-text text-[clamp(42px,6vw,100px)]"
            style={{
              backgroundImage:
                "linear-gradient(90deg,var(--primary),var(--accent))",
            }}
          >
            Loay&nbsp;Designs
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mt-2 md:mt-4 text-[clamp(20px,2.5vw,36px)] font-semibold text-[var(--primary-dark)]"
          >
            تصميم شعارات وهوية بصرية راقية
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="max-w-3xl mt-4 md:mt-6 text-[clamp(15px,1.3vw,22px)] leading-relaxed text-[var(--text-light)]"
          >
            أبتكر هويات وشعارات تجمع بين الفخامة والبساطة بأسلوب يعكس هوية علامتك
            التجارية بروحٍ عصرية وإبداعية.
          </motion.p>

          {/* Butonlar */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.6 }}
  className="flex justify-center items-center gap-4 md:gap-6 mt-8 flex-wrap"
>
 
  
  <motion.a
    href="/logo-wizard"
    whileHover={{
      scale: 1.06,
      boxShadow: "0 0 40px rgba(255,107,0,0.45)",
    }}
    whileTap={{ scale: 0.97 }}
    transition={{ type: "spring", stiffness: 220, damping: 14 }}
    className="flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold text-white text-lg md:text-xl
               shadow-[0_10px_30px_var(--shadow)] transition-all duration-300
               bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]"
  >
    <FileText className="w-6 h-6 text-white" strokeWidth={2.2} />
    املأ الفورم
  </motion.a>


</motion.div>


        </motion.div>
        <FloatingButtons />
      </div>
    </section>
  );
}
