import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import WhatsAppButton from '@/components/WhatsAppButton';
import { 
  Moon, 
  Sun, 
  LogOut, 
  FileText, 
  Users, 
  Apple, 
  GraduationCap, 
  FileSpreadsheet, 
  Mail,
  LayoutDashboard
} from 'lucide-react';

const HomeScreen = () => {
  const { user, currentSpace, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const modules = [
    {
      id: 'info',
      title: 'Información Institucional',
      description: 'Perfil del espacio y documentos',
      icon: FileText,
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500',
      iconColor: 'text-blue-600',
      route: '/perfil',
    },
    {
      id: 'nominas',
      title: 'Nóminas',
      description: 'Gestión de personas asistidas',
      icon: Users,
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500',
      iconColor: 'text-green-600',
      route: '/nomina',
    },
    {
      id: 'prestacion',
      title: 'Prestación Alimentaria',
      description: 'Estado y períodos',
      icon: Apple,
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500',
      iconColor: 'text-orange-600',
      route: '/prestacion',
    },
    {
      id: 'formacion',
      title: 'Formación',
      description: 'Actividades y participantes',
      icon: GraduationCap,
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500',
      iconColor: 'text-purple-600',
      route: '/formacion',
    },
    {
      id: 'rendiciones',
      title: 'Rendiciones',
      description: 'Comprobantes y estados',
      icon: FileSpreadsheet,
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500',
      iconColor: 'text-red-600',
      route: '/rendiciones',
    },
    {
      id: 'mensajes',
      title: 'Mensajes',
      description: 'Comunicaciones del programa',
      icon: Mail,
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500',
      iconColor: 'text-cyan-600',
      route: '/mensajes',
    },
  ];

  const handleModuleClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold text-white">S</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-text">
                  {currentSpace?.space_name || 'SISOC'}
                </h1>
                <p className="text-sm text-text-secondary">{user?.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-background hover:bg-border transition-colors"
                aria-label="Cambiar tema"
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5 text-text" strokeWidth={1.5} />
                ) : (
                  <Sun className="w-5 h-5 text-text" strokeWidth={1.5} />
                )}
              </button>
              
              <button
                onClick={logout}
                className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-error hover:bg-error/10 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" strokeWidth={1.5} />
                <span>Salir</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Bienvenida */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-text mb-2">
            ¡Hola, {user?.name?.split(' ')[0]}! 👋
          </h2>
          <p className="text-text-secondary">
            Seleccioná un módulo para comenzar
          </p>
        </div>

        {/* Grid de módulos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <button
                key={module.id}
                onClick={() => handleModuleClick(module.route)}
                className="bg-surface hover:bg-border/50 border border-border rounded-2xl p-6 text-left transition-all transform hover:scale-105 active:scale-95"
              >
                <div className="flex items-start space-x-4">
                  <div className={`${module.bgColor} ${module.borderColor} w-14 h-14 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-transform`}>
                    <Icon className={`w-7 h-7 ${module.iconColor}`} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-text mb-1">
                      {module.title}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {module.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Info adicional */}
        <div className="mt-12 bg-surface border border-border rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-text mb-4">
            Información del espacio
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-text-muted">Dirección:</span>
              <p className="text-text font-medium">{currentSpace?.address || 'N/A'}</p>
            </div>
            <div>
              <span className="text-text-muted">Localidad:</span>
              <p className="text-text font-medium">{currentSpace?.locality || 'N/A'}</p>
            </div>
            <div>
              <span className="text-text-muted">Provincia:</span>
              <p className="text-text font-medium">{currentSpace?.province || 'N/A'}</p>
            </div>
            <div>
              <span className="text-text-muted">Estado:</span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                currentSpace?.status === 'activo' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
              }`}>
                {currentSpace?.status || 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Botón flotante de WhatsApp */}
      <WhatsAppButton />
    </div>
  );
};

export default HomeScreen;
