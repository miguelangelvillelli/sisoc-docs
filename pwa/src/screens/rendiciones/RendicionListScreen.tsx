import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileSpreadsheet, Calendar, AlertCircle, Loader } from 'lucide-react';
import { mockRendiciones, mockPeriodos } from '@/services/mockData';
import type { Rendicion } from '@/services/mockData';

const RendicionListScreen = () => {
  const navigate = useNavigate();
  const [rendiciones, setRendiciones] = useState<Rendicion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setRendiciones(mockRendiciones);
      setLoading(false);
    }, 500);
  }, []);

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'borrador':
        return 'bg-gray-500/10 border-gray-500 text-gray-600';
      case 'presentada':
        return 'bg-blue-500/10 border-blue-500 text-blue-600';
      case 'observada':
        return 'bg-yellow-500/10 border-yellow-500 text-yellow-600';
      case 'aprobada':
        return 'bg-green-500/10 border-green-500 text-green-600';
      case 'rechazada':
        return 'bg-red-500/10 border-red-500 text-red-600';
      default:
        return 'bg-gray-500/10 border-gray-500 text-gray-600';
    }
  };

  const getPeriodoNombre = (periodoId: string) => {
    const periodo = mockPeriodos.find(p => p.id === periodoId);
    return periodo ? `${periodo.mes} ${periodo.anio}` : 'Período desconocido';
  };

  const handleRendicionClick = (rendicionId: string) => {
    navigate(`/rendiciones/${rendicionId}`);
  };

  const observadasCount = rendiciones.filter(r => r.estado === 'observada').length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate('/')}
                className="p-2 hover:bg-border rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-text" strokeWidth={1.5} />
              </button>
              <h1 className="text-xl font-semibold text-text">Rendiciones</h1>
            </div>
            {observadasCount > 0 && (
              <span className="flex items-center space-x-1 px-3 py-1 bg-yellow-500/10 text-yellow-600 border border-yellow-500 rounded-full text-sm font-medium">
                <AlertCircle className="w-4 h-4" strokeWidth={1.5} />
                <span>{observadasCount} observada{observadasCount !== 1 ? 's' : ''}</span>
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-6">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader className="w-8 h-8 text-red-600 animate-spin" strokeWidth={1.5} />
          </div>
        ) : rendiciones.length === 0 ? (
          <div className="text-center py-12">
            <FileSpreadsheet className="w-16 h-16 text-text-muted mx-auto mb-4" strokeWidth={1.5} />
            <p className="text-text-muted text-lg">No hay rendiciones cargadas</p>
          </div>
        ) : (
          <div className="space-y-3">
            {rendiciones.map((rendicion) => (
              <button
                key={rendicion.id}
                onClick={() => handleRendicionClick(rendicion.id)}
                className={`w-full bg-surface hover:bg-border/50 border rounded-xl p-4 text-left transition-all ${
                  rendicion.estado === 'observada' ? 'border-yellow-500' : 'border-border'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`${
                    rendicion.estado === 'observada'
                      ? 'bg-yellow-500/10 border-2 border-yellow-500'
                      : rendicion.estado === 'aprobada'
                      ? 'bg-green-500/10 border-2 border-green-500'
                      : 'bg-red-500/10 border-2 border-red-500'
                  } w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0`}>
                    <FileSpreadsheet className={`w-6 h-6 ${
                      rendicion.estado === 'observada'
                        ? 'text-yellow-600'
                        : rendicion.estado === 'aprobada'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-base font-semibold text-text">
                        {getPeriodoNombre(rendicion.periodo_id)}
                      </h3>
                      <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium border flex-shrink-0 ${getStatusColor(rendicion.estado)}`}>
                        {rendicion.estado.charAt(0).toUpperCase() + rendicion.estado.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center flex-wrap gap-3 text-xs text-text-muted mb-2">
                      <span>{rendicion.comprobantes} comprobante{rendicion.comprobantes !== 1 ? 's' : ''}</span>
                      {rendicion.fecha_presentacion && (
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" strokeWidth={1.5} />
                          <span>Presentada: {new Date(rendicion.fecha_presentacion).toLocaleDateString('es-AR')}</span>
                        </span>
                      )}
                    </div>
                    {rendicion.observaciones && (
                      <p className="text-sm text-yellow-600 line-clamp-1">
                        ⚠ {rendicion.observaciones}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default RendicionListScreen;
