# 09_3 · Adjuntar comprobante

!!! info "Estado"
    **Versión:** v0.1  
    **Última actualización:** 2026-02-05  
    **Responsable:** UX + Funcional + Tech  
    **Nivel:** Interno

## Objetivo
Subir un archivo como comprobante asociado a una rendición.

## UI mínima
- Selector de archivo
- Texto de reglas:
  - Tipos permitidos (ej. PDF/JPG/PNG)
  - Tamaño máximo
- Estado de carga:
  - subiendo…
  - éxito / error

## CTA
- “Subir comprobante”

## Reglas
- Validar tipo/tamaño antes de subir (cliente) + validar server-side.
- Si rendición no editable (presentada/aprobada/rechazada) → 400/403 con mensaje claro.
- Al finalizar:
  - volver a **09_2** refrescado
  - toast: “Comprobante cargado”

## Errores
- 400 tipo/tamaño inválido: “El archivo no cumple los requisitos.”
- 401 no autenticado: “Tu sesión expiró. Volvé a ingresar.”
- 403 sin permisos: “No tenés permisos para adjuntar comprobantes.”
- red: “No pudimos subir el archivo. Reintentá.”

## Datos mínimos (API)
- claim_id
- archivo (multipart/form-data)
- opcional: metadata (tipo, nro, fecha, monto) si se define a futuro

## Auditoría
- `claim_upload_receipt` (claim_id, receipt_id)
