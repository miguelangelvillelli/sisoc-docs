# 07.3 · Prestación alimentaria — Detalle del período

!!! info "Estado"
    **Versión:** v0.1  
    **Última actualización:** 2026-02-05  
    **Responsable:** UX + Territorio + Técnica  
    **Nivel:** Interno

## Objetivo de la pantalla
Mostrar el detalle del período en **modo solo lectura**, con aclaración de canal de consulta.

## Componentes (según mockup)
- AppBar con “volver” + título “Detalle del Período”.
- Card con:
  - Mes/Año
  - Estado (badge)
  - Fecha inicio / Fecha fin (si existen)
- Caja informativa (texto fijo):
  - “Para más detalles sobre este período, contactá a tu referente del programa SISOC.”

## Estados UI
- **Loading**: skeleton.
- **Error**: “No pudimos cargar el período. Reintentá.”
- **Sin datos**: “No hay información disponible para este período.”

## Reglas
- No exponer montos ni movimientos.
- Si existe `note`/`observacion`, validar con Territorio si se muestra completa o resumida.

## API / Datos (a confirmar)
- `GET /spaces/{space_id}/pa/periods/{period_id}` →:
  - `{ period_id, label, status, start_date?, end_date?, note? }`

## Tracking (si aplica)
- `pa_view_period_detail` (period_id)
