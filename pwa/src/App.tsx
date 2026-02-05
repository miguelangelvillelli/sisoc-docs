import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import LoginScreen from '@/screens/LoginScreen';
import HomeScreen from '@/screens/HomeScreen';

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

function AppRoutes() {
  const { isAuthenticated } = useAuth();
  
  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <LoginScreen />}
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomeScreen />
          </ProtectedRoute>
        }
      />
      
      {/* Información Institucional */}
      <Route
        path="/perfil"
        element={
          <ProtectedRoute>
            <SpaceProfileScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/documentos"
        element={
          <ProtectedRoute>
            <DocumentListScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/documentos/:id"
        element={
          <ProtectedRoute>
            <DocumentDetailScreen />
          </ProtectedRoute>
        }
      />
      
      {/* Mensajes */}
      <Route
        path="/mensajes"
        element={
          <ProtectedRoute>
            <MessageListScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mensajes/:id"
        element={
          <ProtectedRoute>
            <MessageDetailScreen />
          </ProtectedRoute>
        }
      />
      
      {/* Nómina */}
      <Route
        path="/nomina"
        element={
          <ProtectedRoute>
            <NominaListScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/nomina/nueva"
        element={
          <ProtectedRoute>
            <PersonCreateScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/nomina/:id"
        element={
          <ProtectedRoute>
            <PersonDetailScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/nomina/:id/editar"
        element={
          <ProtectedRoute>
            <PersonEditScreen />
          </ProtectedRoute>
        }
      />
      
      {/* Prestación Alimentaria */}
      <Route
        path="/prestacion"
        element={
          <ProtectedRoute>
            <PrestacionScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/prestacion/historial"
        element={
          <ProtectedRoute>
            <PeriodoHistorialScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/prestacion/periodo/:id"
        element={
          <ProtectedRoute>
            <PeriodoDetailScreen />
          </ProtectedRoute>
        }
      />
      
      {/* Formación */}
      <Route
        path="/formacion"
        element={
          <ProtectedRoute>
            <FormacionListScreen />
          </ProtectedRoute>
        }
      />
      
      {/* Rendiciones */}
      <Route
        path="/rendiciones"
        element={
          <ProtectedRoute>
            <RendicionListScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/rendiciones/:id"
        element={
          <ProtectedRoute>
            <RendicionDetailScreen />
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
