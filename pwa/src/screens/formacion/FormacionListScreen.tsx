import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, GraduationCap, Plus, Calendar, Users, Loader } from 'lucide-react';
import { mockActividades } from '@/services/mockData';
import type { Actividad } from '@/services/mockData';

const FormacionListScreen = () => {
  const navigate = useNavigate();
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setActividades(mockActividades);
      setLoading(false);
    }, 500);
  }, []);

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'planificada':
        return 'bg-blue-500/10 border-blue-500 text-blue-600';
      case 'en_curso':
        return 'bg-green-500/10 border-green-500 text-green-600';
      case 'finalizada':
        return 'bg-gray-500/10 border-gray-500 text-gray-600';
      case 'cancelada':
        return 'bg-red-500/10 border-red-500 text-red-600';
      default:
        return 'bg-gray-500/10 border-gray-500 text-gray-600';
    }
  };

  const handleActividadClick = (actividadId: string) => {
    navigate(`/formacion/${actividadId}`);
  };

  const handleCreateActividad = () => {
    navigate('/formacion/nueva');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
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
            <h1 className="text-xl font-semibold text-text">Formación</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-6">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader className="w-8 h-8 text-purple-600 animate-spin" strokeWidth={1.5} />
          </div>
        ) : actividades.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-text-muted mx-auto mb-4" strokeWidth={1.5} />
            <p className="text-text-muted text-lg mb-2">No hay actividades cargadas</p>
            <button
              onClick={handleCreateActividad}
              className="mt-4 text-purple-600 hover:underline font-medium"
            >
              + Crear primera actividad
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-text-muted">
              {actividades.length} actividad{actividades.length !== 1 ? 'es' : ''}
            </div>
            <div className="space-y-3">
              {actividades.map((actividad) => (
                <button
                  key={actividad.id}
                  onClick={() => handleActividadClick(actividad.id)}
                  className="w-full bg-surface hover:bg-border/50 border border-border rounded-xl p-4 text-left transition-all"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-500/10 border-2 border-purple-500 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-6 h-6 text-purple-600" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-base font-semibold text-text">
                          {actividad.titulo}
                        </h3>
                        <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium border flex-shrink-0 ${getStatusColor(actividad.estado)}`}>
                          {actividad.estado.replace('_', ' ').charAt(0).toUpperCase() + actividad.estado.slice(1).replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-sm text-text-muted mb-2 line-clamp-2">
                        {actividad.descripcion}
                      </p>
                      <div className="flex items-center flex-wrap gap-3 text-xs text-text-muted">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" strokeWidth={1.5} />
                          <span>{new Date(actividad.fecha).toLocaleDateString('es-AR')}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Users className="w-3 h-3" strokeWidth={1.5} />
                          <span>{actividad.participantes} participantes</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Floating Action Button */}
      <button
        onClick={handleCreateActividad}
        className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-110 active:scale-95"
      >
        <Plus className="w-6 h-6" strokeWidth={2} />
      </button>
    </div>
  );
};

export default FormacionListScreen;
