import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, MapPin, AlertCircle, ChevronRight } from 'lucide-react';
import type { Space } from '../services/mockData';

interface SpaceSelectorScreenProps {
  spaces: Space[];
  onSelectSpace: (space: Space) => void;
}

const SpaceSelectorScreen: React.FC<SpaceSelectorScreenProps> = ({ spaces, onSelectSpace }) => {
  const navigate = useNavigate();

  const handleSelectSpace = (space: Space) => {
    onSelectSpace(space);
    navigate('/');
  };

  const getStatusInfo = (status: Space['status']) => {
    switch (status) {
      case 'activo':
        return { label: 'Activo', className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' };
      case 'suspendido':
        return { label: 'Suspendido', className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' };
      case 'sin_datos':
        return { label: 'Sin datos', className: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400' };
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold text-foreground">Seleccionar Espacio Comunitario</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Seleccioná el espacio que querés gestionar
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Desktop: Grid / Mobile: Stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {spaces.map((space) => {
            const statusInfo = getStatusInfo(space.status);
            
            return (
              <button
                key={space.space_id}
                onClick={() => handleSelectSpace(space)}
                className="group relative bg-card border border-border rounded-lg p-6 text-left transition-all hover:border-primary hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
              >
                {/* Icon & Status Badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.className}`}>
                    {statusInfo.label}
                  </span>
                </div>

                {/* Space Name */}
                <h2 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {space.space_name}
                </h2>

                {/* Location */}
                {(space.address || space.locality) && (
                  <div className="flex items-start gap-2 text-sm text-muted-foreground mb-3">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <div>
                      {space.address && <p>{space.address}</p>}
                      {space.locality && space.province && (
                        <p>{space.locality}, {space.province}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Suspended Warning */}
                {space.status === 'suspendido' && (
                  <div className="flex items-center gap-2 text-xs text-yellow-600 dark:text-yellow-500 mb-3 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-2 rounded">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Este espacio está temporalmente suspendido</span>
                  </div>
                )}

                {/* Arrow Indicator */}
                <div className="flex justify-end mt-4 pt-4 border-t border-border">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Empty State */}
        {spaces.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No hay espacios disponibles
            </h3>
            <p className="text-sm text-muted-foreground">
              Contactá al soporte para obtener acceso a espacios comunitarios
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default SpaceSelectorScreen;
