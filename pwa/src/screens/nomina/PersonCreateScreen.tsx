import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Loader } from 'lucide-react';

const PersonCreateScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    tipo_documento: 'DNI',
    numero_documento: '',
    fecha_nacimiento: '',
    participa_alimentacion: false,
    participa_formacion: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Limpiar error del campo
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }
    if (!formData.apellido.trim()) {
      newErrors.apellido = 'El apellido es obligatorio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);

    // Simular guardado
    setTimeout(() => {
      setLoading(false);
      alert('Persona creada correctamente');
      navigate('/nomina');
    }, 1000);
  };

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
            <h1 className="text-xl font-semibold text-text">Nueva Persona</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Datos personales */}
          <div className="bg-surface border border-border rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-text mb-4">Datos Personales</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-text mb-2">
                  Nombre <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-background border rounded-lg text-text focus:outline-none focus:ring-2 ${
                    errors.nombre 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-border focus:ring-green-500'
                  }`}
                  placeholder="Ingresá el nombre"
                />
                {errors.nombre && (
                  <p className="mt-1 text-sm text-red-500">{errors.nombre}</p>
                )}
              </div>

              <div>
                <label htmlFor="apellido" className="block text-sm font-medium text-text mb-2">
                  Apellido <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-background border rounded-lg text-text focus:outline-none focus:ring-2 ${
                    errors.apellido 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-border focus:ring-green-500'
                  }`}
                  placeholder="Ingresá el apellido"
                />
                {errors.apellido && (
                  <p className="mt-1 text-sm text-red-500">{errors.apellido}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="tipo_documento" className="block text-sm font-medium text-text mb-2">
                    Tipo de documento
                  </label>
                  <select
                    id="tipo_documento"
                    name="tipo_documento"
                    value={formData.tipo_documento}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="DNI">DNI</option>
                    <option value="LC">LC</option>
                    <option value="LE">LE</option>
                    <option value="Pasaporte">Pasaporte</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="numero_documento" className="block text-sm font-medium text-text mb-2">
                    Número
                  </label>
                  <input
                    type="text"
                    id="numero_documento"
                    name="numero_documento"
                    value={formData.numero_documento}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="12345678"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="fecha_nacimiento" className="block text-sm font-medium text-text mb-2">
                  Fecha de nacimiento
                </label>
                <input
                  type="date"
                  id="fecha_nacimiento"
                  name="fecha_nacimiento"
                  value={formData.fecha_nacimiento}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          {/* Participación */}
          <div className="bg-surface border border-border rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-text mb-4">Participación en Programas</h3>
            
            <div className="space-y-3">
              <label className="flex items-center space-x-3 p-3 bg-background rounded-lg cursor-pointer hover:bg-border/50 transition-colors">
                <input
                  type="checkbox"
                  name="participa_alimentacion"
                  checked={formData.participa_alimentacion}
                  onChange={handleChange}
                  className="w-5 h-5 text-orange-600 rounded focus:ring-2 focus:ring-orange-500"
                />
                <span className="text-text">Participa en Prestación Alimentaria</span>
              </label>

              <label className="flex items-center space-x-3 p-3 bg-background rounded-lg cursor-pointer hover:bg-border/50 transition-colors">
                <input
                  type="checkbox"
                  name="participa_formacion"
                  checked={formData.participa_formacion}
                  onChange={handleChange}
                  className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                />
                <span className="text-text">Participa en Formación</span>
              </label>
            </div>
          </div>

          {/* Botón de guardar */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-green-600/50 text-white px-6 py-3 rounded-lg transition-colors font-medium"
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" strokeWidth={1.5} />
                <span>Guardando...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" strokeWidth={1.5} />
                <span>Crear Persona</span>
              </>
            )}
          </button>

          <p className="text-center text-sm text-text-muted">
            Los campos marcados con <span className="text-red-500">*</span> son obligatorios
          </p>
        </form>
      </main>
    </div>
  );
};

export default PersonCreateScreen;
