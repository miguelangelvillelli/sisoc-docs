import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Users, Edit, Power, Loader, Calendar, Apple, GraduationCap } from 'lucide-react';
import { mockPersons } from '@/services/mockData';
import type { Person } from '@/services/mockData';

const PersonDetailScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      const p = mockPersons.find(per => per.id === id);
      setPerson(p || null);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleEdit = () => {
    navigate(`/nomina/${id}/editar`);
  };

  const handleToggleActive = () => {
    if (!person) return;
    const action = person.activo ? 'desactivar' : 'activar';
    if (confirm(`¿Querés ${action} a esta persona?`)) {
      setPerson({ ...person, activo: !person.activo });
      alert(`Persona ${action}da correctamente`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader className="w-8 h-8 text-green-600 animate-spin" strokeWidth={1.5} />
      </div>
    );
  }

  if (!person) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Users className="w-16 h-16 text-text-muted mx-auto mb-4" strokeWidth={1.5} />
          <p className="text-text-muted">Persona no encontrada</p>
          <button
            onClick={() => navigate('/nomina')}
            className="mt-4 text-green-600 hover:underline"
          >
            Volver a nómina
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
              onClick={() => navigate('/nomina')}
              className="p-2 hover:bg-border rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-text" strokeWidth={1.5} />
            </button>
            <h1 className="text-xl font-semibold text-text">Detalle de Persona</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Información principal */}
        <div className="bg-surface border border-border rounded-2xl p-6">
          <div className="flex items-start space-x-4 mb-6">
            <div className={`${
              person.activo
                ? 'bg-green-500/10 border-2 border-green-500'
                : 'bg-gray-500/10 border-2 border-gray-500'
            } w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0`}>
              <Users className={`w-8 h-8 ${person.activo ? 'text-green-600' : 'text-gray-600'}`} strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-text mb-2">
                {person.nombre} {person.apellido}
              </h2>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                person.activo
                  ? 'bg-green-500/20 text-green-600 border border-green-500'
                  : 'bg-gray-500/20 text-gray-600 border border-gray-500'
              }`}>
                {person.activo ? '✓ Activa' : 'Inactiva'}
              </span>
            </div>
          </div>

          {/* Datos personales */}
          <div className="space-y-4">
            <div>
              <p className="text-sm text-text-muted mb-1">Documento</p>
              <p className="text-text font-medium">
                {person.tipo_documento} {person.numero_documento || 'No especificado'}
              </p>
            </div>

            {person.fecha_nacimiento && (
              <div>
                <p className="text-sm text-text-muted mb-1">Fecha de nacimiento</p>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-text-muted" strokeWidth={1.5} />
                  <p className="text-text font-medium">
                    {new Date(person.fecha_nacimiento).toLocaleDateString('es-AR')}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Participación en programas */}
        <div className="bg-surface border border-border rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-text mb-4">Participación en Programas</h3>
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-3 rounded-lg ${
              person.participa_alimentacion 
                ? 'bg-orange-500/10 border border-orange-500' 
                : 'bg-background border border-border'
            }`}>
              <div className="flex items-center space-x-3">
                <Apple className={`w-5 h-5 ${person.participa_alimentacion ? 'text-orange-600' : 'text-text-muted'}`} strokeWidth={1.5} />
                <span className={person.participa_alimentacion ? 'text-text font-medium' : 'text-text-muted'}>
                  Prestación Alimentaria
                </span>
              </div>
              <span className={`text-sm font-medium ${
                person.participa_alimentacion ? 'text-orange-600' : 'text-text-muted'
              }`}>
                {person.participa_alimentacion ? '✓ Participa' : 'No participa'}
              </span>
            </div>

            <div className={`flex items-center justify-between p-3 rounded-lg ${
              person.participa_formacion 
                ? 'bg-purple-500/10 border border-purple-500' 
                : 'bg-background border border-border'
            }`}>
              <div className="flex items-center space-x-3">
                <GraduationCap className={`w-5 h-5 ${person.participa_formacion ? 'text-purple-600' : 'text-text-muted'}`} strokeWidth={1.5} />
                <span className={person.participa_formacion ? 'text-text font-medium' : 'text-text-muted'}>
                  Formación
                </span>
              </div>
              <span className={`text-sm font-medium ${
                person.participa_formacion ? 'text-purple-600' : 'text-text-muted'
              }`}>
                {person.participa_formacion ? '✓ Participa' : 'No participa'}
              </span>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleEdit}
            className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition-colors font-medium"
          >
            <Edit className="w-5 h-5" strokeWidth={1.5} />
            <span>Editar</span>
          </button>
          <button
            onClick={handleToggleActive}
            className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-colors font-medium ${
              person.activo
                ? 'bg-red-500/10 hover:bg-red-500/20 text-red-600 border border-red-500'
                : 'bg-green-500/10 hover:bg-green-500/20 text-green-600 border border-green-500'
            }`}
          >
            <Power className="w-5 h-5" strokeWidth={1.5} />
            <span>{person.activo ? 'Desactivar' : 'Activar'}</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default PersonDetailScreen;
