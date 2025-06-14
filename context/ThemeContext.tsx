import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

// Define theme colors
const lightTheme = {
  primary: '#2DD4BF',
  secondary: '#1E40AF',
  accent: '#FB7185',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  background: '#FFFFFF',
  card: '#F3F4F6',
  text: '#1F2937',
  subtext: '#6B7280',
  border: '#E5E7EB',
};

const darkTheme = {
  primary: '#14B8A6',
  secondary: '#3B82F6',
  accent: '#F43F5E',
  success: '#059669',
  warning: '#D97706',
  error: '#DC2626',
  background: '#1F2937',
  card: '#374151',
  text: '#F9FAFB',
  subtext: '#D1D5DB',
  border: '#4B5563',
};

// Create the theme context
type ThemeContextType = {
  theme: typeof lightTheme;
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  isDark: false,
  toggleTheme: () => {},
});

// Create the provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');
  
  // Update theme when system preference changes
  useEffect(() => {
    setIsDark(systemColorScheme === 'dark');
  }, [systemColorScheme]);

  const theme = isDark ? darkTheme : lightTheme;
  
  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Create a custom hook for using the theme
export const useTheme = () => useContext(ThemeContext);