/**
 * API Client con soporte para mock data
 * Cambiando USE_MOCK se puede trabajar sin backend
 */

import axios from 'axios';
import type { AxiosInstance } from 'axios';
import {
  mockContext,
  mockPersons,
  mockMessages,
  mockDocuments,
  mockUserEspacio,
  mockUserOrganizacion,
  mockSpaceEspacio,
  mockSpacesOrganizacion,
  type User,
  type Space,
  type Person,
  type Message,
  type Document,
} from './mockData';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/mobile/v1';
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

// Helper para simular latencia de red
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Instancia de axios
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('sisoc-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token inválido o expirado
      localStorage.removeItem('sisoc-token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/**
 * API Client
 */
export const api = {
  /**
   * Autenticación
   */
  async login(username: string, password: string): Promise<{ token: string; user: User }> {
    if (USE_MOCK) {
      await delay(500);
      
      // Usuario COMEDOR individual (1 espacio)
      if (username === 'demo' && password === 'demo') {
        return {
          token: 'mock_token_espacio_12345',
          user: mockUserEspacio,
        };
      }
      
      // Usuario ORGANIZACIÓN (múltiples espacios)
      if (username === 'orga' && password === 'orga') {
        return {
          token: 'mock_token_organizacion_67890',
          user: mockUserOrganizacion,
        };
      }
      
      throw new Error('Usuario o contraseña incorrectos');
    }
    
    const response = await axiosInstance.post('/auth/login', { username, password });
    return response.data;
  },

  async logout(): Promise<void> {
    if (USE_MOCK) {
      await delay(200);
      return;
    }
    
    await axiosInstance.post('/auth/logout');
  },

  /**
   * Contexto del usuario
   */
  async getContext(): Promise<{ user: User; scope: any }> {
    if (USE_MOCK) {
      await delay(300);
      
      // Detectar tipo de usuario por token
      const token = localStorage.getItem('sisoc-token');
      
      if (token === 'mock_token_organizacion_67890') {
        // Usuario ORGANIZACIÓN → múltiples espacios
        return {
          user: mockUserOrganizacion,
          scope: {
            spaces: mockSpacesOrganizacion,
            role: 'org_user',
          },
        };
      }
      
      // Usuario COMEDOR → 1 espacio (default)
      return {
        user: mockUserEspacio,
        scope: {
          spaces: mockSpaceEspacio,
          role: 'referente',
        },
      };
    }
    
    const response = await axiosInstance.get('/me');
    return response.data;
  },

  /**
   * Espacios
   */
  async getSpaceProfile(spaceId: string): Promise<Space> {
    if (USE_MOCK) {
      await delay(300);
      const space = mockContext.scope.spaces.find(s => s.space_id === spaceId);
      if (!space) throw new Error('Espacio no encontrado');
      return space;
    }
    
    const response = await axiosInstance.get(`/spaces/${spaceId}/profile`);
    return response.data;
  },

  /**
   * Personas (Nómina)
   */
  async getPersons(spaceId: string, filters?: { search?: string; activo?: boolean }): Promise<Person[]> {
    if (USE_MOCK) {
      await delay(400);
      let persons = mockPersons.filter(p => p.space_id === spaceId);
      
      if (filters?.activo !== undefined) {
        persons = persons.filter(p => p.activo === filters.activo);
      }
      
      if (filters?.search) {
        const search = filters.search.toLowerCase();
        persons = persons.filter(p =>
          p.nombre.toLowerCase().includes(search) ||
          p.apellido.toLowerCase().includes(search) ||
          p.numero_documento?.includes(search)
        );
      }
      
      return persons;
    }
    
    const response = await axiosInstance.get(`/spaces/${spaceId}/persons`, { params: filters });
    return response.data;
  },

  async getPerson(spaceId: string, personId: string): Promise<Person> {
    if (USE_MOCK) {
      await delay(300);
      const person = mockPersons.find(p => p.id === personId && p.space_id === spaceId);
      if (!person) throw new Error('Persona no encontrada');
      return person;
    }
    
    const response = await axiosInstance.get(`/spaces/${spaceId}/persons/${personId}`);
    return response.data;
  },

  async createPerson(spaceId: string, data: Partial<Person>): Promise<Person> {
    if (USE_MOCK) {
      await delay(500);
      const newPerson: Person = {
        id: `p_${Date.now()}`,
        nombre: data.nombre!,
        apellido: data.apellido!,
        tipo_documento: data.tipo_documento,
        numero_documento: data.numero_documento,
        fecha_nacimiento: data.fecha_nacimiento,
        participa_alimentacion: data.participa_alimentacion || false,
        participa_formacion: data.participa_formacion || false,
        activo: true,
        space_id: spaceId,
      };
      mockPersons.push(newPerson);
      return newPerson;
    }
    
    const response = await axiosInstance.post(`/spaces/${spaceId}/persons`, data);
    return response.data;
  },

  /**
   * Mensajes
   */
  async getMessages(spaceId: string): Promise<Message[]> {
    if (USE_MOCK) {
      await delay(300);
      return mockMessages;
    }
    
    const response = await axiosInstance.get(`/spaces/${spaceId}/messages`);
    return response.data;
  },

  async getMessage(spaceId: string, messageId: string): Promise<Message> {
    if (USE_MOCK) {
      await delay(300);
      const message = mockMessages.find(m => m.id === messageId);
      if (!message) throw new Error('Mensaje no encontrado');
      return message;
    }
    
    const response = await axiosInstance.get(`/spaces/${spaceId}/messages/${messageId}`);
    return response.data;
  },

  /**
   * Documentos
   */
  async getDocuments(spaceId: string): Promise<Document[]> {
    if (USE_MOCK) {
      await delay(300);
      return mockDocuments;
    }
    
    const response = await axiosInstance.get(`/spaces/${spaceId}/documents`);
    return response.data;
  },
};

export default api;
