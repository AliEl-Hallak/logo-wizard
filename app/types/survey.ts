// أنواع البيانات الخاصة بالاستبيان
export interface SurveyData {
  // 1. معلومات العميل
  fullName: string;
  email: string;
  phone: string;

  // 2. تفاصيل الشعار
  logoName: string;
  logoType: string;
  logoLanguage: string;

  // 3. خلفية المشروع ومتطلباته
  servicesOrProducts: string;
  aboutCompany: string;
  whyNeedLogo: string;
  competitors: string;
  targetLanguage: string;
  targetAgeGroup: string;

  // 4. التوجه البصري والأسلوب
  desiredImpression: string;
  preferredStyle: string;
  logoUsage: string[];
  colorRestrictions: string;

  // 5. المراجع والملفات
  inspirationLogos?: File | null;
  oldLogoDescription: string;
  additionalNotes: string;
  oldLogoFile?: File | null;
  keepOldStyle: string;
  deadline: string;
}

export const LOGO_TYPES = [
  'حرفي (Lettermark)',
  'الحرف الأول (Monogram)',
  'نصي (Wordmark)',
  'أيقوني رمزي (Pictorial)',
  'مزيج (Combination)',
  'علامة (Emblem)',
  'كاليغرافي (Calligraphic)',
  'أيقوني تجريدي (Abstract)'
];

export const LOGO_LANGUAGES = ['عربي', 'إنجليزي', 'تركي', 'أخرى'];

export const TARGET_AGE_GROUPS = ['أطفال', 'شباب', 'كبار السن', 'جميع الفئات'];

export const DESIRED_IMPRESSIONS = ['فخامة', 'حيوية', 'مرح', 'جدية', 'إبداع', 'أخرى'];

export const PREFERRED_STYLES = [
  'رسمي',
  'تقليدي',
  'بسيط',
  'معقد',
  'حديث',
  'عتيق',
  'عصري'
];

export const LOGO_USAGE_OPTIONS = ['ويب', 'طباعة', 'فيديو', 'وسائل التواصل', 'تطبيقات', 'أخرى'];

export const YES_NO_OPTIONS = ['نعم', 'لا'];
