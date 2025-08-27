import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

export const DarkModeTest: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div className="fixed top-20 left-4 z-50 p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Dark Mode Test</h3>
      <p className="text-xs mb-2" style={{ color: 'var(--text-secondary)' }}>
        Current state: {isDarkMode ? 'Dark' : 'Light'}
      </p>
      <button
        onClick={toggleDarkMode}
        className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
      >
        Toggle ({isDarkMode ? 'Light' : 'Dark'})
      </button>
      <div className="mt-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
        HTML classes: {document.documentElement.className}
      </div>
      <div className="mt-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
        Body classes: {document.body.className}
      </div>
    </div>
  );
}; 