# Alcance MVP

!!! warning "Regla"
    Todo lo que no esté definido acá entra como **Release 2**.  
    No se suman funcionalidades por “excepción” sin **ADR** aprobado.

## Objetivo
Dar a cada **espacio comunitario** un acceso **simple y seguro desde el teléfono** a la información y gestiones mínimas necesarias para operar su vínculo con el Programa, **aprovechando SISOC existente** (MySQL + backoffice Django) mediante una **API móvil**.

## Resultado esperado (qué habilita el MVP)
- El **referente del espacio** puede **consultar** información oficial y **resolver gestiones básicas** sin depender de WhatsApp/llamadas.
- El Programa puede **comunicar y dar seguimiento** con trazabilidad (mensajes, estados, observaciones).
- La operación queda soportada por **RBAC + auditoría** en server-side.

## Incluye (MVP)

### 1) Acceso y contexto
- Autenticación (mecanismo a confirmar con SISOC).
- Selector de espacio si el usuario tiene **multi-espacio**.
- Home (Hub) con accesos a módulos y contadores básicos (ej. mensajes no leídos, rendiciones observadas).

### 2) Información institucional y convenios (solo lectura)
- Ficha del espacio (identificación básica, jurisdicción, estado, contactos).
- Documentos/convenios vigentes (PDF o link) con descarga/visualización según política.
- Canales de contacto definidos (si aplica).

### 3) Mensajes operativos (bandeja oficial)
- Lista + detalle de mensajes del Programa (recordatorios, cambios operativos, observaciones).
- Badge/contador de mensajes no leídos (si se define).

### 4) Nómina (personas asociadas al espacio)
- Listado, búsqueda y filtros mínimos (activas/inactivas; flags si aplican).
- Alta rápida y edición básica (campos mínimos a confirmar).
- Importación CSV:
    - **si aplica en MVP**, desde móvil;  
    - si no, mensaje “esta acción se realiza desde SISOC web”.

### 5) Prestación alimentaria (MVP lectura)
- Visualización de estado del período actual + observaciones.
- Historial por período (si existe dato).
- Sin montos ni información sensible no autorizada.

### 6) Formación
- Listado de actividades.
- Crear/editar actividad (según reglas MVP).
- Gestión de participantes desde nómina (agregar/quitar).

### 7) Rendiciones y comprobantes
- Listado de rendiciones por período + estado.
- Detalle con observaciones y adjuntos.
- Subida de comprobantes (tipos/tamaño definidos).
- Presentación de rendición (solo referente, con validaciones mínimas).

### 8) Calidad, seguridad y operación (mínimos obligatorios)
- RBAC server-side por rol y alcance territorial.
- Auditoría de eventos críticos (alta/edición de persona, subida de adjunto, presentación de rendición, descargas).
- Paginación y límites para performance (listas y adjuntos).
- Errores consistentes (400/401/403/404) y mensajes “en claro”.

## No incluye (Release 2)
- Firma digital dentro de la app.
- Flujos complejos de renovación de convenios (alta/baja/gestión documental avanzada).
- Offline-first completo (modo sin conexión), push notifications completas, mensajería bidireccional tipo chat.
- Analítica/tableros avanzados para espacios (KPIs complejos, reportes).
- Automatizaciones complejas (workflows multi-etapa, integraciones externas adicionales).
- Cambios destructivos sobre el esquema existente de SISOC (solo extensión controlada si se aprueba).

## Criterios de éxito (MVP)

- Un referente puede:  
    - consultar ficha/documentos/mensajes,  
    - gestionar nómina básica,  
    - ver prestación (lectura),  
    - registrar formación,  
    - cargar y presentar rendición,  
    **desde el teléfono**, con navegación simple y sin asistencia técnica.
  - Trazabilidad mínima habilitada: se puede reconstruir “qué pasó” ante un reclamo (auditoría + estados).
