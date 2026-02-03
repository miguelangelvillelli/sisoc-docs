# Modelo conceptual (MVP) — Integración con SISOC existente

!!! info "Estado"
    **Versión:** v0.1  
    **Última actualización:** 2026-02-03  
    **Responsable:** DB_Model / ARQ_Nav  
    **Nivel:** Interno

## Objetivo
Definir el modelo conceptual del MVP móvil contemplando que:
- SISOC ya existe (MySQL + backoffice Django),
- gran parte de la información ya está cargada,
- el MVP agrega vistas/endpoints y, solo si hace falta, nuevas entidades.

## Principio de integración
- La app móvil consume datos mediante **API del backoffice Django**, no acceso directo a MySQL.
- Se reutiliza lo existente cuando es posible.
- Se agregan entidades nuevas solo si el dato no existe o no soporta el MVP (archivos/estados/auditoría).

---

## 1) Entidades “existentes” (a confirmar con equipo SISOC)
> Nota: nombres reales de tablas/modelos se completan en reunión.

### Espacio (existente)
- **PK:** `espacio_id` (placeholder)
- atributos: nombre, domicilio, jurisdicción, estado institucional, etc.

### Usuario técnico (existente)
- usuarios internos del programa (operadores, administradores).

### (Posibles existentes a confirmar)
- Convenios / Documentos institucionales
- Prestación alimentaria (estado, período, observaciones)
- Rendiciones (si ya existen)

---

## 2) Entidades “nuevas” sugeridas para MVP (si no existen en SISOC)
Estas entidades se implementan en Django y persisten en MySQL, relacionadas al Espacio.

### UsuarioEspacio (nuevo o extensión)
Representa cuentas de acceso para referentes/usuarios internos del espacio.
- `usuario_id` (FK auth)
- `espacio_id` (FK)
- `rol` (referente / interno)
- `activo` (bool)

> Alternativa: reutilizar auth actual y agregar tabla de relación usuario-espacio-rol.

### Persona (Nómina) (nuevo si no existe)
- `persona_id` (PK)
- `espacio_id` (FK)
- nombre, apellido
- tipo_doc, nro_doc (opcionales MVP)
- fecha_nacimiento (opcional)
- flags: participa_alimentacion, participa_formacion
- estado: activa/inactiva
- timestamps

### ActividadFormacion (nuevo si no existe)
- `actividad_id` (PK)
- `espacio_id` (FK)
- titulo, descripcion, fecha, estado (planificada/finalizada/cancelada)
- timestamps

### ActividadParticipante (nuevo)
Tabla intermedia:
- `actividad_id` (FK)
- `persona_id` (FK)

### Rendicion (nuevo si no existe)
- `rendicion_id` (PK)
- `espacio_id` (FK)
- periodo
- estado (borrador/presentada/observada/aprobada/rechazada)
- observaciones (texto)
- timestamps

### Comprobante (nuevo si no existe)
- `comprobante_id` (PK)
- `rendicion_id` (FK)
- archivo_ref (ruta/url/id storage)
- estado (cargado/invalidado/validado)
- motivo_invalidacion (opcional)
- timestamps

### MensajeOperativo (opcional MVP, si no existe)
- `mensaje_id`
- alcance: general / por jurisdicción / por espacio
- titulo, cuerpo, fecha_publicacion

### DocumentoInstitucional (si no existe o si se requiere nuevo repositorio)
- `documento_id`
- alcance: por espacio / general
- titulo, archivo_ref, fecha

---

## 3) Relaciones principales (conceptual)
- Espacio 1—N Persona
- Espacio 1—N ActividadFormacion
- ActividadFormacion N—N Persona (vía ActividadParticipante)
- Espacio 1—N Rendicion
- Rendicion 1—N Comprobante
- Usuario (auth) N—N Espacio (vía UsuarioEspacio)
- (Opcional) Organización 1—N Espacio (si se confirma concepto)

---

## 4) Lectura vs escritura (MVP)
### Lectura (prioridad)
- Información institucional: Espacio + Documentos + Mensajes
- Prestación alimentaria: estado/período/observaciones/historial (solo lectura)
- Nóminas: listado + búsqueda
- Formación: listado + detalle
- Rendiciones: listado + detalle + estado

### Escritura (controlada)
- Nóminas: alta/edición (con trazabilidad)
- Formación: alta/edición + participantes (con trazabilidad)
- Rendiciones: alta + adjuntos + presentar (con trazabilidad)
- Prestación alimentaria: **no** escribe en MVP

---

## 5) Auditoría (conceptual)
Registrar eventos mínimos por módulo:
- Nóminas: persona_create/update/deactivate, import_start/result
- Prestación: view_list/view_detail
- Formación: actividad_create/update/status_change, add/remove_participant
- Rendiciones: rendicion_create/submit, comprobante_upload

> Si SISOC ya tiene auditoría, se integra allí. Si no, se crea entidad `AuditEvent`.

---

## 6) Pendientes de definición (para reunión)
- Nombre real de modelos/tablas existentes (Espacio/Comedor/Centro)
- Identificador único estable del espacio
- Existencia (o no) de personas/nóminas y rendiciones en esquema actual
- Storage de archivos (filesystem/S3/otro)
- Estrategia de autenticación para usuarios “espacio”
- Mapeo real de estados existentes a catálogos MVP
