import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, AlertCircle, Loader } from 'lucide-react';
import { mockPeriodos } from '@/services/mockData';
import type { Periodo } from '@/services/mockData';

const PeriodoDetailScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [periodo, setPeriodo] = useState<Periodo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      const p = mockPeriodos.find(per => per.id === id);
      setPeriodo(p || null);
      setLoading(false);
    }, 500);
  }, [id]);

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'vigente':
        return 'bg-green-500/10 border-green-500 text-green-600';
      case 'observado':
        return 'bg-yellow-500/10 border-yellow-500 text-yellow-600';
      case 'aprobado':
        return 'bg-blue-500/10 border-blue-500 text-blue-600';
      case 'cerrado':
        return 'bg-gray-500/10 border-gray-500 text-gray-600';
      default:
        return 'bg-gray-500/10 border-gray-500 text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader className="w-8 h-8 text-orange-600 animate-spin" strokeWidth={1.5} />
      </div>
    );
  }

  if (!periodo) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Calendar className="w-16 h-16 text-text-muted mx-auto mb-4" strokeWidth={1.5} />
          <p className="text-text-muted">Período no encontrado</p>
          <button
            onClick={() => navigate('/prestacion/historial')}
            className="mt-4 text-orange-600 hover:underline"
          >
            Volver al historial
          </button>
        </div>
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
              onClick={() => navigate('/prestacion/historial')}
              className="p-2 hover:bg-border rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-text" strokeWidth={1.5} />
            </button>
            <h1 className="text-xl font-semibold text-text">Detalle del Período</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Información del período */}
        <div className="bg-surface border border-border rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-text mb-4">
            {periodo.mes} {periodo.anio}
          </h2>

          {/* Estado */}
          <div className="mb-6">
            <p className="text-sm text-text-muted mb-2">Estado</p>
            <span className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium border-2 ${getStatusColor(periodo.estado)}`}>
              {periodo.estado.charAt(0).toUpperCase() + periodo.estado.slice(1)}
            </span>
          </div>

          {/* Fechas */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-text-muted mb-1">Fecha inicio</p>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-text-muted" strokeWidth={1.5} />
                <p className="text-text font-medium">
                  {new Date(periodo.fecha_inicio).toLocaleDateString('es-AR')}
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm text-text-muted mb-1">Fecha fin</p>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-text-muted" strokeWidth={1.5} />
                <p className="text-text font-medium">
                  {new Date(periodo.fecha_fin).toLocaleDateString('es-AR')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Observaciones */}
        {periodo.observaciones && (
          <div className="p-4 bg-yellow-500/10 border border-yellow-500 rounded-xl">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-semibold text-yellow-600 mb-1">Observaciones</p>
                <p className="text-sm text-text">{periodo.observaciones}</p>
              </div>
            </div>
          </div>
        )}

        {/* Información adicional */}
        <div className="p-4 bg-orange-500/10 border border-orange-500 rounded-xl">
          <p className="text-sm text-orange-600">
            <strong>ℹ️ Información:</strong> Para más detalles sobre este período, 
            contactá a tu referente del programa SISOC.
          </p>
        </div>
      </main>
    </div>
  );
};

export default PeriodoDetailScreen;
