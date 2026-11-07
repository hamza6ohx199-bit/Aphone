import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { defaultTheme } from './defaultTheme';
import { ThemeConfig } from './types';

const STORAGE_KEY = 'theme-config';

interface ThemeContextValue {
  theme: ThemeConfig;
  /** Loaded from storage at least once; false while reading on first mount. */
  isReady: boolean;
  updateTheme: (patch: Partial<ThemeConfig>) => void;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeConfig>(defaultTheme);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) setTheme({ ...defaultTheme, ...JSON.parse(raw) });
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

  const value = useMemo(
    () => ({ theme, isReady, updateTheme, resetTheme }),
    [theme, isReady, updateTheme, resetTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}
