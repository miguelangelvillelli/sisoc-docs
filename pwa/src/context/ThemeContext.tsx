import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'poncho';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

// Función para aplicar tema al DOM
const applyTheme = (theme: Theme) => {
  const html = document.documentElement;
  
  // Limpiar clases previas
  html.classList.remove('dark', 'theme-poncho');
  
  // Aplicar clase según tema
  if (theme === 'dark') {
    html.classList.add('dark');
  } else if (theme === 'poncho') {
    html.classList.add('theme-poncho');
  }
  // 'light' no necesita clase (es el default en CSS)
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Intentar leer del localStorage
    const saved = localStorage.getItem('sisoc_theme') as Theme;
    if (saved && ['light', 'dark', 'poncho'].includes(saved)) {
      return saved;
    }
    
    // Detectar preferencia del sistema
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  });

  useEffect(() => {
    // Aplicar tema al documento
    applyTheme(theme);
    
    // Guardar preferencia
    localStorage.setItem('sisoc_theme', theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
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

// Aplicar tema inicial antes del render (evita flash)
export const initTheme = () => {
  const saved = localStorage.getItem('sisoc_theme') as Theme;
  if (saved && ['light', 'dark', 'poncho'].includes(saved)) {
    applyTheme(saved);
  }
};
