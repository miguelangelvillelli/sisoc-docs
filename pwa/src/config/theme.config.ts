/**
 * Configuración de colores del sistema
 * Este módulo centraliza todos los colores y puede ser modificado
 * para adaptar la identidad visual sin tocar los componentes
 */

export interface ThemeColors {
  // Colores primarios
  primary: string;
  primaryDark: string;
  primaryLight: string;
  
  // Colores de fondo
  background: string;
  surface: string;
  
  // Colores de texto
  text: string;
  textSecondary: string;
  textMuted: string;
  
  // Colores de borde
  border: string;
  
  // Colores de estado
  success: string;
  error: string;
  warning: string;
  info: string;
  
  // Colores de acento
  accent: string;
}

export interface ThemeConfig {
  light: ThemeColors;
  dark: ThemeColors;
}

/**
 * Configuración de colores institucionales SISOC
 * Modificar estos valores para cambiar la paleta de colores
 */
export const themeConfig: ThemeConfig = {
  light: {
    // Colores primarios (azul institucional)
    primary: '#0066CC',
    primaryDark: '#004C99',
    primaryLight: '#3385D6',
    
    // Fondos
    background: '#FFFFFF',
    surface: '#F8F9FA',
    
    // Textos
    text: '#212529',
    textSecondary: '#6C757D',
    textMuted: '#ADB5BD',
    
    // Bordes
    border: '#DEE2E6',
    
    // Estados
    success: '#28A745',
    error: '#DC3545',
    warning: '#FFC107',
    info: '#17A2B8',
    
    // Acento
    accent: '#00A86B',
  },
  dark: {
    // Colores primarios (más claros para dark mode)
    primary: '#4A9EFF',
    primaryDark: '#2E7FD9',
    primaryLight: '#6BB3FF',
    
    // Fondos
    background: '#1A1A1A',
    surface: '#2D2D2D',
    
    // Textos
    text: '#FFFFFF',
    textSecondary: '#B0B0B0',
    textMuted: '#808080',
    
    // Bordes
    border: '#404040',
    
    // Estados (ajustados para dark mode)
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FFB300',
    info: '#29B6F6',
    
    // Acento
    accent: '#00D084',
  },
};

/**
 * Función helper para obtener colores según el tema actual
 */
export const getThemeColors = (theme: 'light' | 'dark'): ThemeColors => {
  return themeConfig[theme];
};

/**
 * Convertir colores a variables CSS para uso en Tailwind
 */
export const generateCSSVariables = (colors: ThemeColors): Record<string, string> => {
  return {
    '--color-primary': colors.primary,
    '--color-primary-dark': colors.primaryDark,
    '--color-primary-light': colors.primaryLight,
    '--color-background': colors.background,
    '--color-surface': colors.surface,
    '--color-text': colors.text,
    '--color-text-secondary': colors.textSecondary,
    '--color-text-muted': colors.textMuted,
    '--color-border': colors.border,
    '--color-success': colors.success,
    '--color-error': colors.error,
    '--color-warning': colors.warning,
    '--color-info': colors.info,
    '--color-accent': colors.accent,
  };
};
