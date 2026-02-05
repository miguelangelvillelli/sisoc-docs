# 07.1 · Prestación alimentaria — Período actual

!!! info "Estado"
    **Versión:** v0.1  
    **Última actualización:** 2026-02-05  
    **Responsable:** UX + Territorio + Técnica  
    **Nivel:** Interno

## Objetivo de la pantalla
Mostrar el **período vigente** y su **estado**, con un acceso simple al historial.

## Componentes (según mockup)
- AppBar con “volver”.
- Card “Período actual”:
  - Mes/Año (ej. “Febrero 2026”)
  - Estado (badge) (ej. “Vigente”)
  - Fecha inicio / Fecha fin (si existen)
- CTA secundario: “Ver Historial” (períodos anteriores)
- Caja informativa (texto fijo):
  - “El estado de la prestación alimentaria es gestionado por el programa SISOC... contactá a tu referente.”

## Estados UI
- **Loading**: skeleton en card + CTA deshabilitado.
- **OK**: muestra período + estado + fechas.
- **Sin datos**: mostrar “Sin información disponible” + caja informativa.
- **Error**: “No pudimos cargar la información. Reintentá.”

## Reglas / validaciones
- Si `fecha_inicio` o `fecha_fin` no existen, ocultar el campo (no mostrar vacío).
- El badge de estado se mapea desde catálogo SISOC (definir).

## API / Datos (a confirmar)
- `GET /me/space` (contexto de espacio actual) o similar
- `GET /spaces/{space_id}/pa/current` → `{ period_id, label, status, start_date?, end_date?, note? }`

## Tracking (si aplica)
- `pa_view_current_period`
- `pa_click_view_history`
