# 04.2.1 · Mensaje (detalle)

!!! info "Estado"
    **Versión:** v0.2  
    **Última actualización:** 2026-02-05  
    **Responsable:** UX + Analista Funcional  
    **Nivel:** Interno (relevamiento)

## Objetivo
Permitir leer el contenido completo de un mensaje operativo, dejando claro el **origen oficial** del mensaje y el **canal de consulta**.

## Ubicación en el flujo
Desde `04.2 · Mensajes (lista)` → tocar un mensaje.

## Pantalla / UI (según mock/captura)
### Encabezado
- Flecha “volver” (vuelve a Mensajes lista)
- Título: **Mensaje**

### Card principal (contenido del mensaje)
- Ícono circular de mensaje (sobre la izquierda)
- **Título del mensaje** (ej. “Rendición de enero - Recordatorio”)
- **Fecha** en formato largo (ej. “sábado, 31 de enero de 2026”)
- **Cuerpo** del mensaje (texto completo)

### Bloque informativo (admonición)
- Caja resaltada con ícono “i”
- Texto fijo sugerido (según captura):
  - “Importante: Este mensaje proviene del programa SISOC. Si tenés dudas, contactá a tu referente del programa.”

## Acciones del usuario
- Volver

## Reglas de negocio
- El contenido debe estar redactado “en claro” y pensado para móvil.
- Al abrir el mensaje, se marca como leído (recomendado).
- El bloque “Importante” puede ser:
  - fijo para todos los mensajes, o
  - configurable por backend (a definir, pero fijo está OK para MVP).

## Estados de pantalla
- **Cargando:** skeleton del card
- **No encontrado (404):** “El mensaje ya no está disponible”
- **Sin permiso (403):** “No tenés permisos para ver este mensaje”
- **Error red/servidor:** “No pudimos cargar el mensaje. Reintentá.”

## Datos requeridos (conceptual)
**Message**
- id
- titulo
- body
- fecha_publicacion (render en formato largo en UI)
- is_read (bool)
- scope/segmento (general/espacio/jurisdicción) (si aplica)

## Endpoints (placeholder)
- `GET /api/app/messages/{id}`
- `POST/PATCH /api/app/messages/{id}/read` (marcar como leído)

## Auditoría / trazabilidad
- `message_view_detail` (message_id)
- `message_mark_read` (message_id)

## Criterios de aceptación
- Al abrir un mensaje se ve: título, fecha larga, cuerpo y bloque “Importante”.
- Si el mensaje estaba no leído, pasa a leído y se refleja al volver a la lista.

## Referencias
- `docs/09_relevamiento/04_2_mensajes-lista.md`
