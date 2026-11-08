import { ThemeConfig, ThemeMode, ThemePalette } from './types';

export const THEME_PROFILES: Record<ThemeMode, ThemePalette> = {
  // 1. الوضع الأول: Dark / Black Mode (لمحبي اللون الأسود)
  dark: {
    id: 'dark',
    name: 'الوضع الليلي الفاخر',
    nameEn: 'Dark Black',
    badge: '🌙 داكن',
    description: 'أسود صريح فخم مع كروت رمادية داكنة وحواف مصقولة لقراءة مريحة',
    
    // Backgrounds
    background: '#0A0A0A',
    surface: '#121212',
    card: '#1A1A1A',
    cardSecondary: '#222222',
    gradient: ['#1A1A2E', '#0A0A0A'],
    
    // Borders & Dividers
    border: '#2A2A2A',
    borderStrong: '#3A3A3A',
    divider: '#1F1F1F',
    
    // Typography
    textPrimary: '#FFFFFF',
    textSecondary: '#A1A1AA',
    textMuted: '#71717A',
    
    // Accents & Actions
    accent: '#6366F1',
    accentSecondary: '#818CF8',
    accentGlow: 'rgba(99, 102, 241, 0.25)',
    
    // Section Highlights
    aiSection: '#818CF8',
    aiSectionBg: 'rgba(99, 102, 241, 0.12)',
    studySection: '#34D399',
    studySectionBg: 'rgba(52, 211, 153, 0.12)',
    tasksSection: '#FBBF24',
    tasksSectionBg: 'rgba(251, 191, 36, 0.12)',
    subjectsSection: '#A78BFA',
    subjectsSectionBg: 'rgba(167, 139, 250, 0.12)',
    appsSection: '#38BDF8',
    appsSectionBg: 'rgba(56, 189, 248, 0.12)',
    
    // Status & Switcher
    statusBarStyle: 'light',
    switcherBg: '#141414',
    switcherActive: '#262626',
    switcherTextActive: '#FFFFFF',
    switcherTextInactive: '#71717A',
  },

  // 2. الوضع الثاني: Vibrant / Colorful Mode (لمحبي الألوان الكثيرة)
  vibrant: {
    id: 'vibrant',
    name: 'الوضع الحيوي الملون',
    nameEn: 'Vibrant Colors',
    badge: '🎨 حيوي',
    description: 'ألوان متفجرة ومبهجة تفتح النفس للمذاكرة وتمنح الغرفة طاقة ونشاط',
    
    // Backgrounds
    background: '#0F0C24',
    surface: '#1A1442',
    card: '#241A5C',
    cardSecondary: '#2E2272',
    gradient: ['#3B0764', '#0F0C24'],
    
    // Borders & Dividers
    border: '#8B5CF6',
    borderStrong: '#EC4899',
    divider: 'rgba(139, 92, 246, 0.25)',
    
    // Typography
    textPrimary: '#FFFFFF',
    textSecondary: '#E2E8F0',
    textMuted: '#C4B5FD',
    
    // Accents & Actions
    accent: '#F43F5E',
    accentSecondary: '#FB7185',
    accentGlow: 'rgba(244, 63, 94, 0.45)',
    
    // Section Highlights (Vivid multi-color gradients per section)
    aiSection: '#EC4899',
    aiSectionBg: 'rgba(236, 72, 153, 0.25)',
    studySection: '#10B981',
    studySectionBg: 'rgba(16, 185, 129, 0.25)',
    tasksSection: '#F59E0B',
    tasksSectionBg: 'rgba(245, 158, 11, 0.25)',
    subjectsSection: '#8B5CF6',
    subjectsSectionBg: 'rgba(139, 92, 246, 0.25)',
    appsSection: '#06B6D4',
    appsSectionBg: 'rgba(6, 182, 212, 0.25)',
    
    // Status & Switcher
    statusBarStyle: 'light',
    switcherBg: '#18123C',
    switcherActive: '#7C3AED',
    switcherTextActive: '#FFFFFF',
    switcherTextInactive: '#A78BFA',
  },

  // 3. الوضع الثالث: Simple / Minimalist Mode (لمحبي البساطة)
  simple: {
    id: 'simple',
    name: 'الوضع البسيط الهادئ',
    nameEn: 'Simple Minimal',
    badge: '⚪ بسيط',
    description: 'تصميم هادئ ونظيف بدون أي تشتيت، يعتمد على الأبيض والرمادي الصافي',
    
    // Backgrounds
    background: '#FFFFFF',
    surface: '#FAFAFA',
    card: '#F3F4F6',
    cardSecondary: '#E5E7EB',
    gradient: ['#EEF2FF', '#FFFFFF'],
    
    // Borders & Dividers
    border: '#E5E7EB',
    borderStrong: '#D1D5DB',
    divider: '#E5E7EB',
    
    // Typography
    textPrimary: '#111827',
    textSecondary: '#4B5563',
    textMuted: '#9CA3AF',
    
    // Accents & Actions
    accent: '#1F2937',
    accentSecondary: '#4B5563',
    accentGlow: 'rgba(31, 41, 55, 0.1)',
    
    // Section Highlights
    aiSection: '#1F2937',
    aiSectionBg: '#E5E7EB',
    studySection: '#059669',
    studySectionBg: '#ECFDF5',
    tasksSection: '#D97706',
    tasksSectionBg: '#FFFBEB',
    subjectsSection: '#4F46E5',
    subjectsSectionBg: '#EEF2FF',
    appsSection: '#0284C7',
    appsSectionBg: '#F0F9FF',
    
    // Status & Switcher
    statusBarStyle: 'dark',
    switcherBg: '#E5E7EB',
    switcherActive: '#FFFFFF',
    switcherTextActive: '#111827',
    switcherTextInactive: '#6B7280',
  },
};

export const defaultTheme: ThemeConfig = {
  style: 'glass',
  blur: 40,
  transparency: 70,
  accentColor: '#6366F1',
  cornerRadius: 20,
  animationLevel: 'full',
  fontSize: 'medium',
  colorMode: 'dark',
  wallpaperUri: null,
};
