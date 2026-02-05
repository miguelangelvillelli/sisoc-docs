import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import LoginScreen from '@/screens/LoginScreen';
import HomeScreen from '@/screens/HomeScreen';
import SpaceSelectorScreen from '@/screens/SpaceSelectorScreen';

// Información Institucional
import SpaceProfileScreen from '@/screens/info/SpaceProfileScreen';
import DocumentListScreen from '@/screens/info/DocumentListScreen';
import DocumentDetailScreen from '@/screens/info/DocumentDetailScreen';

// Mensajes
import MessageListScreen from '@/screens/messages/MessageListScreen';
import MessageDetailScreen from '@/screens/messages/MessageDetailScreen';

// Nómina
import NominaListScreen from '@/screens/nomina/NominaListScreen';
import PersonDetailScreen from '@/screens/nomina/PersonDetailScreen';
import PersonCreateScreen from '@/screens/nomina/PersonCreateScreen';
import PersonEditScreen from '@/screens/nomina/PersonEditScreen';

// Prestación Alimentaria
import PrestacionScreen from '@/screens/prestacion/PrestacionScreen';
import PeriodoHistorialScreen from '@/screens/prestacion/PeriodoHistorialScreen';
import PeriodoDetailScreen from '@/screens/prestacion/PeriodoDetailScreen';

// Formación
import FormacionListScreen from '@/screens/formacion/FormacionListScreen';

// Rendiciones
import RendicionListScreen from '@/screens/rendiciones/RendicionListScreen';
import RendicionDetailScreen from '@/screens/rendiciones/RendicionDetailScreen';

import './index.css';

// Componente de ruta protegida
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-text">Cargando...</div>
      </div>
    );
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// Componente de ruta que requiere espacio seleccionado
const SpaceRequiredRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentSpace, spaces } = useAuth();
  
  // Si no hay espacio seleccionado y hay múltiples espacios, redirigir al selector
  if (!currentSpace && spaces.length > 1) {
    return <Navigate to="/select-space" replace />;
  }
  
  // Si hay un solo espacio y no está seleccionado, seleccionarlo automáticamente
  // (esto no debería ocurrir, pero por precaución)
  if (!currentSpace && spaces.length === 1) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

function AppRoutes() {
  const { isAuthenticated, spaces, currentSpace, setCurrentSpace } = useAuth();
  
  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <LoginScreen />}
      />
      
      {/* Selector de espacios (solo si hay múltiples) */}
      <Route
        path="/select-space"
        element={
          <ProtectedRoute>
            {spaces.length > 1 ? (
              <SpaceSelectorScreen 
                spaces={spaces} 
                onSelectSpace={setCurrentSpace} 
              />
            ) : (
              <Navigate to="/" replace />
            )}
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <SpaceRequiredRoute>
              <HomeScreen />
            </SpaceRequiredRoute>
          </ProtectedRoute>
        }
      />
      
      {/* Información Institucional */}
      <Route
        path="/perfil"
        element={
          <ProtectedRoute>
            <SpaceRequiredRoute>
              <SpaceProfileScreen />
            </SpaceRequiredRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/documentos"
        element={
          <ProtectedRoute>
            <SpaceRequiredRoute>
              <DocumentListScreen />
            </SpaceRequiredRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/documentos/:id"
        element={
          <ProtectedRoute>
            <SpaceRequiredRoute>
              <DocumentDetailScreen />
            </SpaceRequiredRoute>
          </ProtectedRoute>
        }
      />
      
      {/* Mensajes */}
      <Route
        path="/mensajes"
        element={
          <ProtectedRoute>
            <SpaceRequiredRoute>
              <MessageListScreen />
            </SpaceRequiredRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/mensajes/:id"
        element={
          <ProtectedRoute>
            <SpaceRequiredRoute>
              <MessageDetailScreen />
            </SpaceRequiredRoute>
          </ProtectedRoute>
        }
      />
      
      {/* Nómina */}
      <Route
        path="/nomina"
        element={
          <ProtectedRoute>
            <SpaceRequiredRoute>
              <NominaListScreen />
            </SpaceRequiredRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/nomina/nueva"
        element={
          <ProtectedRoute>
            <SpaceRequiredRoute>
              <PersonCreateScreen />
            </SpaceRequiredRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/nomina/:id"
        element={
          <ProtectedRoute>
            <SpaceRequiredRoute>
              <PersonDetailScreen />
            </SpaceRequiredRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/nomina/:id/editar"
        element={
          <ProtectedRoute>
            <SpaceRequiredRoute>
              <PersonEditScreen />
            </SpaceRequiredRoute>
          </ProtectedRoute>
        }
      />
      
      {/* Prestación Alimentaria */}
      <Route
        path="/prestacion"
        element={
          <ProtectedRoute>
            <SpaceRequiredRoute>
              <PrestacionScreen />
            </SpaceRequiredRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/prestacion/historial"
        element={
          <ProtectedRoute>
            <SpaceRequiredRoute>
              <PeriodoHistorialScreen />
            </SpaceRequiredRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/prestacion/periodo/:id"
        element={
          <ProtectedRoute>
            <SpaceRequiredRoute>
              <PeriodoDetailScreen />
            </SpaceRequiredRoute>
          </ProtectedRoute>
        }
      />
      
      {/* Formación */}
      <Route
        path="/formacion"
        element={
          <ProtectedRoute>
            <SpaceRequiredRoute>
              <FormacionListScreen />
            </SpaceRequiredRoute>
          </ProtectedRoute>
        }
      />
      
      {/* Rendiciones */}
      <Route
        path="/rendiciones"
        element={
          <ProtectedRoute>
            <SpaceRequiredRoute>
              <RendicionListScreen />
            </SpaceRequiredRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/rendiciones/:id"
        element={
          <ProtectedRoute>
            <SpaceRequiredRoute>
              <RendicionDetailScreen />
            </SpaceRequiredRoute>
          </ProtectedRoute>
        }
      />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
