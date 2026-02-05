import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { api } from '@/services/api';
import type { User, Space } from '@/services/mockData';

interface AuthContextType {
  user: User | null;
  spaces: Space[];
  currentSpace: Space | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setCurrentSpace: (space: Space) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [currentSpace, setCurrentSpaceState] = useState<Space | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay sesión activa
    const checkAuth = async () => {
      const token = localStorage.getItem('sisoc-token');
      if (token) {
        try {
          const context = await api.getContext();
          setUser(context.user);
          setSpaces(context.scope.spaces);
          
          // Si hay un solo espacio, seleccionarlo automáticamente
          if (context.scope.spaces.length === 1) {
            setCurrentSpaceState(context.scope.spaces[0]);
            localStorage.setItem('sisoc-current-space', context.scope.spaces[0].space_id);
          } else {
            // Si hay múltiples espacios, verificar si ya hay uno seleccionado
            const savedSpaceId = localStorage.getItem('sisoc-current-space');
            if (savedSpaceId) {
              const savedSpace = context.scope.spaces.find((s: Space) => s.space_id === savedSpaceId);
              if (savedSpace) {
                setCurrentSpaceState(savedSpace);
              }
            }
          }
        } catch (error) {
          console.error('Error al verificar autenticación:', error);
          localStorage.removeItem('sisoc-token');
          localStorage.removeItem('sisoc-current-space');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await api.login(username, password);
      localStorage.setItem('sisoc-token', response.token);
      
      const context = await api.getContext();
      setUser(context.user);
      setSpaces(context.scope.spaces);
      
      // Si hay un solo espacio, seleccionarlo automáticamente
      if (context.scope.spaces.length === 1) {
        setCurrentSpaceState(context.scope.spaces[0]);
        localStorage.setItem('sisoc-current-space', context.scope.spaces[0].space_id);
      }
      // Si hay múltiples espacios, NO seleccionar ninguno (mostrar selector)
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      localStorage.removeItem('sisoc-token');
      localStorage.removeItem('sisoc-current-space');
      setUser(null);
      setSpaces([]);
      setCurrentSpaceState(null);
    }
  };

  const setCurrentSpace = (space: Space) => {
    setCurrentSpaceState(space);
    localStorage.setItem('sisoc-current-space', space.space_id);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        spaces,
        currentSpace,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        setCurrentSpace,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
