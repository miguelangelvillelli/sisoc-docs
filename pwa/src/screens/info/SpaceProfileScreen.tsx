import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Building2, FileText, Mail, Phone } from 'lucide-react';

const SpaceProfileScreen = () => {
  const { currentSpace } = useAuth();
  const navigate = useNavigate();

  if (!currentSpace) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-text-muted">No hay espacio seleccionado</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-border rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-text" strokeWidth={1.5} />
            </button>
            <h1 className="text-xl font-semibold text-text">Perfil del Espacio</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Información principal */}
        <div className="bg-surface border border-border rounded-2xl p-6">
          <div className="flex items-start space-x-4 mb-6">
            <div className="bg-blue-500/10 border-2 border-blue-500 w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
              <Building2 className="w-8 h-8 text-blue-600" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-text mb-2">
                {currentSpace.space_name}
              </h2>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                currentSpace.status === 'activo' 
                  ? 'bg-green-500/20 text-green-600 border border-green-500' 
                  : 'bg-yellow-500/20 text-yellow-600 border border-yellow-500'
              }`}>
                {currentSpace.status === 'activo' ? '✓ Activo' : '⚠ ' + currentSpace.status}
              </span>
            </div>
          </div>

          {/* Detalles */}
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-text-muted mt-0.5 flex-shrink-0" strokeWidth={1.5} />
              <div>
                <p className="text-sm text-text-muted mb-1">Dirección</p>
                <p className="text-text font-medium">{currentSpace.address || 'No especificada'}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Building2 className="w-5 h-5 text-text-muted mt-0.5 flex-shrink-0" strokeWidth={1.5} />
              <div>
                <p className="text-sm text-text-muted mb-1">Localidad</p>
                <p className="text-text font-medium">{currentSpace.locality || 'No especificada'}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-text-muted mt-0.5 flex-shrink-0" strokeWidth={1.5} />
              <div>
                <p className="text-sm text-text-muted mb-1">Provincia</p>
                <p className="text-text font-medium">{currentSpace.province || 'No especificada'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contacto */}
        <div className="bg-surface border border-border rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-text mb-4">Contacto</h3>
          <div className="space-y-3">
            <a 
              href="mailto:contacto@espacio.gob.ar"
              className="flex items-center space-x-3 p-3 bg-background hover:bg-border/50 rounded-lg transition-colors"
            >
              <Mail className="w-5 h-5 text-blue-600" strokeWidth={1.5} />
              <span className="text-text">contacto@espacio.gob.ar</span>
            </a>
            <a 
              href="tel:+541112345678"
              className="flex items-center space-x-3 p-3 bg-background hover:bg-border/50 rounded-lg transition-colors"
            >
              <Phone className="w-5 h-5 text-green-600" strokeWidth={1.5} />
              <span className="text-text">+54 11 1234-5678</span>
            </a>
          </div>
        </div>

        {/* Acciones rápidas */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/documentos')}
            className="bg-surface hover:bg-border/50 border border-border rounded-xl p-4 text-left transition-all"
          >
            <FileText className="w-6 h-6 text-blue-600 mb-2" strokeWidth={1.5} />
            <p className="text-sm font-semibold text-text">Documentos</p>
          </button>
          <button
            onClick={() => navigate('/mensajes')}
            className="bg-surface hover:bg-border/50 border border-border rounded-xl p-4 text-left transition-all"
          >
            <Mail className="w-6 h-6 text-cyan-600 mb-2" strokeWidth={1.5} />
            <p className="text-sm font-semibold text-text">Mensajes</p>
          </button>
        </div>
      </main>
    </div>
  );
};

export default SpaceProfileScreen;
