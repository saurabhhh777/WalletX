import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeMode = 'light' | 'dark';

interface ThemeState {
  theme: ThemeMode; // explicit theme
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  applyThemeClass: (mode?: ThemeMode) => void;
}

function applyClass(mode: ThemeMode) {
  if (mode === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      setTheme: (mode: ThemeMode) => {
        set({ theme: mode });
        applyClass(mode);
      },
      toggleTheme: () => {
        const next: ThemeMode = get().theme === 'dark' ? 'light' : 'dark';
        set({ theme: next });
        applyClass(next);
      },
      applyThemeClass: (mode?: ThemeMode) => {
        const current = mode ?? get().theme;
        applyClass(current);
      },
    }),
    {
      name: 'theme-storage-v2',
      partialize: (state) => ({ theme: state.theme }),
    }
  )
); 