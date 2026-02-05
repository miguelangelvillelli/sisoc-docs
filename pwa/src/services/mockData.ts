/**
 * Mock data para desarrollo sin backend
 * Este archivo simula las respuestas de la API real
 */

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'referente' | 'interno' | 'operador' | 'admin' | 'org_user';
}

export interface Space {
  space_id: string;
  space_name: string;
  address?: string;
  locality?: string;
  province?: string;
  status: 'activo' | 'suspendido' | 'sin_datos';
  whatsapp_soporte?: string; // Número de WhatsApp del técnico/soporte
  latitude?: number; // Coordenadas para mapa
  longitude?: number;
}

export interface Person {
  id: string;
  nombre: string;
  apellido: string;
  tipo_documento?: string;
  numero_documento?: string;
  fecha_nacimiento?: string;
  participa_alimentacion: boolean;
  participa_formacion: boolean;
  activo: boolean;
  space_id: string;
}

export interface Message {
  id: string;
  titulo: string;
  contenido: string;
  fecha: string;
  leido: boolean;
}

export interface Document {
  id: string;
  titulo: string;
  tipo: string;
  fecha: string;
  url: string;
}

export interface Periodo {
  id: string;
  mes: string;
  anio: number;
  estado: 'vigente' | 'observado' | 'aprobado' | 'cerrado';
  observaciones?: string;
  fecha_inicio: string;
  fecha_fin: string;
}

export interface Actividad {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  estado: 'planificada' | 'en_curso' | 'finalizada' | 'cancelada';
  participantes: number;
  space_id: string;
}

export interface Participante {
  id: string;
  persona_id: string;
  actividad_id: string;
  asistio: boolean;
}

export interface Rendicion {
  id: string;
  periodo_id: string;
  estado: 'borrador' | 'presentada' | 'observada' | 'aprobada' | 'rechazada';
  fecha_presentacion?: string;
  observaciones?: string;
  comprobantes: number;
  space_id: string;
}

export interface Comprobante {
  id: string;
  rendicion_id: string;
  tipo: string;
  numero: string;
  fecha: string;
  monto: number;
  archivo?: string;
  estado: 'cargado' | 'validado' | 'invalidado';
  motivo_invalidacion?: string;
}

// Mock users
// Usuario tipo COMEDOR (1 espacio)
export const mockUserEspacio: User = {
  id: 'u_001',
  name: 'Juan Referente',
  email: 'referente@espacio.gob.ar',
  role: 'referente',
};

// Usuario tipo ORGANIZACION (múltiples espacios)
export const mockUserOrganizacion: User = {
  id: 'u_002',
  name: 'María Coordinadora',
  email: 'coordinadora@organizacion.gob.ar',
  role: 'org_user',
};

// Para retrocompatibilidad
export const mockUser = mockUserEspacio;

// Mock spaces
// Espacio individual para comedor
export const mockSpaceEspacio: Space[] = [
  {
    space_id: 'esp_001',
    space_name: 'Centro Comunitario La Esperanza',
    address: 'Av. Libertador 1234',
    locality: 'Almirante Brown',
    province: 'Buenos Aires',
    status: 'activo',
    whatsapp_soporte: '5491112345678',
    latitude: -34.7999,
    longitude: -58.3970,
  },
];

// Múltiples espacios para organización
export const mockSpacesOrganizacion: Space[] = [
  {
    space_id: 'esp_001',
    space_name: 'Centro Comunitario La Esperanza',
    address: 'Av. Libertador 1234',
    locality: 'Almirante Brown',
    province: 'Buenos Aires',
    status: 'activo',
    whatsapp_soporte: '5491112345678',
    latitude: -34.7999,
    longitude: -58.3970,
  },
  {
    space_id: 'esp_002',
    space_name: 'Club Barrial San Martín',
    address: 'Calle San Martín 567',
    locality: 'Quilmes',
    province: 'Buenos Aires',
    status: 'activo',
    whatsapp_soporte: '5491123456789',
    latitude: -34.7208,
    longitude: -58.2683,
  },
  {
    space_id: 'esp_003',
    space_name: 'Espacio Cultural El Encuentro',
    address: 'Av. Hipólito Yrigoyen 890',
    locality: 'Lanús',
    province: 'Buenos Aires',
    status: 'suspendido',
    whatsapp_soporte: '5491134567890',
    latitude: -34.7004,
    longitude: -58.3953,
  },
  {
    space_id: 'esp_004',
    space_name: 'Centro de Inclusión Nuevo Amanecer',
    address: 'Pasaje Los Aromos 345',
    locality: 'Lomas de Zamora',
    province: 'Buenos Aires',
    status: 'activo',
    whatsapp_soporte: '5491145678901',
    latitude: -34.7601,
    longitude: -58.3980,
  },
  {
    space_id: 'esp_005',
    space_name: 'Sociedad de Fomento Villa Progreso',
    address: 'Av. Eva Perón 2100',
    locality: 'Avellaneda',
    province: 'Buenos Aires',
    status: 'activo',
    whatsapp_soporte: '5491156789012',
    latitude: -34.6611,
    longitude: -58.3647,
  },
];

// Para retrocompatibilidad
export const mockSpaces = mockSpaceEspacio;

// Mock persons
export const mockPersons: Person[] = [
  {
    id: 'p_001',
    nombre: 'María',
    apellido: 'González',
    tipo_documento: 'DNI',
    numero_documento: '12345678',
    fecha_nacimiento: '1985-03-15',
    participa_alimentacion: true,
    participa_formacion: true,
    activo: true,
    space_id: 'esp_001',
  },
  {
    id: 'p_002',
    nombre: 'Carlos',
    apellido: 'Pérez',
    tipo_documento: 'DNI',
    numero_documento: '87654321',
    participa_alimentacion: true,
    participa_formacion: false,
    activo: true,
    space_id: 'esp_001',
  },
  {
    id: 'p_003',
    nombre: 'Ana',
    apellido: 'Martínez',
    tipo_documento: 'DNI',
    numero_documento: '11223344',
    fecha_nacimiento: '1992-07-22',
    participa_alimentacion: false,
    participa_formacion: true,
    activo: true,
    space_id: 'esp_001',
  },
];

// Mock messages
export const mockMessages: Message[] = [
  {
    id: 'm_001',
    titulo: 'Rendición de enero - Recordatorio',
    contenido: 'Recordamos que la rendición del mes de enero vence el próximo viernes. Por favor presentar la documentación completa.',
    fecha: '2026-02-01',
    leido: false,
  },
  {
    id: 'm_002',
    titulo: 'Actualización de nóminas',
    contenido: 'Se actualizó el sistema de carga de nóminas. Ahora pueden importar archivos CSV desde el módulo correspondiente.',
    fecha: '2026-01-28',
    leido: true,
  },
];

// Mock documents
export const mockDocuments: Document[] = [
  {
    id: 'd_001',
    titulo: 'Convenio Marco 2026',
    tipo: 'PDF',
    fecha: '2026-01-15',
    url: '#',
  },
  {
    id: 'd_002',
    titulo: 'Reglamento Operativo',
    tipo: 'PDF',
    fecha: '2026-01-10',
    url: '#',
  },
  {
    id: 'd_003',
    titulo: 'Manual de Procedimientos',
    tipo: 'PDF',
    fecha: '2025-12-20',
    url: '#',
  },
];

// Mock periodos
export const mockPeriodos: Periodo[] = [
  {
    id: 'per_001',
    mes: 'Febrero',
    anio: 2026,
    estado: 'vigente',
    fecha_inicio: '2026-02-01',
    fecha_fin: '2026-02-28',
  },
  {
    id: 'per_002',
    mes: 'Enero',
    anio: 2026,
    estado: 'observado',
    observaciones: 'Faltan comprobantes de compras del día 15',
    fecha_inicio: '2026-01-01',
    fecha_fin: '2026-01-31',
  },
  {
    id: 'per_003',
    mes: 'Diciembre',
    anio: 2025,
    estado: 'aprobado',
    fecha_inicio: '2025-12-01',
    fecha_fin: '2025-12-31',
  },
];

// Mock actividades
export const mockActividades: Actividad[] = [
  {
    id: 'act_001',
    titulo: 'Taller de Cocina Saludable',
    descripcion: 'Aprendemos a preparar comidas nutritivas con bajo presupuesto',
    fecha: '2026-02-15',
    estado: 'planificada',
    participantes: 12,
    space_id: 'esp_001',
  },
  {
    id: 'act_002',
    titulo: 'Alfabetización Digital',
    descripcion: 'Introducción al uso de computadoras y celulares',
    fecha: '2026-02-10',
    estado: 'en_curso',
    participantes: 8,
    space_id: 'esp_001',
  },
  {
    id: 'act_003',
    titulo: 'Apoyo Escolar',
    descripcion: 'Ayuda con tareas escolares nivel primario',
    fecha: '2026-01-30',
    estado: 'finalizada',
    participantes: 15,
    space_id: 'esp_001',
  },
];

// Mock rendiciones
export const mockRendiciones: Rendicion[] = [
  {
    id: 'ren_001',
    periodo_id: 'per_001',
    estado: 'borrador',
    comprobantes: 3,
    space_id: 'esp_001',
  },
  {
    id: 'ren_002',
    periodo_id: 'per_002',
    estado: 'observada',
    fecha_presentacion: '2026-02-01',
    observaciones: 'Revisar comprobante N° 123 - monto no coincide',
    comprobantes: 8,
    space_id: 'esp_001',
  },
  {
    id: 'ren_003',
    periodo_id: 'per_003',
    estado: 'aprobada',
    fecha_presentacion: '2026-01-05',
    comprobantes: 10,
    space_id: 'esp_001',
  },
];

// Mock comprobantes
export const mockComprobantes: Comprobante[] = [
  {
    id: 'comp_001',
    rendicion_id: 'ren_001',
    tipo: 'Factura A',
    numero: '0001-00001234',
    fecha: '2026-02-05',
    monto: 15000,
    archivo: 'factura_001.pdf',
    estado: 'cargado',
  },
  {
    id: 'comp_002',
    rendicion_id: 'ren_001',
    tipo: 'Ticket',
    numero: 'T-5678',
    fecha: '2026-02-08',
    monto: 8500,
    archivo: 'ticket_002.jpg',
    estado: 'validado',
  },
  {
    id: 'comp_003',
    rendicion_id: 'ren_002',
    tipo: 'Factura B',
    numero: '0002-00000123',
    fecha: '2026-01-15',
    monto: 12000,
    archivo: 'factura_003.pdf',
    estado: 'invalidado',
    motivo_invalidacion: 'El monto declarado no coincide con el comprobante adjunto',
  },
];

// Mock context response
export const mockContext = {
  user: mockUser,
  scope: {
    spaces: mockSpaces,
    organization_id: null,
    jurisdiction: {
      province: 'Buenos Aires',
      municipality: 'Almirante Brown',
    },
  },
};
