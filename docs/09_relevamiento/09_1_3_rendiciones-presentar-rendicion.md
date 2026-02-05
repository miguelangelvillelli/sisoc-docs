# 09_4 · Presentar rendición (confirmación)

!!! info "Estado"
    **Versión:** v0.1  
    **Última actualización:** 2026-02-05  
    **Responsable:** UX + Funcional + Tech  
    **Nivel:** Interno

## Objetivo
Confirmar la presentación de la rendición y ejecutar el submit.

## UI mínima
- Título: “Presentar Rendición”
- Texto de confirmación:
  - “Al presentar, se bloquean cambios hasta revisión.”
- Mostrar reglas/resumen corto:
  - cantidad de comprobantes adjuntos
  - (opcional) checklist de “faltantes” si existe regla

## CTA
- Botón principal: “Confirmar presentar”
- Botón secundario: “Cancelar / Volver”

## Reglas
- Si no cumple condiciones → no permitir confirmar, mostrar motivo:
  - “Faltan comprobantes.”
  - “No tenés permisos.”
- Submit exitoso:
  - cambiar estado a `presentada`
  - volver a **09_2** con mensaje: “Rendición presentada.”

## Errores
- 403: “Solo el referente puede presentar la rendición.” (si aplica)
- 400: “No se puede presentar: faltan adjuntos.”
- red: “No pudimos presentar la rendición. Reintentá.”

## Auditoría
- `claim_submit` (claim_id)
