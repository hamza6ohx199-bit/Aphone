import { ThemeConfig } from './types';

/**
 * Named presets the AI agent can apply with the `apply_profile` tool
 * (wired up in a later stage). Each profile is a partial override on
 * top of the student's current theme, not a full replacement.
 */
export type ProfileId = 'battery' | 'speed';

export const profiles: Record<ProfileId, Partial<ThemeConfig>> = {
  battery: {
    style: 'matte',
    blur: 0,
    transparency: 100,
    animationLevel: 'none',
    colorScheme: 'dark',
  },
  speed: {
    style: 'solid',
    blur: 0,
    transparency: 100,
    animationLevel: 'reduced',
  },
};
