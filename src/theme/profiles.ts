import { ThemeConfig } from './types';

/**
 * Named presets the AI agent can apply with the `apply_profile` tool.
 * Each profile is a partial override on top of the student's current theme.
 */
export type ProfileId = 'battery' | 'speed' | 'focus';

export const profiles: Record<ProfileId, Partial<ThemeConfig>> = {
  battery: {
    style: 'solid',
    blur: 0,
    transparency: 100,
    animationLevel: 'none',
    colorMode: 'dark', // 100% black saves OLED power
  },
  speed: {
    style: 'solid',
    blur: 0,
    transparency: 100,
    animationLevel: 'reduced',
  },
  focus: {
    style: 'matte',
    blur: 0,
    transparency: 100,
    animationLevel: 'reduced',
    colorMode: 'simple', // pure distraction-free white/gray
  },
};
