import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (isDark: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      isDarkMode: false,
      toggleDarkMode: () => {
        const newDarkMode = !get().isDarkMode;
        set({ isDarkMode: newDarkMode });
        
        // Apply dark mode class to document
        if (newDarkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },
      setDarkMode: (isDark: boolean) => {
        set({ isDarkMode: isDark });
        
        // Apply dark mode class to document
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },
    }),
    {
      name: 'theme-storage', // unique name for localStorage key
      partialize: (state) => ({ isDarkMode: state.isDarkMode }), // only persist isDarkMode
    }
  )
); 