import { useEffect } from 'react';
import { useThemeStore } from '../stores/themeStore';
import type { ThemeMode } from '../stores/themeStore';

export const useThemeInit = () => {
  const { theme, setTheme, applyThemeClass } = useThemeStore();

  useEffect(() => {
    // On mount: try load saved theme (v2), else fall back to system
    try {
      const saved = localStorage.getItem('theme-storage-v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        const savedTheme = parsed?.state?.theme as ThemeMode | undefined;
        if (savedTheme === 'light' || savedTheme === 'dark') {
          setTheme(savedTheme);
          applyThemeClass(savedTheme);
          return;
        }
      }
    } catch {}

    // No saved theme -> system preference
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    setTheme(systemPrefersDark.matches ? 'dark' : 'light');
    applyThemeClass(systemPrefersDark.matches ? 'dark' : 'light');

    // Listen for system changes and update if user hasn't changed explicitly
    const handler = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
      applyThemeClass(e.matches ? 'dark' : 'light');
    };
    systemPrefersDark.addEventListener('change', handler);
    return () => systemPrefersDark.removeEventListener('change', handler);
  }, [setTheme, applyThemeClass]);

  // Keep class in sync when theme changes elsewhere
  useEffect(() => {
    applyThemeClass(theme);
  }, [theme, applyThemeClass]);

  return { theme };
}; 