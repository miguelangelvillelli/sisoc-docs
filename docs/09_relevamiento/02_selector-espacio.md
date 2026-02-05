# 02 — Ficha de relevamiento — Selector de espacio

!!! info "Metadatos"
    **Fecha:** AAAA-MM-DD  
    **Fuente:** Relevamiento (sin captura)  
    **Versión:** v0.1  
    **Owner:** Producto (SISOC) + UX  

## 1) Objetivo
Permitir que el usuario elija **con qué Espacio/Centro** va a operar cuando tiene asignados **2 o más**.

## 2) Cuándo aparece (regla de navegación)
- Post-login:
  - 0 espacios asignados → pantalla “Sin espacios asignados” (ver pendientes)
  - 1 espacio asignado → Home (Hub) (no mostrar selector)
  - **2+ espacios asignados → Selector de espacio**

## 3) Contenido de pantalla (propuesta MVP)
### 3.1 Encabezado
- Título: **“Seleccioná un espacio”**
- Subtítulo opcional: “Vas a poder cambiarlo después desde el menú” (si aplica)
- (Opcional) Search box: “Buscar por nombre / localidad”

### 3.2 Lista de espacios
Cada ítem (tarjeta o fila) muestra:
- **Nombre del espacio** (principal)
- **Localidad / Municipio / Provincia** (secundario, en una línea)
- **Estado** (badge): activo / suspendido / etc. (si existe en SISOC)
- (Opcional) Indicador “Último seleccionado” o “Reciente”

Acción:
- Tap en tarjeta/fila → setea espacio activo → navega a **Home (Hub)**

### 3.3 Acciones
- CTA principal: no hace falta botón si el tap selecciona.
- (Opcional) “Continuar” deshabilitado hasta elegir uno (si UX prefiere control explícito).

## 4) Estados (UX)
- Loading: skeleton de lista / spinner
- Vacío (0 espacios): ver sección 6
- Error: “No pudimos cargar tus espacios. Reintentá.”
- Búsqueda sin resultados: “No encontramos espacios con ese nombre.”

## 5) Datos requeridos (API / modelo)
Para cada espacio listado:
- `space_id` (identificador estable)
- `space_name`
- `jurisdiccion_resumen` (ej: “Almirante Brown, Buenos Aires”)
- `space_status` (si existe)
- `last_selected_at` (opcional, si guardamos preferencia)

## 6) Caso “Sin espacios asignados”
Pantalla (o estado) con:
- Mensaje: **“No tenés espacios asignados.”**
- Orientación: “Contactá al programa / tu referente territorial.”
- (Opcional) botón “Contactar soporte” si existe canal definido

## 7) Persistencia de selección
- Guardar `space_id` seleccionado:
  - Local storage (PWA) + refrescar si el token expira
  - (Opcional) registrar preferencia del lado del backend
- Al abrir la app:
  - si hay `space_id` guardado y sigue habilitado → ir directo a Home
  - si ya no existe / no permitido → volver a Selector

## 8) Seguridad / permisos
- El backend solo devuelve espacios **habilitados** para el usuario.
- La selección del espacio debe impactar en todos los endpoints (scoping por `space_id`).

## 9) Auditoría mínima (eventos)
- `space_list_view`
- `space_select` (space_id)
- `space_select_failed` (motivo)

## 10) Fuera de alcance (Release 2)
- Vista “Organización” con dashboard multi-espacio (si aplica).
- Favoritos / orden personalizado avanzado.

## 11) Pendientes (TBD) — para cerrar en reunión técnica/territorio
- ¿Qué campos exactos de jurisdicción se muestran? (provincia/municipio/localidad)
- ¿Se muestra estado institucional del espacio? ¿cuál es el catálogo?
- ¿Existe rol “organización” que requiera selector siempre?
- ¿Se permite “cambiar espacio” desde Home? ¿dónde queda esa acción en UI?
