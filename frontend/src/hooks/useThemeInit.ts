import { useEffect } from 'react';
import { useThemeStore } from '../stores/themeStore';

export const useThemeInit = () => {
  const { isDarkMode, setDarkMode } = useThemeStore();

  useEffect(() => {
    // Check if theme is already set in localStorage
    const savedTheme = localStorage.getItem('theme-storage');
    
    if (savedTheme) {
      try {
        const parsed = JSON.parse(savedTheme);
        if (parsed.state?.isDarkMode !== undefined) {
          setDarkMode(parsed.state.isDarkMode);
          return;
        }
      } catch (error) {
        console.warn('Failed to parse saved theme:', error);
      }
    }

    // If no saved theme, check system preference
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(systemPrefersDark);
  }, [setDarkMode]);

  return { isDarkMode };
}; 