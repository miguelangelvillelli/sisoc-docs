# Mapa de navegación — App móvil (MVP)

!!! info "Estado"
    **Versión:** v0.1  
    **Última actualización:** 2026-02-03  
    **Responsable:** UI_UX / ARQ_Nav  
    **Nivel:** Interno

## Reglas globales de navegación
- La app inicia en **Acceso** si no hay sesión/token válido.
- Si el usuario tiene **más de un espacio**, mostrar **Selector de espacio** antes del Home.
- El **Home (Hub)** es la pantalla principal: desde allí se accede a módulos.
- El **Back** (Android) debe volver al paso anterior (detalle → lista → módulo → Home).
- Los módulos se muestran/ocultan o se deshabilitan según RBAC.  
  Si el usuario no tiene permiso: mostrar el módulo deshabilitado con mensaje o no mostrarlo (definir en UX).

## Estructura principal (MVP)
- Acceso
  - Login / Acceso (placeholder)
  - Selector de espacio (si multi-espacio)
- Home (Hub)
  - Información institucional
  - Mensajes operativos
  - Nómina
  - Prestación alimentaria
  - Formación
  - Rendiciones

## Profundidad por módulo (MVP)
### Información institucional
- Perfil del espacio (lectura)
- Documentos (lista)
- Documento (detalle/descarga)

### Mensajes operativos
- Mensajes (lista)
- Mensaje (detalle)

### Nómina
- Nómina (lista + búsqueda + filtros)
- Persona (detalle)
- Persona (alta rápida)
- Persona (editar)
- Importación CSV (si aplica)

### Prestación alimentaria
- Estado período actual
- Historial
- Detalle de período

### Formación
- Formación (lista)
- Actividad (crear/editar)
- Participantes (gestión: agregar/quitar)

### Rendiciones
- Rendiciones (lista)
- Rendición (detalle)
- Adjuntar comprobante
- Presentar rendición (confirmación)

## Estados UI (mínimos por pantalla)
- **Loading:** skeleton o spinner
- **Empty:** mensaje claro y CTA si aplica
- **Error:** mensaje + reintentar
- **Sin permiso:** mensaje claro (no técnico) y ruta alternativa si aplica

