export type ThemeStyle = 'glass' | 'matte' | 'solid';
export type AnimationLevel = 'none' | 'reduced' | 'full';
export type FontSize = 'small' | 'medium' | 'large';
export type ColorScheme = 'dark' | 'light';

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
  colorScheme: ColorScheme;
  wallpaperUri: string | null;
}
