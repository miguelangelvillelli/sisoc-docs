# 09_2 · Rendición (detalle)

!!! info "Estado"
    **Versión:** v0.1  
    **Última actualización:** 2026-02-05  
    **Responsable:** UX + Funcional  
    **Nivel:** Interno

## Objetivo
Consultar el estado del período y gestionar comprobantes.

## Layout (según mock)
Card superior:
- Período (ej. “Febrero 2026”)
- Estado (chip: “Borrador”)

Sección “Comprobantes”:
- Conteo (ej. “2 archivos”)
- Lista con items:
  - Título (ej. “Factura A - N° 0001-00001234”)
  - Subtexto (monto + fecha si aplica)
  - Estado visual:
    - `cargado` (neutral)
    - `validado` (tilde verde)
    - `invalidado` (mostrar motivo si existe)

Botones (según mock):
- **Adjuntar Comprobante** (primario secundario rojo en mock)
- **Presentar Rendición** (verde)

Caja informativa:
- “Una vez presentada, no podrás modificarla hasta que sea revisada.”

## Reglas
- Si estado = `presentada` / `aprobada` / `rechazada`:
  - ocultar o deshabilitar “Adjuntar” y “Presentar”
  - mostrar mensaje: “Esta rendición ya fue presentada y está en revisión.”
- Si estado = `observada`:
  - habilitar adjuntar
  - “Presentar” vuelve a estar disponible solo si se cumplen reglas (definir)
- “Presentar”:
  - si no hay comprobantes → bloquear y mostrar error (400 lógica): “Tenés que adjuntar al menos un comprobante.”
  - si faltan obligatorios → “Faltan comprobantes requeridos.”

## CTA / Acciones
- Adjuntar Comprobante → **09_3**
- Presentar Rendición → **09_4**
- Tap en comprobante (opcional MVP) → ver/descargar (si se define)

## Datos mínimos requeridos (API)
- claim_id
- periodo_label
- estado
- observaciones (texto, opcional)
- receipts[]:
  - receipt_id
  - title
  - amount (opcional)
  - date (opcional)
  - status (cargado/validado/invalidado)
  - invalid_reason (si status=invalidado)
  - file_url (si se permite descargar/ver)

## Auditoría
- `claim_view_detail` (claim_id)
