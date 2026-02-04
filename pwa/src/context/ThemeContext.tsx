import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getThemeColors, generateCSSVariables } from '@/config/theme.config';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Intentar leer del localStorage
    const saved = localStorage.getItem('sisoc-theme') as Theme;
    if (saved) return saved;
    
    // Detectar preferencia del sistema
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  });

  useEffect(() => {
    // Aplicar clase 'dark' al documento
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    
    // Guardar preferencia
    localStorage.setItem('sisoc-theme', theme);
    
    // Aplicar variables CSS desde la configuración
    const colors = getThemeColors(theme);
    const cssVars = generateCSSVariables(colors);
    
    Object.entries(cssVars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [theme]);

  const toggleTheme = () => {
    setThemeState(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
