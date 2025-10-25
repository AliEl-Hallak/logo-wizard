'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import ProgressBar from '../components/ProgressBar';
import FormField from '../components/FormField';
import SelectField from '../components/SelectField';
import FancySelect from '../components/FancySelect';
import CheckboxGroup from '../components/CheckboxGroup';
import FileUpload from '../components/FileUpload';
import SurveyReview from '../components/SurveyReview';
import { Icons } from '../components/Icons';
import { OptionIcons } from '../components/OptionIcons';

import {
  SurveyData,
  LOGO_TYPES,
  LOGO_LANGUAGES,
  TARGET_AGE_GROUPS,
  DESIRED_IMPRESSIONS,
  PREFERRED_STYLES,
  LOGO_USAGE_OPTIONS,
  YES_NO_OPTIONS,
} from '../types/survey';

const TOTAL_STEPS = 5;

export default function LogoWizardPage() {
  
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isReview, setIsReview] = useState(false);
  const initialForm: Partial<SurveyData> = {
    fullName: '',
    email: '',
    phone: '',
    logoName: '',
    logoType: '',
    logoLanguage: '',
    servicesOrProducts: '',
    aboutCompany: '',
    whyNeedLogo: '',
    competitors: '',
    targetLanguage: '',
    targetAgeGroup: '',
    desiredImpression: '',
    preferredStyle: '',
    logoUsage: [],
    colorRestrictions: '',
    oldLogoDescription: '',
    keepOldStyle: '',
    deadline: '',
  };
  const [formData, setFormData] = useState<Partial<SurveyData>>(initialForm);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (value: string) => {
    const currentUsage = formData.logoUsage || [];
    const newUsage = currentUsage.includes(value)
      ? currentUsage.filter((item) => item !== value)
      : [...currentUsage, value];
    
    setFormData({
      ...formData,
      logoUsage: newUsage,
    });
  };

  const handleFileChange = (name: string, file: File | null) => {
    setFormData({
      ...formData,
      [name]: file,
    });
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsReview(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (isReview) {
      setIsReview(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isReview) {
      // TODO: إرسال البيانات عبر EmailJS أو API
      // Reset form and go to success page
      setFormData(initialForm);
      setCurrentStep(1);
      setIsReview(false);
      router.push('/success');
    } else {
      nextStep();
    }
  };

  const goToStep = (step: number) => {
    setIsReview(false);
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative overflow-hidden py-8 px-4 sm:px-6 lg:px-8" dir="rtl">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 animated-bg opacity-30" />
      
      {/* Floating Circles with Motion */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ backgroundColor: 'var(--primary-light)' }}
        className="fixed top-20 right-10 w-64 h-64 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" 
      />
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
        style={{ backgroundColor: 'var(--accent)' }}
        className="fixed bottom-20 left-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" 
      />
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
        style={{ backgroundColor: 'var(--accent)' }}
        className="fixed top-1/2 left-1/2 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" 
      />
      
      <div className="max-w-4xl mx-auto relative">
        {/* Header */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-8"
        >
    
          <motion.h1 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl sm:text-6xl font-black mb-4 bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(to right, var(--primary-dark), var(--accent), var(--primary-light))',
              WebkitBackgroundClip: 'text'
            }}
          >
            استبيان تصميم الشعار
          </motion.h1>
    
        </motion.div>

        {/* Form Card */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="glass rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 backdrop-blur-lg border-2 border-white/50"
        >
          {/* Section Title - Above Progress Bar */}
          <div className="text-center mb-8 fade-in-up relative">
            <div className="flex items-center justify-center gap-4 md:gap-6">
              {/* Left decoration */}
              <div className="flex-1 max-w-[80px] md:max-w-[150px] flex items-center gap-1">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--primary-light)', boxShadow: '0 4px 8px var(--shadow)' }} />
                <div className="flex-1 h-[3px] rounded-full" style={{ background: 'linear-gradient(to left, var(--primary-light), var(--accent), transparent)' }} />
              </div>
              {/* Title */}
              {isReview ? (
                <h2 
                  className="text-xl sm:text-2xl md:text-3xl font-black bg-clip-text text-transparent animate-gradient whitespace-nowrap px-2"
                  style={{ 
                    backgroundImage: 'linear-gradient(to right, var(--primary-light), var(--accent), var(--primary-dark))',
                    WebkitBackgroundClip: 'text'
                  }}
                >
                  مراجعة البيانات النهائية
                </h2>
              ) : (
                <h2 
                  className="text-xl sm:text-2xl md:text-3xl font-black bg-clip-text text-transparent animate-gradient whitespace-nowrap px-2"
                  style={{ 
                    backgroundImage: 'linear-gradient(to right, var(--primary-light), var(--accent), var(--primary-dark))',
                    WebkitBackgroundClip: 'text'
                  }}
                >
                  {currentStep === 1 ? 'بيانات التواصل' :
                   currentStep === 2 ? 'تفاصيل الشعار' :
                   currentStep === 3 ? 'خلفية المشروع' :
                   currentStep === 4 ? 'التوجه البصري' :
                   'المراجع والملفات'}
                </h2>
              )}
              {/* Right decoration */}
              <div className="flex-1 max-w-[80px] md:max-w-[150px] flex items-center gap-1">
                <div className="flex-1 h-[3px] rounded-full" style={{ background: 'linear-gradient(to right, var(--primary-light), var(--accent), transparent)' }} />
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--primary-light)', animationDelay: '0.5s', boxShadow: '0 4px 8px var(--shadow)' }} />
              </div>
            </div>
          </div>

          <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} isReview={isReview} />

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {/* Step 1: معلومات العميل */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.12,
                        delayChildren: 0.1
                      }
                    },
                    exit: { opacity: 0, transition: { duration: 0.15 } }
                  }}
                  className="space-y-4"
                >
                  <motion.div variants={{ 
                    hidden: { opacity: 0, y: 10, scale: 0.95 }, 
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      transition: { type: "spring", stiffness: 300, damping: 24 }
                    } 
                  }}>
                    <FormField
                      label="الاسم الكامل"
                      name="fullName"
                      value={formData.fullName || ''}
                      onChange={handleInputChange}
                      required
                      placeholder="أدخل اسمك الكامل"
                      icon={Icons.user}
                    />
                  </motion.div>
                  <motion.div variants={{ 
                    hidden: { opacity: 0, y: 10, scale: 0.95 }, 
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      transition: { type: "spring", stiffness: 300, damping: 24 }
                    } 
                  }}>
                    <FormField
                      label="البريد الإلكتروني"
                      name="email"
                      type="email"
                      value={formData.email || ''}
                      onChange={handleInputChange}
                      required
                      placeholder="example@email.com"
                      icon={Icons.email}
                    />
                  </motion.div>
                  <motion.div variants={{ 
                    hidden: { opacity: 0, y: 10, scale: 0.95 }, 
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      transition: { type: "spring", stiffness: 300, damping: 24 }
                    } 
                  }}>
                    <FormField
                      label="رقم الهاتف"
                      name="phone"
                      type="tel"
                      value={formData.phone || ''}
                      onChange={handleInputChange}
                      required
                      placeholder="+966 5X XXX XXXX"
                      icon={Icons.phone}
                    />
                  </motion.div>
                </motion.div>
              )}

              {/* Step 2: تفاصيل الشعار */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.12,
                        delayChildren: 0.1
                      }
                    },
                    exit: { opacity: 0, transition: { duration: 0.15 } }
                  }}
                  className="space-y-4"
                >
                  <motion.div variants={{ 
                    hidden: { opacity: 0, y: 10, scale: 0.95 }, 
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      transition: { type: "spring", stiffness: 300, damping: 24 }
                    } 
                  }}>
                    <FormField
                      label="الاسم المطلوب في الشعار"
                      name="logoName"
                      value={formData.logoName || ''}
                      onChange={handleInputChange}
                      required
                      placeholder="اسم الشركة أو المشروع"
                      icon={Icons.logo}
                    />
                  </motion.div>
                  <motion.div variants={{ 
                    hidden: { opacity: 0, y: 10, scale: 0.95 }, 
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      transition: { type: "spring", stiffness: 300, damping: 24 }
                    } 
                  }}>
                    <FancySelect
                      label="نوع الشعار"
                      name="logoType"
                      value={formData.logoType || ''}
                      onChange={handleInputChange as any}
                      options={LOGO_TYPES}
                      optionIcons={OptionIcons}
                      required
                      icon={Icons.type}
                    />
                  </motion.div>
                  <motion.div variants={{ 
                    hidden: { opacity: 0, y: 10, scale: 0.95 }, 
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      transition: { type: "spring", stiffness: 300, damping: 24 }
                    } 
                  }}>
                    <FancySelect
                      label="لغة الشعار"
                      name="logoLanguage"
                      value={formData.logoLanguage || ''}
                      onChange={handleInputChange as any}
                      options={LOGO_LANGUAGES}
                      optionIcons={OptionIcons}
                      required
                      icon={Icons.language}
                    />
                  </motion.div>
                </motion.div>
              )}

              {/* Step 3: خلفية المشروع */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.1
                      }
                    },
                    exit: { opacity: 0, transition: { duration: 0.15 } }
                  }}
                  className="space-y-4"
                >
                  <motion.div variants={{ 
                    hidden: { opacity: 0, y: 10, scale: 0.95 }, 
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      transition: { type: "spring", stiffness: 300, damping: 24 }
                    } 
                  }}>
                    <FormField
                      label="الخدمات أو المنتجات المقدمة"
                      name="servicesOrProducts"
                      value={formData.servicesOrProducts || ''}
                      onChange={handleInputChange}
                      required
                      placeholder="صف الخدمات أو المنتج التي تقدمه"
                      icon={Icons.briefcase}
                    />
                  </motion.div>
                  <motion.div variants={{ hidden: { y: -20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
                    <FormField
                      label="نبذة عن الشركة أو المشروع"
                      name="aboutCompany"
                      value={formData.aboutCompany || ''}
                      onChange={handleInputChange}
                      required
                      placeholder="أخبرنا عن مشروعك..."
                      icon={Icons.info}
                    />
                  </motion.div>
                  <motion.div variants={{ hidden: { y: -20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
                    <FormField
                      label="سبب الحاجة إلى شعار جديد"
                      name="whyNeedLogo"
                      value={formData.whyNeedLogo || ''}
                      onChange={handleInputChange}
                      required
                      placeholder="لماذا تحتاج شعاراً جديداً؟"
                      icon={Icons.lightbulb}
                    />
                  </motion.div>
                  <motion.div variants={{ hidden: { y: -20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
                    <FormField
                      label="المنافسون في السوق"
                      name="competitors"
                      value={formData.competitors || ''}
                      onChange={handleInputChange}
                      placeholder="من هم منافسوك الرئيسيون؟"
                      icon={Icons.users}
                    />
                  </motion.div>
                  <motion.div variants={{ hidden: { y: -20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
                    <FormField
                      label="لغة الجمهور المستهدف"
                      name="targetLanguage"
                      value={formData.targetLanguage || ''}
                      onChange={handleInputChange}
                      required
                      placeholder="عربي، إنجليزي، أو غيرها..."
                      icon={Icons.language}
                    />
                  </motion.div>
                  <motion.div variants={{ hidden: { y: -20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
                    <FancySelect
                      label="الفئة العمرية المستهدفة"
                      name="targetAgeGroup"
                      value={formData.targetAgeGroup || ''}
                      onChange={handleInputChange as any}
                      options={TARGET_AGE_GROUPS}
                      optionIcons={OptionIcons}
                      required
                      icon={Icons.users}
                    />
                  </motion.div>
                </motion.div>
              )}

              {/* Step 4: التوجه البصري */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.08
                      }
                    },
                    exit: { opacity: 0, transition: { duration: 0.2 } }
                  }}
                  className="space-y-4"
                >
                  <motion.div variants={{ hidden: { y: -20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
                    <FancySelect
                      label="الطابع الذي تريد تركه"
                      name="desiredImpression"
                      value={formData.desiredImpression || ''}
                      onChange={handleInputChange as any}
                      options={DESIRED_IMPRESSIONS}
                      optionIcons={OptionIcons}
                      required
                      icon={Icons.sparkles}
                    />
                  </motion.div>
                  <motion.div variants={{ hidden: { y: -20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
                    <FancySelect
                      label="النمط المفضل"
                      name="preferredStyle"
                      value={formData.preferredStyle || ''}
                      onChange={handleInputChange as any}
                      options={PREFERRED_STYLES}
                      optionIcons={OptionIcons}
                      required
                      icon={Icons.palette}
                    />
                  </motion.div>
                  <motion.div variants={{ hidden: { y: -20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
                    <CheckboxGroup
                      label="استخدامات الشعار"
                      name="logoUsage"
                      options={LOGO_USAGE_OPTIONS}
                      values={formData.logoUsage || []}
                      onChange={handleCheckboxChange}
                      required
                    />
                  </motion.div>
                  <motion.div variants={{ hidden: { y: -20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
                    <FormField
                      label="عناصر أو ألوان محددة تريد الالتزام بها"
                      name="colorRestrictions"
                      value={formData.colorRestrictions || ''}
                      onChange={handleInputChange}
                      placeholder="مثال: الأزرق والأبيض، أو لا توجد قيود معينة"
                      icon={Icons.color}
                    />
                  </motion.div>
                </motion.div>
              )}

              {/* Step 5: المراجع والملفات */}
              {currentStep === 5 && !isReview && (
                <motion.div
                  key="step5"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.08
                      }
                    },
                    exit: { opacity: 0, transition: { duration: 0.2 } }
                  }}
                  className="space-y-4"
                >
                  <motion.div variants={{ hidden: { y: -20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
                    <FileUpload
                      label="رفع شعارات أعجبتك (اختياري)"
                      name="inspirationLogos"
                      onChange={(file) => handleFileChange('inspirationLogos', file)}
                    />
                  </motion.div>
                  <motion.div variants={{ hidden: { y: -20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
                    <FormField
                      label="وصف الشعار القديم وما لا يعجبك فيه"
                      name="oldLogoDescription"
                      value={formData.oldLogoDescription || ''}
                      onChange={handleInputChange}
                      placeholder="إذا كان لديك شعار قديم، صفه وأخبرنا ما الذي لا يعجبك فيه"
                      icon={Icons.pencil}
                    />
                  </motion.div>
                  <motion.div variants={{ hidden: { y: -20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
                    <FormField
                      label="ملاحظات إضافية"
                      name="additionalNotes"
                      value={formData.additionalNotes || ''}
                      onChange={handleInputChange}
                      placeholder="أي ملاحظات أخرى تود مشاركتها..."
                      icon={Icons.info}
                    />
                  </motion.div>
                  <motion.div variants={{ hidden: { y: -20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
                    <FileUpload
                      label="رفع الشعار القديم (إذا وُجد)"
                      name="oldLogoFile"
                      onChange={(file) => handleFileChange('oldLogoFile', file)}
                    />
                  </motion.div>
                  <motion.div variants={{ hidden: { y: -20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
                    <FancySelect
                      label="هل تريد الحفاظ على شكل الشعار القديم؟"
                      name="keepOldStyle"
                      value={formData.keepOldStyle || ''}
                      onChange={handleInputChange as any}
                      options={YES_NO_OPTIONS}
                      optionIcons={OptionIcons}
                      required
                      icon={Icons.checkbox}
                    />
                  </motion.div>
                  <motion.div variants={{ hidden: { y: -20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
                    <FormField
                      label="آخر موعد للتسليم"
                      name="deadline"
                      type="date"
                      value={formData.deadline || ''}
                      onChange={handleInputChange}
                      required
                      icon={Icons.calendar}
                    />
                  </motion.div>
                </motion.div>
              )}

              {/* Review: مراجعة البيانات */}
              {isReview && (
                <motion.div
                  key="review"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        duration: 0.3
                      }
                    },
                    exit: { opacity: 0, transition: { duration: 0.2 } }
                  }}
                >
                  <SurveyReview data={formData} onEdit={goToStep} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-row gap-3 mt-8 pt-6 border-t-2"
              style={{ borderColor: 'var(--light-bg)' }}
            >
              {(currentStep > 1 || isReview) && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={prevStep}
                  className="flex-1 px-4 py-3 bg-white border-2 rounded-xl font-bold transition-all transform hover:shadow-lg flex items-center justify-center gap-2"
                  style={{ 
                    borderColor: 'var(--border)',
                    color: 'var(--primary-dark)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--light-bg)';
                    e.currentTarget.style.borderColor = 'var(--primary-light)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.borderColor = 'var(--border)';
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  السابق
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="flex-1 px-4 py-3 text-white rounded-xl font-bold transition-all transform hover:shadow-2xl flex items-center justify-center gap-2 relative overflow-hidden group"
                style={{
                  background: 'linear-gradient(to right, var(--primary-light), var(--accent), var(--primary-light))'
                }}
              >
                <span 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: 'linear-gradient(to right, var(--primary-dark), var(--accent), var(--primary-dark))' }}
                />
                <span className="relative flex items-center gap-2">
                  {isReview ? (
                    <>إرسال</>
                  ) : (
                    <>
                      {currentStep === TOTAL_STEPS ? 'انهاء' : 'التالي'}
                      <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </span>
              </motion.button>
            </motion.div>
          </form>
        </motion.div>


      </div>
    </div>
  );
}
