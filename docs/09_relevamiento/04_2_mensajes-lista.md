# 04.2 · Mensajes (lista)

!!! info "Estado"
    **Versión:** v0.2  
    **Última actualización:** 2026-02-05  
    **Responsable:** UX + Analista Funcional  
    **Nivel:** Interno (relevamiento)

## Objetivo
Mostrar al espacio un listado simple de **mensajes operativos oficiales** del Programa, destacando no leídos y permitiendo acceder al detalle.

## Ubicación en el flujo
Desde `04 · Información institucional` → botón **Mensajes**  
o desde `03 · Home (Hub)` → módulo **Mensajes** (si aplica).

## Pantalla / UI (según mock/captura)
### Encabezado
- Flecha “volver”
- Título: **Mensajes**
- Badge/CTA “sin leer” arriba a la derecha (chip):
  - Ejemplo: **“1 sin leer”**
  - Comportamiento: al tocarlo, filtra para ver solo no leídos (recomendado)
  - Si no hay no leídos: ocultar chip o mostrar “0 sin leer” (definir)

### Lista de mensajes
Cada ítem muestra:
- Ícono de sobre (con color destacado si está no leído)
- **Título**
- **Resumen** (preview del cuerpo)
- **Fecha** (formato corto, ej. `31/1/2026`)
- Indicador de no leído:
  - punto/badge (ej. puntito celeste)
  - estilo “más fuerte” del ícono o borde

### Estados visuales
- Mensaje no leído: ícono destacado + puntito + card resaltada
- Mensaje leído: card/ícono en estilo “apagado” (gris)

## Acciones del usuario
- Tocar un mensaje → navega a `04.2.1 · Mensaje (detalle)`
- (Opcional) Tocar “X sin leer” → filtrar no leídos / limpiar filtro

## Reglas de negocio
- Orden: más recientes primero (desc por fecha_publicacion).
- Al entrar a la lista, NO se marca como leído automáticamente.
- Se marca como leído al abrir el detalle (recomendado MVP).
- Segmentación (a confirmar con SISOC):
  - Mensajes generales
  - Mensajes por espacio
  - Mensajes por jurisdicción
  (MVP puede arrancar con general + por espacio).

## Estados de pantalla
- **Cargando:** skeleton de lista (3–5 ítems)
- **Vacío:** “No hay mensajes por ahora”
- **Sin permiso (403):** “No tenés permisos para ver mensajes”
- **Error red/servidor:** “No pudimos cargar los mensajes. Reintentá.”

## Datos requeridos (conceptual)
**Message (lista)**
- id
- titulo
- preview (primeras N chars del body o campo resumen)
- fecha_publicacion
- is_read (bool)

## Endpoints (placeholder)
- `GET /api/app/messages?space_id=...`
- `GET /api/app/messages?unread=true` (si se implementa filtro)
- `GET /api/app/messages/{id}`
- `POST/PATCH /api/app/messages/{id}/read`

## Auditoría / trazabilidad
- `messages_view_list`
- `messages_filter_unread` (si aplica)
- `message_open_from_list` (message_id)

## Criterios de aceptación
- Se visualiza una lista ordenada por fecha desc.
- Los no leídos se distinguen claramente.
- El chip “X sin leer” refleja la cantidad real de mensajes no leídos.
- Al abrir un mensaje, al volver a la lista se actualiza su estado a leído (si se implementa).

## Referencias
- `docs/09_relevamiento/04_info-institucional.md`
- `docs/09_relevamiento/04_2_1_mensaje-detalle.md`
