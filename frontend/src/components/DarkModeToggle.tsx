import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const DarkModeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  const handleToggle = () => {
    console.log('Dark mode toggle clicked, current state:', isDarkMode);
    toggleDarkMode();
    console.log('Dark mode toggled to:', !isDarkMode);
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 group"
      aria-label="Toggle dark mode"
      title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      {isDarkMode ? (
        <Sun className="w-4 h-4 text-yellow-500 group-hover:rotate-90 transition-transform duration-200" />
      ) : (
        <Moon className="w-4 h-4 text-gray-700 dark:text-gray-300 group-hover:rotate-12 transition-transform duration-200" />
      )}
    </button>
  );
}; 