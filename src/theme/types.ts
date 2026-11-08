export type ThemeStyle = 'glass' | 'matte' | 'solid';
export type AnimationLevel = 'none' | 'reduced' | 'full';
export type FontSize = 'small' | 'medium' | 'large';

/** The three color systems the outer room can switch between. */
export type ThemeMode = 'dark' | 'vibrant' | 'simple';

export interface ThemePalette {
  id: ThemeMode;
  name: string;
  nameEn: string;
  badge: string;
  description: string;
  
  // Backgrounds
  background: string;
  surface: string;
  card: string;
  cardSecondary: string;
  /** Subtle top-to-bottom wallpaper gradient behind every screen. */
  gradient: [string, string];
  
  // Borders & Dividers
  border: string;
  borderStrong: string;
  divider: string;
  
  // Typography
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  
  // Accents & Actions
  accent: string;
  accentSecondary: string;
  accentGlow: string;
  
  // Section Highlights
  aiSection: string;
  aiSectionBg: string;
  studySection: string;
  studySectionBg: string;
  tasksSection: string;
  tasksSectionBg: string;
  subjectsSection: string;
  subjectsSectionBg: string;
  appsSection: string;
  appsSectionBg: string;
  
  // Status & Switcher
  statusBarStyle: 'light' | 'dark';
  switcherBg: string;
  switcherActive: string;
  switcherTextActive: string;
  switcherTextInactive: string;
}

export interface ThemeConfig {
  style: ThemeStyle;
  /** 0-100, only meaningful when style === 'glass' */
  blur: number;
  /** 0-100, panel opacity */
  transparency: number;
  accentColor: string;
  cornerRadius: number;
  animationLevel: AnimationLevel;
  fontSize: FontSize;
  /** Which of the three room color systems is active. */
  colorMode: ThemeMode;
  wallpaperUri: string | null;
}
