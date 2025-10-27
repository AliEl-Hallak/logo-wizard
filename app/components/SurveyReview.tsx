'use client';

import { motion } from 'framer-motion';
import { SurveyData } from '../types/survey';
import { Icons } from './Icons';

// Animation variants for a soft, modern feel
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 280, damping: 22 },
  },
} as const;

const rowsContainerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const rowItemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 20 } },
} as const;

const buttonVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

interface SummaryCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function SummaryCard({ title, icon, children }: SummaryCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      className="rounded-2xl p-5 shadow-lg border-2 hover:shadow-xl transition-all duration-300 hover:scale-[1.01] backdrop-blur-sm"
      style={{
        background: 'linear-gradient(135deg, var(--white), var(--light-bg))',
        borderColor: 'var(--accent)'
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-extrabold flex items-center gap-2 text-right" style={{ color: 'var(--text-dark)' }}>
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full" style={{ backgroundColor: 'var(--accent)', color: 'var(--white)' }}>
            {icon}
          </span>
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg, var(--primary-dark), var(--accent), var(--primary-light))' }}>
            {title}
          </span>
        </h3>
      </div>
      <motion.div className="space-y-3" variants={rowsContainerVariants}>
        {children}
      </motion.div>
    </motion.div>
  );
}

interface DataRowProps {
  label: string;
  value: string | string[] | undefined;
}

function DataRow({ label, value }: DataRowProps) {
  if (!value || (Array.isArray(value) && value.length === 0)) {
    return null;
  }

  const text = Array.isArray(value) ? value.join('، ') : value;

  return (
    <motion.div
      variants={rowItemVariants}
      className="text-right rounded-xl p-3 border transition-colors"
      style={{ backgroundColor: 'var(--white)', borderColor: 'var(--border)' }}
    >
      <div className="flex flex-row items-center gap-3">
        <dt className="text-sm md:text-base font-bold tracking-wide whitespace-nowrap" style={{ color: 'var(--primary)' }}>
          {label}
        </dt>
        <dd
          className="text-sm md:text-base font-semibold flex-1 min-w-0 truncate"
          style={{ color: 'var(--text-dark)' }}
          title={text}
        >
          {text}
        </dd>
      </div>
    </motion.div>
  );
}

interface SurveyReviewProps {
  data: Partial<SurveyData>;
  onEdit: (step: number) => void;
}

export default function SurveyReview({ data, onEdit }: SurveyReviewProps) {
  return (
    <motion.div className="space-y-5" variants={containerVariants} initial="hidden" animate="visible">
      {/* معلومات العميل */}
      <SummaryCard title="بيانات التواصل" icon={Icons.user}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <DataRow label="الاسم الكامل" value={data.fullName} />
          <DataRow label="البريد الإلكتروني" value={data.email} />
          <DataRow label="رقم الهاتف" value={data.phone} />
        </div>
        <motion.button
          variants={buttonVariants}
          type="button"
          onClick={() => onEdit(1)}
          className="mt-3 inline-flex items-center gap-2 px-3 py-2 rounded-lg border-2 font-bold transition-all"
          style={{ borderColor: 'var(--accent)', color: 'var(--primary-dark)' }}
        >
          {Icons.pencil}
          <span>تعديل</span>
        </motion.button>
      </SummaryCard>

      {/* تفاصيل الشعار */}
      <SummaryCard title="تفاصيل الشعار" icon={Icons.type}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <DataRow label="اسم الشعار" value={data.logoName} />
          <DataRow label="نوع الشعار" value={data.logoType} />
          <DataRow label="لغة الشعار" value={data.logoLanguage} />
        </div>
        <motion.button
          variants={buttonVariants}
          type="button"
          onClick={() => onEdit(2)}
          className="mt-3 inline-flex items-center gap-2 px-3 py-2 rounded-lg border-2 font-bold transition-all"
          style={{ borderColor: 'var(--accent)', color: 'var(--primary-dark)' }}
        >
          {Icons.pencil}
          <span>تعديل</span>
        </motion.button>
      </SummaryCard>

      {/* خلفية المشروع */}
      <SummaryCard title="خلفية المشروع" icon={Icons.briefcase}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <DataRow label="الخدمات أو المنتجات" value={data.servicesOrProducts} />
          <DataRow label="نبذة عن الشركة" value={data.aboutCompany} />
          <DataRow label="سبب الحاجة للشعار" value={data.whyNeedLogo} />
          <DataRow label="المنافسون" value={data.competitors} />
          <DataRow label="لغة الجمهور المستهدف" value={data.targetLanguage} />
          <DataRow label="الفئة العمرية" value={data.targetAgeGroup} />
        </div>
        <motion.button
          variants={buttonVariants}
          type="button"
          onClick={() => onEdit(3)}
          className="mt-3 inline-flex items-center gap-2 px-3 py-2 rounded-lg border-2 font-bold transition-all"
          style={{ borderColor: 'var(--accent)', color: 'var(--primary-dark)' }}
        >
          {Icons.pencil}
          <span>تعديل</span>
        </motion.button>
      </SummaryCard>

      {/* التوجه البصري */}
      <SummaryCard title="التوجه البصري والأسلوب" icon={Icons.palette}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <DataRow label="الطابع المطلوب" value={data.desiredImpression} />
          <DataRow label="النمط المفضل" value={data.preferredStyle} />
          <DataRow label="استخدامات الشعار" value={data.logoUsage} />
          <DataRow label="الألوان والعناصر" value={data.colorRestrictions} />
        </div>
        <motion.button
          variants={buttonVariants}
          type="button"
          onClick={() => onEdit(4)}
          className="mt-3 inline-flex items-center gap-2 px-3 py-2 rounded-lg border-2 font-bold transition-all"
          style={{ borderColor: 'var(--accent)', color: 'var(--primary-dark)' }}
        >
          {Icons.pencil}
          <span>تعديل</span>
        </motion.button>
      </SummaryCard>

      {/* المراجع والملفات */}
      <SummaryCard title="المراجع والملفات" icon={Icons.image}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="text-right rounded-xl p-3 border" style={{ backgroundColor: 'var(--white)', borderColor: 'var(--border)' }}>
            <div className="flex flex-row items-center gap-3">
              <dt className="text-sm md:text-base font-bold tracking-wide whitespace-nowrap" style={{ color: 'var(--primary)' }}>الشعارات الملهمة</dt>
              <dd className="text-sm md:text-base font-semibold flex-1 min-w-0" style={{ color: 'var(--text-dark)' }}>
                {data.inspirationLogos ? (
                  <span
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold"
                    style={{ border: '1px solid var(--border)', backgroundColor: 'var(--light-bg)', color: 'var(--primary-dark)' }}
                  >
                    {Icons.image}
                    <span>تم الرفع</span>
                  </span>
                ) : (
                  <span
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold"
                    style={{ border: '1px solid var(--border)', backgroundColor: 'var(--light-bg)', color: 'var(--primary-dark)' }}
                  >
                    {Icons.image}
                    <span>لا يوجد</span>
                  </span>
                )}
              </dd>
            </div>
          </div>
          <DataRow label="وصف الشعار القديم" value={data.oldLogoDescription} />
          <div className="text-right rounded-xl p-3 border" style={{ backgroundColor: 'var(--white)', borderColor: 'var(--border)' }}>
            <div className="flex flex-row items-center gap-3">
              <dt className="text-sm md:text-base font-bold tracking-wide whitespace-nowrap" style={{ color: 'var(--primary)' }}>الشعار القديم</dt>
              <dd className="text-sm md:text-base font-semibold flex-1 min-w-0" style={{ color: 'var(--text-dark)' }}>
                {data.oldLogoFile ? (
                  <span
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold"
                    style={{ border: '1px solid var(--border)', backgroundColor: 'var(--light-bg)', color: 'var(--primary-dark)' }}
                  >
                    {Icons.image}
                    <span>تم الرفع</span>
                  </span>
                ) : (
                  <span
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold"
                    style={{ border: '1px solid var(--border)', backgroundColor: 'var(--light-bg)', color: 'var(--primary-dark)' }}
                  >
                    {Icons.image}
                    <span>لا يوجد</span>
                  </span>
                )}
              </dd>
            </div>
          </div>
          <DataRow label="الحفاظ على الشكل القديم" value={data.keepOldStyle} />
          <DataRow label="موعد التسليم" value={data.deadline} />
        </div>
        <motion.button
          variants={buttonVariants}
          type="button"
          onClick={() => onEdit(5)}
          className="mt-3 inline-flex items-center gap-2 px-3 py-2 rounded-lg border-2 font-bold transition-all"
          style={{ borderColor: 'var(--accent)', color: 'var(--primary-dark)' }}
        >
          {Icons.pencil}
          <span>تعديل</span>
        </motion.button>
      </SummaryCard>
    </motion.div>
  );
}
