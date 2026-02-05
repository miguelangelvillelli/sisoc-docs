import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Loader } from 'lucide-react';
import { mockPeriodos } from '@/services/mockData';
import type { Periodo } from '@/services/mockData';

const PeriodoHistorialScreen = () => {
  const navigate = useNavigate();
  const [periodos, setPeriodos] = useState<Periodo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      // Ordenar por fecha más reciente
      const sorted = [...mockPeriodos].sort((a, b) => b.anio - a.anio);
      setPeriodos(sorted);
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
      case 'cerrado':
        return 'bg-gray-500/10 border-gray-500 text-gray-600';
      default:
        return 'bg-gray-500/10 border-gray-500 text-gray-600';
    }
  };

  const handlePeriodoClick = (periodoId: string) => {
    navigate(`/prestacion/periodo/${periodoId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/prestacion')}
              className="p-2 hover:bg-border rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-text" strokeWidth={1.5} />
            </button>
            <h1 className="text-xl font-semibold text-text">Historial de Períodos</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-6">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader className="w-8 h-8 text-orange-600 animate-spin" strokeWidth={1.5} />
          </div>
        ) : periodos.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-text-muted mx-auto mb-4" strokeWidth={1.5} />
            <p className="text-text-muted">No hay períodos registrados</p>
          </div>
        ) : (
          <div className="space-y-3">
            {periodos.map((periodo) => (
              <button
                key={periodo.id}
                onClick={() => handlePeriodoClick(periodo.id)}
                className="w-full bg-surface hover:bg-border/50 border border-border rounded-xl p-4 text-left transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-text">
                    {periodo.mes} {periodo.anio}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(periodo.estado)}`}>
                    {periodo.estado.charAt(0).toUpperCase() + periodo.estado.slice(1)}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-text-muted">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" strokeWidth={1.5} />
                    <span>{new Date(periodo.fecha_inicio).toLocaleDateString('es-AR')}</span>
                  </span>
                  <span>→</span>
                  <span>{new Date(periodo.fecha_fin).toLocaleDateString('es-AR')}</span>
                </div>
                {periodo.observaciones && (
                  <p className="mt-2 text-sm text-yellow-600 line-clamp-1">
                    ⚠ {periodo.observaciones}
                  </p>
                )}
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default PeriodoHistorialScreen;
