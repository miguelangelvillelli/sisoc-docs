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

// Mock user
export const mockUser: User = {
  id: 'u_001',
  name: 'Juan Referente',
  email: 'referente@espacio.gob.ar',
  role: 'referente',
};

// Mock spaces
export const mockSpaces: Space[] = [
  {
    space_id: 'esp_001',
    space_name: 'Centro Comunitario La Esperanza',
    address: 'Av. Libertador 1234',
    locality: 'Almirante Brown',
    province: 'Buenos Aires',
    status: 'activo',
  },
];

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
