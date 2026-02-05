import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Utensils, Calendar, AlertCircle, History, Loader } from 'lucide-react';
import { mockPeriodos } from '@/services/mockData';
import type { Periodo } from '@/services/mockData';

const PrestacionScreen = () => {
  const navigate = useNavigate();
  const [currentPeriod, setCurrentPeriod] = useState<Periodo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      const current = mockPeriodos.find(p => p.estado === 'vigente');
      setCurrentPeriod(current || null);
      setLoading(false);
    }, 500);
  }, []);

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'vigente':
        return 'bg-green-500/10 border-green-500 text-green-600';
      case 'observado':
        return 'bg-yellow-500/10 border-yellow-500 text-yellow-600';
      case 'aprobado':
        return 'bg-blue-500/10 border-blue-500 text-blue-600';
      default:
        return 'bg-gray-500/10 border-gray-500 text-gray-600';
    }
  };

  const getStatusIcon = (estado: string) => {
    switch (estado) {
      case 'vigente':
        return '✓';
      case 'observado':
        return '⚠';
      case 'aprobado':
        return '✓';
      default:
        return '•';
    }
  };

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
            <h1 className="text-xl font-semibold text-text">Prestación Alimentaria</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader className="w-8 h-8 text-orange-600 animate-spin" strokeWidth={1.5} />
          </div>
        ) : !currentPeriod ? (
          <div className="text-center py-12">
            <Utensils className="w-16 h-16 text-text-muted mx-auto mb-4" strokeWidth={1.5} />
            <p className="text-text-muted">No hay información disponible para este período</p>
          </div>
        ) : (
          <>
            {/* Período actual */}
            <div className="bg-surface border border-border rounded-2xl p-6">
              <div className="flex items-start space-x-4 mb-6">
                <div className="bg-orange-500/10 border-2 border-orange-500 w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0">
                  <Utensils className="w-7 h-7 text-orange-600" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-text mb-2">
                    Período Actual
                  </h2>
                  <p className="text-text-muted">
                    {currentPeriod.mes} {currentPeriod.anio}
                  </p>
                </div>
              </div>

              {/* Estado */}
              <div className="mb-6">
                <p className="text-sm text-text-muted mb-2">Estado</p>
                <span className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium border-2 ${getStatusColor(currentPeriod.estado)}`}>
                  {getStatusIcon(currentPeriod.estado)} {currentPeriod.estado.charAt(0).toUpperCase() + currentPeriod.estado.slice(1)}
                </span>
              </div>

              {/* Fechas */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-text-muted mb-1">Fecha inicio</p>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-text-muted" strokeWidth={1.5} />
                    <p className="text-text font-medium">
                      {new Date(currentPeriod.fecha_inicio).toLocaleDateString('es-AR')}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-text-muted mb-1">Fecha fin</p>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-text-muted" strokeWidth={1.5} />
                    <p className="text-text font-medium">
                      {new Date(currentPeriod.fecha_fin).toLocaleDateString('es-AR')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Observaciones */}
              {currentPeriod.observaciones && (
                <div className="p-4 bg-yellow-500/10 border border-yellow-500 rounded-xl">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <p className="text-sm font-semibold text-yellow-600 mb-1">Observaciones</p>
                      <p className="text-sm text-text">{currentPeriod.observaciones}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Acción: Ver historial */}
            <button
              onClick={() => navigate('/prestacion/historial')}
              className="w-full bg-surface hover:bg-border/50 border border-border rounded-xl p-4 text-left transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <History className="w-6 h-6 text-orange-600" strokeWidth={1.5} />
                  <div>
                    <p className="font-semibold text-text">Ver Historial</p>
                    <p className="text-sm text-text-muted">Períodos anteriores</p>
                  </div>
                </div>
                <span className="text-text-muted">→</span>
              </div>
            </button>

            {/* Información adicional */}
            <div className="p-4 bg-orange-500/10 border border-orange-500 rounded-xl">
              <p className="text-sm text-orange-600">
                <strong>ℹ️ Información:</strong> El estado de la prestación alimentaria es gestionado por el programa SISOC. 
                Para consultas sobre el estado, contactá a tu referente.
              </p>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default PrestacionScreen;
