# Información institucional y convenios (MVP)

!!! info "Estado"
    **Versión:** v0.1  
    **Última actualización:** 2026-02-03  
    **Responsable:** Equipo SISOC  
    **Nivel:** Interno

## Objetivo del módulo
Brindar al espacio comunitario acceso simple, desde el teléfono, a la información institucional clave de su relación con el Programa:
  - datos del espacio (identificación básica),
  - convenios y documentos asociados,
  - mensajes operativos oficiales,
  - información de contacto/canales habilitados.

## Alcance MVP
Entra en MVP:
  - Visualizar “Ficha del espacio”
  - Visualizar convenios/documentos vigentes (PDF o link)
  - Visualizar mensajes operativos (novedades comunicadas por el Programa)
  - Acceso a canales de contacto definidos (si aplica)

Fuera de alcance (Release 2):
  - Firma digital dentro de la app
  - Flujos de renovación complejos (alta/baja de convenio desde app)
  - Gestión documental avanzada (versionado legal, circuitos múltiples)

## Roles y permisos (RBAC)
  - **Referente del espacio**: Ver
  - **Usuario interno del espacio**: Ver
  - **Operador territorial / Técnico**: Ver (según jurisdicción/asignación)
  - **Administrador central**: Ver/Administrar (publicar/actualizar contenido)
  - **Usuario de organización (propuesto)**: Ver (con selector de espacio)

## Contenido del módulo (MVP)

### 1) Ficha del espacio
Información sugerida:
  - Nombre del espacio
  - Identificador interno (código)
  - Domicilio / localidad
  - Responsable/referente (nombre y contacto si corresponde mostrar)
  - Jurisdicción (provincia/municipio)
  - Estado operativo general (si existe un estado “institucional”)

!!! warning "Protección de datos"
    Mostrar solo datos necesarios. Evitar publicar información sensible innecesaria.

### 2) Convenios y documentación
  - Listado de documentos asociados al espacio:
    - convenio vigente (si existe)
    - anexos
    - constancias relevantes (si aplica)
  - Cada documento:
    - título
    - fecha de publicación/actualización
    - acción “Ver/Descargar”

Reglas mínimas:
  - El espacio solo **visualiza/descarga**.
  - El documento visible debe ser la versión vigente definida por administración.
  - Si no hay documentos disponibles: mostrar estado “sin documentos” con explicación.

### 3) Mensajes operativos
  - Novedades oficiales del Programa que afecten operación del espacio:
    - recordatorios de rendición
    - cambios operativos
    - avisos de contacto
  - Cada mensaje:
    - título
    - fecha
    - contenido corto (expandible)

Reglas mínimas:
  - Mensajes deben ser redactados “en claro” y pensados para móvil.
  - Se sugiere separar “Mensajes generales” de “Mensajes del espacio” (si aplica).

### 4) Canales de contacto (si aplica)
  - Botón simple: “Contactar soporte”
  - Mostrar:
    - canal (WhatsApp/mail/teléfono)
    - horarios (si corresponde)

## Flujos y pantallas (wireflow)

### Pantalla A: Home del módulo
  - Ficha del espacio (resumen)
  - Acceso rápido:
    - “Convenios y documentos”
    - “Mensajes operativos”
    - “Contactos”

### Pantalla B: Documentos
  - Listado con tarjetas
  - Acción “Ver/Descargar”
  - Mensaje “sin documentos” si corresponde

### Pantalla C: Mensajes
  - Listado por fecha (más reciente primero)
  - Detalle expandible

## Auditoría y trazabilidad (eventos mínimos)
  - `institucional_view_home`
  - `institucional_view_documents`
  - `document_download` (documento_id)
  - `institucional_view_messages`
  - `support_contact` (si existe acción)

## Criterios de aceptación (BDD)

**Escenario: visualizar ficha del espacio**
  - Dado un usuario con permiso de ver
  - Cuando ingresa al módulo Información institucional
  - Entonces visualiza los datos básicos del espacio

**Escenario: ver documentos**
  - Dado que existen documentos asociados
  - Cuando ingresa a “Convenios y documentos”
  - Entonces visualiza listado y puede abrir/descargar

**Escenario: sin documentos**
  - Dado que no existen documentos asociados
  - Cuando ingresa a “Convenios y documentos”
  - Entonces visualiza mensaje “sin documentos” y orientación

**Escenario: ver mensajes**
  - Dado que existen mensajes operativos
  - Cuando ingresa a “Mensajes operativos”
  - Entonces visualiza mensajes ordenados por fecha (desc)

## Notificaciones (opcional MVP)
  - Nueva publicación de mensaje operativo
  - Nuevo documento publicado/actualizado (si aplica)

## Pendientes (para cerrar en v0.2)
  - Definir si “document_download” se habilita siempre o solo “visualizar” (según política).
  - Definir catálogo de “estado operativo general” del espacio (si existe).
  - Definir si habrá mensajes específicos por espacio además de generales.
