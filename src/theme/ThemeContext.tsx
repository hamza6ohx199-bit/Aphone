import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { defaultTheme, THEME_PROFILES } from './defaultThemes';
import { ThemeConfig, ThemeMode, ThemePalette } from './types';

const STORAGE_KEY = 'theme-config';

interface ThemeContextValue {
  theme: ThemeConfig;
  /** The resolved color palette for theme.colorMode — recompute-free lookup. */
  palette: ThemePalette;
  /** Loaded from storage at least once; false while reading on first mount. */
  isReady: boolean;
  updateTheme: (patch: Partial<ThemeConfig>) => void;
  resetTheme: () => void;
  /** Shorthand for updateTheme({ colorMode }) — switches the room's color system instantly. */
  setColorMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeConfig>(defaultTheme);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) {
          try {
            const parsed = JSON.parse(raw);
            // Ensure colorMode is valid if migrated from older versions
            const colorMode: ThemeMode =
              parsed.colorMode && THEME_PROFILES[parsed.colorMode as ThemeMode]
                ? (parsed.colorMode as ThemeMode)
                : 'dark';

            setTheme({
              ...defaultTheme,
              ...parsed,
              colorMode,
            });
          } catch {
            setTheme(defaultTheme);
          }
        }
      })
      .catch(() => {
        // no stored theme yet, or it was corrupted — keep the default
      })
      .finally(() => setIsReady(true));
  }, []);

  const persist = useCallback((next: ThemeConfig) => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => {
      // best-effort persistence; theme still applies for this session
    });
  }, []);

  const updateTheme = useCallback(
    (patch: Partial<ThemeConfig>) => {
      setTheme((current) => {
        const next = { ...current, ...patch };
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const resetTheme = useCallback(() => {
    setTheme(defaultTheme);
    persist(defaultTheme);
  }, [persist]);

  const setColorMode = useCallback(
    (mode: ThemeMode) => {
      updateTheme({ colorMode: mode });
    },
    [updateTheme]
  );

  const palette = useMemo(() => {
    return THEME_PROFILES[theme.colorMode] || THEME_PROFILES.dark;
  }, [theme.colorMode]);

  const value = useMemo(
    () => ({ theme, palette, isReady, updateTheme, resetTheme, setColorMode }),
    [theme, palette, isReady, updateTheme, resetTheme, setColorMode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}
