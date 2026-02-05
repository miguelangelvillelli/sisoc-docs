import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import WhatsAppButton from '@/components/WhatsAppButton';
import ThemeToggle from '@/components/ThemeToggle';
import SpaceMap from '@/components/SpaceMap';
import { 
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
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold text-primary-foreground">S</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">
                  {currentSpace?.space_name || 'SISOC'}
                </h1>
                <p className="text-sm text-muted-foreground">{user?.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              
              <button
                onClick={logout}
                className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
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
          <h2 className="text-3xl font-bold text-foreground mb-2">
            ¡Hola, {user?.name?.split(' ')[0]}! 👋
          </h2>
          <p className="text-muted-foreground">
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
                className="bg-card hover:bg-accent/50 border border-border rounded-2xl p-6 text-left transition-all transform hover:scale-105 active:scale-95"
              >
                <div className="flex items-start space-x-4">
                  <div className={`${module.bgColor} ${module.borderColor} w-14 h-14 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-transform`}>
                    <Icon className={`w-7 h-7 ${module.iconColor}`} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {module.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {module.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Info adicional */}
        <div className="mt-12 bg-card border border-border rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Información del espacio
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-6">
            <div>
              <span className="text-muted-foreground">Dirección:</span>
              <p className="text-foreground font-medium">{currentSpace?.address || 'N/A'}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Localidad:</span>
              <p className="text-foreground font-medium">{currentSpace?.locality || 'N/A'}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Provincia:</span>
              <p className="text-foreground font-medium">{currentSpace?.province || 'N/A'}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Estado:</span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                currentSpace?.status === 'activo' ? 'bg-green-500/20 text-green-600' : 'bg-yellow-500/20 text-yellow-600'
              }`}>
                {currentSpace?.status || 'N/A'}
              </span>
            </div>
          </div>

          {/* Mapa si hay coordenadas */}
          {currentSpace?.latitude && currentSpace?.longitude && (
            <div className="mt-4">
              <SpaceMap
                latitude={currentSpace.latitude}
                longitude={currentSpace.longitude}
                spaceName={currentSpace.space_name}
                address={`${currentSpace.address}, ${currentSpace.locality}, ${currentSpace.province}`}
                height="200px"
              />
            </div>
          )}
        </div>
      </main>

      {/* Botón flotante de WhatsApp */}
      <WhatsAppButton />
    </div>
  );
};

export default HomeScreen;
