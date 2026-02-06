# Reunión Técnica: Revisión MVP — Hub y Módulos

!!! info "Información de la reunión"
    **Fecha:** 6 de febrero de 2026  
    **Objetivo:** Validar estado de avance del MVP y definir datos a mostrar/ocultar por módulo  
    **Participantes:** Equipo técnico SISOC + Desarrollo PWA  
    **Duración estimada:** 90-120 minutos

---

## 📋 Agenda

1. **Estado de avance del MVP (15 min)**
2. **Revisión módulo por módulo (60 min)**
   - Datos actuales en pantallas
   - Validación contra SISOC existente
   - Decisiones: agregar/quitar/modificar
3. **Arquitectura de integración (15 min)**
4. **Próximos pasos y compromisos (10 min)**

---

## 🎯 Estado de Avance del MVP

### ✅ Completado

#### Infraestructura base

- [x] Sistema de 3 temas (Claro/Oscuro/Poncho)
- [x] Autenticación mock (demo/demo y orga/orga)
- [x] Routing y navegación
- [x] ThemeProvider + AuthContext
- [x] Selector de espacios múltiples (para organizaciones)

#### Módulos implementados (17 pantallas)

- [x] HomeScreen (Hub con 6 módulos)
- [x] Información Institucional (3 pantallas)
- [x] Mensajes (2 pantallas)
- [x] Nóminas (4 pantallas)
- [x] Prestación Alimentaria (3 pantallas)
- [x] Formación (1 pantalla)
- [x] Rendiciones (2 pantallas)

#### Componentes reutilizables

- [x] ThemeToggle (selector de temas)
- [x] WhatsAppButton (contacto soporte)
- [x] SpaceMap (Leaflet + OpenStreetMap)
- [x] SpaceSelectorScreen (multi-espacio)

### 🚧 En Progreso

- [ ] Integración con API real de SISOC
- [ ] Validación de datos contra SISOC existente
- [ ] Ajustes de UX según feedback
- [ ] Testing en dispositivos reales

### ⏳ Pendiente

- [ ] Autenticación real contra SISOC
- [ ] Gestión de archivos/adjuntos (storage)
- [ ] Importación CSV para nóminas
- [ ] Subida de comprobantes (rendiciones)
- [ ] Push notifications
- [ ] Auditoría y trazabilidad server-side

---

## 🔍 Revisión Módulo por Módulo

### 1️⃣ Información Institucional

#### Datos actuales en pantallas

**SpaceProfileScreen (Perfil del espacio):**

- Nombre del espacio
- Dirección completa
- Localidad / Provincia
- Estado operativo (badge: activo/suspendido/sin_datos)
- Mapa con ubicación (OpenStreetMap)
- WhatsApp de soporte técnico
- Secciones:
  - Descripción general
  - Programas activos
  - Horarios de atención
  - Capacidad instalada

**DocumentListScreen (Documentos):**

- Listado de documentos
- Tipo de documento
- Fecha de documento
- Acción: Ver/Descargar

**DocumentDetailScreen:**

- Título del documento
- Tipo
- Fecha
- Contenido/descripción
- Acción: Descargar

#### ✅ Validación contra SISOC

| Dato | ¿Existe en SISOC? | Tabla/Campo | Decisión |
|------|-------------------|-------------|----------|
| Nombre del espacio | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Dirección | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Localidad/Provincia | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Estado operativo | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Coordenadas (lat/lng) | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| WhatsApp soporte | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Descripción general | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Programas activos | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Horarios de atención | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Capacidad instalada | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Documentos/Convenios | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |

#### 📝 Decisiones y notas

```
[Espacio para notas de la reunión]






```

#### ➕ Datos a agregar (si corresponde)

```
[Listar datos adicionales que deberían mostrarse]






```

---

### 2️⃣ Nóminas

#### Datos actuales en pantallas

**NominaListScreen (Listado):**

- Contador de personas activas/inactivas
- Buscador (nombre, apellido, documento)
- Filtros: Activo/Inactivo, Alimentación, Formación
- Lista de personas:
  - Foto/avatar
  - Nombre completo
  - Badges: Alimentación / Formación
  - Indicador activo/inactivo
- CTA: Nueva persona

**PersonDetailScreen (Detalle):**

- Nombre completo
- Tipo y número de documento
- Fecha de nacimiento (edad calculada)
- Teléfono
- Género
- Estado (Activo/Inactivo)
- Participación:
  - Prestación alimentaria (Sí/No)
  - Actividades de formación (Sí/No)
- Observaciones
- Acciones: Editar / Ver historial

**PersonCreateScreen / PersonEditScreen:**

- Nombre (requerido)
- Apellido (requerido)
- Tipo de documento (DNI/LC/LE/Pasaporte/Otro)
- Número de documento
- Fecha de nacimiento
- Género (F/M/X/Prefiero no decir)
- Teléfono
- Domicilio
- Participación:
  - Prestación alimentaria (checkbox)
  - Actividades de formación (checkbox)
- Observaciones
- Estado: Activo (checkbox)

#### ✅ Validación contra SISOC

| Dato | ¿Existe en SISOC? | Tabla/Campo | Decisión |
|------|-------------------|-------------|----------|
| Nombre | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Apellido | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Tipo documento | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Número documento | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Fecha nacimiento | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Género | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Teléfono | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Domicilio | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Flag alimentación | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Flag formación | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Estado activo | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Observaciones | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Foto/avatar | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |

#### 📝 Decisiones y notas

**Reglas de validación a definir:**

- ¿Es obligatorio el número de documento?
- ¿Validamos duplicados por documento en el mismo espacio?
- ¿Validamos edad mínima/máxima?
- ¿Qué campos son requeridos vs opcionales?

```
[Espacio para notas de la reunión]






```

#### ➕ Datos a agregar (si corresponde)

```
[Listar datos adicionales que deberían mostrarse]






```

---

### 3️⃣ Prestación Alimentaria

#### Datos actuales en pantallas

**PrestacionScreen (Estado actual):**

- Período actual (mes/año)
- Estado del período (badge: vigente/observado/aprobado/cerrado)
- Alertas si hay observaciones
- Fechas del período (inicio/fin)
- Observaciones (si existen)
- Estadísticas:
  - Personas en nómina alimentaria
  - Días de prestación en el período
  - Última actualización
- CTA: Ver historial de períodos

**PeriodoHistorialScreen:**

- Lista de períodos históricos
- Cada período:
  - Mes/Año
  - Estado (badge)
  - Fecha de cierre
  - Si tiene observaciones (indicador)

**PeriodoDetailScreen:**

- Título: Mes Año
- Estado (badge grande)
- Fechas (inicio/fin)
- Observaciones completas (si existen)
- Datos del período:
  - Personas registradas
  - Días de prestación
  - Fecha de aprobación/cierre
- Sin montos ni información sensible

#### ✅ Validación contra SISOC

| Dato | ¿Existe en SISOC? | Tabla/Campo | Decisión |
|------|-------------------|-------------|----------|
| Período (mes/año) | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Estado del período | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Fechas inicio/fin | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Observaciones | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Personas en nómina | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Días de prestación | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Fecha aprobación | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |

#### 📝 Decisiones y notas

**Puntos a definir:**

- ¿Los espacios pueden editar algo o es solo lectura en MVP?
- ¿Qué estados aplican: vigente/observado/aprobado/cerrado/rechazado?
- ¿Mostramos montos? (doc dice "sin montos en MVP")
- ¿Hay workflow de corrección de observaciones desde móvil?

```
[Espacio para notas de la reunión]






```

---

### 4️⃣ Formación

#### Datos actuales en pantallas

**FormacionListScreen:**

- Contador de actividades (total/planificadas/finalizadas)
- Filtros: Por estado (todas/planificadas/en curso/finalizadas/canceladas)
- Lista de actividades:
  - Título de la actividad
  - Fecha
  - Estado (badge: planificada/en_curso/finalizada/cancelada)
  - Número de participantes
  - Descripción breve
- CTA: Nueva actividad

**Pantallas pendientes de implementar:**

- Detalle de actividad
- Crear/editar actividad
- Gestionar participantes (asignar desde nómina)
- Registrar asistencia

#### ✅ Validación contra SISOC

| Dato | ¿Existe en SISOC? | Tabla/Campo | Decisión |
|------|-------------------|-------------|----------|
| Actividades de formación | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Título de actividad | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Descripción | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Fecha de actividad | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Estado (planificada/etc) | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Participantes | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Asistencia | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |

#### 📝 Decisiones y notas

**Puntos a definir:**

- ¿Qué campos tiene una actividad de formación en SISOC?
- ¿Los participantes se toman automáticamente de nómina con flag formación=true?
- ¿Se registra asistencia por actividad o es solo "participante sí/no"?
- ¿Hay tipos de actividad? (taller, charla, curso, etc.)
- ¿Duración de la actividad? (única/periódica)

```
[Espacio para notas de la reunión]






```

#### ➕ Datos a agregar (si corresponde)

```
[Listar datos adicionales que deberían mostrarse]






```

---

### 5️⃣ Rendiciones

#### Datos actuales en pantallas

**RendicionListScreen:**

- Contador por estado (todas/borrador/presentadas/observadas/aprobadas)
- Filtros: Por estado
- Lista de rendiciones:
  - Período (mes/año)
  - Estado (badge: borrador/presentada/observada/aprobada/rechazada)
  - Fecha de presentación
  - Cantidad de comprobantes
  - Si tiene observaciones (alerta)
- CTA: Nueva rendición (si no existe para período actual)

**RendicionDetailScreen:**

- Título: Rendición Mes Año
- Estado (badge grande)
- Período asociado
- Fecha de presentación
- Observaciones (si existen)
- Lista de comprobantes:
  - Tipo de comprobante
  - Número
  - Fecha
  - Monto
  - Estado (cargado/validado/invalidado)
  - Preview/thumbnail
  - Acción: Ver comprobante
- CTA: Agregar comprobante (si estado = borrador)
- CTA: Presentar rendición (si estado = borrador y hay comprobantes)

#### ✅ Validación contra SISOC

| Dato | ¿Existe en SISOC? | Tabla/Campo | Decisión |
|------|-------------------|-------------|----------|
| Rendición | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Período asociado | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Estados de rendición | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Fecha presentación | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Observaciones | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Comprobantes | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Tipo de comprobante | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Número comprobante | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Monto | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Archivos adjuntos | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |

#### 📝 Decisiones y notas

**Puntos críticos a definir:**

- ¿Qué tipos de comprobante acepta SISOC?
- ¿Límite de tamaño por archivo? ¿Límite de archivos por rendición?
- ¿Formatos aceptados? (PDF, JPG, PNG?)
- ¿Storage: S3, servidor Django, otro?
- ¿Workflow de corrección: se pueden editar comprobantes observados?
- ¿Estados finales: aprobada/rechazada o hay más estados?

```
[Espacio para notas de la reunión]






```

#### ➕ Datos a agregar (si corresponde)

```
[Listar datos adicionales que deberían mostrarse]






```

---

### 6️⃣ Mensajes

#### Datos actuales en pantallas

**MessageListScreen:**

- Contador de mensajes no leídos
- Filtros: Todos / No leídos / Leídos
- Lista de mensajes:
  - Título
  - Fecha
  - Preview del contenido
  - Badge "No leído" (si aplica)
  - Indicador de prioridad (si aplica)

**MessageDetailScreen:**

- Título del mensaje
- Fecha de envío
- Contenido completo
- Marcar como leído automáticamente
- Posibles adjuntos (si aplica)

#### ✅ Validación contra SISOC

| Dato | ¿Existe en SISOC? | Tabla/Campo | Decisión |
|------|-------------------|-------------|----------|
| Mensajes del programa | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Título | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Contenido | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Fecha de envío | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Estado leído/no leído | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Prioridad del mensaje | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |
| Adjuntos | ⬜ Sí / ⬜ No | | ⬜ Mantener / ⬜ Quitar / ⬜ Modificar |

#### 📝 Decisiones y notas

**Puntos a definir:**

- ¿Quién envía los mensajes? (administrador central, operador territorial?)
- ¿Son mensajes masivos o dirigidos a espacios específicos?
- ¿Hay categorías de mensajes? (urgente/normal/informativo)
- ¿Hay mensajería bidireccional o es solo broadcast?
- ¿Los mensajes tienen fecha de caducidad/archivo?

```
[Espacio para notas de la reunión]






```

---

## 🏠 HomeScreen (Hub)

### Componentes actuales

**Header:**

- Logo SISOC
- Nombre del espacio
- Selector de tema (Light/Dark/Poncho)
- Botón logout

**Tarjeta de información del espacio:**

- Nombre completo
- Dirección
- Localidad, Provincia
- Estado operativo (badge)
- Mapa con ubicación

**Grid de módulos (6 cards):**

1. Información Institucional (azul)
2. Nóminas (verde)
3. Prestación Alimentaria (naranja)
4. Formación (morado)
5. Rendiciones (rojo)
6. Mensajes (cian)

**Footer:**

- Botón WhatsApp soporte

### ✅ Decisiones sobre el Hub

| Elemento | Decisión | Notas |
|----------|----------|-------|
| Orden de los módulos | ⬜ Mantener / ⬜ Modificar | ¿Priorizar por frecuencia de uso? |
| Tarjeta de espacio | ⬜ Mantener / ⬜ Simplificar / ⬜ Expandir | ¿Mostrar más/menos info? |
| Mapa en Home | ⬜ Mantener / ⬜ Quitar / ⬜ Condicional | ¿Siempre visible o solo si hay coordenadas? |
| Contadores/badges en módulos | ⬜ Agregar | Ej: "3 mensajes no leídos", "2 rendiciones observadas" |
| Selector de tema | ⬜ Mantener / ⬜ Quitar / ⬜ Solo en ajustes | ¿Demasiado visible en Home? |
| Botón logout | ⬜ Mantener / ⬜ Mover a menú | ¿Posición actual OK? |

### 📝 Decisiones y notas

```
[Espacio para notas de la reunión]






```

---

## 🏗️ Arquitectura de Integración

### Endpoints necesarios (API Django)

#### Autenticación
```
POST /api/mobile/v1/auth/login
POST /api/mobile/v1/auth/logout
GET  /api/mobile/v1/me  (contexto: user + spaces)
```

#### Espacios
```
GET  /api/mobile/v1/spaces/{space_id}
GET  /api/mobile/v1/spaces/{space_id}/documents
```

#### Nómina
```
GET    /api/mobile/v1/spaces/{space_id}/persons
POST   /api/mobile/v1/spaces/{space_id}/persons
GET    /api/mobile/v1/spaces/{space_id}/persons/{person_id}
PUT    /api/mobile/v1/spaces/{space_id}/persons/{person_id}
POST   /api/mobile/v1/spaces/{space_id}/persons/import  (CSV)
```

#### Prestación Alimentaria
```
GET  /api/mobile/v1/spaces/{space_id}/prestacion/current
GET  /api/mobile/v1/spaces/{space_id}/prestacion/periods
GET  /api/mobile/v1/spaces/{space_id}/prestacion/periods/{period_id}
```

#### Formación
```
GET    /api/mobile/v1/spaces/{space_id}/formacion/activities
POST   /api/mobile/v1/spaces/{space_id}/formacion/activities
GET    /api/mobile/v1/spaces/{space_id}/formacion/activities/{activity_id}
PUT    /api/mobile/v1/spaces/{space_id}/formacion/activities/{activity_id}
POST   /api/mobile/v1/spaces/{space_id}/formacion/activities/{activity_id}/participants
```

#### Rendiciones
```
GET    /api/mobile/v1/spaces/{space_id}/rendiciones
POST   /api/mobile/v1/spaces/{space_id}/rendiciones
GET    /api/mobile/v1/spaces/{space_id}/rendiciones/{rendicion_id}
POST   /api/mobile/v1/spaces/{space_id}/rendiciones/{rendicion_id}/comprobantes
PUT    /api/mobile/v1/spaces/{space_id}/rendiciones/{rendicion_id}/submit
```

#### Mensajes
```
GET  /api/mobile/v1/spaces/{space_id}/messages
GET  /api/mobile/v1/spaces/{space_id}/messages/{message_id}
PUT  /api/mobile/v1/spaces/{space_id}/messages/{message_id}/read
```

### Storage de archivos

**Decisión pendiente:**

- ⬜ AWS S3
- ⬜ Storage local Django + nginx
- ⬜ Otro: _______________

**Requisitos:**

- Límite de tamaño por archivo: ___ MB
- Formatos aceptados: PDF, JPG, PNG, ¿otros?
- Tiempo de retención: ___________
- Política de acceso/seguridad: ___________

### 📝 Decisiones técnicas

```
[Espacio para notas de la reunión]






```

---

## 📊 Matriz de Prioridades para Sprint

### Sprint 1 (próxima semana)

- [ ] Endpoint `/me` + autenticación real
- [ ] API Información Institucional (GET)
- [ ] API Mensajes (GET + mark as read)
- [ ] Testing en dispositivos reales

### Sprint 2

- [ ] API Nóminas (CRUD completo)
- [ ] API Prestación Alimentaria (GET)
- [ ] Importación CSV nóminas

### Sprint 3

- [ ] API Formación (CRUD + participantes)
- [ ] API Rendiciones (CRUD + comprobantes)
- [ ] Storage de archivos

### Release 2 (fuera de MVP)

- [ ] Push notifications
- [ ] Offline-first
- [ ] Analítica avanzada
- [ ] Firma digital

---

## ✅ Compromisos y Próximos Pasos

### Decisiones tomadas en esta reunión

```
1. 

2. 

3. 

```

### Tareas asignadas

| Responsable | Tarea | Fecha límite |
|-------------|-------|--------------|
| | | |
| | | |
| | | |
| | | |

### Próxima reunión

**Fecha:** _____________  
**Objetivo:** _____________  
**Pre-requisitos:** _____________

---

## 📎 Referencias

- [Alcance MVP](../01_mvp/alcance-mvp.md)
- [User Stories MVP](../01_mvp/user-stories-mvp.md)
- [Modelo Conceptual](../04_datos/modelo-conceptual.md)
- [Documentación Módulos](../03_modulos/)
- [Estados y Reglas](../04_datos/estados-y-reglas.md)
- [ADRs](../adr/)

---

## 📝 Notas adicionales

```
[Espacio libre para notas durante la reunión]













```
