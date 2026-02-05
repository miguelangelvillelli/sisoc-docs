# 09_1 · Rendiciones (lista)

!!! info "Estado"
    **Versión:** v0.1  
    **Última actualización:** 2026-02-05  
    **Responsable:** UX + Funcional  
    **Nivel:** Interno

## Objetivo
Ver todas las rendiciones del espacio, ordenadas por período, con su **estado** y **alertas**.

## Layout (según mock)
Header:
- Título: “Rendiciones”
- Badge/contador: “1 observada” (si aplica)

Contenido:
- Cards por período con:
  - Período (ej. “Febrero 2026”)
  - Subtexto: cantidad de comprobantes (ej. “3 comprobantes”)
  - Estado (chip a la derecha: Borrador / Observada / Aprobada)
  - Si `observada`: mostrar aviso corto (ej. “Revisar comprobante N° 123 - monto…”)

Orden:
- Más reciente primero.

## CTA / Acciones
- Tap en una card → **09_2 Detalle de Rendición**

## Estados
- Vacío: “Todavía no tenés rendiciones cargadas.”
- Error de red: “No pudimos cargar tus rendiciones. Reintentá.”
- Permisos: si no tiene acceso, 403 → “No tenés permisos para ver rendiciones.”

## Datos mínimos requeridos (API)
- claim_id
- periodo_label (ej. “Febrero 2026”)
- estado
- receipts_count
- updated_at (opcional)
- highlight_text (solo si observada, opcional)

## Auditoría
- `claims_view_list`
