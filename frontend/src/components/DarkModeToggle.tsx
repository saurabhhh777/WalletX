import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../stores/themeStore';

export const DarkModeToggle: React.FC = () => {
 const { theme, toggleTheme } = useThemeStore();

 const handleToggle = () => {
  toggleTheme();
 };

 const isDark = theme === 'dark';

 return (
  <button
   onClick={handleToggle}
   className="p-2 rounded-lg bg-gray-100 border border-gray-200 hover:bg-gray-200 transition-all duration-200 group"
   aria-label="Toggle dark mode"
   title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
  >
   {isDark ? (
    <Sun className="w-4 h-4 text-yellow-500 group-hover:rotate-90 transition-transform duration-200" />
   ) : (
    <Moon className="w-4 h-4 text-gray-600 group-hover:rotate-12 transition-transform duration-200" />
   )}
  </button>
 );
}; 