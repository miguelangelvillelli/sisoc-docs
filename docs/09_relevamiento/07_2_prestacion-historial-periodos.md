# 07.2 · Prestación alimentaria — Historial de períodos

!!! info "Estado"
    **Versión:** v0.1  
    **Última actualización:** 2026-02-05  
    **Responsable:** UX + Territorio + Técnica  
    **Nivel:** Interno

## Objetivo de la pantalla
Permitir navegar períodos anteriores y ver su estado de manera rápida.

## Componentes (según mockup)
- AppBar con “volver” + título “Historial de Períodos”.
- Lista de cards por período:
  - Mes/Año
  - Rango de fechas (si existen)
  - Estado (badge) (ej. Vigente / Observado / Aprobado)
  - Texto breve de observación (opcional) (ej. “Faltan comprobantes...”)

## Ordenamiento
- Más reciente primero.

## Estados UI
- **Loading**: skeleton list.
- **Vacío**: “No hay períodos anteriores para mostrar”.
- **Error**: “No pudimos cargar el historial. Reintentá.”

## Interacciones
- Tap en card → abre “Detalle del Período”.

## API / Datos (a confirmar)
- `GET /spaces/{space_id}/pa/periods?order=desc` → lista:
  - `{ period_id, label, status, start_date?, end_date?, short_note? }`

## Tracking (si aplica)
- `pa_view_history`
- `pa_open_period_detail` (period_id)
