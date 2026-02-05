import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, FileSpreadsheet, Upload, Send, Calendar, AlertCircle, Loader, CheckCircle, XCircle } from 'lucide-react';
import { mockRendiciones, mockPeriodos, mockComprobantes } from '@/services/mockData';
import type { Rendicion, Comprobante } from '@/services/mockData';

const RendicionDetailScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [rendicion, setRendicion] = useState<Rendicion | null>(null);
  const [comprobantes, setComprobantes] = useState<Comprobante[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      const r = mockRendiciones.find(ren => ren.id === id);
      if (r) {
        setRendicion(r);
        const comps = mockComprobantes.filter(c => c.rendicion_id === id);
        setComprobantes(comps);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  const getPeriodoNombre = (periodoId: string) => {
    const periodo = mockPeriodos.find(p => p.id === periodoId);
    return periodo ? `${periodo.mes} ${periodo.anio}` : 'Período desconocido';
  };

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

  const getComprobanteStatusColor = (estado: string) => {
    switch (estado) {
      case 'validado':
        return 'text-green-600';
      case 'invalidado':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const handleAdjuntarComprobante = () => {
    alert('Funcionalidad de adjuntar comprobante en desarrollo');
  };

  const handlePresentar = () => {
    if (confirm('¿Querés presentar esta rendición?')) {
      alert('Rendición presentada correctamente');
      navigate('/rendiciones');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader className="w-8 h-8 text-red-600 animate-spin" strokeWidth={1.5} />
      </div>
    );
  }

  if (!rendicion) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <FileSpreadsheet className="w-16 h-16 text-text-muted mx-auto mb-4" strokeWidth={1.5} />
          <p className="text-text-muted">Rendición no encontrada</p>
          <button
            onClick={() => navigate('/rendiciones')}
            className="mt-4 text-red-600 hover:underline"
          >
            Volver a rendiciones
          </button>
        </div>
      </div>
    );
  }

  const puedeAdjuntar = ['borrador', 'observada'].includes(rendicion.estado);
  const puedePresentar = rendicion.estado === 'borrador' && comprobantes.length > 0;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-surface border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/rendiciones')}
              className="p-2 hover:bg-border rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-text" strokeWidth={1.5} />
            </button>
            <h1 className="text-xl font-semibold text-text">Detalle de Rendición</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Información principal */}
        <div className="bg-surface border border-border rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-text mb-4">
            {getPeriodoNombre(rendicion.periodo_id)}
          </h2>

          {/* Estado */}
          <div className="mb-4">
            <p className="text-sm text-text-muted mb-2">Estado</p>
            <span className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium border-2 ${getStatusColor(rendicion.estado)}`}>
              {rendicion.estado.charAt(0).toUpperCase() + rendicion.estado.slice(1)}
            </span>
          </div>

          {/* Fecha de presentación */}
          {rendicion.fecha_presentacion && (
            <div className="flex items-center space-x-2 text-sm text-text-muted">
              <Calendar className="w-4 h-4" strokeWidth={1.5} />
              <span>Presentada el {new Date(rendicion.fecha_presentacion).toLocaleDateString('es-AR')}</span>
            </div>
          )}
        </div>

        {/* Observaciones */}
        {rendicion.observaciones && (
          <div className="p-4 bg-yellow-500/10 border border-yellow-500 rounded-xl">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-semibold text-yellow-600 mb-1">Observaciones</p>
                <p className="text-sm text-text">{rendicion.observaciones}</p>
              </div>
            </div>
          </div>
        )}

        {/* Comprobantes */}
        <div className="bg-surface border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text">Comprobantes</h3>
            <span className="text-sm text-text-muted">
              {comprobantes.length} archivo{comprobantes.length !== 1 ? 's' : ''}
            </span>
          </div>

          {comprobantes.length === 0 ? (
            <div className="text-center py-8 text-text-muted">
              <Upload className="w-12 h-12 mx-auto mb-2 text-text-muted" strokeWidth={1.5} />
              <p>No hay comprobantes adjuntos</p>
            </div>
          ) : (
            <div className="space-y-3">
              {comprobantes.map((comp) => (
                <div key={comp.id} className="bg-background border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-text mb-1">
                        {comp.tipo} - N° {comp.numero}
                      </h4>
                      <p className="text-sm text-text-muted mb-2">
                        ${comp.monto.toLocaleString('es-AR')} • {new Date(comp.fecha).toLocaleDateString('es-AR')}
                      </p>
                    </div>
                    <div className={`flex items-center space-x-1 ${getComprobanteStatusColor(comp.estado)}`}>
                      {comp.estado === 'validado' ? (
                        <CheckCircle className="w-5 h-5" strokeWidth={1.5} />
                      ) : comp.estado === 'invalidado' ? (
                        <XCircle className="w-5 h-5" strokeWidth={1.5} />
                      ) : (
                        <span className="text-xs">Cargado</span>
                      )}
                    </div>
                  </div>
                  {comp.motivo_invalidacion && (
                    <p className="text-sm text-red-600 mt-2">
                      ⚠ {comp.motivo_invalidacion}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Acciones */}
        {puedeAdjuntar && (
          <button
            onClick={handleAdjuntarComprobante}
            className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
          >
            <Upload className="w-5 h-5" strokeWidth={1.5} />
            <span>Adjuntar Comprobante</span>
          </button>
        )}

        {puedePresentar && (
          <button
            onClick={handlePresentar}
            className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
          >
            <Send className="w-5 h-5" strokeWidth={1.5} />
            <span>Presentar Rendición</span>
          </button>
        )}

        {/* Información adicional */}
        <div className="p-4 bg-red-500/10 border border-red-500 rounded-xl">
          <p className="text-sm text-red-600">
            <strong>ℹ️ Importante:</strong> Asegurate de adjuntar todos los comprobantes antes de presentar la rendición. 
            Una vez presentada, no podrás modificarla hasta que sea revisada.
          </p>
        </div>
      </main>
    </div>
  );
};

export default RendicionDetailScreen;
