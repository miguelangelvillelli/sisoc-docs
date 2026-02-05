import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Search, Filter, Plus, Loader } from 'lucide-react';
import { mockPersons } from '@/services/mockData';
import type { Person } from '@/services/mockData';

const NominaListScreen = () => {
  const navigate = useNavigate();
  const [persons, setPersons] = useState<Person[]>([]);
  const [filteredPersons, setFilteredPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'inactive'>('all');

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setPersons(mockPersons);
      setFilteredPersons(mockPersons);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    let filtered = persons;

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(p =>
        `${p.nombre} ${p.apellido}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.numero_documento?.includes(searchTerm)
      );
    }

    // Filtrar por estado
    if (filterActive === 'active') {
      filtered = filtered.filter(p => p.activo);
    } else if (filterActive === 'inactive') {
      filtered = filtered.filter(p => !p.activo);
    }

    setFilteredPersons(filtered);
  }, [searchTerm, filterActive, persons]);

  const handlePersonClick = (personId: string) => {
    navigate(`/nomina/${personId}`);
  };

  const handleAddPerson = () => {
    navigate('/nomina/nueva');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-surface border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-3 mb-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-border rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-text" strokeWidth={1.5} />
            </button>
            <h1 className="text-xl font-semibold text-text">Nómina</h1>
          </div>

          {/* Búsqueda */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Buscar por nombre o documento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Filtros */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-text-muted" strokeWidth={1.5} />
            <button
              onClick={() => setFilterActive('all')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                filterActive === 'all'
                  ? 'bg-green-600 text-white'
                  : 'bg-background text-text-muted hover:bg-border'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setFilterActive('active')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                filterActive === 'active'
                  ? 'bg-green-600 text-white'
                  : 'bg-background text-text-muted hover:bg-border'
              }`}
            >
              Activas
            </button>
            <button
              onClick={() => setFilterActive('inactive')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                filterActive === 'inactive'
                  ? 'bg-green-600 text-white'
                  : 'bg-background text-text-muted hover:bg-border'
              }`}
            >
              Inactivas
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-6">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader className="w-8 h-8 text-green-600 animate-spin" strokeWidth={1.5} />
          </div>
        ) : filteredPersons.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-text-muted mx-auto mb-4" strokeWidth={1.5} />
            <p className="text-text-muted text-lg mb-2">
              {searchTerm || filterActive !== 'all' 
                ? 'No se encontraron personas' 
                : 'Todavía no cargaste personas'}
            </p>
            <button
              onClick={handleAddPerson}
              className="mt-4 text-green-600 hover:underline font-medium"
            >
              + Agregar primera persona
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-text-muted">
              {filteredPersons.length} persona{filteredPersons.length !== 1 ? 's' : ''}
            </div>
            <div className="space-y-3">
              {filteredPersons.map((person) => (
                <button
                  key={person.id}
                  onClick={() => handlePersonClick(person.id)}
                  className="w-full bg-surface hover:bg-border/50 border border-border rounded-xl p-4 text-left transition-all"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`${
                      person.activo
                        ? 'bg-green-500/10 border-2 border-green-500'
                        : 'bg-gray-500/10 border-2 border-gray-500'
                    } w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0`}>
                      <Users className={`w-6 h-6 ${person.activo ? 'text-green-600' : 'text-gray-600'}`} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-text mb-1">
                        {person.nombre} {person.apellido}
                      </h3>
                      <p className="text-sm text-text-muted mb-2">
                        {person.tipo_documento} {person.numero_documento || 'Sin documento'}
                      </p>
                      <div className="flex items-center flex-wrap gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          person.activo
                            ? 'bg-green-500/20 text-green-600'
                            : 'bg-gray-500/20 text-gray-600'
                        }`}>
                          {person.activo ? '✓ Activa' : 'Inactiva'}
                        </span>
                        {person.participa_alimentacion && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-600">
                            🍽️ Alimentación
                          </span>
                        )}
                        {person.participa_formacion && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-600">
                            📚 Formación
                          </span>
                        )}
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
        onClick={handleAddPerson}
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-110 active:scale-95"
      >
        <Plus className="w-6 h-6" strokeWidth={2} />
      </button>
    </div>
  );
};

export default NominaListScreen;
