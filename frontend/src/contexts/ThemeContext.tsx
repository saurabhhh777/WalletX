import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage for saved preference
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      console.log('ThemeContext: Initial state from localStorage:', parsed);
      return parsed;
    }
    // Check system preference
    const systemPref = window.matchMedia('(prefers-color-scheme: dark)').matches;
    console.log('ThemeContext: Initial state from system preference:', systemPref);
    return systemPref;
  });

  useEffect(() => {
    console.log('ThemeContext: useEffect triggered, isDarkMode:', isDarkMode);
    // Save preference to localStorage
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    
    // Apply dark mode class to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      // Also set CSS custom properties for immediate effect
      document.documentElement.style.setProperty('--bg-primary', '#111827');
      document.documentElement.style.setProperty('--bg-secondary', '#1f2937');
      document.documentElement.style.setProperty('--text-primary', '#ffffff');
      document.documentElement.style.setProperty('--text-secondary', '#d1d5db');
      console.log('ThemeContext: Added dark class to document and body');
      console.log('ThemeContext: Current classes on html:', document.documentElement.className);
      console.log('ThemeContext: Current classes on body:', document.body.className);
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      // Reset CSS custom properties
      document.documentElement.style.setProperty('--bg-primary', '#ffffff');
      document.documentElement.style.setProperty('--bg-secondary', '#f9fafb');
      document.documentElement.style.setProperty('--text-primary', '#111827');
      document.documentElement.style.setProperty('--text-secondary', '#6b7280');
      console.log('ThemeContext: Removed dark class from document and body');
      console.log('ThemeContext: Current classes on html:', document.documentElement.className);
      console.log('ThemeContext: Current classes on body:', document.body.className);
    }
    
    // Force a re-render by dispatching a custom event
    window.dispatchEvent(new Event('darkModeChange'));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    console.log('ThemeContext: Toggling dark mode from', isDarkMode, 'to', !isDarkMode);
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}; 